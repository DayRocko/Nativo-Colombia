import React from 'react';
import { Camera } from 'lucide-react';
import { LUXURY_IMAGES } from '../data/imageAssets';

const SCENARIOS = [
  { title: 'MUSEUM', subtitle: 'Vitrina de Conservación', image: LUXURY_IMAGES.scenarioMuseum },
  { title: 'PENTHOUSE', subtitle: 'Vistas Panorámicas a la Ciudad', image: LUXURY_IMAGES.scenarioPenthouse },
  { title: 'BAHÍA CARTAGENA', subtitle: 'Embarcación Clásica Caribeña', image: LUXURY_IMAGES.scenarioYacht },
  { title: 'BOUTIQUE 93', subtitle: 'Parque de la 93, Bogotá', image: LUXURY_IMAGES.scenarioBoutique },
  { title: 'NATIVO STUDIO', subtitle: 'Arte del Tejido Tricolor', image: LUXURY_IMAGES.coiledMasterpiece },
  { title: 'LIFESTYLE', subtitle: 'Lino Beige & Mocasines de Gamuza', image: LUXURY_IMAGES.scenarioLifestyle },
];

export const LifestyleGallery: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#141312] text-[#FAF8F5] border-b border-[#2C2825]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Escenarios de Vida Exclusiva</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif-luxury text-[#FAF8F5] uppercase tracking-wide font-normal">
            Fotografía Editorial &amp; Contexto
          </h2>
          <p className="mt-3 text-sm text-[#A89F91] font-light leading-relaxed px-2 sm:px-0">
            Nuestras piezas en el entorno para el cual fueron creadas: la náutica caribeña, el diseño
            arquitectónico colombiano y el arte de lo artesanal.
          </p>
        </div>

        {/* Grid — 2 cols mobile, 3 cols md+ */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {SCENARIOS.map((sc, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/5] bg-[#1C1917] rounded-xs overflow-hidden border border-[#2C2825] hover:border-[#C5A880] transition-all duration-500 cursor-pointer shadow-lg"
            >
              <img
                src={sc.image}
                alt={sc.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-[#141312]/20 to-transparent" />

              <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 text-center">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold block mb-0.5">
                  {sc.title}
                </span>
                <p className="text-[10px] sm:text-xs font-serif text-[#FAF8F5] italic leading-snug">
                  {sc.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
