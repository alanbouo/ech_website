import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-600">
            Éditions Cerises d'Hiver
          </div>
          
          <nav className="flex gap-6">
            <Link
              href="/conditions-generales-de-vente"
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Conditions Générales de Vente
            </Link>
            <Link
              href="/mentions-legales"
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Mentions légales
            </Link>
          </nav>
          
          <div className="text-gray-500 text-sm">
            ©{currentYear} Éditions Cerises d'Hiver
          </div>
        </div>
      </div>
    </footer>
  );
}
