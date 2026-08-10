export type Language = 'es' | 'en' | 'it' | 'fr';

export type Currency = 'USD' | 'EUR' | 'GBP';

export interface ProductVariant {
  id: string;
  colorName: string;
  colorHex: string;
  buckleFinish: 'Brushed Brass' | 'Aged Bronze' | 'Gunmetal' | 'Polished Silver';
  inStock: boolean;
  image: string;
}

export interface ProductImageContext {
  id: string;
  title: string;
  url: string;
  tag: 'Studio' | 'Museum' | 'Penthouse' | 'Monaco Yacht' | 'Boutique' | 'Lifestyle Model' | 'Macro Weave';
  description?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  price: number;
  currency: Currency;
  category: 'Classic' | 'Business' | 'Monaco' | 'Navy' | 'Summer' | 'Limited' | 'Luxury' | 'Italian';
  tags: string[];
  descriptionShort: string;
  descriptionLong: string;
  material: string;
  leatherType: string;
  buckleMaterial: string;
  width: string; // e.g. '35 mm (1.38 in)'
  elasticity: string; // e.g. 'High-tension Italian weave (20% flex)'
  weight: string; // e.g. '185 g'
  origin: string; // e.g. 'Bergamo & Milano, Italia'
  isLimitedEdition?: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  sizes: string[]; // ['85 cm / 32"', '90 cm / 34"', '95 cm / 36"', '100 cm / 38"', '105 cm / 40"']
  images: ProductImageContext[];
  views360?: string[];
  videoUrl?: string;
  craftsmanshipNotes: string[];
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  selectedSize: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'Stripe' | 'Apple Pay' | 'Google Pay' | 'PayPal' | 'Mercado Pago';
  shippingAddress: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  trackingNumber?: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string[];
}

export interface CMSSettings {
  brandName: string;
  brandTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  announcementText: string;
  freeShippingThreshold: number;
  supportEmail: string;
  phoneContact: string;
  addressMilano: string;
  currencySymbol: string;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  active: boolean;
  minSpend?: number;
}
