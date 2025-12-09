import { NextRequest, NextResponse } from 'next/server';
import { sendRefundEmail } from '@/lib/email';

// POST /api/send-refund-email
// Body: { reference, customerEmail, customerFirstName, refundAmount, reason? }
export async function POST(request: NextRequest) {
  try {
    // Verify secret key
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.API_SECRET || 'admin-secret-2024';
    
    if (authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { reference, customerEmail, customerFirstName, refundAmount, reason } = body;

    // Validate required fields
    if (!reference || !customerEmail || !customerFirstName || refundAmount === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: reference, customerEmail, customerFirstName, refundAmount' },
        { status: 400 }
      );
    }

    const result = await sendRefundEmail({
      reference,
      customerEmail,
      customerFirstName,
      refundAmount: Number(refundAmount),
      reason,
    });

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Refund email sent', data: result.data });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending refund email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
