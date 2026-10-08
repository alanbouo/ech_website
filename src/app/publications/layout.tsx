import type { Metadata } from 'next';
import { books } from '@/data/books';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  path: '/publications',
  title: "Nos publications — Éditions Cerises d'Hiver",
  description: `Les romans publiés aux Éditions Cerises d'Hiver : ${books.map((b) => b.title).join(', ')}.`,
});

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
