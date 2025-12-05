'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/store/cart';
import Breadcrumb from '@/components/Breadcrumb';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Panier' },
          ]}
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Panier</h1>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-6">Votre panier est vide.</p>
          <Link
            href="/publications"
            className="inline-block bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors"
          >
            Découvrir nos publications
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Panier' },
        ]}
      />

      <h1 className="text-4xl font-bold text-gray-800 mb-8">Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="border-b pb-4 mb-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
              <div className="col-span-6">Produit</div>
              <div className="col-span-2 text-center">Prix</div>
              <div className="col-span-2 text-center">Quantité</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
          </div>

          {items.map((item) => (
            <div key={item.book.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b">
              <div className="col-span-6 flex items-center gap-4">
                <div className="w-16 h-20 relative bg-gray-100 flex-shrink-0">
                  <Image
                    src={item.book.image}
                    alt={item.book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <Link
                    href={`/publications/${item.book.slug}`}
                    className="font-medium text-gray-800 hover:text-primary"
                  >
                    {item.book.title}
                  </Link>
                  <button
                    onClick={() => removeItem(item.book.id)}
                    className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </button>
                </div>
              </div>
              <div className="col-span-2 text-center text-gray-600">
                €{item.book.price.toFixed(2)}
              </div>
              <div className="col-span-2 flex items-center justify-center gap-2">
                <button
                  onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                  className="p-1 border rounded hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                  className="p-1 border rounded hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="col-span-2 text-right font-medium">
                €{(item.book.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="mt-4">
            <button
              onClick={clearCart}
              className="text-sm text-gray-500 hover:text-red-500"
            >
              Vider le panier
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Récapitulatif</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Livraison</span>
                <span>Calculée à l'étape suivante</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">€{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-primary text-white text-center py-3 font-medium hover:bg-primary-dark transition-colors"
            >
              Procéder au paiement
            </Link>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Paiement sécurisé via SumUp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
