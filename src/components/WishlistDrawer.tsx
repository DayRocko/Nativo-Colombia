import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, Currency } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  currency: Currency;
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currency,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-[#141312]/70 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen sm:max-w-md bg-[#FAF8F5] text-[#1C1917] shadow-2xl border-l border-[#D4C9BD] flex flex-col justify-between">
          <div className="p-6 border-b border-[#E8E2D9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#8C6D3F] fill-[#8C6D3F]" />
              <h3 className="text-xl font-serif-luxury uppercase tracking-wider text-[#1C1917]">
                Lista de Deseos Exclusiva
              </h3>
            </div>

            <button onClick={onClose} className="p-2 text-[#7A6E63] hover:text-[#1C1917]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#EBE5DC]">
            {wishlistProducts.map((p) => (
              <div key={p.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                <img
                  src={p.images[0]?.url}
                  alt={p.name}
                  className="w-16 h-20 object-cover rounded-xs border border-[#D4C9BD] bg-white shrink-0"
                />

                <div className="flex-1">
                  <h4 className="text-sm font-serif-luxury font-medium text-[#1C1917]">{p.name}</h4>
                  <p className="text-xs font-serif text-[#8C6D3F] font-semibold">${p.price} USD</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onAddToCart(p, p.sizes[0])}
                      className="px-3 py-1 bg-[#1C1917] text-white text-[10px] uppercase tracking-wider font-semibold rounded-xs flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Mover a Bolsa</span>
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(p.id)}
                      className="p-1 text-[#9A8C7E] hover:text-red-600"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {wishlistProducts.length === 0 && (
              <div className="text-center py-20 text-[#7A6E63] font-serif italic">
                No tiene piezas guardadas en su Lista de Deseos.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
