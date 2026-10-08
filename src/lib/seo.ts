import type { Metadata } from 'next';

export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://cerises-hiver.com').replace(/\/$/, '');
export const SITE_NAME = "Éditions Cerises d'Hiver";
// Route générée par app/opengraph-image.tsx
const DEFAULT_OG_IMAGE = '/opengraph-image';

// Métadonnées d'une page : titre, description, canonical (relatif à metadataBase),
// Open Graph et Twitter. `image` : chemin ou URL absolue ; sans lui, l'image par défaut
// (app/opengraph-image.tsx) est utilisée. Elle est posée explicitement : l'héritage automatique
// du fichier ne s'applique pas aux pages qui définissent leur propre openGraph.
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
      images: [{ url: image ?? DEFAULT_OG_IMAGE }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image ?? DEFAULT_OG_IMAGE],
    },
  };
}

export const noindex: Metadata = { robots: { index: false, follow: false } };
