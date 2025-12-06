import Breadcrumb from '@/components/Breadcrumb';

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Mentions légales' },
        ]}
      />

      <h1 className="text-4xl font-bold text-gray-800 mb-8">Mentions légales</h1>

      <div className="prose prose-gray max-w-none">
        <section className="mb-8">
          <p className="font-semibold">Éditions Cerises d'Hiver</p>
          <p>EI Aländji BOUORAKIMA</p>
          <p>12 rue de la part-dieu</p>
          <p>69003 Lyon</p>
          <p>email: contact(arobase)cerises-hiver.com</p>
        </section>

        <section className="mb-8">
          <p>Identifiant SIRET : 98313517900015</p>
          <p>Code APE : 6202A</p>
        </section>

        <section className="mb-8">
          <p>Responsable de la publication : Aländji Bouorakima</p>
        </section>

        <section className="mb-8">
          <p>TVA non applicable – article 293 B du CGI</p>
        </section>

        <section className="mb-8">
          <p>Hébergement du site : Hetzner.com</p>
        </section>

        <section className="mb-8">
          <p>
            Ce site est soumis à la législation française et internationale sur les droits d'auteur. Tous les droits de reproduction, sur quelque support que ce soit, sont réservés. La reproduction et l'utilisation du contenu de tout ou partie de ce site autres qu'individuelles et privées sont interdites, sauf autorisation expresse et préalable de l'éditeur.
          </p>
        </section>
      </div>
    </div>
  );
}
