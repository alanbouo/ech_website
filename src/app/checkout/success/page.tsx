'use client';

import { useEffect, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { useCart } from '@/store/cart';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const { clearCart } = useCart();
  const emailSentRef = useRef(false);

  useEffect(() => {
    // Clear the cart after successful payment
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    // Send confirmation emails when the success page loads
    async function sendConfirmationEmails() {
      if (!reference || emailSentRef.current) return;
      
      emailSentRef.current = true;
      
      try {
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reference }),
        });
        
        const data = await response.json();
        console.log('Email confirmation result:', data);
      } catch (error) {
        console.error('Error sending confirmation emails:', error);
      }
    }

    sendConfirmationEmails();
  }, [reference]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Merci pour votre commande !
      </h1>

      <p className="text-gray-600 mb-2">
        Votre paiement a été traité avec succès.
      </p>

      {reference && (
        <p className="text-gray-600 mb-8">
          Référence de commande : <strong>{reference}</strong>
        </p>
      )}

      <p className="text-gray-600 mb-8">
        Vous recevrez un email de confirmation avec les détails de votre commande et les informations de livraison.
      </p>

      <div className="space-x-4">
        <Link
          href="/"
          className="inline-block bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors"
        >
          Retour à l'accueil
        </Link>
        <Link
          href="/publications"
          className="inline-block border-2 border-primary text-primary px-6 py-3 font-medium hover:bg-primary hover:text-white transition-colors"
        >
          Continuer vos achats
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
