import type { Product, FlavorInfo, Flavor } from '@/types';

export const flavors: FlavorInfo[] = [
  {
    id: 'verdura',
    name: 'Verdura',
    image: '/tarta_verdura.jpg',
    description: 'Zucchini, pimientos, zanahoria y cebolla salteados',
  },
  {
    id: 'jamon-y-queso',
    name: 'Jamón & Queso',
    image: '/featured_jamon.jpg',
    description: 'Jamón cocido y queso mozzarella derretido',
  },
  {
    id: 'cebolla-y-queso',
    name: 'Cebolla & Queso',
    image: '/tarta_verdura.jpg',
    description: 'Cebolla caramelizada y queso gruyere',
  },
  {
    id: 'zapallito',
    name: 'Zapallito',
    image: '/tarta_verdura.jpg',
    description: 'Zapallitos italianos y queso parmesano',
  },
  {
    id: 'capresse',
    name: 'Capresse',
    image: '/tarta_capresse.jpg',
    description: 'Tomate fresco, mozzarella y albahaca',
  },
  {
    id: 'pollo',
    name: 'Pollo',
    image: '/tarta_pollo.jpg',
    description: 'Pollo, champiñones y salsa blanca',
  },
  {
    id: 'espinaca',
    name: 'Espinaca',
    image: '/tarta_espinaca.jpg',
    description: 'Espinaca salteada y queso ricotta',
  },
  {
    id: 'choclo',
    name: 'Choclo',
    image: '/tarta_choclo.jpg',
    description: 'Choclo cremoso y queso mozzarella',
  },
  {
    id: 'atun',
    name: 'Atún',
    image: '/tarta_atun.jpg',
    description: 'Atún, cebolla y morrones asados',
  },
  {
    id: 'vegetales-mixtos',
    name: 'Vegetales Mixtos',
    image: '/tarta_verdura.jpg',
    description: 'Mix de vegetales de estación',
  },
  {
    id: 'brocoli-y-calabaza',
    name: 'Brócoli & Calabaza',
    image: '/tarta_verdura.jpg',
    description: 'Brócoli al vapor y calabaza asada',
  },
];

const basePrices: Record<Flavor, number> = {
  'verdura': 2500,
  'jamon-y-queso': 2900,
  'cebolla-y-queso': 2700,
  'zapallito': 2600,
  'capresse': 2800,
  'pollo': 3200,
  'espinaca': 2600,
  'choclo': 2500,
  'atun': 3100,
  'vegetales-mixtos': 2700,
  'brocoli-y-calabaza': 2800,
};

const sizeMultipliers = {
  tarteleta: 1,
  media: 2.4,
  grande: 4,
};

const sizeNames = {
  tarteleta: 'Tarteleta',
  media: 'Media Tarta',
  grande: 'Tarta Grande',
};

const sizePortions = {
  tarteleta: 1,
  media: 3,
  grande: 6,
};

export function generateProducts(): Product[] {
  const products: Product[] = [];

  (Object.keys(basePrices) as Flavor[]).forEach((flavor) => {
    (Object.keys(sizeMultipliers) as Array<keyof typeof sizeMultipliers>).forEach((size) => {
      const basePrice = basePrices[flavor];
      const multiplier = sizeMultipliers[size];
      const price = Math.round(basePrice * multiplier / 100) * 100;
      
      const flavorInfo = flavors.find((f) => f.id === flavor)!;
      
      products.push({
        id: `${flavor}-${size}`,
        name: `${flavorInfo.name} - ${sizeNames[size]}`,
        description: flavorInfo.description,
        price,
        image: flavorInfo.image,
        category: size,
        flavor: flavorInfo.name,
        portions: sizePortions[size],
      });
    });
  });

  return products;
}

export const products = generateProducts();

export const featuredProducts = [
  products.find((p) => p.id === 'jamon-y-queso-grande')!,
  products.find((p) => p.id === 'verdura-media')!,
  products.find((p) => p.id === 'capresse-tarteleta')!,
  products.find((p) => p.id === 'pollo-grande')!,
];

export const sizeOptions = [
  {
    id: 'tarteleta' as const,
    name: 'Tarteleta',
    portions: 1,
    description: 'Individual',
    image: '/tarteleta.jpg',
    basePrice: 2500,
  },
  {
    id: 'media' as const,
    name: 'Media Tarta',
    portions: 3,
    description: 'Para compartir',
    image: '/media_tarta.jpg',
    basePrice: 6900,
  },
  {
    id: 'grande' as const,
    name: 'Tarta Grande',
    portions: 6,
    description: 'Mesa completa',
    image: '/tarta_grande.jpg',
    basePrice: 11900,
  },
];
