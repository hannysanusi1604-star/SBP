export type Dietary =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'halal-friendly'
  | 'nut-free'
  | 'dairy-free';

export type Allergen =
  | 'gluten'
  | 'dairy'
  | 'nuts'
  | 'shellfish'
  | 'eggs'
  | 'soy'
  | 'sesame';

export type Temperature = 'hot' | 'cold';

export type Source = 'local' | 'international';

export type Category = 'starters' | 'mains' | 'desserts' | 'drinks' | 'premium';

export type Dish = {
  id: string;
  name: string;
  description: string;
  category: Category;
  image: string;
  temperature: Temperature;
  source: Source;
  dietary: Dietary[];
  allergens: Allergen[];
  chefNote?: string;
  premium?: boolean;
  price?: string;
};

export const dishes: Dish[] = [
  // Starters
  {
    id: 'smoked-trout-salad',
    name: 'Smoked Trout Potato Salad',
    description:
      'Cold-smoked alpine trout, Ratte potatoes, dill crème fraîche, lemon zest.',
    category: 'starters',
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80',
    temperature: 'cold',
    source: 'local',
    dietary: ['gluten-free', 'nut-free'],
    allergens: ['dairy', 'eggs'],
    chefNote: 'Trout sourced from Lake Lucerne fisheries.',
  },
  {
    id: 'cheese-charcuterie',
    name: 'Swiss Cheese & Charcuterie Board',
    description:
      'Aged Gruyère AOP, Tête de Moine, Bündnerfleisch, Walliser dried meats, fig compote.',
    category: 'starters',
    image:
      'https://images.unsplash.com/photo-1631379578550-7038263db699?auto=format&fit=crop&w=1200&q=80',
    temperature: 'cold',
    source: 'local',
    dietary: ['gluten-free', 'nut-free'],
    allergens: ['dairy'],
    chefNote: 'Selection rotated weekly with local affineurs.',
  },
  {
    id: 'heirloom-tomato',
    name: 'Heirloom Tomato & Basil',
    description:
      'Sun-ripened tomatoes, buffalo mozzarella, aged balsamic, Genovese basil.',
    category: 'starters',
    image:
      'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?auto=format&fit=crop&w=1200&q=80',
    temperature: 'cold',
    source: 'international',
    dietary: ['vegetarian', 'gluten-free', 'nut-free'],
    allergens: ['dairy'],
  },
  {
    id: 'wild-mushroom-velouté',
    name: 'Wild Mushroom Velouté',
    description:
      'Forest mushrooms, thyme cream, truffle oil drizzle, sourdough crouton.',
    category: 'starters',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    temperature: 'hot',
    source: 'local',
    dietary: ['vegetarian'],
    allergens: ['gluten', 'dairy'],
  },

  // Mains
  {
    id: 'zurcher-geschnetzeltes',
    name: 'Zürcher Geschnetzeltes',
    description:
      'Sliced veal in white wine and mushroom cream sauce, traditional Zürich style.',
    category: 'mains',
    image:
      'https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=1200&q=80',
    temperature: 'hot',
    source: 'local',
    dietary: ['nut-free'],
    allergens: ['dairy', 'gluten'],
    chefNote: 'A signature dish of canton Zürich since the 1940s.',
  },
  {
    id: 'rosti-alpine-cheese',
    name: 'Rösti with Alpine Cheese',
    description:
      'Crisp golden potato rösti baked with melted Berner Hobelkäse and chives.',
    category: 'mains',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    temperature: 'hot',
    source: 'local',
    dietary: ['vegetarian', 'gluten-free', 'nut-free', 'halal-friendly'],
    allergens: ['dairy'],
  },
  {
    id: 'herb-lake-fish',
    name: 'Herb-Roasted Lake Fish',
    description:
      'Filet of Lake Zürich perch, herb butter, citrus beurre blanc, garden vegetables.',
    category: 'mains',
    image:
      'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=1200&q=80',
    temperature: 'hot',
    source: 'local',
    dietary: ['gluten-free', 'nut-free'],
    allergens: ['dairy'],
    chefNote: 'Sustainably caught from regional Swiss lakes.',
  },
  {
    id: 'vegetable-risotto',
    name: 'Spring Vegetable Risotto',
    description:
      'Carnaroli rice, asparagus, peas, Parmigiano Reggiano, fresh herbs.',
    category: 'mains',
    image:
      'https://images.unsplash.com/photo-1633964913849-96bb09cd5256?auto=format&fit=crop&w=1200&q=80',
    temperature: 'hot',
    source: 'international',
    dietary: ['vegetarian', 'gluten-free', 'nut-free', 'halal-friendly'],
    allergens: ['dairy'],
  },
  {
    id: 'chickpea-tagine',
    name: 'Moroccan Chickpea Tagine',
    description:
      'Slow-cooked chickpeas, apricots, preserved lemon, ras el hanout, herbed couscous.',
    category: 'mains',
    image:
      'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=80',
    temperature: 'hot',
    source: 'international',
    dietary: ['vegan', 'vegetarian', 'dairy-free', 'halal-friendly', 'nut-free'],
    allergens: ['gluten'],
  },

  // Desserts
  {
    id: 'zuger-kirschtorte',
    name: 'Mini Zuger Kirschtorte',
    description:
      'Layered hazelnut meringue, buttercream and kirsch-soaked sponge from canton Zug.',
    category: 'desserts',
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=80',
    temperature: 'cold',
    source: 'local',
    dietary: ['vegetarian'],
    allergens: ['gluten', 'dairy', 'nuts', 'eggs'],
    chefNote: 'A protected Swiss specialty since 1915.',
  },
  {
    id: 'chocolate-mousse',
    name: 'Swiss Chocolate Mousse Cups',
    description:
      '70% Lindt grand cru chocolate, whipped cream, cocoa nibs, gold leaf.',
    category: 'desserts',
    image:
      'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=1200&q=80',
    temperature: 'cold',
    source: 'local',
    dietary: ['vegetarian', 'gluten-free'],
    allergens: ['dairy', 'eggs', 'soy'],
  },
  {
    id: 'panna-cotta',
    name: 'Tropical Fruit Panna Cotta',
    description:
      'Vanilla bean panna cotta, passion-fruit coulis, mango, micro basil.',
    category: 'desserts',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
    temperature: 'cold',
    source: 'international',
    dietary: ['vegetarian', 'gluten-free', 'nut-free'],
    allergens: ['dairy'],
  },
  {
    id: 'fruit-platter',
    name: 'Seasonal Fruit Platter',
    description:
      'Selection of fresh seasonal fruits, mint, lime, edible flowers.',
    category: 'desserts',
    image:
      'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=80',
    temperature: 'cold',
    source: 'international',
    dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'halal-friendly', 'nut-free'],
    allergens: [],
  },

  // Drinks
  {
    id: 'still-sparkling-water',
    name: 'Alpine Still & Sparkling Water',
    description:
      'Naturally filtered Swiss mountain spring water, chilled, with citrus.',
    category: 'drinks',
    image:
      'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=1200&q=80',
    temperature: 'cold',
    source: 'local',
    dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'halal-friendly', 'nut-free'],
    allergens: [],
  },
  {
    id: 'espresso-bar',
    name: 'Swiss Espresso Bar',
    description:
      'Single-origin espresso, cappuccino, Schümli, herbal & alpine teas.',
    category: 'drinks',
    image:
      'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=1200&q=80',
    temperature: 'hot',
    source: 'local',
    dietary: ['vegan', 'vegetarian', 'gluten-free', 'nut-free'],
    allergens: ['dairy'],
  },
  {
    id: 'fresh-juices',
    name: 'Cold-Pressed Juice Selection',
    description:
      'Apple-elderflower, beetroot-ginger, orange and seasonal blends.',
    category: 'drinks',
    image:
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1200&q=80',
    temperature: 'cold',
    source: 'local',
    dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'halal-friendly', 'nut-free'],
    allergens: [],
  },
  {
    id: 'house-wine',
    name: 'Swiss House Wines',
    description:
      'A curated selection of Valais and Vaud reds and whites by the glass.',
    category: 'drinks',
    image:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    temperature: 'cold',
    source: 'local',
    dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    allergens: [],
  },

  // Premium add-ons
  {
    id: 'champagne-flute',
    name: 'Champagne by the Flute',
    description:
      'Ruinart Blanc de Blancs, served chilled with seasonal garnish.',
    category: 'premium',
    image:
      'https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&w=1200&q=80',
    temperature: 'cold',
    source: 'international',
    dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    allergens: [],
    premium: true,
    price: 'CHF 28',
  },
  {
    id: 'caviar-service',
    name: 'Oscietra Caviar Service',
    description:
      '15g Oscietra caviar, blinis, crème fraîche, mother-of-pearl spoon.',
    category: 'premium',
    image:
      'https://images.unsplash.com/photo-1625938145744-533e82c1a2b8?auto=format&fit=crop&w=1200&q=80',
    temperature: 'cold',
    source: 'international',
    dietary: ['nut-free'],
    allergens: ['gluten', 'dairy', 'eggs'],
    premium: true,
    price: 'CHF 65',
  },
  {
    id: 'truffle-pasta',
    name: 'Black Truffle Tagliolini',
    description:
      'Hand-cut egg pasta, butter, aged Parmigiano, shaved Périgord truffle.',
    category: 'premium',
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80',
    temperature: 'hot',
    source: 'international',
    dietary: ['vegetarian'],
    allergens: ['gluten', 'dairy', 'eggs'],
    premium: true,
    price: 'CHF 42',
  },
  {
    id: 'sommelier-wine',
    name: 'Sommelier Wine Pairing',
    description:
      'A curated three-glass flight selected by our head sommelier.',
    category: 'premium',
    image:
      'https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?auto=format&fit=crop&w=1200&q=80',
    temperature: 'cold',
    source: 'international',
    dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    allergens: [],
    premium: true,
    price: 'CHF 55',
  },
];

export const categories: { id: Category; labelKey: string }[] = [
  { id: 'starters', labelKey: 'cat.starters' },
  { id: 'mains', labelKey: 'cat.mains' },
  { id: 'desserts', labelKey: 'cat.desserts' },
  { id: 'drinks', labelKey: 'cat.drinks' },
  { id: 'premium', labelKey: 'cat.premium' },
];
