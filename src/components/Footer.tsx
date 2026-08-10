import React, { useState } from 'react';
import { Compass, Mail, Shield, Check } from 'lucide-react';
import { CMSSettings } from '../types';

interface FooterProps {
  cms: CMSSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ cms, onOpenAdmin }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#141312] text-[#FAF8F5] pt-12 sm:pt-20 pb-8 sm:pb-12 border-t border-[#2C2825]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-16 border-b border-[#2C2825]">
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-2xl font-serif-luxury uppercase tracking-[0.2em] text-[#FAF8F5]">
              {cms?.brandName || 'Nativo Colombia'}
            </h3>
            <p className="text-xs text-[#A89F91] leading-relaxed font-serif italic max-w-sm">
              Maison de correas tejidas de lujo y accesorios sartoriales elaborados individualmente en la provincia de Boyacá, Colombia.
            </p>

            <div className="pt-2 text-xs text-[#A89F91] space-y-1">
              <p><strong>Boutique Flagship:</strong> Calle 82 # 11-37, Parque de la 93, Bogotá, Colombia</p>
              <p><strong>Taller Artesanal:</strong> Cra. 12 # 5-40, Duitama, Boyacá, Colombia</p>
              <p><strong>Atención Exclusiva:</strong> concierge@{(cms?.brandName || 'nativocolombia').toLowerCase().replace(/\s+/g, '')}.com</p>
            </div>
          </div>

          {/* Customer Care Links (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs text-[#A89F91]">
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-3">
                Atención Sartorial
              </h4>
              <ul className="space-y-2">
                <li><a href="#collection" className="hover:text-white transition-colors">Colección de Verano</a></li>
                <li><a href="#story" className="hover:text-white transition-colors">Patrimonio & Origen</a></li>
                <li><a href="#craft" className="hover:text-white transition-colors">Proceso de Tejido</a></li>
                <li><a href="#journal" className="hover:text-white transition-colors">Journal Editorial</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-3">
                Garantía & Envíos
              </h4>
              <ul className="space-y-2">
                <li><span className="hover:text-white cursor-pointer">Garantía Vitalicia Nativo</span></li>
                <li><span className="hover:text-white cursor-pointer">Política de Devoluciones</span></li>
                <li><span className="hover:text-white cursor-pointer">Envíos DHL Express</span></li>
                <li><span className="hover:text-white cursor-pointer">Certificado de Autenticidad</span></li>
              </ul>
            </div>
          </div>

          {/* Newsletter (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
              Círculo Privado & Ediciones de Coleccionista
            </h4>
            <p className="text-xs text-[#A89F91] leading-relaxed">
              Reciba invitaciones exclusivas a lanzamientos de telares limitados antes de su publicación general.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Su correo electrónico personal"
                  className="flex-1 p-2.5 bg-[#1C1917] border border-[#38332E] text-xs text-[#FAF8F5] placeholder-[#7A6E63] focus:outline-none focus:border-[#C5A880] rounded-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#C5A880] hover:bg-[#B5966B] text-[#141312] text-xs uppercase tracking-wider font-semibold transition-colors rounded-xs"
                >
                  Unirse
                </button>
              </form>
            ) : (
              <div className="p-3 bg-[#1C1917] border border-[#C5A880] text-xs text-[#C5A880] flex items-center gap-2 rounded-xs">
                <Check className="w-4 h-4" />
                <span>Bienvenido al Círculo Privado de {cms.brandName}.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar & Admin Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7A6E63] gap-4">
          <p>© {new Date().getFullYear()} {cms.brandName} Colombia. Todos los derechos reservados.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenAdmin}
              className="text-[#C5A880] hover:underline uppercase tracking-widest font-semibold text-[10px]"
            >
              [ Acceso Administrador ]
            </button>
            <span>Términos & Condiciones</span>
            <span>Privacidad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
