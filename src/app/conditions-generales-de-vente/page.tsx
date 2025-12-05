import Breadcrumb from '@/components/Breadcrumb';

export default function CGVPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Conditions Générales de Vente' },
        ]}
      />

      <h1 className="text-4xl font-bold text-gray-800 mb-8">Conditions Générales de Vente</h1>

      <div className="prose prose-gray max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article 1 - Objet</h2>
          <p>
            Les présentes conditions générales de vente régissent les ventes de livres 
            effectuées par les Éditions Cerises d'Hiver via le site internet.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article 2 - Prix</h2>
          <p>
            Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA non applicable 
            conformément à l'article 293 B du CGI). Les frais de livraison sont indiqués avant la 
            validation de la commande.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article 3 - Commande</h2>
          <p>
            Le client passe commande sur le site internet. La vente est conclue dès la confirmation 
            du paiement. Un email de confirmation est envoyé au client.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article 4 - Paiement</h2>
          <p>
            Le paiement s'effectue en ligne par carte bancaire via la plateforme sécurisée SumUp. 
            Le paiement est débité au moment de la commande.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article 5 - Livraison</h2>
          <p>
            Les livraisons sont effectuées en France métropolitaine et dans certains pays européens. 
            Les délais de livraison sont donnés à titre indicatif. Les Éditions Cerises d'Hiver 
            ne pourront être tenues responsables des retards de livraison dus au transporteur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article 6 - Droit de rétractation</h2>
          <p>
            Conformément à la législation en vigueur, le client dispose d'un délai de 14 jours 
            à compter de la réception de sa commande pour exercer son droit de rétractation, 
            sans avoir à justifier de motifs ni à payer de pénalités.
          </p>
          <p className="mt-4">
            Les frais de retour sont à la charge du client. Les produits doivent être retournés 
            dans leur état d'origine et complets.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article 7 - Protection des données</h2>
          <p>
            Les informations collectées lors de la commande sont nécessaires au traitement 
            de celle-ci. Elles sont conservées de manière sécurisée et ne sont pas transmises 
            à des tiers, sauf pour les besoins de la livraison.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article 8 - Contact</h2>
          <p>
            Pour toute question, vous pouvez nous contacter par email à l'adresse : 
            contact(arobase)cerises-hiver.com
          </p>
        </section>
      </div>
    </div>
  );
}
