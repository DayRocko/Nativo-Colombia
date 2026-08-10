import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, SlidersHorizontal, Star } from 'lucide-react';
import { Product, Currency } from '../types';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isWishlisted: boolean;
  isCompared: boolean;
  onToggleWishlist: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  isCompared,
  onToggleWishlist,
  onToggleCompare,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeVariant = product.variants[selectedVariantIndex] || product.variants[0];

  // Currency Converter helper
  const formatPrice = (amountUSD: number, curr: Currency) => {
    switch (curr) {
      case 'EUR':
        return `€${Math.round(amountUSD * 0.92)}`;
      case 'GBP':
        return `£${Math.round(amountUSD * 0.78)}`;
      default:
        return `$${amountUSD.toLocaleString()}`;
    }
  };

  // Primary image vs Hover image
  const primaryImg = activeVariant?.image || product.images[0]?.url;
  const secondaryImg = product.images[1]?.url || product.images[0]?.url;

  return (
    <div
      className="group relative flex flex-col bg-[#FAF8F5] border border-[#EBE5DC] hover:border-[#C5A880]/60 transition-all duration-500 rounded-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-[#F4EFEA] overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={isHovered ? secondaryImg : primaryImg}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isLimitedEdition && (
            <span className="px-2.5 py-1 bg-[#1C1917] text-[#FAF8F5] text-[9px] uppercase tracking-[0.2em] font-semibold rounded-xs shadow-md">
              Edición Limitada
            </span>
          )}
          {product.category === 'Monaco' && (
            <span className="px-2.5 py-1 bg-[#8C6D3F] text-white text-[9px] uppercase tracking-[0.2em] font-semibold rounded-xs shadow-md">
              Monaco Edition
            </span>
          )}
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
              isWishlisted
                ? 'bg-[#1C1917] text-[#C5A880]'
                : 'bg-white/80 text-[#1C1917] hover:bg-white hover:text-[#C5A880]'
            }`}
            title="Añadir a Deseos"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A880]' : ''}`} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onToggleCompare(product); }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
              isCompared
                ? 'bg-[#1C1917] text-[#C5A880]'
                : 'bg-white/80 text-[#1C1917] hover:bg-white hover:text-[#C5A880]'
            }`}
            title="Comparar"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Action Bar — always visible on mobile, hover on desktop */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/60 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            className="flex-1 py-2.5 bg-[#FAF8F5] hover:bg-white text-[#1C1917] text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vista Galería</span>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product, product.sizes[1] || product.sizes[0]); }}
            className="p-2.5 bg-[#C5A880] hover:bg-[#B5966B] text-white transition-colors shadow-sm"
            title="Añadir Rápido a la Bolsa"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Color Swatches */}
          {product.variants.length > 0 && (
            <div className="flex items-center gap-2 mb-3">
              {product.variants.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedVariantIndex === idx ? 'ring-2 ring-[#C5A880] ring-offset-2 scale-110' : 'border-[#D4C9BD]'
                  }`}
                  style={{ backgroundColor: v.colorHex }}
                  title={v.colorName}
                />
              ))}
              <span className="text-[10px] text-[#8C7B6B] ml-1 tracking-wider uppercase">
                {activeVariant.colorName}
              </span>
            </div>
          )}

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-lg font-serif-luxury tracking-wide text-[#1C1917] font-medium hover:text-[#8C6D3F] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#7A6E63] mt-1 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#EBE5DC] flex items-center justify-between">
          <div className="text-base font-serif font-semibold text-[#1C1917] tracking-wider">
            {formatPrice(product.price, currency)}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#8C7B6B]">
            <Star className="w-3 h-3 fill-[#C5A880] text-[#C5A880]" />
            <span className="font-medium text-[#1C1917]">{product.rating}</span>
            <span className="text-[10px] text-[#9A8C7E]">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
