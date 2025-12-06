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
          <p>
            Les présentes conditions de vente sont conclues :
          </p>
          <p className="mt-4">
            d'une part par Éditions Cerises d'Hiver, entreprise individuelle dont le siège social est situé 12 allée de la Part-Dieu, 69003 Lyon immatriculée sous le numéro 983 135 179 00015, ci-après dénommée « l'éditeur », et d'autre part, par toute personne physique ou morale souhaitant procéder à un achat via le site Internet de l'éditeur dénommée ci-après « l'acheteur ».
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Objet</h2>
          <p>
            Les présentes conditions de vente visent à définir les relations contractuelles entre l'éditeur et l'acheteur et les conditions applicables à tout achat effectué par le biais du site marchand de l'éditeur, que l'acheteur soit professionnel ou consommateur.
          </p>
          <p className="mt-4">
            L'acquisition d'un bien ou d'un service à travers le présent site implique une acceptation sans réserve par l'acheteur des présentes conditions de vente.
          </p>
          <p className="mt-4">
            Ces conditions de vente prévaudront sur toutes autres conditions générales ou particulières non expressément agréées par l'éditeur.
          </p>
          <p className="mt-4">
            L'éditeur se réserve de pouvoir modifier ses conditions de vente à tout moment. Dans ce cas, les conditions applicables seront celles en vigueur à la date de la commande par l'acheteur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Caractéristiques des biens et services proposés</h2>
          <p>
            Les produits et services offerts sont ceux qui figurent dans le catalogue publié dans le site de l'éditeur.
          </p>
          <p className="mt-4">
            Ces produits et services sont offerts dans la limite des stocks disponibles.
          </p>
          <p className="mt-4">
            Chaque produit est accompagné d'un descriptif.
          </p>
          <p className="mt-4">
            Les photographies du catalogue sont les plus fidèles possibles mais ne peuvent assurer une similitude parfaite avec le produit offert, notamment en ce qui concerne les couleurs.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Tarifs</h2>
          <p>
            Les prix figurant dans le catalogue sont des prix TTC en euro tenant compte de la TVA applicable au jour de la commande; tout changement du taux pourra être répercuté sur le prix des produits ou des services.
          </p>
          <p className="mt-4">
            L'éditeur se réserve de modifier ses prix à tout moment, étant toutefois entendu que le prix figurant au catalogue le jour de la commande sera le seul applicable à l'acheteur.
          </p>
          <p className="mt-4">
            Les prix indiqués ne comprennent pas les frais de traitement de commandes, de transport et de livraison pour autant qu'elles aient lieu dans les zones géographiques prévues ci-après.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Zone de vente</h2>
          <p>
            La vente en ligne des produits et services présentés dans le site est réservée aux acheteurs qui résident en France et dans les pays étrangers figurant dans la liste déroulante.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Commandes</h2>
          <p>
            Le processus d'achat se fait de la manière suivante. L'acheteur choisit le(s) livre(s) souhaités, le(s) ajoute au panier. Une fois le panier terminé, le client peut procéder à sa modification ou au paiement.
          </p>
          <p className="mt-4">
            La confirmation de la commande entraîne acceptation des présentes conditions de vente, la reconnaissance d'en avoir parfaite connaissance et la renonciation à se prévaloir de ses propres conditions d'achat ou d'autres conditions.
          </p>
          <p className="mt-4">
            L'ensemble des données fournies et la confirmation enregistrée vaudront preuve de la transaction. La confirmation vaudra signature et acceptation des opérations effectuées.
          </p>
          <p className="mt-4">
            L'éditeur communiquera par courrier électronique la confirmation de la commande enregistrée.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Rétractation</h2>
          <p>
            Les acheteurs, personnes physiques non professionnelles, bénéficient d'un délai de rétractation de sept jours à compter de la livraison de leur commande pour faire retour du produit au vendeur pour échange ou remboursement sans pénalité, à l'exception des frais de retour. Ce délai de rétractation concerne uniquement les marchandises matérielles (notamment les livres imprimés sur papier), mais ne concerne pas les marchandises immatérielles (notamment les livres électroniques, aussi appelés e-books) du fait que le retour du produit à l'éditeur n'empêche nullement l'acheteur de faire une copie du fichier et la conserver.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Modalités de paiement</h2>
          <p>
            Le prix est exigible à la commande.
          </p>
          <p className="mt-4">
            Les paiements seront effectués par l'un des moyens suivants :
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>carte bancaire; ils seront alors réalisés par le biais du système sécurisé de la société Stripe;</li>
            <li>virement bancaire</li>
            <li>chèque bancaire à l'ordre des Editions Cerises d'Hiver</li>
          </ul>
          <p className="mt-4">
            À la demande de l'acheteur, il lui sera adressé une facture sur papier faisant ressortir la TVA.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Livraisons</h2>
          <p>
            Les livraisons sont faites à l'adresse indiquée dans le bon de commande qui ne peut être que dans la zone géographique convenue et aux frais convenus.
          </p>
          <p className="mt-4">
            Les risques sont à la charge de l'acheteur à compter du moment où les produits ont quitté les locaux de l'éditeur. En cas de dommage pendant le transport, la protestation motivée doit être formulée auprès du transporteur dans un délai de trois jours à compter de la livraison.
          </p>
          <p className="mt-4">
            Les délais de livraison sont généralement de quatre jours ouvrés : Ils ne sont donnés qu'à titre indicatif; si ceux-ci dépassent trente jours à compter de la commande, le contrat de vente pourra être résilié et l'acheteur remboursé.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Garantie</h2>
          <p>
            Tous les produits fournis par le vendeur bénéficient de la garantie légale prévue par les articles 1641 et suivants du Code civil.
          </p>
          <p className="mt-4">
            En cas de non conformité d'un produit vendu, il pourra être retourné au vendeur qui le reprendra, l'échangera ou le remboursera.
          </p>
          <p className="mt-4">
            Toutes les réclamations, demandes d'échange ou de remboursement doivent s'effectuer par voie postale à l'adresse suivante : Éditions Cerises d'Hiver, 13 allée des marettes, 38300 Bourgoin Jallieu dans le délai de trente jours de la livraison.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Responsabilité</h2>
          <p>
            L'éditeur, dans le processus de vente en ligne, n'est tenu que par une obligation de moyens; sa responsabilité ne pourra être engagée pour un dommage résultant de l'utilisation du réseau Internet tel que perte de données, intrusion, virus, rupture du service, ou autres problèmes involontaires.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Propriété intellectuelle</h2>
          <p>
            Tous les éléments du site de l'éditeur sont et restent la propriété intellectuelle et exclusive de l'éditeur.
          </p>
          <p className="mt-4">
            Personne n'est autorisé à reproduire, exploiter, rediffuser, ou utiliser à quelque titre que ce soit, même partiellement, des éléments du site qu'ils soient logiciels, visuels ou sonores.
          </p>
          <p className="mt-4">
            Tout lien simple ou par hypertexte est strictement interdit sans un accord écrit exprès de l'éditeur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Données à caractère personnel</h2>
          <p>
            Conformément à la loi relative à l'informatique, aux fichiers et aux libertés du 6 janvier 1978, les informations à caractère nominatif relatives aux acheteurs pourront faire l'objet d'un traitement automatisé.
          </p>
          <p className="mt-4">
            L'éditeur se réserve le droit de collecter des informations sur les acheteurs y compris en utilisant des cookies.
          </p>
          <p className="mt-4">
            Les acheteurs peuvent s'opposer à la divulgation de leurs coordonnées en le signalant à l'éditeur. De même, les utilisateurs disposent d'un droit d'accès et de rectification des données les concernant, conformément à la loi du 6 janvier 1978.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Archivage</h2>
          <p>
            L'éditeur archivera les bons de commandes et les factures sur un support fiable et durable constituant une copie fidèle conformément aux dispositions de l'article 1348 du Code civil.
          </p>
          <p className="mt-4">
            Les registres informatisés de l'éditeur seront considérés par les parties comme preuve des communications, commandes, paiements et transactions intervenus entre les parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">14. Règlement des litiges</h2>
          <p>
            Les présentes conditions de vente en ligne sont soumises à la loi française.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">15. Librairies</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">15.1 Commande</h3>
          <p>
            L'éditeur accorde une remise de 25% sur le prix public des livres. Les commandes sont expédiées par la Poste avec les tarifications de port suivantes :
          </p>
          <p className="mt-2">
            3 € quel que soit le nombre de livres commandés
          </p>
          <p className="mt-4">
            Attention, ces frais peuvent être modifiés en fonction du poids et du prix de l'ouvrage, ainsi que de l'évolution des tarifs postaux.
          </p>
          <p className="mt-4">
            Pour passer vos commandes via DILICOM, notre numéro Gencod : 3019000362701
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">15.2 Dépôts permanents</h3>
          <p>
            Les librairies et lieux accueillants du public peuvent devenir des lieux de dépôt permanents offrant toute l'année les livres des éditions Cerises d'Hiver à la vente.
          </p>
          <p className="mt-4">
            Ces dépôts bénéficient alors d'une remise de 35% sur le prix public des livres, ainsi que d'aucune charge de frais de port. Pour en savoir plus ou devenir un lieu de dépôt, n'hésitez-pas à nous contacter.
          </p>
        </section>
      </div>
    </div>
  );
}
