import { NextRequest, NextResponse } from 'next/server';
import { sendOrderEmails } from '@/lib/email';

// Test endpoint - protected by secret key
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  // Require secret key (set TEST_SECRET env var, or use default for testing)
  const testSecret = process.env.TEST_SECRET || 'test-email-secret-2024';
  
  console.log('Test email endpoint called');
  console.log('Received secret:', secret);
  console.log('Expected secret:', testSecret);
  console.log('Match?', secret === testSecret);
  
  if (secret !== testSecret) {
    return NextResponse.json({ error: 'Invalid or missing secret', received: secret, expected: testSecret }, { status: 403 });
  }

  // Mock order data
  const testOrder = {
    reference: `ECH-TEST-${Date.now()}`,
    items: [
      { name: 'Le Petit Prince', quantity: 2, price: 12.99 },
      { name: 'Les Misérables', quantity: 1, price: 18.50 },
    ],
    customerInfo: {
      firstName: 'Jean',
      lastName: 'Dupont',
      email: process.env.TEST_EMAIL || 'test@example.com', // Change this to your email
      phone: '06 12 34 56 78',
      address: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
    },
    totalAmount: 47.48, // 12.99*2 + 18.50 + 3 shipping
    shippingCost: 3,
  };

  console.log('Sending test emails...');
  
  const results = await sendOrderEmails(testOrder);

  return NextResponse.json({
    message: 'Test emails sent',
    testOrder,
    results,
  });
}
