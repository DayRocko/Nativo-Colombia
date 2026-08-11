import React from 'react';
import { Sparkles, Layers, Shield, Anchor } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Hilos Náuticos & Lino Orgánico',
    description: 'Seleccionamos fibras naturales de algodón del Caribe colombiano y viscosa elástica de alta retención tratada contra rayos UV y humedad tropical.',
    icon: Anchor,
  },
  {
    step: '02',
    title: 'Telares de Lanzadera Vintage',
    description: 'Operados a bajas revoluciones en Duitama, Boyacá, por maestras artesanas herederas de la tradición muisca, garantizando un patrón geométrico tricolor uniforme e indeformable.',
    icon: Layers,
  },
  {
    step: '03',
    title: 'Curtido Vegetal Toscano',
    description: 'Cuero de res de grano entero curtido exclusivamente con extractos de dividivi colombiano y pátinas naturales propias de Villapinzón, Cundinamarca.',
    icon: Shield,
  },
  {
    step: '04',
    title: 'Bruñido y Pátina a Mano',
    description: 'Cada hebilla de latón macizo es oxidada manualmente para lograr un tono bronce cepillado único e irrepetible.',
    icon: Sparkles,
  },
];

export const CraftsmanshipProcess: React.FC = () => {
  return (
    <section id="craft" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#8C6D3F] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proceso de Elaboración</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif-luxury text-[#1C1917] uppercase tracking-wide font-normal">
            El Oficio de los Maestros Guarnicioneros
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6E645A] font-light">
            Catorce horas de atención minuciosa dedicadas a cada correa individual antes de ser empacada en su estuche de conservación.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {STEPS.map((s) => {
            const IconComp = s.icon;
            return (
              <div
                key={s.step}
                className="bg-[#F4EFEA] p-5 sm:p-8 border border-[#E0D8CD] rounded-xs hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-serif text-[#C5A880] font-light">{s.step}</span>
                    <IconComp className="w-6 h-6 text-[#8C6D3F] group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-serif-luxury text-[#1C1917] mb-3 uppercase tracking-wider">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#6E645A] leading-relaxed font-light">
                    {s.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E0D8CD] text-[10px] uppercase tracking-[0.2em] text-[#8C7B6B] font-semibold">
                  Savoir-Faire Colombiano
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
