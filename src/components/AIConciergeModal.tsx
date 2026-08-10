import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface AIConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AIConciergeModal: React.FC<AIConciergeModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const [eventType, setEventType] = useState('Boda en Mónaco / Evento de Verano');
  const [trouserColor, setTrouserColor] = useState('Blanco Marfil / Lino Beige');
  const [shoeLeather, setShoeLeather] = useState('Gamuza Coñac / Mocasín');
  const [waistSize, setWaistSize] = useState('34 pulgadas (86 cm)');
  const [userNote, setUserNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: userNote,
          eventType,
          trouserColor,
          shoeLeather,
          waistSize,
          lang: language
        })
      });

      const data = await res.json();
      if (data.success) {
        setRecommendation(data.recommendation);
      } else {
        setRecommendation("Ha ocurrido una ligera interrupción. Le recomendamos la correa *The Bianconero Monaco Edition* talla 90 cm / 34\" para su atuendo.");
      }
    } catch (err) {
      console.error("AI Concierge fetch error:", err);
      setRecommendation("Le recomendamos la correa *The Bianconero Monaco Edition* talla 90 cm / 34\" para combinar con pantalón de lino marfil y mocasines de gamuza.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141312]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] text-[#1C1917] shadow-2xl rounded-sm overflow-hidden my-auto border border-[#C5A880]/50 p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7A6E63] hover:text-[#1C1917] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C1917] text-[#C5A880] text-[10px] uppercase tracking-[0.25em] font-semibold rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Colombia Personal Style Concierge</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif-luxury text-[#1C1917] uppercase tracking-wide">
            Asistente de Estilo & Talla IA
          </h3>
          <p className="mt-2 text-xs text-[#6E645A] font-light max-w-md mx-auto">
            Consulte a nuestro algoritmo sartorial para encontrar la correa, talla y combinación de vestuario ideal.
          </p>
        </div>

        {!recommendation ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-[#1C1917] mb-1">
                1. Tipo de Ocasión o Evento
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full p-3 bg-white border border-[#D4C9BD] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C5A880] rounded-xs"
              >
                <option value="Boda en Mónaco / Evento de Verano">Boda en Mónaco / Evento de Verano en Villa</option>
                <option value="Reunión de Negocios Ejecutiva">Reunión de Negocios Ejecutiva / Junta Directiva</option>
                <option value="Paseo Náutico en Yate Capri">Paseo Náutico en Yate / Riviera Italiana</option>
                <option value="Uso Diario Elegante / Casual Inteligente">Uso Diario Elegante / Casual Inteligente</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-[#1C1917] mb-1">
                  2. Tono de Pantalón
                </label>
                <input
                  type="text"
                  value={trouserColor}
                  onChange={(e) => setTrouserColor(e.target.value)}
                  placeholder="Ej. Blanco Marfil, Azul Marino, Gris..."
                  className="w-full p-3 bg-white border border-[#D4C9BD] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A880] rounded-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-[#1C1917] mb-1">
                  3. Calzado / Piel de Zapatos
                </label>
                <input
                  type="text"
                  value={shoeLeather}
                  onChange={(e) => setShoeLeather(e.target.value)}
                  placeholder="Ej. Gamuza Coñac, Piel Blanca..."
                  className="w-full p-3 bg-white border border-[#D4C9BD] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A880] rounded-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-[#1C1917] mb-1">
                4. Talla de Cintura Habitual (Pulgadas o cm)
              </label>
              <input
                type="text"
                value={waistSize}
                onChange={(e) => setWaistSize(e.target.value)}
                placeholder="Ej. 34 pulgadas (86 cm)"
                className="w-full p-3 bg-white border border-[#D4C9BD] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A880] rounded-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-[#1C1917] mb-1">
                5. Preferencias o Preguntas Adicionales (Opcional)
              </label>
              <textarea
                rows={2}
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="¿Prefiere hebilla dorada o titanio? ¿Busca elasticidad alta?"
                className="w-full p-3 bg-white border border-[#D4C9BD] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A880] rounded-xs resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#1C1917] hover:bg-[#332E2A] text-[#FAF8F5] text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 rounded-xs shadow-md mt-6"
            >
              {isLoading ? (
                <span>Consultando al Estilista de Milán...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#C5A880]" />
                  <span>Obtener Recomendación Sartorial</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="p-6 bg-white border border-[#D4C9BD] rounded-xs text-xs text-[#332E2A] leading-relaxed whitespace-pre-line font-serif">
              {recommendation}
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setRecommendation(null)}
                className="px-6 py-3 border border-[#D4C9BD] hover:border-[#1C1917] text-[#1C1917] text-xs uppercase tracking-widest font-medium rounded-xs"
              >
                Nueva Consulta
              </button>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#1C1917] text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-sm flex items-center gap-2"
              >
                <span>Explorar Recomendaciones</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
