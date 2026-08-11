import React, { useState, useEffect, useMemo } from 'react';
import { X, Sparkles, Send, CheckCircle2, ArrowRight, ChevronLeft, ArrowLeft, Ruler, ShoppingBag, Star } from 'lucide-react';
import { Language, Product, Currency } from '../types';

interface AIConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  products?: Product[];
  currency?: Currency;
  onAddToCart?: (product: Product, size: string) => void;
}

const OCCASIONS = [
  { id: 'oficina', label: 'Oficina / Corporativo', icon: '💼', catMatch: ['Ejecutiva', 'Bogota'] },
  { id: 'boda', label: 'Boda o Evento Formal', icon: '🥂', catMatch: ['Oro', 'Ejecutiva'] },
  { id: 'yate', label: 'Yate / Día de Mar', icon: '🛥️', catMatch: ['Cartagena', 'Caribe'] },
  { id: 'golf', label: 'Golf / Tenis Club', icon: '⛳', catMatch: ['Cafetera', 'Caribe'] },
  { id: 'cena', label: 'Cena Casual-Elegante', icon: '🍸', catMatch: ['Esmeralda', 'Bogota'] },
  { id: 'viaje', label: 'Viaje / Ciudad', icon: '✈️', catMatch: ['Cafetera', 'Bogota'] }
];

const TROUSER_COLORS = [
  { id: 'beige', label: 'Beige / Lino', hex: '#E5D3B3' },
  { id: 'marino', label: 'Azul Marino', hex: '#1C2841' },
  { id: 'gris', label: 'Gris Oxford', hex: '#4A4A4A' },
  { id: 'negro', label: 'Negro Clásico', hex: '#111111' },
  { id: 'blanco', label: 'Blanco Marfil', hex: '#F0EAD6' },
  { id: 'any', label: 'No estoy seguro', hex: 'conic-gradient(from 0deg, #E5D3B3, #1C2841, #4A4A4A, #111111, #F0EAD6, #E5D3B3)' }
];

const SHOE_TYPES = [
  { id: 'moca_conac', label: 'Mocasín Coñac', icon: '👞' },
  { id: 'oxford_negro', label: 'Oxford Negro', icon: '👞' },
  { id: 'sneaker_blanco', label: 'Sneaker Blanco', icon: '👟' },
  { id: 'loafer_ante', label: 'Loafer de Ante', icon: '👞' },
  { id: 'any', label: 'Sugiéreme', icon: '✨' }
];

const BUCKLES = [
  { id: 'dorada', label: 'Dorada / Bronce', match: ['Brushed Brass', 'Gold 24K', 'Aged Bronze'] },
  { id: 'plata', label: 'Plata / Titanio', match: ['Polished Silver', 'Gunmetal'] },
  { id: 'any', label: 'Me da igual' }
];

