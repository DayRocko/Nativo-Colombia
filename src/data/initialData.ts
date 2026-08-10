import { Product, CMSSettings, JournalArticle, Coupon } from '../types';
import { LUXURY_IMAGES } from './imageAssets';

export const INITIAL_CMS_SETTINGS: CMSSettings = {
  brandName: 'Nativo Colombia',
  brandTagline: 'Maison Correas Tejidas de Lujo Colombiano',
  heroTitle: 'EL ALMA DEL TEJIDO',
  heroSubtitle: 'Artesanía Colombiana. Lujo Atemporal.',
  announcementText: 'Envío Express de Cortesía a Todo el Mundo en Pedidos Superiores a $500',
  freeShippingThreshold: 500,
  supportEmail: 'concierge@nativocolombia.com',
  phoneContact: '+57 1 234 5678',
  addressMilano: 'Calle 70 # 5-83, Bogotá D.C., Colombia',
  currencySymbol: '$',
};

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'NATIVO10', discountPercentage: 10, active: true },
  { code: 'VIPBOGOTA', discountPercentage: 15, active: true, minSpend: 600 },
  { code: 'COLOMBIA20', discountPercentage: 20, active: true, minSpend: 1000 },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-monaco-01',
    sku: 'NAT-MNC-001',
    name: 'The Tricolor Boyacá Edition',
    subtitle: 'Signature Rojo, Verde & Amarillo Elastic Weave',
    price: 790,
    currency: 'USD',
    category: 'Boyacá',
    tags: ['Best Seller', 'Boyacá Edition', 'Colombian Leather', 'Hand-Aged Brass'],
    descriptionShort: 'Correa tejida colombiana de elasticidad superior con terminaciones en piel de res colombiana de grano entero y hebilla de latón envejecido a mano.',
    descriptionLong: 'Inspirada en los colores vivos de la sabana cundiboyacense y los páramos colombianos, la correa Tricolor Boyacá Edition es la máxima expresión del tejido elástico artesanal andino. Cada pieza es elaborada individualmente en telares de baja velocidad en Duitama, combinando hilos técnicos de alta resistencia con detalles en piel vegetal de res colombiana curtida en Villapinzón.',
    material: '80% Viscosa Elástica Texturizada, 20% Fibra Técnica Colombiana',
    leatherType: 'Piel de Res de Grano Entero (Villapinzón, Cundinamarca)',
    buckleMaterial: 'Latón Macizo Envejecido a Mano',
    width: '35 mm (1.38 in)',
    elasticity: 'Tejido de Flexibilidad Dinámica (Flex del 18%)',
    weight: '185 g',
    origin: 'Duitama & Bogotá, Colombia',
    isLimitedEdition: true,
    stockCount: 14,
    rating: 4.98,
    reviewCount: 38,
    craftsmanshipNotes: [
      '14 horas de tejido artesanal en telar de lanzadera heredado de generaciones boyacenses',
      'Puntada perimetral doble hecha a mano por maestros artesanos en Bogotá',
      'Pátina de latón cepillado lograda mediante oxidación natural regulada'
    ],
    variants: [
      {
        id: 'var-monaco-navy',
        colorName: 'Azul Marino & Verde Bosque',
        colorHex: '#1B2A4A',
        buckleFinish: 'Brushed Brass',
        inStock: true,
        image: LUXURY_IMAGES.beltMarbleStudio
      },
      {
        id: 'var-monaco-charcoal',
        colorName: 'Carbón & Plata Envejecida',
        colorHex: '#262626',
        buckleFinish: 'Gunmetal',
        inStock: true,
        image: LUXURY_IMAGES.beltCoiledAccessories
      },
      {
        id: 'var-monaco-tan',
        colorName: 'Siena & Crema Marfil',
        colorHex: '#8C5A3C',
        buckleFinish: 'Aged Bronze',
        inStock: true,
        image: LUXURY_IMAGES.beltMarinaLuxury
      }
    ],
    sizes: ['85 cm / 32"', '90 cm / 34"', '95 cm / 36"', '100 cm / 38"', '105 cm / 40"', '110 cm / 42"'],
    images: [
      {
        id: 'img-1',
        title: 'Studio Marble Display',
        url: LUXURY_IMAGES.beltMarbleStudio,
        tag: 'Studio',
        description: 'Correa sobre mármol blanco con iluminación de galería premium'
      },
      {
        id: 'img-2',
        title: 'Buckle Macro Detail',
        url: LUXURY_IMAGES.beltBuckleMacro,
        tag: 'Macro Detail',
        description: 'Detalle macro de la hebilla de latón cepillado y textura trenzada'
      },
      {
        id: 'img-3',
        title: 'Collection Lifestyle',
        url: LUXURY_IMAGES.beltManWearing,
        tag: 'Lifestyle Model',
        description: 'Combinada con camisa de lino y pantalón de sastre colombiano'
      },
      {
        id: 'img-4',
        title: 'Travertine & Accessories',
        url: LUXURY_IMAGES.beltCoiledTravertine,
        tag: 'Studio Lifestyle',
        description: 'Enrollada sobre travertino con reloj vintage y pluma doráda'
      },
      {
        id: 'img-5',
        title: 'Marina Luxury Setting',
        url: LUXURY_IMAGES.beltMarinaLuxury,
        tag: 'Marina',
        description: 'En mesa de mármol junto a una marina con luz dorada tropical'
      },
      {
        id: 'img-6',
        title: 'Accessories Flat Lay',
        url: LUXURY_IMAGES.beltCoiledAccessories,
        tag: 'Flat Lay',
        description: 'Con reloj Rolex, gafas de sol y agenda de cuero sobre mármol'
      },
      {
        id: 'img-7',
        title: 'Cartagena Sojourn',
        url: LUXURY_IMAGES.scenarioYacht,
        tag: 'Cartagena Bay',
        description: 'En la cubierta de una embarcación clásica en la bahía de Cartagena de Indias'
      }
    ]
  },
  {
    id: 'prod-classic-cognac',
    sku: 'NAT-CLS-002',
    name: 'El Clásico Andino Cognac',
    subtitle: 'Warm Amber Colombian Leather & Woven Elastic',
    price: 680,
    currency: 'USD',
    category: 'Classic',
    tags: ['Signature', 'Classic Collection', 'Colombian Leather'],
    descriptionShort: 'Elegancia clásica colombiana en tono coñac cálido con cuero de res curtido al vegetal y hebilla bronce cepillado.',
    descriptionLong: 'Una interpretación moderna del cinturón de viaje andino. El Clásico Andino combina tonos tierra cálidos que complementan perfectamente zapatos de piel en tono coñac o mocasines artesanales. Diseñado con una flexibilidad sutil que garantiza confort durante viajes largos en avión o automóvil por las rutas colombianas.',
    material: '75% Hilo de Seda Sintética Elástica, 25% Algodón Colombiano',
    leatherType: 'Piel de Res Curtida al Vegetal (Villapinzón, Cundinamarca)',
    buckleMaterial: 'Latón Macizo con Baño Bronce Cepillado',
    width: '35 mm (1.38 in)',
    elasticity: 'Elasticidad Moderada de Confort (15% flex)',
    weight: '175 g',
    origin: 'Bogotá, Colombia',
    stockCount: 22,
    rating: 4.95,
    reviewCount: 42,
    craftsmanshipNotes: [
      'Cuero curtido con extractos de dividivi y quebracho colombiano',
      'Construcción antidesgarro con núcleo interno de microfibra reforzada',
      'Acabado a mano de cantos con cera natural de abejas'
    ],
    variants: [
      {
        id: 'var-cls-cognac',
        colorName: 'Coñac & Ámbar',
        colorHex: '#9E5B32',
        buckleFinish: 'Aged Bronze',
        inStock: true,
        image: LUXURY_IMAGES.beltCoiledTravertine
      },
      {
        id: 'var-cls-espresso',
        colorName: 'Marrón Espresso',
        colorHex: '#3E2723',
        buckleFinish: 'Brushed Brass',
        inStock: true,
        image: LUXURY_IMAGES.beltCoiledAccessories
      }
    ],
    sizes: ['85 cm / 32"', '90 cm / 34"', '95 cm / 36"', '100 cm / 38"', '105 cm / 40"'],
    images: [
      {
        id: 'img-cls-1',
        title: 'Coiled on Travertine',
        url: LUXURY_IMAGES.beltCoiledTravertine,
        tag: 'Studio',
        description: 'Enrollada sobre travertino con reloj vintage y pluma doráda'
      },
      {
        id: 'img-cls-2',
        title: 'Accessories Editorial',
        url: LUXURY_IMAGES.beltCoiledAccessories,
        tag: 'Flat Lay',
        description: 'Con reloj, gafas de sol y agenda de cuero sobre mármol blanco'
      },
      {
        id: 'img-cls-3',
        title: 'Sartorial Outfit',
        url: LUXURY_IMAGES.beltManWearing,
        tag: 'Lifestyle Model',
        description: 'Combinado con camisa de lino y pantalón sastre colombiano'
      }
    ]
  },
  {
    id: 'prod-limited-gold',
    sku: 'NAT-LTD-003',
    name: 'El Magnifico Edición Oro Colombia',
    subtitle: 'Deep Navy & Pure 24k Gold Brushed Hardware',
    price: 950,
    currency: 'USD',
    category: 'Limited',
    tags: ['Limited Edition', 'Luxury Collection', '24k Gold Accents'],
    descriptionShort: 'Edición limitada numerada a 100 piezas globales. Hebilla bañada en oro de 24k cepillado y fibra elástica de alta resistencia colombiana.',
    descriptionLong: 'Reservado para coleccionistas y conocedores del ultra-lujo. El Magnifico combina el tono azul noche más profundo inspirado en los cielos de los Llanos Orientales con detalles en oro cepillado de 24 quilates. Cada unidad lleva grabado su número de serie individual en el interior del pasador de cuero colombiano.',
    material: '85% Fibra Técnica Especial, 15% Hilo Elástico Silencioso',
    leatherType: 'Piel de Res de Grano Entero Selección Imperial (Cundinamarca)',
    buckleMaterial: 'Latón Macizo con Baño de Oro de 24K Cepillado',
    width: '35 mm (1.38 in)',
    elasticity: 'Elasticidad de Alta Retención (12% flex)',
    weight: '210 g',
    origin: 'Duitama & Bogotá, Colombia',
    isLimitedEdition: true,
    stockCount: 6,
    rating: 5.0,
    reviewCount: 19,
    craftsmanshipNotes: [
      'Solo 100 ejemplares fabricados para todo el mundo',
      'Grabado láser del número de serie exclusivo (#023/100)',
      'Estuche de madera de cedro macizo hecho a mano en Bogotá incluido'
    ],
    variants: [
      {
        id: 'var-magnifico-gold',
        colorName: 'Azul Noche & Oro 24K',
        colorHex: '#0B1D3A',
        buckleFinish: 'Brushed Brass',
        inStock: true,
        image: LUXURY_IMAGES.beltBuckleMacro
      }
    ],
    sizes: ['90 cm / 34"', '95 cm / 36"', '100 cm / 38"', '105 cm / 40"'],
    images: [
      {
        id: 'img-ltd-1',
        title: 'Buckle Gold Detail',
        url: LUXURY_IMAGES.beltBuckleMacro,
        tag: 'Macro Detail',
        description: 'Detalle macro de la hebilla bañada en oro de 24K'
      },
      {
        id: 'img-ltd-2',
        title: 'Marina de Cartagena',
        url: LUXURY_IMAGES.beltMarinaLuxury,
        tag: 'Marina',
        description: 'En mesa de mármol con vista a la marina bajo luz dorada'
      },
      {
        id: 'img-ltd-3',
        title: 'Luxury Editorial',
        url: LUXURY_IMAGES.beltManWearing,
        tag: 'Lifestyle Model',
        description: 'Presentación editorial de lujo con accesorio de máxima distinción'
      }
    ]
  },
  {
    id: 'prod-navy-riviera',
    sku: 'NAT-NVY-004',
    name: 'The Cartagena Sailing Belt',
    subtitle: 'Nautical Navy & Pure White Dual Weave',
    price: 720,
    currency: 'USD',
    category: 'Caribe',
    tags: ['Caribe Collection', 'Sailing', 'Summer Essential'],
    descriptionShort: 'Diseñado para la vida marítima y clubes náuticos del Caribe colombiano. Resistencia al agua y salinidad.',
    descriptionLong: 'Inspirado en los paseos marítimos de Cartagena de Indias y las Islas del Rosario. The Cartagena Sailing Belt ofrece resistencia superior al entorno salino del Caribe gracias a su tratamiento textil de polímeros protegidos y herrajes inoxidables tratados con pátina marina.',
    material: '90% Poliéster Náutico Hidrofóbico, 10% Elastano de Alto Retorno',
    leatherType: 'Cuero Náutico Tratado a la Cera Marina',
    buckleMaterial: 'Aleación Náutica con Acabado Titanio Mate',
    width: '32 mm (1.26 in)',
    elasticity: 'Ultra Flex (22% de estiramiento suave)',
    weight: '160 g',
    origin: 'Cartagena & Bogotá, Colombia',
    stockCount: 18,
    rating: 4.92,
    reviewCount: 27,
    craftsmanshipNotes: [
      'Sometido a 200 horas de prueba de niebla salina caribeña en laboratorio',
      'Costuras de hilo de alta tenacidad utilizado en velería de competición',
      'Hebilla ultra-ligera de aleación náutica'
    ],
    variants: [
      {
        id: 'var-riviera-navy',
        colorName: 'Azul Marino & Blanco Puro',
        colorHex: '#122240',
        buckleFinish: 'Gunmetal',
        inStock: true,
        image: LUXURY_IMAGES.beltMarbleStudio
      },
      {
        id: 'var-riviera-sand',
        colorName: 'Arena & Azul Riviera',
        colorHex: '#D4B896',
        buckleFinish: 'Polished Silver',
        inStock: true,
        image: LUXURY_IMAGES.beltCoiledTravertine
      }
    ],
    sizes: ['85 cm / 32"', '90 cm / 34"', '95 cm / 36"', '100 cm / 38"', '105 cm / 40"'],
    images: [
      {
        id: 'img-rvr-1',
        title: 'Marina Product Studio',
        url: LUXURY_IMAGES.beltMarinaLuxury,
        tag: 'Marina',
        description: 'Sobre mesa de mármol junto a la marina bajo luz caribeña'
      },
      {
        id: 'img-rvr-2',
        title: 'Deck of Superyacht',
        url: LUXURY_IMAGES.scenarioYacht,
        tag: 'Cartagena Bay',
        description: 'Sobre cubierta de madera bajo el sol caribeño de Cartagena'
      },
      {
        id: 'img-rvr-3',
        title: 'Boutique Collection',
        url: LUXURY_IMAGES.scenarioBoutique,
        tag: 'Boutique',
        description: 'En vitrina iluminada con tonos cálidos de latón'
      }
    ]
  },
  {
    id: 'prod-business-charcoal',
    sku: 'NAT-BSN-005',
    name: 'El Ejecutivo Andino Weave',
    subtitle: 'Stealth Charcoal & Matte Gunmetal Buckle',
    price: 750,
    currency: 'USD',
    category: 'Business',
    tags: ['Business', 'Executive', 'Luxury Collection'],
    descriptionShort: 'Sobriedad ejecutiva para trajes formales. Tono gris carbón apagado con terminación en piel de res negro mate colombiana.',
    descriptionLong: 'Diseñado para la junta directiva y eventos de etiqueta contemporáneos en Bogotá, Medellín y Cali. El Ejecutivo Andino ofrece la estética pulcra de un cinturón sastre pero con el confort elástico invisible de la construcción en telar elástico de la Maison.',
    material: '80% Micro-Trenzado Elástico de Poliamida de Alta Densa',
    leatherType: 'Cuero de Res Nappa Negro Mate (Bogotá, Colombia)',
    buckleMaterial: 'Acero Inoxidable con Recubrimiento PVD Gunmetal Mate',
    width: '32 mm (1.26 in)',
    elasticity: 'Elasticidad Firme (10% flex)',
    weight: '190 g',
    origin: 'Bogotá, Colombia',
    stockCount: 15,
    rating: 4.97,
    reviewCount: 31,
    craftsmanshipNotes: [
      'Tratamiento antihuellas en la hebilla de acero PVD',
      'Bordes bruñidos a mano sin cantos expuestos',
      'Soporta tensión continua manteniendo su memoria de forma por años'
    ],
    variants: [
      {
        id: 'var-executive-black',
        colorName: 'Carbón Sigiloso & Negro Mate',
        colorHex: '#1A1A1A',
        buckleFinish: 'Gunmetal',
        inStock: true,
        image: LUXURY_IMAGES.beltCoiledAccessories
      }
    ],
    sizes: ['85 cm / 32"', '90 cm / 34"', '95 cm / 36"', '100 cm / 38"', '105 cm / 40"', '110 cm / 42"'],
    images: [
      {
        id: 'img-bsn-1',
        title: 'Executive Lifestyle',
        url: LUXURY_IMAGES.beltManWearing,
        tag: 'Lifestyle Model',
        description: 'Ejecutivo vistiendo la correa con traje de lana y camisa blanca'
      },
      {
        id: 'img-bsn-2',
        title: 'Accessories Flat Lay',
        url: LUXURY_IMAGES.beltCoiledAccessories,
        tag: 'Flat Lay',
        description: 'Con reloj, gafas y agenda ejecutiva sobre mármol oscuro'
      },
      {
        id: 'img-bsn-3',
        title: 'Penthouse Office',
        url: LUXURY_IMAGES.scenarioPenthouse,
        tag: 'Penthouse',
        description: 'Sobre escritorio de ébano con iluminación cálida indirecta'
      }
    ]
  },
  {
    id: 'prod-summer-sand',
    sku: 'NAT-SMR-006',
    name: 'El Soleado Verano Colombiano',
    subtitle: 'Sand Cream, Ivory & Natural Brass',
    price: 690,
    currency: 'USD',
    category: 'Summer',
    tags: ['Summer', 'Colombian Collection', 'Light & Breathable'],
    descriptionShort: 'Fresco, ligero y veraniego. Trazos en tono arena y crema con hebilla de latón dorado suave.',
    descriptionLong: 'Pensado para las tardes cálidas de Santa Marta, San Andrés y el Eje Cafetero. El Soleado Verano Colombiano combina fibras naturales de algodón colombiano entrelazadas con micro-hilos elásticos que garantizan máxima transpiración y un aspecto relajado sofisticado bajo el sol tropical.',
    material: '60% Algodón Orgánico Colombiano, 30% Hilo Elástico, 10% Fibra Natural',
    leatherType: 'Cuero de Res Tono Arena Suave (Cundinamarca, Colombia)',
    buckleMaterial: 'Latón Satinado con Pátina Natural',
    width: '35 mm (1.38 in)',
    elasticity: 'Elasticidad Suave (16% flex)',
    weight: '165 g',
    origin: 'Duitama, Colombia',
    stockCount: 19,
    rating: 4.89,
    reviewCount: 24,
    craftsmanshipNotes: [
      'Algodón cultivado de forma sostenible en el Caribe colombiano',
      'Tejido transpirable de porosidad abierta para climas cálidos tropicales',
      'Cuero tratado con aceites vegetales que adquieren pátina única bajo el sol'
    ],
    variants: [
      {
        id: 'var-summer-sand',
        colorName: 'Arena & Crema Marfil',
        colorHex: '#E2D5C3',
        buckleFinish: 'Brushed Brass',
        inStock: true,
        image: LUXURY_IMAGES.beltCoiledTravertine
      }
    ],
    sizes: ['85 cm / 32"', '90 cm / 34"', '95 cm / 36"', '100 cm / 38"', '105 cm / 40"'],
    images: [
      {
        id: 'img-smr-1',
        title: 'Travertine Summer Studio',
        url: LUXURY_IMAGES.beltCoiledTravertine,
        tag: 'Studio',
        description: 'Enrollada sobre travertino con reloj y pluma bajo luz de verano colombiano'
      },
      {
        id: 'img-smr-2',
        title: 'Marble & Accessories',
        url: LUXURY_IMAGES.beltMarbleStudio,
        tag: 'Studio Lifestyle',
        description: 'Sobre mármol blanco con detalles de latón dorado suave'
      },
      {
        id: 'img-smr-3',
        title: 'Costa Santa Marta',
        url: LUXURY_IMAGES.scenarioYacht,
        tag: 'Lifestyle',
        description: 'En terraza privada con vistas a la costa de Santa Marta'
      }
    ]
  }
];

