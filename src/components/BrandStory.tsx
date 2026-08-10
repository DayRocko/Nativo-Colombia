import React from 'react';
import { Compass } from 'lucide-react';
import { LUXURY_IMAGES } from '../data/imageAssets';

export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-24 bg-[#F4EFEA] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#8C6D3F] font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Inspiración & Patrimonio Boyacense</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif-luxury text-[#1C1917] tracking-wide uppercase font-normal leading-tight">
              La Filosofía del Tejido Infinito
            </h2>

            <p className="text-base text-[#5C534A] leading-relaxed font-light">
              Nacida en Bogotá y cultivada a las orillas del río Chicamocha en Boyacá, Nativo Colombia reinventa el cinturón masculino como una escultura de usabilidad cotidiana.
            </p>

            <p className="text-sm text-[#7A6E63] leading-relaxed font-light">
              Rechazamos la rigidez del cinturón tradicional. Nuestras correas tejidas elásticas responden a cada respiración y postura, uniendo hilos naturales de fibras colombianas con cueros de res curtidos con extractos vegetales de dividivi y quebracho propios de nuestra tierra.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#D4C9BD]">
              <div>
                <h4 className="text-2xl font-serif text-[#1C1917]">100% Colombia</h4>
                <p className="text-xs text-[#7A6E63] mt-1">
                  Hilado en Boyacá, ensamblado a mano en Bogotá.
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-serif text-[#1C1917]">Latón Macizo</h4>
                <p className="text-xs text-[#7A6E63] mt-1">
                  Pátinas naturales envejecidas a mano sin cromados tóxicos.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: High Fashion Editorial Composite Photo */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-white rounded-xs overflow-hidden shadow-md border border-[#E0D8CD]">
                <img
                  src={LUXURY_IMAGES.coiledMasterpiece}
                  alt="Detalle de tejido y grabado"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 bg-white/80 border border-[#E0D8CD] rounded-xs text-xs text-[#5C534A]">
                <p className="font-serif italic text-center">
                  "El lujo refinado no requiere logotipos prominentes, sino una textura inconfundible."
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="aspect-[3/4] bg-white rounded-xs overflow-hidden shadow-md border border-[#E0D8CD]">
                <img
                  src={LUXURY_IMAGES.scenarioLifestyle}
                  alt="Modelo vistiendo correa tejida"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
