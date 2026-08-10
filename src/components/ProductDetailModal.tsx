import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Shield, Check, Star, Share2, Compass, RotateCcw, Truck, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Product, Currency } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  currency: Currency;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  isCompared: boolean;
  onToggleWishlist: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onOpenStylist: () => void;
  relatedProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  isOpen,
  onClose,
  isWishlisted,
  isCompared,
  onToggleWishlist,
  onToggleCompare,
  onAddToCart,
  onOpenStylist,
  relatedProducts,
  onSelectProduct,
}) => {
  if (!isOpen || !product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'story' | 'shipping'>('specs');
  const [is360Mode, setIs360Mode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const activeImage = product.images[selectedImageIndex] || product.images[0];

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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center sm:p-4 md:p-6 bg-[#141312]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full sm:max-w-6xl bg-[#FAF8F5] text-[#1C1917] shadow-2xl sm:rounded-sm overflow-hidden sm:my-auto border-0 sm:border border-[#D4C9BD] min-h-screen sm:min-h-0">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all shadow-md"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col lg:grid lg:grid-cols-12 overflow-y-auto" style={{maxHeight: 'calc(100dvh - 0px)'}}>
          {/* Left Column: Enormous Photo Gallery & Context Switcher (7 cols) */}
          <div className="lg:col-span-7 bg-[#F4EFEA] p-4 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#E8E2D9] flex flex-col justify-between">
            {/* Main Stage View */}
            <div className="relative aspect-square sm:aspect-[4/3] bg-white rounded-xs overflow-hidden shadow-inner border border-[#E0D8CD] group">
              <img
                src={is360Mode ? activeVariant?.image : activeImage.url}
                alt={activeImage.title || product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
              />

              {/* Context Tag Badge */}
              <div className="absolute top-4 left-4 bg-[#1C1917]/85 backdrop-blur-md text-[#FAF8F5] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center gap-2 rounded-xs shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                <span>{activeImage.tag || 'Exhibición'}</span>
              </div>

              {/* 360 View Toggle Button */}
              <button
                onClick={() => setIs360Mode(!is360Mode)}
                className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-xs text-[10px] uppercase tracking-[0.18em] font-medium flex items-center gap-1.5 transition-all backdrop-blur-md shadow-md ${
                  is360Mode
                    ? 'bg-[#C5A880] text-white'
                    : 'bg-white/90 text-[#1C1917] hover:bg-[#1C1917] hover:text-white'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{is360Mode ? 'Vista Estándar' : 'Vista 360°'}</span>
              </button>
            </div>

            {/* Context Caption */}
            {activeImage.description && (
              <p className="mt-3 text-xs text-[#7A6E63] font-serif italic text-center">
                "{activeImage.description}"
              </p>
            )}

            {/* Scenario Thumbnails Switcher */}
            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8C7B6B] mb-2 font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Escenarios de Fotografía Editorial</span>
              </p>
              <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-2 overflow-x-auto pb-1 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => { setSelectedImageIndex(idx); setIs360Mode(false); }}
                    className={`relative aspect-square rounded-xs overflow-hidden border transition-all ${
                      selectedImageIndex === idx && !is360Mode
                        ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30 scale-105'
                        : 'border-[#D4C9BD] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-[#1C1917]/80 text-[#FAF8F5] text-[8px] text-center truncate py-0.5 px-0.5">
                      {img.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: PDP Product Controls & Information (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D3F] font-semibold">
                  {product.category} Collection &bull; {product.sku}
                </span>

                <div className="flex items-center gap-1 text-xs text-[#8C7B6B]">
                  <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                  <span className="font-semibold text-[#1C1917]">{product.rating}</span>
                  <span>({product.reviewCount} opiniones)</span>
                </div>
              </div>

              {/* Title & Price */}
              <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#1C1917] uppercase tracking-wide font-normal">
                {product.name}
              </h2>
              <p className="text-sm text-[#7A6E63] italic font-serif mt-1">
                {product.subtitle}
              </p>

              <div className="mt-4 text-2xl font-serif font-semibold text-[#1C1917] tracking-wider">
                {formatPrice(product.price * quantity, currency)}
              </div>

              <p className="mt-4 text-xs text-[#5C534A] leading-relaxed font-light">
                {product.descriptionLong}
              </p>

              {/* Color Variants Selection */}
              <div className="mt-6 pt-5 border-t border-[#E8E2D9]">
                <label className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1C1917] flex items-center justify-between">
                  <span>Color: <strong>{activeVariant.colorName}</strong></span>
                  <span className="text-[10px] text-[#8C7B6B]">{activeVariant.buckleFinish}</span>
                </label>
                <div className="flex items-center gap-3 mt-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xs border text-xs transition-all ${
                        selectedVariantIndex === idx
                          ? 'border-[#1C1917] bg-[#1C1917] text-white font-medium shadow-sm'
                          : 'border-[#D4C9BD] bg-white text-[#4A443F] hover:border-[#8C6D3F]'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: v.colorHex }} />
                      <span>{v.colorName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes Selection & Size Helper */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1C1917]">
                    Talla de Correa Italiana
                  </label>
                  <button
                    onClick={onOpenStylist}
                    className="text-[10px] uppercase tracking-wider text-[#8C6D3F] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Calcular Talla con IA</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs transition-all border text-center font-medium rounded-xs ${
                        selectedSize === sz
                          ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-sm'
                          : 'bg-white text-[#4A443F] border-[#D4C9BD] hover:border-[#8C6D3F]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Main Cart Actions */}
              <div className="mt-8 flex items-center gap-3">
                <div className="flex items-center border border-[#D4C9BD] rounded-xs bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm text-[#4A443F] hover:bg-[#F4EFEA]"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-semibold text-[#1C1917]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm text-[#4A443F] hover:bg-[#F4EFEA]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => onAddToCart(product, selectedSize, quantity)}
                  className="flex-1 py-3.5 bg-[#1C1917] hover:bg-[#332E2A] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Añadir a la Bolsa</span>
                </button>
              </div>

              {/* Secondary Action Icons */}
              <div className="mt-4 flex items-center justify-between text-xs text-[#6E645A]">
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`flex items-center gap-1.5 hover:text-[#1C1917] transition-colors ${
                    isWishlisted ? 'text-[#8C6D3F] font-semibold' : ''
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#8C6D3F]' : ''}`} />
                  <span>{isWishlisted ? 'En Lista de Deseos' : 'Guardar en Favoritos'}</span>
                </button>

                <button
                  onClick={() => onToggleCompare(product)}
                  className={`flex items-center gap-1.5 hover:text-[#1C1917] transition-colors ${
                    isCompared ? 'text-[#8C6D3F] font-semibold' : ''
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>{isCompared ? 'En Comparador' : 'Comparar Especificaciones'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 hover:text-[#1C1917] transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? '¡Enlace Copiado!' : 'Compartir'}</span>
                </button>
              </div>
            </div>

            {/* Product Specifications & Provenance Tabs */}
            <div className="mt-8 pt-6 border-t border-[#E8E2D9]">
              <div className="flex border-b border-[#E0D8CD] text-xs uppercase tracking-[0.18em] font-medium text-[#7A6E63] gap-6">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 border-b-2 transition-all ${
                    activeTab === 'specs' ? 'border-[#1C1917] text-[#1C1917] font-semibold' : 'border-transparent'
                  }`}
                >
                  Ficha Técnica
                </button>
                <button
                  onClick={() => setActiveTab('story')}
                  className={`pb-2 border-b-2 transition-all ${
                    activeTab === 'story' ? 'border-[#1C1917] text-[#1C1917] font-semibold' : 'border-transparent'
                  }`}
                >
                  Artesanía
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 border-b-2 transition-all ${
                    activeTab === 'shipping' ? 'border-[#1C1917] text-[#1C1917] font-semibold' : 'border-transparent'
                  }`}
                >
                  Envío & Garantía
                </button>
              </div>

              <div className="py-4 text-xs text-[#5C534A] leading-relaxed">
                {activeTab === 'specs' && (
                  <dl className="grid grid-cols-2 gap-y-2 gap-x-4">
                    <div><dt className="text-[#8C7B6B]">Material Tejido:</dt><dd className="font-medium text-[#1C1917]">{product.material}</dd></div>
                    <div><dt className="text-[#8C7B6B]">Piel de Pasadores:</dt><dd className="font-medium text-[#1C1917]">{product.leatherType}</dd></div>
                    <div><dt className="text-[#8C7B6B]">Hebilla Metálica:</dt><dd className="font-medium text-[#1C1917]">{product.buckleMaterial}</dd></div>
                    <div><dt className="text-[#8C7B6B]">Ancho Estándar:</dt><dd className="font-medium text-[#1C1917]">{product.width}</dd></div>
                    <div><dt className="text-[#8C7B6B]">Elasticidad:</dt><dd className="font-medium text-[#1C1917]">{product.elasticity}</dd></div>
                    <div><dt className="text-[#8C7B6B]">Origen de Fabricación:</dt><dd className="font-medium text-[#1C1917]">{product.origin}</dd></div>
                  </dl>
                )}

                {activeTab === 'story' && (
                  <ul className="space-y-2">
                    {product.craftsmanshipNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C5A880] mt-0.5 shrink-0" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2.5">
                    <p className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#8C6D3F]" />
                      <span>Envío Express Gratuito DHL/FedEx en compras mayores a $500.</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#8C6D3F]" />
                      <span>Garantía de por vida Nativo Colombia en hebilla y costuras.</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