export const INITIAL_JOURNAL_POSTS: JournalArticle[] = [
  {
    id: 'post-1',
    slug: 'elegancia-masculina-correa-tejida',
    title: 'Elegancia Masculina: El Arte de Combinar la Correa Tejida Colombiana',
    subtitle: 'Guía sartorial para el hombre contemporáneo',
    category: 'Estilo & Sartoría',
    readTime: '5 min de lectura',
    date: '18 de Julio, 2026',
    author: 'Alejandro Correa, Director de Arte',
    image: LUXURY_IMAGES.scenarioLifestyle,
    excerpt: 'A diferencia del cinturón rígido tradicional, la correa tejida elástica colombiana aporta un equilibrio sutil entre soltura informal y distinción andina indiscutible.',
    content: [
      'En la artesanía colombiana de alto nivel, el lujo verdadero no se grita: se sugiere mediante texturas ricas, trabajo manual y un ajuste impecable.',
      'La correa tejida elástica nació de la necesidad del caballero viajero colombiano que buscaba sostener la silueta impecable de sus pantalones de lino o lana fría sin comprometer el movimiento natural del cuerpo durante el día.',
      'Para combinar una correa tejida tricolor como la Boyacá Edition, la regla de oro es hacer coincidir el cuero del pasador con el tono de los zapatos (mocasines artesanales coñac o zapatos de cuero colombiano), permitiendo que el entramado de hilos coordine con la camisa o el blazer.'
    ]
  },
  {
    id: 'post-2',
    slug: 'detras-del-telar-boyaca',
    title: 'Detrás del Telar: La Tradición Textil de Boyacá',
    subtitle: 'Un recorrido por el taller artesanal que preserva el patrimonio textil de los Andes colombianos',
    category: 'Patrimonio Artesanal',
    readTime: '7 min de lectura',
    date: '10 de Junio, 2026',
    author: 'Camila Vargas, Curadora de Materiales',
    image: LUXURY_IMAGES.coiledMasterpiece,
    excerpt: 'Visita exclusiva a los telares de lanzadera artesanales en Duitama donde cada centímetro de tejido se supervisa a mano por maestras artesanas boyacenses.',
    content: [
      'En el corazón de los Andes colombianos, Boyacá ostenta una tradición textil que se remonta a las comunidades muiscas, perfeccionada a lo largo de siglos de mestizaje cultural.',
      'Nuestras correas no se producen masivamente en cintas industriales rápidas. Utilizamos telares de lanzadera ajustados a bajas revoluciones en Duitama y Nobsa, lo que otorga la tensión exacta y una simetría geométrica perfecta en los patrones entrelazados.',
      'Cada carrete de hilo pasa por 3 inspecciones ópticas manuales antes de unirse al cuero curtido en Villapinzón, Cundinamarca.'
    ]
  }
];
