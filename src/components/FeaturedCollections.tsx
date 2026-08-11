import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { ProductCard } from './ProductCard';
import { Compass, Sparkles } from 'lucide-react';

interface FeaturedCollectionsProps {
  products: Product[];
  currency: Currency;
  wishlistIds: string[];
  compareIds: string[];
  onToggleWishlist: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

const CATEGORIES = [
  { id: 'ALL', name: 'Toda la Colección', subtitle: 'El legado completo de nuestra artesanía andina' },
  { id: 'Esmeralda', name: 'Edición Esmeralda', subtitle: 'Tonos vivos inspirados en la esmeralda de Muzo' },
  { id: 'Cafetera', name: 'Colección Cafetera', subtitle: 'Matices tierra y dorados del eje cafetero' },
  { id: 'Bogota', name: 'Línea Bogotá', subtitle: 'Elegancia clásica para la capital' },
  { id: 'Ejecutiva', name: 'Línea Ejecutiva Andina', subtitle: 'Sobriedad absoluta para la sala de juntas' },
  { id: 'Cartagena', name: 'Colección Cartagena', subtitle: 'Tonos profundos inspirados en el mar Caribe colombiano' },
  { id: 'Caribe', name: 'Colección Caribe', subtitle: 'Fibras frescas y tonos claros para el verano eterno' },
  { id: 'Oro', name: 'Edición Oro Colombia', subtitle: 'Detalles bañados en oro de 24 quilates, edición numerada' }
];

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  products,
  currency,
  wishlistIds,
  compareIds,
  onToggleWishlist,
  onToggleCompare,
  onQuickView,
  onAddToCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const filteredProducts = activeCategory === 'ALL'
    ? products
    : products.filter(p => p.category === activeCategory);
    
  const activeCategoryObj = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <section id="collection" className="py-20 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#8C6D3F] mb-3 font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Catálogo Nativo Colombia</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury tracking-wide text-[#1C1917] font-normal uppercase">
            Colección de Correas Tejidas
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6E645A] font-light leading-relaxed">
            Tejido elástico italiano de alta ingeniería, rematado en piel de becerro de grano entero y hebillas de latón macizo cepillado.
          </p>
        </div>

        {/* Category Filters Pill Navigation */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-all whitespace-nowrap rounded-xs ${
                activeCategory === cat.id
                  ? 'bg-[#1C1917] text-[#FAF8F5] font-semibold shadow-md'
                  : 'bg-[#F4EFEA] text-[#5C534A] hover:bg-[#EBE3D8] hover:text-[#1C1917]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        
        {/* Dynamic Subtitle */}
        {activeCategoryObj && (
          <div className="text-center mb-10 -mt-6">
            <p className="text-sm text-[#6E645A] font-serif italic tracking-wide">
              {activeCategoryObj.subtitle}
            </p>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isWishlisted={wishlistIds.includes(product.id)}
              isCompared={compareIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onToggleCompare={onToggleCompare}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-[#F4EFEA] rounded-sm border border-[#E0D8CD]">
            <p className="text-base text-[#6E645A] font-serif italic">
              Próximamente nuevas piezas en esta colección.
            </p>
            <button
              onClick={() => setActiveCategory('ALL')}
              className="mt-4 px-6 py-2.5 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium"
            >
              Ver Toda la Colección
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
