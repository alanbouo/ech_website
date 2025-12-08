import { NextRequest, NextResponse } from 'next/server';
import { storePendingOrder } from '@/lib/orderStore';

// SumUp API configuration
const SUMUP_API_URL = 'https://api.sumup.com/v0.1';

interface CheckoutItem {
  name: string;
  quantity: number;
  price: number;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface CheckoutRequest {
  items: CheckoutItem[];
  customerInfo: CustomerInfo;
  totalAmount: number;
  shippingCost: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();
    const { items, customerInfo, totalAmount, shippingCost } = body;

    // Get SumUp API key from environment variables
    const sumupApiKey = process.env.SUMUP_API_KEY;
    const sumupMerchantCode = process.env.SUMUP_MERCHANT_CODE;

    if (!sumupApiKey || !sumupMerchantCode) {
      console.error('SumUp API credentials not configured');
      return NextResponse.json(
        { error: 'Payment configuration error' },
        { status: 500 }
      );
    }

    // Generate a unique checkout reference
    const checkoutReference = `ECH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create description from items
    const description = items
      .map(item => `${item.name} (x${item.quantity})`)
      .join(', ');

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Create SumUp checkout for hosted payment page
    const sumupResponse = await fetch(`${SUMUP_API_URL}/checkouts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sumupApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checkout_reference: checkoutReference,
        amount: totalAmount,
        currency: 'EUR',
        merchant_code: sumupMerchantCode,
        description: description.substring(0, 140),
        redirect_url: `${baseUrl}/checkout/success?reference=${checkoutReference}`,
        // Enable hosted checkout to get the hosted_checkout_url in response
        hosted_checkout: { enabled: true },
      }),
    });

    if (!sumupResponse.ok) {
      const errorText = await sumupResponse.text();
      console.error('SumUp API error:', sumupResponse.status, errorText);
      return NextResponse.json(
        { error: 'Failed to create checkout', details: errorText },
        { status: 500 }
      );
    }

    const sumupData = await sumupResponse.json();
    console.log('SumUp checkout created:', sumupData);

    // Use the hosted_checkout_url from SumUp response
    if (!sumupData.hosted_checkout_url) {
      console.error('No hosted_checkout_url in response:', sumupData);
      return NextResponse.json(
        { error: 'Hosted checkout not available' },
        { status: 500 }
      );
    }

    // Store the pending order for later email sending
    storePendingOrder({
      reference: checkoutReference,
      items,
      customerInfo,
      totalAmount,
      shippingCost,
      createdAt: new Date(),
      checkoutId: sumupData.id,
    });

    return NextResponse.json({
      checkoutUrl: sumupData.hosted_checkout_url,
      checkoutId: sumupData.id,
      reference: checkoutReference,
    });
  } catch (error) {
    console.error('Checkout creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
