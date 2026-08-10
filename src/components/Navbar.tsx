import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, SlidersHorizontal, User, ShieldCheck, Globe, Menu, X, Sparkles } from 'lucide-react';
import { CMSSettings, Language, Currency } from '../types';
import { INITIAL_CMS_SETTINGS } from '../data/initialData';

interface NavbarProps {
  cms?: CMSSettings;
  brandName?: string;
  announcementText?: string;
  language: Language;
  currency: Currency;
  onLanguageChange: (lang: Language) => void;
  onCurrencyChange: (curr: Currency) => void;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenAccount: () => void;
  onOpenAdmin: () => void;
  onOpenStylist: () => void;
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cms = INITIAL_CMS_SETTINGS,
  brandName,
  announcementText,
  language,
  currency,
  onLanguageChange,
  onCurrencyChange,
  cartCount,
  wishlistCount,
  compareCount,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
  onOpenCompare,
  onOpenAccount,
  onOpenAdmin,
  onOpenStylist,
  activeSection = 'collection',
  onNavigate = (sec) => {
    const el = document.getElementById(sec);
    el?.scrollIntoView({ behavior: 'smooth' });
  },
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const effectiveBrandName = brandName || cms?.brandName || INITIAL_CMS_SETTINGS.brandName;
  const effectiveAnnouncementText = announcementText !== undefined ? announcementText : (cms?.announcementText ?? INITIAL_CMS_SETTINGS.announcementText);

  const translations = {
    es: { collection: 'Colección', story: 'Historia', craft: 'Artesanía', stylist: 'Asistente IA', journal: 'Diario', admin: 'CMS / Admin' },
    en: { collection: 'Collection', story: 'Heritage', craft: 'Craftsmanship', stylist: 'AI Stylist', journal: 'Journal', admin: 'CMS / Admin' },
    it: { collection: 'Collezione', story: 'Storia', craft: 'Artigianato', stylist: 'Stilista IA', journal: 'Diario', admin: 'CMS / Admin' },
    fr: { collection: 'Collection', story: 'Histoire', craft: 'Savoir-Faire', stylist: 'Styliste IA', journal: 'Journal', admin: 'CMS / Admin' },
  };

