'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/cart';
import Breadcrumb from '@/components/Breadcrumb';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
  });

  const totalPrice = getTotalPrice();
  
  // Calcul des frais de livraison
  const calculateShippingCost = () => {
    if (customerInfo.country === 'France') {
      return totalPrice >= 35 ? 0 : 3;
    }
    return 10;
  };
  
  const shippingCost = calculateShippingCost();
  const grandTotal = totalPrice + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Create checkout with SumUp API
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            name: item.book.title,
            quantity: item.quantity,
            price: item.book.price,
          })),
          customerInfo,
          totalAmount: grandTotal,
          shippingCost,
        }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        // Redirect to SumUp hosted checkout page
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.error || 'Failed to create checkout');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    router.push('/panier');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Panier', href: '/panier' },
          { label: 'Paiement' },
        ]}
      />

      <h1 className="text-4xl font-bold text-gray-800 mb-8">Paiement</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Information */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Informations de livraison</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={customerInfo.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={customerInfo.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={customerInfo.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pays *
                  </label>
                  <select
                    name="country"
                    value={customerInfo.country}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary bg-white"
                  >
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Votre commande</h2>
              
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.book.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.book.title} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      €{(item.book.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span>{shippingCost === 0 ? 'Gratuit' : `€${shippingCost.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="border-t pt-4 mt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">€{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white text-center py-3 font-medium rounded hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Redirection vers SumUp...
                  </span>
                ) : (
                  'Payer avec SumUp'
                )}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Vous serez redirigé vers la plateforme sécurisée SumUp pour finaliser votre paiement par carte, Apple Pay ou Google Pay.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
