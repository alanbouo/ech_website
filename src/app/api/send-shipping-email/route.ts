import { NextRequest, NextResponse } from 'next/server';
import { sendShippingEmail } from '@/lib/email';

// POST /api/send-shipping-email
// Body: { reference, customerEmail, customerFirstName, trackingNumber, carrier, trackingUrl?, estimatedDelivery? }
export async function POST(request: NextRequest) {
  try {
    // Verify secret key
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.API_SECRET || 'admin-secret-2024';
    
    if (authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { reference, customerEmail, customerFirstName, trackingNumber, carrier, trackingUrl, estimatedDelivery } = body;

    // Validate required fields
    if (!reference || !customerEmail || !customerFirstName || !trackingNumber || !carrier) {
      return NextResponse.json(
        { error: 'Missing required fields: reference, customerEmail, customerFirstName, trackingNumber, carrier' },
        { status: 400 }
      );
    }

    const result = await sendShippingEmail({
      reference,
      customerEmail,
      customerFirstName,
      trackingNumber,
      carrier,
      trackingUrl,
      estimatedDelivery,
    });

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Shipping email sent', data: result.data });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending shipping email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
