import React, { useState } from 'react';
import { X, Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Product, Currency } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(1000);

  const filteredProducts = products.filter((p) => {
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.material.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesPrice = p.price <= maxPrice;

    return matchesQuery && matchesCategory && matchesPrice;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:pt-16 bg-[#141312]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full sm:max-w-3xl bg-[#FAF8F5] text-[#1C1917] shadow-2xl sm:rounded-sm border-0 sm:border border-[#D4C9BD] p-4 sm:p-8 min-h-screen sm:min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
          <div className="flex items-center gap-3 flex-1 pr-4">
            <Search className="w-5 h-5 text-[#8C6D3F]" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por modelo, material, hebilla, color o colección (ej. Monaco, Coñac, Mármol)..."
              className="w-full bg-transparent text-sm sm:text-base text-[#1C1917] placeholder-[#9A8C7E] focus:outline-none font-serif"
            />
          </div>

          <button onClick={onClose} className="p-2 text-[#7A6E63] hover:text-[#1C1917]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="py-4 border-b border-[#E8E2D9] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.18em] font-semibold text-[#8C7B6B] mb-1">
              Categoría / Colección
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 bg-white border border-[#D4C9BD] text-xs font-medium text-[#1C1917] rounded-xs"
            >
              <option value="ALL">Todas las Colecciones</option>
              <option value="Monaco">Monaco Edition</option>
              <option value="Classic">Clásicas</option>
              <option value="Business">Business</option>
              <option value="Navy">Navy Collection</option>
              <option value="Summer">Summer</option>
              <option value="Limited">Edición Limitada</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.18em] font-semibold text-[#8C7B6B] mb-1">
              Precio Máximo: <strong>${maxPrice} USD</strong>
            </label>
            <input
              type="range"
              min="500"
              max="1000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#1C1917]"
            />
          </div>
        </div>

        {/* Search Results List */}
        <div className="mt-4 max-h-[50vh] overflow-y-auto divide-y divide-[#EBE5DC]">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => { onSelectProduct(p); onClose(); }}
              className="p-3 hover:bg-[#F4EFEA] transition-colors rounded-xs flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <img src={p.images[0]?.url} alt={p.name} className="w-12 h-12 object-cover rounded-xs border border-[#D4C9BD]" />
                <div>
                  <h4 className="text-sm font-serif-luxury font-medium text-[#1C1917] group-hover:text-[#8C6D3F]">
                    {p.name}
                  </h4>
                  <p className="text-xs text-[#7A6E63]">{p.category} &bull; {p.material}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-serif font-semibold text-[#1C1917]">${p.price}</span>
                <ArrowRight className="w-4 h-4 text-[#8C6D3F] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="text-center py-10 text-xs text-[#7A6E63] font-serif italic">
              No se encontraron correas que coincidan con los criterios especificados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
