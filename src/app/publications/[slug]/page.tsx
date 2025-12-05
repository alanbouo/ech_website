import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { books, getBookBySlug } from '@/data/books';
import Breadcrumb from '@/components/Breadcrumb';
import AddToCartButton from '@/components/AddToCartButton';

interface BookPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return books.map((book) => ({
    slug: book.slug,
  }));
}

export default function BookPage({ params }: BookPageProps) {
  const book = getBookBySlug(params.slug);

  if (!book) {
    notFound();
  }

  // Parse markdown-style bold text
  const formatText = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      // Handle bold text
      const parts = paragraph.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={index} className="mb-4">
          {parts.map((part, i) =>
            i % 2 === 1 ? (
              <strong key={i} className="font-semibold">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: book.category, href: `/${book.authorSlug}` },
          { label: book.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Book Image */}
        <div className="aspect-[3/4] relative bg-gray-100">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Book Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{book.title}</h1>
          <p className="text-2xl text-primary font-medium mb-6">€{book.price.toFixed(2)}</p>

          <div className="prose prose-gray mb-6">
            {formatText(book.longDescription)}
          </div>

          <p className="text-green-600 font-medium mb-6">
            {book.inStock ? 'En stock' : 'Rupture de stock'}
          </p>

          <div className="max-w-xs mb-8">
            <AddToCartButton book={book} />
          </div>

          <div className="text-sm text-gray-600 mb-4">
            <span>Catégorie : </span>
            <Link href={`/${book.authorSlug}`} className="text-primary hover:text-primary-dark">
              {book.category}
            </Link>
            {book.tags.length > 0 && (
              <>
                <span className="ml-2">Étiquettes : </span>
                {book.tags.map((tag, index) => (
                  <span key={tag}>
                    <Link href={`/tag/${tag}`} className="text-primary hover:text-primary-dark">
                      {tag}
                    </Link>
                    {index < book.tags.length - 1 && ', '}
                  </span>
                ))}
              </>
            )}
          </div>

          {book.authorNote && (
            <div className="border-t pt-8 mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Mot de {book.author}
              </h3>
              <div className="prose prose-gray italic">
                {formatText(book.authorNote)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