  const t = translations[language];

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9] transition-all duration-300">
        {/* Top Announcement Bar */}
        {effectiveAnnouncementText && (
          <div className="bg-[#1C1917] text-[#FAF8F5] text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.22em] uppercase py-2 px-4 text-center font-medium border-b border-[#2C2825] flex items-center justify-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse flex-shrink-0"></span>
            <span className="truncate max-w-[280px] sm:max-w-none">{effectiveAnnouncementText}</span>
          </div>
        )}

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">

          {/* Left: Desktop Nav / Mobile Hamburger */}
          <div className="flex items-center">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#4A443F] hover:text-[#1C1917] transition-colors mr-1"
              title="Menú"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-[12px] uppercase tracking-[0.18em] font-medium text-[#4A443F]">
              <button onClick={() => onNavigate('collection')} className={`hover:text-[#1C1917] transition-colors py-1 relative ${activeSection === 'collection' ? 'text-[#1C1917] font-semibold border-b border-[#1C1917]' : ''}`}>{t.collection}</button>
              <button onClick={() => onNavigate('story')} className={`hover:text-[#1C1917] transition-colors py-1 relative ${activeSection === 'story' ? 'text-[#1C1917] font-semibold border-b border-[#1C1917]' : ''}`}>{t.story}</button>
              <button onClick={() => onNavigate('craft')} className={`hover:text-[#1C1917] transition-colors py-1 relative ${activeSection === 'craft' ? 'text-[#1C1917] font-semibold border-b border-[#1C1917]' : ''}`}>{t.craft}</button>
              <button onClick={onOpenStylist} className="flex items-center gap-1.5 text-[#8C6D3F] hover:text-[#1C1917] font-semibold tracking-[0.18em] transition-colors py-1">
                <span className="w-2 h-2 rounded-full bg-[#C5A880]"></span>
                {t.stylist}
              </button>
              <button onClick={() => onNavigate('journal')} className={`hover:text-[#1C1917] transition-colors py-1 relative ${activeSection === 'journal' ? 'text-[#1C1917] font-semibold border-b border-[#1C1917]' : ''}`}>{t.journal}</button>
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div className="text-center cursor-pointer flex-shrink-0" onClick={() => onNavigate('home')}>
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-serif-luxury tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#1C1917] font-semibold leading-none">
              {effectiveBrandName}
            </h1>
            <p className="text-[7px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#8C7B6B] mt-0.5 font-medium">
              BOGOTÁ &bull; EST. 2018
            </p>
          </div>

          {/* Right: Icon Controls */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Language & Currency — desktop only */}
            <div className="hidden md:flex items-center gap-2 border-r border-[#E0D8CD] pr-4 text-[11px] font-medium tracking-wider text-[#6B5E52]">
              <div className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#8C7B6B]" />
                <select value={language} onChange={(e) => onLanguageChange(e.target.value as Language)} className="bg-transparent text-[#1C1917] focus:outline-none cursor-pointer uppercase">
                  <option value="es">ES</option>
                  <option value="en">EN</option>
                  <option value="it">IT</option>
                  <option value="fr">FR</option>
                </select>
              </div>
              <span className="text-[#D4C9BD]">&bull;</span>
              <select value={currency} onChange={(e) => onCurrencyChange(e.target.value as Currency)} className="bg-transparent text-[#1C1917] focus:outline-none cursor-pointer uppercase">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (&euro;)</option>
                <option value="GBP">GBP (&pound;)</option>
              </select>
            </div>

            {/* Search */}
            <button onClick={onOpenSearch} className="p-2 text-[#4A443F] hover:text-[#1C1917] transition-colors" title="Buscador">
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button onClick={onOpenWishlist} className="p-2 text-[#4A443F] hover:text-[#1C1917] transition-colors relative" title="Lista de Deseos">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#C5A880] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlistCount}</span>
              )}
            </button>

            {/* Cart */}
            <button onClick={onOpenCart} className="p-2 text-[#1C1917] hover:text-[#8C6D3F] transition-colors relative flex items-center gap-1" title="Bolsa de Compras">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="bg-[#1C1917] text-[#FAF8F5] text-[10px] px-1.5 py-0.5 rounded-full font-bold">{cartCount}</span>
              )}
            </button>

            {/* Account — hidden on smallest screens */}
            <button onClick={onOpenAccount} className="hidden sm:flex p-2 text-[#4A443F] hover:text-[#1C1917] transition-colors" title="Cuenta Personal">
              <User className="w-5 h-5" />
            </button>

            {/* Admin — desktop only */}
            <button onClick={onOpenAdmin} className="hidden lg:flex items-center gap-1 text-[10px] tracking-widest uppercase border border-[#8C6D3F]/40 hover:border-[#1C1917] text-[#8C6D3F] hover:text-[#1C1917] px-2.5 py-1.5 rounded transition-all font-medium" title="Panel Administrador">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#141312]/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

          {/* Drawer Panel */}
          <div className="absolute top-0 left-0 h-full w-[80vw] max-w-sm bg-[#FAF8F5] shadow-2xl flex flex-col overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-[#E8E2D9]">
              <div>
                <p className="text-lg font-serif-luxury uppercase tracking-widest text-[#1C1917]">{effectiveBrandName}</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#8C7B6B]">BOGOTÁ &bull; EST. 2018</p>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-[#4A443F] hover:text-[#1C1917]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-5 py-6 space-y-1">
              {[
                { section: 'collection', label: t.collection },
                { section: 'story', label: t.story },
                { section: 'craft', label: t.craft },
                { section: 'journal', label: t.journal },
              ].map(({ section, label }) => (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className="w-full text-left px-4 py-4 text-sm uppercase tracking-[0.18em] font-medium text-[#4A443F] hover:text-[#1C1917] hover:bg-[#F4EFEA] rounded-sm transition-all border-b border-[#EBE5DC]"
                >
                  {label}
                </button>
              ))}

              {/* AI Stylist */}
              <button
                onClick={() => { onOpenStylist(); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-4 flex items-center gap-2 text-sm uppercase tracking-[0.18em] font-semibold text-[#8C6D3F] hover:bg-[#F4EFEA] rounded-sm transition-all border-b border-[#EBE5DC]"
              >
                <Sparkles className="w-4 h-4" />
                {t.stylist}
              </button>
            </nav>

            {/* Bottom Controls */}
            <div className="px-5 py-5 border-t border-[#E8E2D9] space-y-4">
              {/* Language & Currency */}
              <div className="flex items-center gap-3 text-xs text-[#6B5E52]">
                <Globe className="w-4 h-4 text-[#8C7B6B]" />
                <select value={language} onChange={(e) => onLanguageChange(e.target.value as Language)} className="bg-transparent text-[#1C1917] focus:outline-none cursor-pointer uppercase text-xs flex-1 p-1 border border-[#D4C9BD] rounded-sm">
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="it">Italiano</option>
                  <option value="fr">Français</option>
                </select>
                <select value={currency} onChange={(e) => onCurrencyChange(e.target.value as Currency)} className="bg-transparent text-[#1C1917] focus:outline-none cursor-pointer uppercase text-xs flex-1 p-1 border border-[#D4C9BD] rounded-sm">
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              {/* Account & Compare & Admin */}
              <div className="flex gap-2">
                <button onClick={() => { onOpenAccount(); setMobileMenuOpen(false); }} className="flex-1 flex items-center justify-center gap-1.5 py-3 border border-[#D4C9BD] text-xs uppercase tracking-widest text-[#4A443F] hover:bg-[#F4EFEA] rounded-sm transition-all">
                  <User className="w-4 h-4" />
                  <span>Cuenta</span>
                </button>
                <button onClick={() => { onOpenCompare(); setMobileMenuOpen(false); }} className="flex-1 flex items-center justify-center gap-1.5 py-3 border border-[#D4C9BD] text-xs uppercase tracking-widest text-[#4A443F] hover:bg-[#F4EFEA] rounded-sm transition-all">
                  <SlidersHorizontal className="w-4 h-4" />
                  {compareCount > 0 && <span className="bg-[#1C1917] text-white text-[9px] px-1.5 rounded-full">{compareCount}</span>}
                  <span>Comparar</span>
                </button>
              </div>
              <button onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-1.5 py-3 border border-[#8C6D3F]/40 text-xs uppercase tracking-widest text-[#8C6D3F] hover:bg-[#F4EFEA] rounded-sm transition-all">
                <ShieldCheck className="w-4 h-4" />
                <span>Panel Admin</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
