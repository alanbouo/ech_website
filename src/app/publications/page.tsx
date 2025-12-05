'use client';

import { useState } from 'react';
import { books } from '@/data/books';
import BookCard from '@/components/BookCard';
import Breadcrumb from '@/components/Breadcrumb';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'title';

export default function PublicationsPage() {
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const sortedBooks = [...books].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Nos publications' },
        ]}
      />

      <h1 className="text-4xl font-bold text-gray-800 mb-4">Nos publications</h1>
      <p className="text-gray-600 mb-8">{books.length} résultats affichés</p>

      <div className="mb-8">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full md:w-auto border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:border-primary"
        >
          <option value="default">Tri par défaut</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="title">Titre</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
