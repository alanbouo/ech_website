import type { Metadata } from 'next';
import { noindex } from '@/lib/seo';

// Étapes d'achat : sans intérêt pour la recherche.
export const metadata: Metadata = { ...noindex };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
