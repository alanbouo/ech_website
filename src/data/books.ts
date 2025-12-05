import { Book } from '@/types';

export const books: Book[] = [
  {
    id: '1',
    slug: 'je-te-hais',
    title: 'Je te hais',
    price: 19.00,
    description: 'Un enterrement et de la paperasse. Voilà ce qu\'Iris pensait affronter.',
    longDescription: `Un enterrement et de la paperasse.

Voilà ce qu'Iris pensait affronter.

Elle n'attendait rien de ce père qu'elle avait déjà rayé de sa vie.

Pas de peine, pas de surprise.

C'était sans compter sur le passé qui n'avait pas fini de parler,

sans compter sur la présence d'une femme mystérieuse au fond de l'église, ni sur les silences pesants d'une voisine acariâtre...

Si Iris avait su ce qu'elle allait découvrir, aurait-elle pris le risque de revenir et de faire face aux révélations qui bouleversent ?

**Haïr n'est-il pas parfois une façon douloureuse d'aimer encore ?**`,
    author: 'Marie Capucin',
    authorSlug: 'marie-capucin',
    category: 'Marie Capucin',
    tags: ['roman', 'famille', 'secrets'],
    inStock: true,
    image: '/images/je-te-hais.jpg',
  },
  {
    id: '2',
    slug: 'le-costume-de-soi',
    title: 'Le Costume de Soi',
    price: 19.00,
    description: 'Le Costume de Soi est le premier roman de Marie Capucin. Il traite de la difficile transmission culturelle d\'un père à son fils et de leurs efforts pour se rapprocher.',
    longDescription: `**Ai-je échoué à transmettre ma culture ?**

C'est la question que se pose Honoré, un Congolais installé en France depuis quatre décennies, quand son fils Justin décide de fonder à son tour une famille. Cet événement, au lieu de les rapprocher, creuse le fossé entre leurs générations.

Espérant rattraper le temps perdu, les deux hommes entreprennent alors un voyage qui va rapidement les dépasser.

Dans un contexte qui lui échappe et le bouleverse, Justin redécouvre un père qu'il pensait connaître tandis qu'Honoré se voit contraint d'assumer ses choix.`,
    authorNote: `J'ai la joie de vous confier l'aventure de l'insaisissable Honoré, un homme simultanément tourmenté par le passé et l'avenir. Ce roman, je l'espère, vous mènera au Congo, au cœur des croyances et des coutumes du peuple Mbéré.

Je vous souhaite une bonne lecture !

Marie Capucin`,
    author: 'Marie Capucin',
    authorSlug: 'marie-capucin',
    category: 'Marie Capucin',
    tags: ['aventure', 'roman', 'culture', 'transmission'],
    inStock: true,
    image: '/images/le-costume-de-soi.jpg',
  },
  {
    id: '3',
    slug: 'tu-ne-seras-pas',
    title: 'Tu ne seras pas',
    price: 19.00,
    description: 'Tu ne seras pas est le second roman de Marie Capucin. Il représente une immersion intime dans la transformation d\'une femme confrontée à ses vérités.',
    longDescription: `Alicia semble tout avoir : une famille aimante, une carrière prometteuse et des projets arrêtés. Peut-elle obtenir plus ? Peut-elle rêver plus grand ? Que dit ce mal de tête qui la terrasse sans préavis et lui intime l'ordre de ralentir ?

Au travers du défi inattendu de la maladie, la façade lisse et brillante de son quotidien huilé se fissure et laisse entrevoir les ombres du passé et les peurs les plus vives.

Emportée par un maelström d'émotions, de découvertes déroutantes et de décisions cruciales, Alicia, pourtant mue par des forces insoupçonnées, s'interroge et peu à peu se perd dans un mensonge emprisonnant.

Mentir est-il une issue acceptable pour protéger ceux que nous aimons ? Peut-on échapper à ce que la vie semble avoir prévu pour nous ?

« Tu ne seras pas » est une immersion intime dans la transformation d'une femme ordinaire, un voyage introspectif qui sonde le lecteur sur sa propre quête d'authenticité. Alicia incarne les espoirs et les doutes qui, sans cesse, nous habitent. Qui seriez-vous si le monde dont vous pensiez maîtriser les règles s'effondrait ?

Plongez dans cette exploration fascinante du soi, des limites que nous nous imposons et du chemin que nous empruntons pour cerner notre véritable essence.`,
    author: 'Marie Capucin',
    authorSlug: 'marie-capucin',
    category: 'Marie Capucin',
    tags: ['introspection', 'mensonge', 'roman', 'secrets'],
    inStock: true,
    image: '/images/tu-ne-seras-pas.jpg',
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find(book => book.slug === slug);
}

export function getBooksByAuthor(authorSlug: string): Book[] {
  return books.filter(book => book.authorSlug === authorSlug);
}
