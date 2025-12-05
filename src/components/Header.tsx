'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/store/cart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPublicationsOpen, setIsPublicationsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-12 h-16 flex flex-col justify-end">
                  <div className="w-2 h-12 bg-coral transform -rotate-12 origin-bottom"></div>
                </div>
                <div className="absolute top-0 left-2 w-3 h-3 bg-primary rounded-full"></div>
                <div className="absolute top-2 left-4 w-2 h-2 bg-coral rounded-full"></div>
              </div>
              <div className="ml-2">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Éditions</div>
                <div className="text-xl font-bold text-gray-800 leading-tight">CERISES</div>
                <div className="text-xl font-bold text-gray-800 leading-tight">D'HIVER</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/marie-capucin" className="text-gray-700 hover:text-primary transition-colors">
              Marie Capucin
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsPublicationsOpen(!isPublicationsOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors"
              >
                Nos publications
                <ChevronDown className="w-4 h-4" />
              </button>
              {isPublicationsOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 min-w-48">
                  <Link
                    href="/publications"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary"
                    onClick={() => setIsPublicationsOpen(false)}
                  >
                    Toutes les publications
                  </Link>
                  <Link
                    href="/publications/je-te-hais"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary"
                    onClick={() => setIsPublicationsOpen(false)}
                  >
                    Je te hais
                  </Link>
                  <Link
                    href="/publications/le-costume-de-soi"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary"
                    onClick={() => setIsPublicationsOpen(false)}
                  >
                    Le Costume de Soi
                  </Link>
                  <Link
                    href="/publications/tu-ne-seras-pas"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary"
                    onClick={() => setIsPublicationsOpen(false)}
                  >
                    Tu ne seras pas
                  </Link>
                </div>
              )}
            </div>
            <Link href="/panier" className="relative text-gray-700 hover:text-primary transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/marie-capucin"
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Marie Capucin
              </Link>
              <Link
                href="/publications"
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Nos publications
              </Link>
              <Link
                href="/panier"
                className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                Panier {mounted && totalItems > 0 && `(${totalItems})`}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
