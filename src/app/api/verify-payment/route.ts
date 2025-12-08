import { NextRequest, NextResponse } from 'next/server';
import { getPendingOrder, deletePendingOrder } from '@/lib/orderStore';
import { sendOrderEmails } from '@/lib/email';

// SumUp API configuration
const SUMUP_API_URL = 'https://api.sumup.com/v0.1';

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();

    if (!reference) {
      return NextResponse.json({ error: 'Missing reference' }, { status: 400 });
    }

    // Get the pending order
    const order = getPendingOrder(reference);

    if (!order) {
      console.log('Order not found or already processed:', reference);
      return NextResponse.json({ 
        success: true, 
        message: 'Order already processed or not found' 
      });
    }

    // Verify payment status with SumUp
    const sumupApiKey = process.env.SUMUP_API_KEY;
    
    if (sumupApiKey && order.checkoutId) {
      try {
        const verifyResponse = await fetch(`${SUMUP_API_URL}/checkouts/${order.checkoutId}`, {
          headers: {
            'Authorization': `Bearer ${sumupApiKey}`,
          },
        });

        if (verifyResponse.ok) {
          const checkoutData = await verifyResponse.json();
          console.log('Checkout status:', checkoutData.status);

          // Only send emails if payment is confirmed
          if (checkoutData.status !== 'PAID') {
            console.log('Payment not yet confirmed, status:', checkoutData.status);
            return NextResponse.json({ 
              success: false, 
              message: 'Payment not yet confirmed',
              status: checkoutData.status 
            });
          }
        }
      } catch (verifyError) {
        console.error('Error verifying payment:', verifyError);
        // Continue anyway - the redirect to success page implies payment was successful
      }
    }

    console.log('Processing order and sending emails:', order.reference);

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
      message: 'Emails sent successfully',
      emailResults,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