export const AIConciergeModal: React.FC<AIConciergeModalProps> = ({ 
  isOpen, 
  onClose, 
  language, 
  products = [], 
  currency = 'COP' as Currency,
  onAddToCart 
}) => {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [answers, setAnswers] = useState({
    occasion: '',
    trouser: '',
    shoe: '',
    waist: 34,
    buckle: '',
    formality: ''
  });

  const [result, setResult] = useState<{ match: Product, alts: Product[], score: number, note: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setResult(null);
      setAnswers({ occasion: '', trouser: '', shoe: '', waist: 34, buckle: '', formality: '' });
      setIsAnalyzing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => setStep(p => Math.min(4, p + 1));
  const handlePrev = () => setStep(p => Math.max(1, p - 1));

  const formatPrice = (amount: number, curr: Currency) => {
    if (curr === 'COP') return `$${amount.toLocaleString('es-CO')} COP`;
    return `${amount.toLocaleString()} ${curr}`;
  };

  const generateRecommendations = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      // 1. Scoring Logic
      const scoredProducts = products.map(p => {
        let score = 0;
        const occ = OCCASIONS.find(o => o.id === answers.occasion);
        
        // Category match
        if (occ && occ.catMatch.includes(p.category)) score += 30;
        else score += 10; // Base score
        
        // Buckle match
        if (answers.buckle && answers.buckle !== 'any') {
          const bkl = BUCKLES.find(b => b.id === answers.buckle);
          if (bkl && p.variants.some(v => bkl.match.includes(v.buckleFinish))) {
            score += 25;
          }
        } else {
          score += 15;
        }

        // Add some random fuzziness so it's not identical every time for the same inputs
        score += Math.floor(Math.random() * 15);
        
        return { product: p, score };
      });

      scoredProducts.sort((a, b) => b.score - a.score);
      
      const topMatch = scoredProducts[0].product;
      const alts = [scoredProducts[1].product, scoredProducts[2].product];
      const matchScore = Math.min(99, Math.max(88, Math.floor(80 + (scoredProducts[0].score / 70) * 19)));

      const occLabel = OCCASIONS.find(o => o.id === answers.occasion)?.label.toLowerCase() || 'su evento';
      const trouserLabel = TROUSER_COLORS.find(t => t.id === answers.trouser)?.label.toLowerCase() || 'su pantalón';
      const shoeLabel = SHOE_TYPES.find(s => s.id === answers.shoe)?.label.toLowerCase() || 'su calzado';

      const note = `Para ${occLabel} combinando ${trouserLabel} y ${shoeLabel}, esta pieza de la colección ${topMatch.category} es la elección ideal. Su trama elástica aporta un balance perfecto entre sofisticación y confort para su talla de ${answers.waist}".`;

      setResult({ match: topMatch, alts, score: matchScore, note });
      setIsAnalyzing(false);
      setStep(5); // Result step
    }, 1800);
  };

  const handleAddToCartClick = (p: Product) => {
    if (onAddToCart) {
      const szStr = p.sizes.find(s => s.includes(answers.waist.toString())) || p.sizes[1] || p.sizes[0];
      onAddToCart(p, szStr);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141312]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] text-[#1C1917] shadow-2xl rounded-sm overflow-hidden my-auto border border-[#C5A880]/50 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EBE5DC] flex items-center justify-between sticky top-0 bg-[#FAF8F5] z-10">
          <div className="flex items-center gap-3">
            {step > 1 && step < 5 && !isAnalyzing && (
              <button onClick={handlePrev} className="p-1 hover:bg-[#EBE5DC] rounded-full transition-colors text-[#7A6E63]">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1C1917]">
                Personal Shopper IA
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-[#7A6E63] hover:text-[#1C1917] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {step < 5 && !isAnalyzing && (
          <div className="w-full h-1 bg-[#EBE5DC]">
            <div 
              className="h-full bg-[#C5A880] transition-all duration-500 ease-out" 
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
          
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-pulse">
              <div className="w-16 h-16 rounded-full border-2 border-[#C5A880] border-t-transparent animate-spin mb-6"></div>
              <h3 className="text-xl font-serif-luxury text-[#1C1917] uppercase tracking-wide">Analizando su estilo...</h3>
              <p className="text-sm text-[#7A6E63] mt-2">Curando la selección perfecta de nuestro catálogo.</p>
            </div>
          ) : step === 1 ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-serif-luxury text-[#1C1917] mb-2">¿Para qué ocasión busca la correa?</h3>
              <p className="text-xs text-[#7A6E63] mb-6">Seleccione el escenario principal donde la usará.</p>
              
              <div className="grid grid-cols-2 gap-3">
                {OCCASIONS.map(occ => (
                  <button
                    key={occ.id}
                    onClick={() => { setAnswers(p => ({ ...p, occasion: occ.id })); handleNext(); }}
                    className={`p-4 border text-left rounded-sm transition-all flex flex-col gap-2 ${
                      answers.occasion === occ.id 
                        ? 'border-[#C5A880] bg-[#C5A880]/5 ring-1 ring-[#C5A880]' 
                        : 'border-[#D4C9BD] hover:border-[#8C7B6B] bg-white'
                    }`}
                  >
                    <span className="text-2xl">{occ.icon}</span>
                    <span className="text-sm font-medium text-[#1C1917]">{occ.label}</span>
                  </button>
                ))}
              </div>
            </div>

          ) : step === 2 ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-serif-luxury text-[#1C1917] mb-6">Detalles de su atuendo</h3>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-semibold text-[#1C1917] mb-3">
                    Tono del Pantalón
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {TROUSER_COLORS.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setAnswers(p => ({ ...p, trouser: c.id }))}
                        className={`flex items-center gap-2 px-3 py-2 border rounded-full transition-all ${
                          answers.trouser === c.id ? 'border-[#C5A880] bg-white shadow-sm' : 'border-[#D4C9BD] hover:bg-white bg-transparent'
                        }`}
                      >
                        <span 
                          className="w-4 h-4 rounded-full border border-black/10" 
                          style={{ background: c.hex }}
                        />
                        <span className="text-xs font-medium text-[#332E2A]">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-semibold text-[#1C1917] mb-3">
                    Calzado
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {SHOE_TYPES.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setAnswers(p => ({ ...p, shoe: s.id }))}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-sm transition-all ${
                          answers.shoe === s.id ? 'border-[#C5A880] bg-[#C5A880]/5' : 'border-[#D4C9BD] hover:border-[#8C7B6B] bg-white'
                        }`}
                      >
                        <span>{s.icon}</span>
                        <span className="text-xs font-medium text-[#332E2A]">{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!answers.trouser || !answers.shoe}
                  className="px-8 py-3 bg-[#1C1917] disabled:bg-[#D4C9BD] text-white text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors"
                >
                  Siguiente
                </button>
              </div>
            </div>

          ) : step === 3 ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center">
              <h3 className="text-2xl font-serif-luxury text-[#1C1917] mb-2">Su Talla de Cintura</h3>
              <p className="text-xs text-[#7A6E63] mb-10">Deslice para seleccionar su medida habitual.</p>

              <div className="max-w-xs mx-auto py-8">
                <div className="text-4xl font-serif-luxury text-[#1C1917] mb-6">
                  {answers.waist}" <span className="text-lg text-[#7A6E63]">/ {Math.round(answers.waist * 2.54)} cm</span>
                </div>
                
                <input 
                  type="range" 
                  min="28" 
                  max="44" 
                  step="2"
                  value={answers.waist}
                  onChange={(e) => setAnswers(p => ({ ...p, waist: parseInt(e.target.value) }))}
                  className="w-full accent-[#C5A880] h-2 bg-[#EBE5DC] rounded-lg appearance-none cursor-pointer"
                />
                
                <div className="flex justify-between mt-2 text-[10px] text-[#9A8C7E] font-medium">
                  <span>28"</span>
                  <span>36"</span>
                  <span>44"</span>
                </div>
              </div>

              <div className="bg-[#FAF8F5] border border-[#EBE5DC] p-4 rounded-sm flex items-start gap-3 text-left max-w-sm mx-auto mt-4">
                <Ruler className="w-5 h-5 text-[#C5A880] shrink-0" />
                <p className="text-xs text-[#6E645A] leading-relaxed">
                  ¿No conoce su talla exacta? Recomendamos pedir 2 pulgadas más que su talla habitual de pantalón. Nuestras correas elásticas se ajustan milimétricamente en cualquier punto del tejido.
                </p>
              </div>

              <div className="mt-10 flex justify-center">
                <button
                  onClick={handleNext}
                  className="px-10 py-3 bg-[#1C1917] text-white text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors"
                >
                  Siguiente
                </button>
              </div>
            </div>

          ) : step === 4 ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-serif-luxury text-[#1C1917] mb-6">Preferencias Finales</h3>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-semibold text-[#1C1917] mb-3">
                    Acabado de la Hebilla
                  </label>
                  <div className="flex flex-col gap-2">
                    {BUCKLES.map(b => (
                      <button
                        key={b.id}
                        onClick={() => setAnswers(p => ({ ...p, buckle: b.id }))}
                        className={`flex items-center justify-between p-3 border rounded-sm transition-all ${
                          answers.buckle === b.id ? 'border-[#C5A880] bg-[#C5A880]/5' : 'border-[#D4C9BD] hover:border-[#8C7B6B] bg-white'
                        }`}
                      >
                        <span className="text-sm font-medium text-[#332E2A]">{b.label}</span>
                        {answers.buckle === b.id && <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={generateRecommendations}
                  className="text-xs text-[#7A6E63] hover:text-[#1C1917] underline underline-offset-4"
                >
                  Omitir preferencias
                </button>
                <button
                  onClick={generateRecommendations}
                  className="w-full sm:w-auto px-8 py-3 bg-[#C5A880] hover:bg-[#B5966B] text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span>Obtener Recomendación</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          ) : result && (
            <div className="animate-in fade-in zoom-in-95 duration-700 pb-4">
              <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
                
                {/* Visuals - 3 Images Gallery */}
                <div className="md:w-1/2 space-y-3">
                  <div className="aspect-[4/5] bg-[#F4EFEA] rounded-sm overflow-hidden border border-[#EBE5DC]">
                    <img 
                      src={result.match.images[0]?.url || result.match.variants[0].image} 
                      alt={result.match.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-square bg-[#F4EFEA] rounded-sm overflow-hidden border border-[#EBE5DC]">
                      <img 
                        src={result.match.images[1]?.url || result.match.images[0]?.url} 
                        alt="Detalle"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square bg-[#F4EFEA] rounded-sm overflow-hidden border border-[#EBE5DC]">
                      <img 
                        src={result.match.images[2]?.url || result.match.images[0]?.url} 
                        alt="Lifestyle"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Info & Actions */}
                <div className="md:w-1/2 flex flex-col justify-center">
                  
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#8C6D3F] text-[10px] uppercase tracking-widest font-bold rounded-sm mb-4 self-start">
                    <Star className="w-3 h-3 fill-current" />
                    MATCH PERFECTO — {result.score}%
                  </div>

                  <h2 className="text-3xl font-serif-luxury text-[#1C1917] mb-1">
                    {result.match.name}
                  </h2>
                  <div className="text-xl font-serif text-[#7A6E63] mb-6">
                    {formatPrice(result.match.price, currency)}
                  </div>

                  {result.match.isLimitedEdition && (
                    <div className="text-[10px] uppercase tracking-widest font-bold text-red-700 bg-red-50 border border-red-100 px-3 py-2 rounded-sm mb-6 inline-block">
                      🔥 Edición Limitada — Quedan pocas unidades
                    </div>
                  )}

                  <div className="bg-[#FAF8F5] border-l-2 border-[#C5A880] p-4 mb-8">
                    <p className="text-xs text-[#332E2A] italic leading-relaxed font-serif">
                      "{result.note}"
                    </p>
                    <p className="text-[9px] uppercase tracking-widest font-semibold text-[#8C7B6B] mt-2 mt-3">
                      — Su Personal Shopper
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCartClick(result.match)}
                    className="w-full py-4 bg-[#1C1917] hover:bg-[#332E2A] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-xs shadow-xl transition-all flex justify-center items-center gap-2 mb-8"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    AGREGAR AL CARRITO
                  </button>

                  {/* Alternatives */}
                  <div className="border-t border-[#EBE5DC] pt-6">
                    <h4 className="text-[10px] uppercase tracking-widest font-semibold text-[#7A6E63] mb-4 text-center">
                      También combina perfecto
                    </h4>
                    <div className="flex gap-4 justify-center">
                      {result.alts.map(alt => (
                        <button
                          key={alt.id}
                          onClick={() => {
                            setResult(prev => prev ? {
                              ...prev,
                              match: alt,
                              alts: [prev.match, ...prev.alts.filter(a => a.id !== alt.id)].slice(0, 2),
                              note: `Recomendación alternativa ajustada a sus preferencias: ${alt.name}. La trama de la colección ${alt.category} combina maravillosamente con el atuendo seleccionado.`
                            } : null);
                          }}
                          className="flex items-center gap-3 p-2 border border-[#EBE5DC] rounded-sm hover:border-[#C5A880] transition-colors w-full bg-white text-left group"
                        >
                          <img src={alt.variants[0].image} alt={alt.name} className="w-10 h-10 object-cover rounded-[2px]" />
                          <div>
                            <p className="text-[10px] font-semibold text-[#1C1917] group-hover:text-[#C5A880] transition-colors truncate w-24 sm:w-32">{alt.name}</p>
                            <p className="text-[9px] text-[#7A6E63]">{formatPrice(alt.price, currency)}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button onClick={() => setStep(1)} className="text-[10px] uppercase tracking-widest font-medium text-[#7A6E63] hover:text-[#1C1917] underline underline-offset-4 transition-colors">
                      Volver a intentar el cuestionario
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
