import { NextRequest, NextResponse } from 'next/server';
import { getPendingOrderByCheckoutId, deletePendingOrder } from '@/lib/orderStore';
import { sendOrderEmails } from '@/lib/email';

// SumUp webhook event types
interface SumUpWebhookPayload {
  id: string;
  event_type: string;
  timestamp: string;
  payload: {
    checkout_reference?: string;
    id?: string;
    status?: string;
    amount?: number;
    currency?: string;
    transaction_id?: string;
    transaction_code?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: SumUpWebhookPayload = await request.json();
    console.log('SumUp webhook received:', JSON.stringify(body, null, 2));

    // Handle checkout.completed event
    if (body.event_type === 'checkout.completed' || body.payload?.status === 'PAID') {
      const checkoutId = body.payload?.id;
      const checkoutReference = body.payload?.checkout_reference;

      if (!checkoutId && !checkoutReference) {
        console.error('No checkout ID or reference in webhook payload');
        return NextResponse.json({ error: 'Missing checkout identifier' }, { status: 400 });
      }

      // Find the pending order
      const order = checkoutId ? getPendingOrderByCheckoutId(checkoutId) : undefined;

      if (!order) {
        console.log('Order not found in pending orders, may have already been processed');
        return NextResponse.json({ message: 'Order already processed or not found' });
      }

      console.log('Processing order:', order.reference);

      // Send confirmation emails
      const emailResults = await sendOrderEmails({
        reference: order.reference,
        items: order.items,
        customerInfo: order.customerInfo,
        totalAmount: order.totalAmount,
        shippingCost: order.shippingCost,
      });

      console.log('Email results:', emailResults);

      // Remove from pending orders
      deletePendingOrder(order.reference);

      return NextResponse.json({
        success: true,
        message: 'Order processed and emails sent',
        emailResults,
      });
    }

    // Handle other event types
    console.log('Unhandled webhook event type:', body.event_type);
    return NextResponse.json({ message: 'Event received' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Also handle GET for webhook verification (some providers require this)
export async function GET() {
  return NextResponse.json({ status: 'Webhook endpoint active' });
}
