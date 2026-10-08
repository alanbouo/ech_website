import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  path: '/mentions-legales',
  title: "Mentions légales — Éditions Cerises d'Hiver",
  description: "Mentions légales des Éditions Cerises d'Hiver : informations légales et hébergement du site.",
});

export default function MentionsLegalesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
