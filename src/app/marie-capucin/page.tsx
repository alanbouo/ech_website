import type { Metadata } from 'next';
import { getBooksByAuthor } from '@/data/books';
import { pageMetadata, SITE_NAME, SITE_URL } from '@/lib/seo';
import BookCard from '@/components/BookCard';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = pageMetadata({
  path: '/marie-capucin',
  title: "Marie Capucin, auteure — Éditions Cerises d'Hiver",
  description:
    "Marie Capucin est une auteure française dont les romans explorent la famille, l'identité et les secrets. Ses livres sont publiés aux Éditions Cerises d'Hiver.",
});

export default function MarieCapucinPage() {
  const books = getBooksByAuthor('marie-capucin');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Marie Capucin',
    url: `${SITE_URL}/marie-capucin`,
    nationality: 'Française',
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Marie Capucin' },
        ]}
      />

      <h1 className="text-4xl font-bold text-gray-800 mb-8">Marie Capucin</h1>

      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-gray-700 leading-relaxed">
          Marie Capucin est une auteure française dont les romans explorent les thèmes de la famille, 
          de l'identité et des secrets qui façonnent nos vies. Son écriture sensible et introspective 
          invite le lecteur à un voyage au cœur des émotions humaines.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Ses œuvres, publiées aux Éditions Cerises d'Hiver, ont touché de nombreux lecteurs par leur 
          authenticité et leur profondeur psychologique.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Publications de Marie Capucin
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
