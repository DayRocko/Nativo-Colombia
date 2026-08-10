import React, { useState } from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { CMSSettings } from '../types';
import { LUXURY_IMAGES } from '../data/imageAssets';

interface HeroProps {
  cms: CMSSettings;
  onExploreClick: () => void;
  onStylistClick: () => void;
}

const HERO_BACKGROUNDS = [
  {
    id: 'marble',
    label: 'Sede Bogotá',
    subtitle: 'Estudio de Galería & Mármol Colombiano',
    image: LUXURY_IMAGES.heroBelts,
  },
  {
    id: 'penthouse',
    label: 'Penthouse Bogotá',
    subtitle: 'Vistas Panorámicas & Madera de Cedro',
    image: LUXURY_IMAGES.scenarioPenthouse,
  },
  {
    id: 'yacht',
    label: 'Bahía Cartagena',
    subtitle: 'Embarcación Clásica & Atardecer Caribeño',
    image: LUXURY_IMAGES.scenarioYacht,
  },
  {
    id: 'boutique',
    label: 'Boutique Parque 93',
    subtitle: 'Exposición en Latón & Lona Artesanal',
    image: LUXURY_IMAGES.scenarioBoutique,
  },
];

export const Hero: React.FC<HeroProps> = ({ cms, onExploreClick, onStylistClick }) => {
  const [activeBgIndex, setActiveBgIndex] = useState(0);

  const activeBg = HERO_BACKGROUNDS[activeBgIndex];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#141312] text-[#FAF8F5]">
      {/* Background Image Container with Smooth Fade */}
      <div className="absolute inset-0 z-0">
        <img
          key={activeBg.id}
          src={activeBg.image}
          alt={activeBg.label}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-all duration-1000 ease-in-out opacity-45 scale-105 animate-fade-in"
        />
        {/* Soft natural lighting gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-[#141312]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141312]/80 via-transparent to-[#141312]/60" />
      </div>

      {/* Top Floating Badge */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 w-full text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1917]/80 backdrop-blur-md border border-[#C5A880]/30 text-[11px] tracking-[0.25em] text-[#D4C9BD] uppercase font-medium">
          <span className="w-2 h-2 rounded-full bg-[#C5A880]"></span>
          <span>{cms.brandTagline || 'Maison Correas Tejidas de Lujo Colombiano'}</span>
        </div>
      </div>

      {/* Hero Center Text & Actions */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24 w-full flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-luxury tracking-[0.1em] sm:tracking-[0.12em] uppercase font-light text-[#FAF8F5] max-w-4xl leading-[1.05] drop-shadow-md">
          {cms.heroTitle || 'EL ALMA DEL TEJIDO'}
        </h2>

        <p className="mt-4 text-base sm:text-2xl font-serif text-[#D4C9BD] italic tracking-wide max-w-2xl">
          {cms.heroSubtitle || 'Artesanía Colombiana. Lujo Atemporal.'}
        </p>

        <p className="mt-3 text-xs text-[#A89F91] tracking-[0.12em] uppercase max-w-lg font-light leading-relaxed hidden sm:block">
          Cada correa es confeccionada individualmente en Duitama, Boyacá, utilizando telares de lanzadera heredados de generaciones y cuero de res colombiano curtido al vegetal.
        </p>

        {/* Buttons Action Group */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 bg-[#FAF8F5] hover:bg-[#EAE4DB] text-[#141312] text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg"
          >
            <span>Explorar Colección</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onStylistClick}
            className="w-full sm:w-auto px-7 py-4 bg-transparent border border-[#C5A880]/60 hover:border-[#C5A880] text-[#D4C9BD] hover:text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 flex items-center justify-center gap-2.5 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span>Asistente de Estilo IA</span>
          </button>
        </div>
      </div>

      {/* Bottom Visual Context Selector (Change Background Scene) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#332E2A]">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#A89F91]">
            <Compass className="w-4 h-4 text-[#C5A880]" />
            <span>Escenario de Exhibición:</span>
            <strong className="text-[#FAF8F5] font-normal">{activeBg.subtitle}</strong>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {HERO_BACKGROUNDS.map((bg, idx) => (
              <button
                key={bg.id}
                onClick={() => setActiveBgIndex(idx)}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-all rounded-sm border ${
                  activeBgIndex === idx
                    ? 'bg-[#C5A880] text-[#141312] border-[#C5A880] font-semibold'
                    : 'bg-[#1C1917]/70 text-[#A89F91] border-[#38332E] hover:text-[#FAF8F5] hover:border-[#A89F91]'
                }`}
              >
                {bg.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
