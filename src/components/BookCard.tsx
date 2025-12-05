'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types';
import { useCart } from '@/store/cart';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(book);
  };

  return (
    <div className="group">
      <Link href={`/publications/${book.slug}`} className="block">
        <div className="aspect-[3/4] relative mb-4 bg-gray-100 overflow-hidden">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-primary-dark transition-colors">
          {book.title}
        </h3>
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-primary font-medium">€{book.price.toFixed(2)}</span>
        <button
          onClick={handleAddToCart}
          className="text-primary hover:text-primary-dark transition-colors text-sm"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
