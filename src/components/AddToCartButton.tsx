'use client';

import { useState } from 'react';
import { Book } from '@/types';
import { useCart } from '@/store/cart';

interface AddToCartButtonProps {
  book: Book;
}

export default function AddToCartButton({ book }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(book, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full border border-gray-300 px-4 py-2 text-center focus:outline-none focus:border-primary"
        />
      </div>
      <button
        onClick={handleAddToCart}
        disabled={!book.inStock}
        className={`w-full py-3 px-6 border-2 font-medium transition-colors ${
          added
            ? 'bg-green-500 border-green-500 text-white'
            : book.inStock
            ? 'border-primary text-primary hover:bg-primary hover:text-white'
            : 'border-gray-300 text-gray-400 cursor-not-allowed'
        }`}
      >
        {added ? 'Ajouté !' : 'Ajouter au panier'}
      </button>
    </div>
  );
}
