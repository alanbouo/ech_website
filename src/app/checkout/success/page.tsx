'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { useCart } from '@/store/cart';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart after successful payment
    clearCart();
  }, [clearCart]);

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
