import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Bienvenue aux Éditions Cerises d'Hiver
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Maison d'édition indépendante dédiée à la littérature contemporaine et aux récits qui touchent l'âme.
        </p>
        <Link
          href="/publications"
          className="inline-block bg-primary text-white px-8 py-3 font-medium hover:bg-primary-dark transition-colors"
        >
          Découvrir nos publications
        </Link>
      </section>

      {/* Author Section */}
      <section className="mt-20 bg-peach rounded-lg p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Marie Capucin
          </h2>
          <p className="text-gray-700 mb-6">
            Découvrez l'univers de Marie Capucin, auteure de romans introspectifs qui explorent les relations familiales, les secrets et la quête d'identité.
          </p>
          <Link
            href="/marie-capucin"
            className="inline-block border-2 border-primary text-primary px-6 py-2 font-medium hover:bg-primary hover:text-white transition-colors"
          >
            En savoir plus
          </Link>
        </div>
      </section>
    </div>
  );
}
