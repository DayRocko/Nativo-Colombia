import { Product, CMSSettings, JournalArticle, Coupon } from '../types';
import { LUXURY_IMAGES } from './imageAssets';

export const INITIAL_CMS_SETTINGS: CMSSettings = {
  brandName: 'Nativo Colombia',
  brandTagline: 'Nativo Colombia Tejidos de Lujo',
  heroTitle: 'EL ALMA DEL TEJIDO',
  heroSubtitle: 'De Colombia para el Mundo. Lujo Atemporal.',
  announcementText: 'Envío Express Nacional Gratuito en Pedidos Superiores a $200.000 COP',
  freeShippingThreshold: 200000,
  supportEmail: 'concierge@nativocolombia.com',
  phoneContact: '+57 1 234 5678',
  addressMilano: 'Calle 70 # 5-83, Bogotá D.C., Colombia',
  currencySymbol: '$',
};

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'NATIVO10', discountPercentage: 10, active: true },
  { code: 'VIPBOGOTA', discountPercentage: 15, active: true, minSpend: 250000 },
  { code: 'COLOMBIA20', discountPercentage: 20, active: true, minSpend: 400000 },
];

export { PRODUCTS_DATA as INITIAL_PRODUCTS } from './products';

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
      'Para combinar una correa tejida tricolor como la Boyacá Edition, la regla de oro es hacer coincidir el cuero del pasador con el tono de los zapatos (mocasines artesanales coñac o zapatos de cuero colombiano), permitiendo que el entramado de hilos coordine con la camisa o el blazer.',
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
      'Cada carrete de hilo pasa por 3 inspecciones ópticas manuales antes de unirse al cuero curtido en Villapinzón, Cundinamarca.',
    ]
  }
];
