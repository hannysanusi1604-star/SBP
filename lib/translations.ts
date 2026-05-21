export type Locale = 'en' | 'fr' | 'de' | 'it' | 'ar';

export const locales: { code: Locale; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'it', label: 'Italian', native: 'Italiano' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
];

type Dict = Record<string, string>;

export const dict: Record<Locale, Dict> = {
  en: {
    'brand.line1': 'Aspire Lounge',
    'brand.line2': 'Switzerland',
    'nav.menu': 'Menu',
    'nav.drinks': 'Drinks',
    'nav.dietary': 'Dietary',
    'nav.premium': 'Suite',
    'nav.feedback': 'Feedback',
    'nav.about': 'Local Sourcing',

    'home.eyebrow': 'Zürich · Geneva · Basel',
    'home.welcome': 'Welcome to a quiet moment before your flight.',
    'home.subtitle':
      'Browse today’s buffet, discover Swiss ingredients, and travel with comfort.',
    'home.cta.menu': 'Browse Buffet',
    'home.cta.premium': 'Suite Ordering',
    'home.qr.title': 'Your table, our menu',
    'home.qr.body':
      'You’ve been seated. Take your time — the buffet refreshes throughout the day.',
    'home.hours': 'Open daily · 04:30 — 23:00',

    'menu.title': 'Today’s Buffet',
    'menu.subtitle': 'Refreshed continuously by our chefs',
    'menu.search': 'Search dishes, ingredients…',
    'menu.filters': 'Filters',
    'menu.clear': 'Clear',
    'menu.empty': 'No dishes match your filters.',
    'menu.allergens': 'Contains',
    'menu.dietary': 'Suitable for',
    'menu.hot': 'Hot',
    'menu.cold': 'Cold',
    'menu.local': 'Swiss sourced',
    'menu.international': 'International',
    'menu.chefnote': 'Chef’s note',
    'menu.order': 'Request at table',
    'menu.viewdetails': 'View details',
    'menu.close': 'Close',

    'cat.starters': 'Starters',
    'cat.mains': 'Main Courses',
    'cat.desserts': 'Desserts',
    'cat.drinks': 'Drinks',
    'cat.premium': 'Premium Add-ons',

    'diet.vegetarian': 'Vegetarian',
    'diet.vegan': 'Vegan',
    'diet.gluten-free': 'Gluten-free',
    'diet.halal-friendly': 'Halal-friendly',
    'diet.nut-free': 'Nut-free',
    'diet.dairy-free': 'Dairy-free',

    'allergen.gluten': 'Gluten',
    'allergen.dairy': 'Dairy',
    'allergen.nuts': 'Nuts',
    'allergen.shellfish': 'Shellfish',
    'allergen.eggs': 'Eggs',
    'allergen.soy': 'Soy',
    'allergen.sesame': 'Sesame',

    'drinks.title': 'Drinks & Water Station',
    'drinks.subtitle':
      'Self-serve coffee, tea, alpine water and cold-pressed juices.',
    'drinks.station1.title': 'Alpine Water Station',
    'drinks.station1.body':
      'Still and sparkling Swiss spring water, citrus and herb infusions.',
    'drinks.station2.title': 'Espresso & Tea Bar',
    'drinks.station2.body':
      'Single-origin espresso, Schümli, herbal teas and chai.',
    'drinks.station3.title': 'Juice & Wellness',
    'drinks.station3.body':
      'Cold-pressed seasonal juices, kombucha and electrolyte drinks.',

    'dietary.title': 'Dietary & Allergen Guide',
    'dietary.subtitle':
      'Every dish is clearly labelled. Please ask any team member for advice.',
    'dietary.contact':
      'If you have a severe allergy, kindly let a host know — we will guide you personally.',

    'premium.eyebrow': 'Suite Lounge guests',
    'premium.title': 'Discreet table service',
    'premium.subtitle':
      'A quiet hand to add a glass of champagne, a glass of wine or a chef’s plate at your table.',
    'premium.cta': 'Order to table',
    'premium.estimated': 'Estimated preparation',
    'premium.minutes': 'min',
    'premium.status.pending': 'Pending confirmation',
    'premium.status.confirmed': 'Confirmed',
    'premium.status.preparing': 'Preparing',
    'premium.status.ontheway': 'On its way',
    'premium.status.delivered': 'Delivered',
    'premium.order.title': 'Your order',
    'premium.order.empty': 'No items yet — explore the additions below.',
    'premium.order.total': 'Total',
    'premium.order.place': 'Place order',
    'premium.order.note': 'Note for the team (optional)',
    'premium.order.notepl': 'e.g. seat 14C, allergies, occasion…',
    'premium.access':
      'Available to Suite Lounge guests — your boarding pass tier is detected automatically.',
    'premium.confirm.title': 'Order received',
    'premium.confirm.body':
      'A member of our team is on their way to your table.',
    'premium.confirm.eta': 'Estimated arrival',
    'premium.confirm.ref': 'Confirmation',

    'about.title': 'About Local Ingredients',
    'about.subtitle':
      'We work with Swiss farmers, alpine cheesemakers and lake fisheries within 200 km of the lounge.',
    'about.farmers.title': 'Swiss Farmers',
    'about.farmers.body':
      'Daily deliveries from Aargau and Bern producers — vegetables, dairy and eggs.',
    'about.cheese.title': 'Alpine Cheesemakers',
    'about.cheese.body':
      'AOP-certified Gruyère, Emmentaler and Berner Hobelkäse, matured in family caves.',
    'about.water.title': 'Mountain Water',
    'about.water.body':
      'Natural spring water filtered through 300m of alpine limestone.',
    'about.coffee.title': 'Swiss Roasters',
    'about.coffee.body':
      'Single-origin beans roasted weekly in our partner microroastery.',

    'feedback.title': 'How was your moment with us?',
    'feedback.subtitle':
      'Your impressions help us shape the next traveller’s experience.',
    'feedback.overall': 'Overall experience',
    'feedback.food': 'Food quality',
    'feedback.service': 'Service & atmosphere',
    'feedback.comment': 'A note for the team (optional)',
    'feedback.commentpl': 'A dish you loved, anything we can refine…',
    'feedback.submit': 'Send feedback',
    'feedback.thanks': 'Thank you — safe travels.',
    'feedback.dishrating': 'Rate a specific dish',
    'feedback.choose': 'Choose a dish',

    'lang.title': 'Language',
    'help.title': 'Need a hand?',
    'help.body': 'Press the call button or ask any host — we’re close by.',
    'help.callstaff': 'Call a host',
    'help.called': 'A host has been notified.',
    'help.close': 'Close',

    'footer.note': 'A calm, premium moment before your flight.',
  },
  fr: {
    'brand.line1': 'Aspire Lounge',
    'brand.line2': 'Suisse',
    'nav.menu': 'Menu',
    'nav.drinks': 'Boissons',
    'nav.dietary': 'Régimes',
    'nav.premium': 'Suite',
    'nav.feedback': 'Avis',
    'nav.about': 'Producteurs',

    'home.eyebrow': 'Zurich · Genève · Bâle',
    'home.welcome': 'Bienvenue dans un moment de calme avant votre vol.',
    'home.subtitle':
      'Découvrez le buffet du jour, les ingrédients suisses, et voyagez sereinement.',
    'home.cta.menu': 'Voir le buffet',
    'home.cta.premium': 'Service Suite',
    'home.qr.title': 'Votre table, notre menu',
    'home.qr.body':
      'Vous êtes installé(e). Prenez votre temps — le buffet est renouvelé tout au long de la journée.',
    'home.hours': 'Ouvert chaque jour · 04:30 — 23:00',

    'menu.title': 'Buffet du jour',
    'menu.subtitle': 'Renouvelé par nos chefs en continu',
    'menu.search': 'Rechercher un plat, un ingrédient…',
    'menu.filters': 'Filtres',
    'menu.clear': 'Effacer',
    'menu.empty': 'Aucun plat ne correspond à vos filtres.',
    'menu.allergens': 'Contient',
    'menu.dietary': 'Convient à',
    'menu.hot': 'Chaud',
    'menu.cold': 'Froid',
    'menu.local': 'Origine suisse',
    'menu.international': 'International',
    'menu.chefnote': 'Note du chef',
    'menu.order': 'Demander à table',
    'menu.viewdetails': 'Voir le détail',
    'menu.close': 'Fermer',

    'cat.starters': 'Entrées',
    'cat.mains': 'Plats',
    'cat.desserts': 'Desserts',
    'cat.drinks': 'Boissons',
    'cat.premium': 'Suppléments Premium',

    'diet.vegetarian': 'Végétarien',
    'diet.vegan': 'Végan',
    'diet.gluten-free': 'Sans gluten',
    'diet.halal-friendly': 'Halal',
    'diet.nut-free': 'Sans fruits à coque',
    'diet.dairy-free': 'Sans lactose',

    'allergen.gluten': 'Gluten',
    'allergen.dairy': 'Lactose',
    'allergen.nuts': 'Fruits à coque',
    'allergen.shellfish': 'Crustacés',
    'allergen.eggs': 'Œufs',
    'allergen.soy': 'Soja',
    'allergen.sesame': 'Sésame',

    'drinks.title': 'Boissons & espace eau',
    'drinks.subtitle':
      'Café, thé, eau alpine et jus pressés à froid en libre-service.',
    'drinks.station1.title': 'Eau des Alpes',
    'drinks.station1.body':
      'Eau de source plate et pétillante, infusions citron et herbes.',
    'drinks.station2.title': 'Espresso & Thés',
    'drinks.station2.body':
      'Espresso, Schümli, thés et tisanes des Alpes.',
    'drinks.station3.title': 'Jus & Bien-être',
    'drinks.station3.body':
      'Jus pressés à froid, kombucha et boissons électrolytes.',

    'dietary.title': 'Guide des régimes & allergènes',
    'dietary.subtitle':
      'Chaque plat est clairement identifié. Demandez conseil à notre équipe.',
    'dietary.contact':
      'En cas d’allergie sévère, prévenez un hôte — nous vous accompagnons personnellement.',

    'premium.eyebrow': 'Réservé Suite Lounge',
    'premium.title': 'Service à table discret',
    'premium.subtitle':
      'Une coupe de champagne, un verre de vin ou une assiette du chef apportés à votre table.',
    'premium.cta': 'Commander à table',
    'premium.estimated': 'Préparation estimée',
    'premium.minutes': 'min',
    'premium.status.pending': 'En attente',
    'premium.status.confirmed': 'Confirmée',
    'premium.status.preparing': 'En préparation',
    'premium.status.ontheway': 'En route',
    'premium.status.delivered': 'Servie',
    'premium.order.title': 'Votre commande',
    'premium.order.empty': 'Aucun article — explorez les options ci-dessous.',
    'premium.order.total': 'Total',
    'premium.order.place': 'Passer commande',
    'premium.order.note': 'Note pour l’équipe (facultatif)',
    'premium.order.notepl': 'ex. siège 14C, allergie, occasion…',
    'premium.access':
      'Réservé aux invités Suite Lounge — votre niveau d’embarquement est détecté automatiquement.',
    'premium.confirm.title': 'Commande reçue',
    'premium.confirm.body':
      'Un membre de notre équipe se dirige vers votre table.',
    'premium.confirm.eta': 'Arrivée estimée',
    'premium.confirm.ref': 'Confirmation',

    'about.title': 'Producteurs locaux',
    'about.subtitle':
      'Nous collaborons avec des fermiers suisses, fromagers alpins et pêcheurs à moins de 200 km du salon.',
    'about.farmers.title': 'Fermiers suisses',
    'about.farmers.body':
      'Livraisons quotidiennes d’Argovie et de Berne — légumes, produits laitiers, œufs.',
    'about.cheese.title': 'Fromagers alpins',
    'about.cheese.body':
      'Gruyère AOP, Emmental et Hobelkäse affinés en caves familiales.',
    'about.water.title': 'Eau des montagnes',
    'about.water.body':
      'Eau de source filtrée par 300 m de calcaire alpin.',
    'about.coffee.title': 'Torréfacteurs suisses',
    'about.coffee.body':
      'Grains d’origine torréfiés chaque semaine chez notre partenaire.',

    'feedback.title': 'Comment s’est passé votre moment ?',
    'feedback.subtitle':
      'Vos impressions guident l’expérience du prochain voyageur.',
    'feedback.overall': 'Expérience globale',
    'feedback.food': 'Qualité de la cuisine',
    'feedback.service': 'Service & ambiance',
    'feedback.comment': 'Un mot pour l’équipe (facultatif)',
    'feedback.commentpl': 'Un plat aimé, un détail à améliorer…',
    'feedback.submit': 'Envoyer',
    'feedback.thanks': 'Merci — bon voyage.',
    'feedback.dishrating': 'Noter un plat précis',
    'feedback.choose': 'Choisir un plat',

    'lang.title': 'Langue',
    'help.title': 'Besoin d’aide ?',
    'help.body': 'Appelez un hôte ou faites-nous signe — nous sommes proches.',
    'help.callstaff': 'Appeler un hôte',
    'help.called': 'Un hôte a été prévenu.',
    'help.close': 'Fermer',

    'footer.note': 'Un moment calme et raffiné avant votre vol.',
  },
  de: {
    'brand.line1': 'Aspire Lounge',
    'brand.line2': 'Schweiz',
    'nav.menu': 'Menü',
    'nav.drinks': 'Getränke',
    'nav.dietary': 'Ernährung',
    'nav.premium': 'Suite',
    'nav.feedback': 'Feedback',
    'nav.about': 'Herkunft',

    'home.eyebrow': 'Zürich · Genf · Basel',
    'home.welcome': 'Willkommen zu einem ruhigen Moment vor Ihrem Flug.',
    'home.subtitle':
      'Entdecken Sie das heutige Buffet, Schweizer Zutaten — und reisen Sie entspannt.',
    'home.cta.menu': 'Zum Buffet',
    'home.cta.premium': 'Suite-Service',
    'home.qr.title': 'Ihr Tisch, unser Menü',
    'home.qr.body':
      'Sie haben Platz genommen. Lassen Sie sich Zeit — das Buffet wird laufend aufgefrischt.',
    'home.hours': 'Täglich geöffnet · 04:30 — 23:00',

    'menu.title': 'Buffet des Tages',
    'menu.subtitle': 'Laufend von unseren Köchen aufgefrischt',
    'menu.search': 'Gericht, Zutat suchen…',
    'menu.filters': 'Filter',
    'menu.clear': 'Zurücksetzen',
    'menu.empty': 'Keine Gerichte entsprechen Ihren Filtern.',
    'menu.allergens': 'Enthält',
    'menu.dietary': 'Geeignet für',
    'menu.hot': 'Warm',
    'menu.cold': 'Kalt',
    'menu.local': 'Schweizer Herkunft',
    'menu.international': 'International',
    'menu.chefnote': 'Notiz des Küchenchefs',
    'menu.order': 'Am Tisch anfragen',
    'menu.viewdetails': 'Details ansehen',
    'menu.close': 'Schliessen',

    'cat.starters': 'Vorspeisen',
    'cat.mains': 'Hauptgerichte',
    'cat.desserts': 'Desserts',
    'cat.drinks': 'Getränke',
    'cat.premium': 'Premium-Ergänzungen',

    'diet.vegetarian': 'Vegetarisch',
    'diet.vegan': 'Vegan',
    'diet.gluten-free': 'Glutenfrei',
    'diet.halal-friendly': 'Halal-freundlich',
    'diet.nut-free': 'Nussfrei',
    'diet.dairy-free': 'Laktosefrei',

    'allergen.gluten': 'Gluten',
    'allergen.dairy': 'Milch',
    'allergen.nuts': 'Nüsse',
    'allergen.shellfish': 'Schalentiere',
    'allergen.eggs': 'Eier',
    'allergen.soy': 'Soja',
    'allergen.sesame': 'Sesam',

    'drinks.title': 'Getränke & Wasserstation',
    'drinks.subtitle':
      'Kaffee, Tee, Alpenwasser und kaltgepresste Säfte zur Selbstbedienung.',
    'drinks.station1.title': 'Alpenwasser',
    'drinks.station1.body':
      'Stilles und sprudelndes Quellwasser, Zitrus- und Kräuterinfusionen.',
    'drinks.station2.title': 'Espresso & Tee',
    'drinks.station2.body':
      'Espresso, Schümli, Tees und Alpenkräutertees.',
    'drinks.station3.title': 'Säfte & Wellness',
    'drinks.station3.body':
      'Kaltgepresste Säfte, Kombucha und Elektrolytgetränke.',

    'dietary.title': 'Ernährungs- & Allergenführer',
    'dietary.subtitle':
      'Jedes Gericht ist klar gekennzeichnet. Unser Team berät Sie gerne.',
    'dietary.contact':
      'Bei schwerer Allergie informieren Sie bitte einen Gastgeber — wir begleiten Sie persönlich.',

    'premium.eyebrow': 'Suite-Lounge-Gäste',
    'premium.title': 'Diskreter Tischservice',
    'premium.subtitle':
      'Ein Glas Champagner, ein Wein oder ein Küchenchef-Teller — direkt an Ihren Tisch.',
    'premium.cta': 'An den Tisch bestellen',
    'premium.estimated': 'Geschätzte Zubereitung',
    'premium.minutes': 'Min.',
    'premium.status.pending': 'Ausstehend',
    'premium.status.confirmed': 'Bestätigt',
    'premium.status.preparing': 'In Zubereitung',
    'premium.status.ontheway': 'Unterwegs',
    'premium.status.delivered': 'Serviert',
    'premium.order.title': 'Ihre Bestellung',
    'premium.order.empty': 'Noch keine Artikel — entdecken Sie unsere Auswahl.',
    'premium.order.total': 'Gesamt',
    'premium.order.place': 'Bestellung aufgeben',
    'premium.order.note': 'Notiz an das Team (optional)',
    'premium.order.notepl': 'z. B. Platz 14C, Allergien, Anlass…',
    'premium.access':
      'Für Suite-Lounge-Gäste — Ihre Stufe wird automatisch erkannt.',
    'premium.confirm.title': 'Bestellung erhalten',
    'premium.confirm.body':
      'Ein Teammitglied ist bereits unterwegs zu Ihrem Tisch.',
    'premium.confirm.eta': 'Voraussichtliche Ankunft',
    'premium.confirm.ref': 'Bestätigung',

    'about.title': 'Lokale Zutaten',
    'about.subtitle':
      'Wir arbeiten mit Schweizer Bauern, Alpkäsereien und Fischern im Umkreis von 200 km.',
    'about.farmers.title': 'Schweizer Bauern',
    'about.farmers.body':
      'Tägliche Lieferungen aus Aargau und Bern — Gemüse, Milchprodukte, Eier.',
    'about.cheese.title': 'Alpkäser',
    'about.cheese.body':
      'AOP-Gruyère, Emmentaler und Berner Hobelkäse aus familieneigenen Höhlen.',
    'about.water.title': 'Bergwasser',
    'about.water.body':
      'Quellwasser, gefiltert durch 300 m alpinen Kalkstein.',
    'about.coffee.title': 'Schweizer Röstereien',
    'about.coffee.body':
      'Sortenreine Bohnen, jede Woche frisch geröstet.',

    'feedback.title': 'Wie war Ihr Moment bei uns?',
    'feedback.subtitle':
      'Ihre Eindrücke prägen das Erlebnis des nächsten Reisenden.',
    'feedback.overall': 'Gesamterlebnis',
    'feedback.food': 'Qualität der Küche',
    'feedback.service': 'Service & Atmosphäre',
    'feedback.comment': 'Eine Notiz an das Team (optional)',
    'feedback.commentpl': 'Ein geliebtes Gericht, ein Vorschlag…',
    'feedback.submit': 'Senden',
    'feedback.thanks': 'Vielen Dank — gute Reise.',
    'feedback.dishrating': 'Ein Gericht bewerten',
    'feedback.choose': 'Gericht wählen',

    'lang.title': 'Sprache',
    'help.title': 'Brauchen Sie Hilfe?',
    'help.body': 'Rufen Sie einen Gastgeber — wir sind in der Nähe.',
    'help.callstaff': 'Gastgeber rufen',
    'help.called': 'Ein Gastgeber wurde informiert.',
    'help.close': 'Schliessen',

    'footer.note': 'Ein ruhiger, edler Moment vor Ihrem Flug.',
  },
  it: {
    'brand.line1': 'Aspire Lounge',
    'brand.line2': 'Svizzera',
    'nav.menu': 'Menu',
    'nav.drinks': 'Bevande',
    'nav.dietary': 'Dieta',
    'nav.premium': 'Suite',
    'nav.feedback': 'Feedback',
    'nav.about': 'Produttori',

    'home.eyebrow': 'Zurigo · Ginevra · Basilea',
    'home.welcome': 'Benvenuto in un momento di calma prima del volo.',
    'home.subtitle':
      'Scopri il buffet di oggi e gli ingredienti svizzeri, viaggia sereno.',
    'home.cta.menu': 'Scopri il buffet',
    'home.cta.premium': 'Servizio Suite',
    'home.qr.title': 'Il tuo tavolo, il nostro menu',
    'home.qr.body':
      'Sei accomodato. Prenditi il tuo tempo — il buffet viene rinnovato durante la giornata.',
    'home.hours': 'Aperto tutti i giorni · 04:30 — 23:00',

    'menu.title': 'Buffet di oggi',
    'menu.subtitle': 'Rinnovato di continuo dai nostri chef',
    'menu.search': 'Cerca piatto o ingrediente…',
    'menu.filters': 'Filtri',
    'menu.clear': 'Pulisci',
    'menu.empty': 'Nessun piatto corrisponde ai filtri.',
    'menu.allergens': 'Contiene',
    'menu.dietary': 'Adatto a',
    'menu.hot': 'Caldo',
    'menu.cold': 'Freddo',
    'menu.local': 'Origine svizzera',
    'menu.international': 'Internazionale',
    'menu.chefnote': 'Nota dello chef',
    'menu.order': 'Richiedi al tavolo',
    'menu.viewdetails': 'Dettagli',
    'menu.close': 'Chiudi',

    'cat.starters': 'Antipasti',
    'cat.mains': 'Secondi',
    'cat.desserts': 'Dolci',
    'cat.drinks': 'Bevande',
    'cat.premium': 'Aggiunte Premium',

    'diet.vegetarian': 'Vegetariano',
    'diet.vegan': 'Vegano',
    'diet.gluten-free': 'Senza glutine',
    'diet.halal-friendly': 'Halal',
    'diet.nut-free': 'Senza frutta a guscio',
    'diet.dairy-free': 'Senza lattosio',

    'allergen.gluten': 'Glutine',
    'allergen.dairy': 'Latticini',
    'allergen.nuts': 'Frutta a guscio',
    'allergen.shellfish': 'Crostacei',
    'allergen.eggs': 'Uova',
    'allergen.soy': 'Soia',
    'allergen.sesame': 'Sesamo',

    'drinks.title': 'Bevande & punto acqua',
    'drinks.subtitle':
      'Caffè, tè, acqua alpina e succhi a freddo in self-service.',
    'drinks.station1.title': 'Acqua delle Alpi',
    'drinks.station1.body':
      'Acqua naturale e frizzante, infusi di agrumi ed erbe.',
    'drinks.station2.title': 'Espresso & Tè',
    'drinks.station2.body':
      'Espresso, Schümli, tè e tisane alpine.',
    'drinks.station3.title': 'Succhi & Benessere',
    'drinks.station3.body':
      'Succhi a freddo, kombucha e bevande agli elettroliti.',

    'dietary.title': 'Guida dieta & allergeni',
    'dietary.subtitle':
      'Ogni piatto è chiaramente etichettato. Chiedi consiglio al nostro team.',
    'dietary.contact':
      'In caso di allergia grave, avvisa un host — ti accompagneremo personalmente.',

    'premium.eyebrow': 'Ospiti Suite Lounge',
    'premium.title': 'Servizio al tavolo discreto',
    'premium.subtitle':
      'Un calice di champagne, un vino o un piatto dello chef portati al tuo tavolo.',
    'premium.cta': 'Ordina al tavolo',
    'premium.estimated': 'Preparazione stimata',
    'premium.minutes': 'min',
    'premium.status.pending': 'In attesa',
    'premium.status.confirmed': 'Confermato',
    'premium.status.preparing': 'In preparazione',
    'premium.status.ontheway': 'In arrivo',
    'premium.status.delivered': 'Servito',
    'premium.order.title': 'Il tuo ordine',
    'premium.order.empty': 'Nessun articolo — esplora la selezione.',
    'premium.order.total': 'Totale',
    'premium.order.place': 'Conferma ordine',
    'premium.order.note': 'Nota per il team (facoltativo)',
    'premium.order.notepl': 'es. posto 14C, allergie, occasione…',
    'premium.access':
      'Riservato agli ospiti Suite Lounge — il tuo livello è rilevato automaticamente.',
    'premium.confirm.title': 'Ordine ricevuto',
    'premium.confirm.body':
      'Un nostro collaboratore sta raggiungendo il tuo tavolo.',
    'premium.confirm.eta': 'Arrivo previsto',
    'premium.confirm.ref': 'Conferma',

    'about.title': 'Ingredienti locali',
    'about.subtitle':
      'Lavoriamo con contadini svizzeri, casari alpini e pescatori entro 200 km.',
    'about.farmers.title': 'Contadini svizzeri',
    'about.farmers.body':
      'Consegne giornaliere dai Cantoni Argovia e Berna.',
    'about.cheese.title': 'Casari alpini',
    'about.cheese.body':
      'Gruyère AOP, Emmental e Hobelkäse stagionati nelle grotte di famiglia.',
    'about.water.title': 'Acqua di montagna',
    'about.water.body':
      'Acqua sorgiva filtrata da 300 m di calcare alpino.',
    'about.coffee.title': 'Torrefattori svizzeri',
    'about.coffee.body':
      'Chicchi single-origin tostati settimanalmente.',

    'feedback.title': 'Com’è andato il tuo momento?',
    'feedback.subtitle':
      'Le tue impressioni guidano l’esperienza del prossimo viaggiatore.',
    'feedback.overall': 'Esperienza complessiva',
    'feedback.food': 'Qualità della cucina',
    'feedback.service': 'Servizio & atmosfera',
    'feedback.comment': 'Una nota per il team (facoltativo)',
    'feedback.commentpl': 'Un piatto che ti è piaciuto…',
    'feedback.submit': 'Invia',
    'feedback.thanks': 'Grazie — buon viaggio.',
    'feedback.dishrating': 'Valuta un piatto specifico',
    'feedback.choose': 'Scegli un piatto',

    'lang.title': 'Lingua',
    'help.title': 'Serve aiuto?',
    'help.body': 'Chiama un host — siamo vicini.',
    'help.callstaff': 'Chiama un host',
    'help.called': 'Un host è stato avvisato.',
    'help.close': 'Chiudi',

    'footer.note': 'Un momento calmo e raffinato prima del volo.',
  },
  ar: {
    'brand.line1': 'صالة أسباير',
    'brand.line2': 'سويسرا',
    'nav.menu': 'القائمة',
    'nav.drinks': 'المشروبات',
    'nav.dietary': 'النظام الغذائي',
    'nav.premium': 'سويت',
    'nav.feedback': 'الملاحظات',
    'nav.about': 'مصادرنا',

    'home.eyebrow': 'زيورخ · جنيف · بازل',
    'home.welcome': 'أهلاً بك في لحظة هدوء قبل رحلتك.',
    'home.subtitle':
      'تصفّح قائمة اليوم، اكتشف المكونات السويسرية، وسافر بكل راحة.',
    'home.cta.menu': 'تصفح البوفيه',
    'home.cta.premium': 'خدمة السويت',
    'home.qr.title': 'طاولتك، قائمتنا',
    'home.qr.body':
      'لقد جلست بالفعل. خذ وقتك — يتجدد البوفيه طوال اليوم.',
    'home.hours': 'مفتوح يومياً · 04:30 — 23:00',

    'menu.title': 'بوفيه اليوم',
    'menu.subtitle': 'يتجدّد باستمرار من قِبَل طهاتنا',
    'menu.search': 'ابحث عن طبق أو مكوّن…',
    'menu.filters': 'تصفية',
    'menu.clear': 'مسح',
    'menu.empty': 'لا توجد أطباق مطابقة.',
    'menu.allergens': 'يحتوي على',
    'menu.dietary': 'مناسب لـ',
    'menu.hot': 'ساخن',
    'menu.cold': 'بارد',
    'menu.local': 'مصدر سويسري',
    'menu.international': 'دولي',
    'menu.chefnote': 'ملاحظة الشيف',
    'menu.order': 'اطلب إلى الطاولة',
    'menu.viewdetails': 'التفاصيل',
    'menu.close': 'إغلاق',

    'cat.starters': 'المقبلات',
    'cat.mains': 'الأطباق الرئيسية',
    'cat.desserts': 'الحلويات',
    'cat.drinks': 'المشروبات',
    'cat.premium': 'إضافات مميزة',

    'diet.vegetarian': 'نباتي',
    'diet.vegan': 'نباتي صرف',
    'diet.gluten-free': 'خالٍ من الغلوتين',
    'diet.halal-friendly': 'حلال',
    'diet.nut-free': 'بدون مكسرات',
    'diet.dairy-free': 'خالٍ من الألبان',

    'allergen.gluten': 'غلوتين',
    'allergen.dairy': 'ألبان',
    'allergen.nuts': 'مكسرات',
    'allergen.shellfish': 'محار',
    'allergen.eggs': 'بيض',
    'allergen.soy': 'صويا',
    'allergen.sesame': 'سمسم',

    'drinks.title': 'المشروبات ومحطة المياه',
    'drinks.subtitle': 'قهوة وشاي ومياه ألبية وعصائر طازجة.',
    'drinks.station1.title': 'محطة المياه الألبية',
    'drinks.station1.body':
      'مياه ينابيع سويسرية، نقعات حمضيات وأعشاب.',
    'drinks.station2.title': 'ركن الإسبريسو والشاي',
    'drinks.station2.body':
      'إسبريسو ومشروبات ساخنة وأعشاب ألبية.',
    'drinks.station3.title': 'عصائر وعافية',
    'drinks.station3.body':
      'عصائر معصورة على البارد وكومبوتشا.',

    'dietary.title': 'دليل النظام الغذائي والمحسسات',
    'dietary.subtitle':
      'كل طبق مُعنون بوضوح. اسأل أي مضيف للاستشارة.',
    'dietary.contact':
      'في حالة الحساسية الشديدة، أبلغ المضيف وسنرافقك شخصياً.',

    'premium.eyebrow': 'لضيوف صالة السويت',
    'premium.title': 'خدمة طاولة هادئة',
    'premium.subtitle':
      'كأس شامبانيا، نبيذ أو طبق من الشيف يصلك إلى طاولتك.',
    'premium.cta': 'اطلب إلى الطاولة',
    'premium.estimated': 'وقت التحضير المتوقع',
    'premium.minutes': 'دقيقة',
    'premium.status.pending': 'بانتظار التأكيد',
    'premium.status.confirmed': 'مؤكد',
    'premium.status.preparing': 'قيد التحضير',
    'premium.status.ontheway': 'في الطريق',
    'premium.status.delivered': 'تم التقديم',
    'premium.order.title': 'طلبك',
    'premium.order.empty': 'لم تضف عناصر بعد — تصفّح المختارات.',
    'premium.order.total': 'الإجمالي',
    'premium.order.place': 'تأكيد الطلب',
    'premium.order.note': 'ملاحظة للفريق (اختياري)',
    'premium.order.notepl': 'مثلاً: مقعد 14C، حساسية…',
    'premium.access':
      'متاح لضيوف صالة السويت — يتم التحقق من تذكرتك تلقائياً.',
    'premium.confirm.title': 'تم استلام طلبك',
    'premium.confirm.body': 'أحد أعضاء فريقنا في طريقه إلى طاولتك.',
    'premium.confirm.eta': 'الوصول المتوقع',
    'premium.confirm.ref': 'تأكيد',

    'about.title': 'مكوّنات محلية',
    'about.subtitle':
      'نتعاون مع مزارعين سويسريين وصانعي أجبان وصيادين ضمن 200 كم.',
    'about.farmers.title': 'مزارعون سويسريون',
    'about.farmers.body': 'توصيلات يومية من آرجاو وبرن.',
    'about.cheese.title': 'صانعو الجبن الألبيون',
    'about.cheese.body':
      'غرويير وإيمنتال وهوبلكيزه يُعتق في كهوف عائلية.',
    'about.water.title': 'مياه الجبال',
    'about.water.body':
      'مياه ينابيع مرشحة طبيعياً عبر 300 م من الحجر الكلسي.',
    'about.coffee.title': 'محمصو القهوة السويسريون',
    'about.coffee.body': 'حبوب طازجة محمصة أسبوعياً.',

    'feedback.title': 'كيف كانت لحظتك معنا؟',
    'feedback.subtitle': 'انطباعاتك تصنع تجربة المسافر التالي.',
    'feedback.overall': 'التجربة الكلية',
    'feedback.food': 'جودة الطعام',
    'feedback.service': 'الخدمة والأجواء',
    'feedback.comment': 'ملاحظة للفريق (اختياري)',
    'feedback.commentpl': 'طبق أعجبك أو شيء يمكن تحسينه…',
    'feedback.submit': 'إرسال',
    'feedback.thanks': 'شكراً — رحلة آمنة.',
    'feedback.dishrating': 'قيّم طبقاً محدداً',
    'feedback.choose': 'اختر طبقاً',

    'lang.title': 'اللغة',
    'help.title': 'هل تحتاج مساعدة؟',
    'help.body': 'استدع مضيفاً — نحن قريبون.',
    'help.callstaff': 'استدعاء مضيف',
    'help.called': 'تم إخطار المضيف.',
    'help.close': 'إغلاق',

    'footer.note': 'لحظة هادئة وراقية قبل رحلتك.',
  },
};

export function t(locale: Locale, key: string): string {
  return dict[locale]?.[key] ?? dict.en[key] ?? key;
}
