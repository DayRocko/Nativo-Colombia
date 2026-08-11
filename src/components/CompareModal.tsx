import React from 'react';
import { X, SlidersHorizontal, Trash2, ShoppingBag } from 'lucide-react';
import { Product, Currency } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  currency: Currency;
  onRemoveFromCompare: (productId: string) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  currency,
  onRemoveFromCompare,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center sm:p-4 bg-[#141312]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full sm:max-w-5xl bg-[#FAF8F5] text-[#1C1917] shadow-2xl sm:rounded-sm border-0 sm:border border-[#D4C9BD] p-4 sm:p-8 min-h-screen sm:min-h-0 sm:my-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#7A6E63] hover:text-[#1C1917]">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6 pb-4 border-b border-[#E8E2D9]">
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-[#8C6D3F] font-semibold mb-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Análisis Comparativo Sartorial</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury uppercase text-[#1C1917]">
            Comparador de Especificaciones
          </h2>
        </div>

        {comparedProducts.length === 0 ? (
          <div className="text-center py-12 text-[#7A6E63] font-serif italic">
            No ha seleccionado modelos para comparar. Utilice el icono de balanza en las fichas de producto.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D4C9BD]">
                  <th className="p-3 uppercase tracking-wider text-[#8C7B6B] w-40">Característica</th>
                  {comparedProducts.map((p) => (
                    <th key={p.id} className="p-3 text-center min-w-[200px]">
                      <div className="relative group">
                        <button
                          onClick={() => onRemoveFromCompare(p.id)}
                          className="absolute -top-1 right-0 text-[#9A8C7E] hover:text-red-600 p-1"
                          title="Quitar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <img src={p.images[0]?.url} alt={p.name} className="w-24 h-28 object-cover mx-auto rounded-xs border border-[#D4C9BD] mb-2" />
                        <h4 className="font-serif-luxury font-medium text-sm text-[#1C1917]">{p.name}</h4>
                        <p className="font-serif font-semibold text-[#8C6D3F]">${p.price} USD</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE5DC] text-[#4A443F]">
                <tr>
                  <td className="p-3 font-semibold text-[#1C1917]">Categoría</td>
                  {comparedProducts.map((p) => <td key={p.id} className="p-3 text-center">{p.category}</td>)}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1C1917]">Composición Tejido</td>
                  {comparedProducts.map((p) => <td key={p.id} className="p-3 text-center">{p.material}</td>)}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1C1917]">Piel de Becerro</td>
                  {comparedProducts.map((p) => <td key={p.id} className="p-3 text-center">{p.leatherType}</td>)}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1C1917]">Herrajes Metálicos</td>
                  {comparedProducts.map((p) => <td key={p.id} className="p-3 text-center">{p.buckleMaterial}</td>)}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1C1917]">Ancho Estándar</td>
                  {comparedProducts.map((p) => <td key={p.id} className="p-3 text-center">{p.width}</td>)}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1C1917]">Elasticidad Confort</td>
                  {comparedProducts.map((p) => <td key={p.id} className="p-3 text-center">{p.elasticity}</td>)}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1C1917]">Origen</td>
                  {comparedProducts.map((p) => <td key={p.id} className="p-3 text-center">{p.origin}</td>)}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1C1917]">Acción</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center">
                      <button
                        onClick={() => onAddToCart(p, p.sizes[0])}
                        className="px-4 py-2 bg-[#1C1917] text-white text-[10px] uppercase tracking-wider font-semibold rounded-xs"
                      >
                        Añadir a Bolsa
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
