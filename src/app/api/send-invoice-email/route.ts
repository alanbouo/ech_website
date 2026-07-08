import { NextRequest, NextResponse } from 'next/server';
import { sendInvoiceEmail } from '@/lib/email';

// POST /api/send-invoice-email
// Envoie au client un email avec sa facture.
//
// Body: {
//   reference,            // référence de commande (requis)
//   customerEmail,        // email du client (requis)
//   customerFirstName,    // prénom du client (requis)
//   invoiceUrl?,          // lien consultable vers la facture (ex: InvoicePlane guest URL)
//   invoiceNumber?,       // numéro de facture (ex: "2026-0042")
//   amount?,              // montant TTC
//   issueDate?,           // date d'émission (ex: "8 juillet 2026")
//   invoicePdf?,          // { content: base64, filename? } — PDF déjà encodé
//   pdfUrl?,              // URL à télécharger pour joindre le PDF (ex: InvoicePlane)
//   pdfAuthHeader?        // valeur d'un header Authorization pour récupérer pdfUrl (optionnel)
// }
//
// Il faut fournir au moins invoiceUrl OU un moyen d'obtenir le PDF (invoicePdf ou pdfUrl).
export async function POST(request: NextRequest) {
  try {
    // Verify secret key (pas de valeur par défaut : l'endpoint refuse si API_SECRET n'est pas configuré)
    const expectedSecret = process.env.API_SECRET;
    if (!expectedSecret) {
      console.error('API_SECRET is not configured');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      reference,
      customerEmail,
      customerFirstName,
      invoiceUrl,
      invoiceNumber,
      amount,
      issueDate,
      invoicePdf,
      pdfUrl,
      pdfAuthHeader,
    } = body;

    // Validate required fields
    if (!reference || !customerEmail || !customerFirstName) {
      return NextResponse.json(
        { error: 'Missing required fields: reference, customerEmail, customerFirstName' },
        { status: 400 }
      );
    }

    // Il faut au moins un lien ou un PDF (fourni ou à télécharger)
    if (!invoiceUrl && !invoicePdf && !pdfUrl) {
      return NextResponse.json(
        { error: 'Provide at least one of: invoiceUrl, invoicePdf, or pdfUrl' },
        { status: 400 }
      );
    }

    // Si une URL de PDF est fournie (ex: InvoicePlane), on la télécharge et on l'encode en base64
    let resolvedPdf = invoicePdf;
    if (!resolvedPdf && pdfUrl) {
      try {
        const pdfResponse = await fetch(pdfUrl, {
          headers: pdfAuthHeader ? { Authorization: pdfAuthHeader } : undefined,
        });

        if (!pdfResponse.ok) {
          return NextResponse.json(
            { error: `Failed to fetch PDF from pdfUrl (status ${pdfResponse.status})` },
            { status: 502 }
          );
        }

        const arrayBuffer = await pdfResponse.arrayBuffer();
        resolvedPdf = {
          content: Buffer.from(arrayBuffer).toString('base64'),
          filename: `facture-${reference}.pdf`,
        };
      } catch (fetchError) {
        console.error('Error fetching invoice PDF:', fetchError);
        return NextResponse.json({ error: 'Failed to fetch invoice PDF' }, { status: 502 });
      }
    }

    const result = await sendInvoiceEmail({
      reference,
      customerEmail,
      customerFirstName,
      invoiceUrl,
      invoiceNumber,
      amount: amount !== undefined ? Number(amount) : undefined,
      issueDate,
      invoicePdf: resolvedPdf,
    });

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Invoice email sent', data: result.data });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending invoice email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
