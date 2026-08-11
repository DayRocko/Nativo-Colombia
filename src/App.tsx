import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCollections } from './components/FeaturedCollections';
import { BrandStory } from './components/BrandStory';
import { CraftsmanshipProcess } from './components/CraftsmanshipProcess';
import { LifestyleGallery } from './components/LifestyleGallery';
import { JournalSection } from './components/JournalSection';
import { Footer } from './components/Footer';

// Modals & Drawers
import { ProductDetailModal } from './components/ProductDetailModal';
import { AIConciergeModal } from './components/AIConciergeModal';
import { SearchModal } from './components/SearchModal';
import { SlideCart } from './components/SlideCart';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CompareModal } from './components/CompareModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AccountModal } from './components/AccountModal';
import { AdminPanel } from './components/AdminPanel';

import {
  INITIAL_CMS_SETTINGS,
  INITIAL_PRODUCTS,
  INITIAL_JOURNAL_POSTS,
  INITIAL_COUPONS,
} from './data/initialData';

import {
  Product,
  CartItem,
  Language,
  Currency,
  CMSSettings,
  Order,
  Coupon,
  JournalArticle,
} from './types';

export default function App() {
  // Global Settings State
  const [language, setLanguage] = useState<Language>('es');
  const [currency, setCurrency] = useState<Currency>('COP');

  // Limpieza de claves antiguas del localStorage (migración de aeterna_ → nativo_)
  // También fuerza los campos de texto que pueden haber quedado en inglés
  if (typeof window !== 'undefined') {
    ['aeterna_cms', 'aeterna_products', 'aeterna_cart', 'aeterna_wishlist', 'aeterna_compare', 'aeterna_orders'].forEach(k => localStorage.removeItem(k));
    // Forzar heroTitle y heroSubtitle correctos si están en caché con los valores viejos
    const cachedCms = localStorage.getItem('nativo_cms');
    if (cachedCms) {
      try {
        const parsed = JSON.parse(cachedCms);
        if (parsed.heroTitle === 'THE ART OF THE WEAVE' || parsed.heroSubtitle === 'Italian Craftsmanship. Timeless Luxury.' || parsed.heroSubtitle === 'Colombian Craftsmanship. Timeless Luxury.') {
          parsed.heroTitle = INITIAL_CMS_SETTINGS.heroTitle;
          parsed.heroSubtitle = INITIAL_CMS_SETTINGS.heroSubtitle;
          parsed.brandTagline = INITIAL_CMS_SETTINGS.brandTagline;
          localStorage.setItem('nativo_cms', JSON.stringify(parsed));
        }
      } catch (_) { /* ignore */ }
    }
  }

  // CMS & Catalogs State
  const [cms, setCms] = useState<CMSSettings>(() => {
    const saved = localStorage.getItem('nativo_cms');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...INITIAL_CMS_SETTINGS, ...parsed };
        }
      } catch (e) {
        console.error('Error loading nativo_cms from localStorage', e);
      }
    }
    return INITIAL_CMS_SETTINGS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nativo_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [journal] = useState<JournalArticle[]>(INITIAL_JOURNAL_POSTS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);

  // E-commerce Functional State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nativo_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('nativo_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareIds, setCompareIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('nativo_compare');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nativo_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // UI Modal Visibility Controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Synchronize state with localStorage
  useEffect(() => {
    localStorage.setItem('nativo_cms', JSON.stringify(cms));
  }, [cms]);

  useEffect(() => {
    localStorage.setItem('nativo_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nativo_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nativo_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('nativo_compare', JSON.stringify(compareIds));
  }, [compareIds]);

  useEffect(() => {
    localStorage.setItem('nativo_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart Handlers
  const handleAddToCart = (product: Product, size: string, quantity = 1) => {
    const selectedVariant = product.variants[0];
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant.id === selectedVariant.id &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, selectedVariant, selectedSize: size, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, variantId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedVariant.id === variantId &&
            item.selectedSize === size
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string, variantId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedVariant.id === variantId &&
            item.selectedSize === size
          )
      )
    );
  };

  // Coupon Handlers
  const handleApplyCoupon = (code: string) => {
    const matched = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase() && c.active);
    if (matched) {
      setAppliedCoupon(matched);
      return true;
    }
    return false;
  };

  // Wishlist & Compare Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleToggleCompare = (product: Product) => {
    setCompareIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  // Order Handlers
  const handleOrderComplete = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedCoupon(null);
    setIsCheckoutOpen(false);
    setConfirmedOrder(newOrder);
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));
  const comparedProducts = products.filter((p) => compareIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans antialiased selection:bg-[#C5A880] selection:text-[#141312]">
      {/* Navbar */}
      <Navbar
        cms={cms}
        brandName={cms.brandName}
        announcementText={cms.announcementText}
        language={language}
        currency={currency}
        cartCount={cartItemsCount}
        wishlistCount={wishlistIds.length}
        compareCount={compareIds.length}
        onLanguageChange={setLanguage}
        onCurrencyChange={setCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenStylist={() => setIsStylistOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Fullscreen Hero */}
        <Hero
          cms={cms}
          onExploreClick={() => {
            const el = document.getElementById('collection');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onStylistClick={() => setIsStylistOpen(true)}
        />

        {/* Product Collection Grid */}
        <FeaturedCollections
          products={products}
          currency={currency}
          wishlistIds={wishlistIds}
          compareIds={compareIds}
          onToggleWishlist={handleToggleWishlist}
          onToggleCompare={handleToggleCompare}
          onQuickView={(p) => setSelectedQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* Brand Narrative & Heritage */}
        <BrandStory />

        {/* Craftsmanship & Materials */}
        <CraftsmanshipProcess />

        {/* Editorial Environments Photography */}
        <LifestyleGallery />

        {/* Journal Section */}
        <JournalSection articles={journal} />
      </main>

      {/* Footer */}
      <Footer cms={cms} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Modals & Interactive Drawers */}
      <ProductDetailModal
        product={selectedQuickViewProduct}
        currency={currency}
        isOpen={!!selectedQuickViewProduct}
        onClose={() => setSelectedQuickViewProduct(null)}
        isWishlisted={selectedQuickViewProduct ? wishlistIds.includes(selectedQuickViewProduct.id) : false}
        isCompared={selectedQuickViewProduct ? compareIds.includes(selectedQuickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onToggleCompare={handleToggleCompare}
        onAddToCart={(p, sz, qty) => {
          handleAddToCart(p, sz, qty);
          setSelectedQuickViewProduct(null);
        }}
        onOpenStylist={() => {
          setSelectedQuickViewProduct(null);
          setIsStylistOpen(true);
        }}
        relatedProducts={products.slice(0, 3)}
        onSelectProduct={(p) => setSelectedQuickViewProduct(p)}
      />

      <AIConciergeModal
        isOpen={isStylistOpen}
        onClose={() => setIsStylistOpen(false)}
        language={language}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        currency={currency}
        onSelectProduct={(p) => setSelectedQuickViewProduct(p)}
      />

      <SlideCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        cms={cms}
        coupons={coupons}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={() => setAppliedCoupon(null)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        currency={currency}
        appliedCoupon={appliedCoupon}
        onOrderComplete={handleOrderComplete}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        currency={currency}
        isOpen={!!confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedProducts={comparedProducts}
        currency={currency}
        onRemoveFromCompare={(id) => setCompareIds((prev) => prev.filter((i) => i !== id))}
        onAddToCart={handleAddToCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        currency={currency}
        onRemoveFromWishlist={(id) => setWishlistIds((prev) => prev.filter((i) => i !== id))}
        onAddToCart={handleAddToCart}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        orders={orders}
        currency={currency}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        cms={cms}
        onUpdateCMS={setCms}
        products={products}
        onUpdateProducts={setProducts}
        orders={orders}
        onUpdateOrder={(orderId, status) => {
          setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status } : o))
          );
        }}
        coupons={coupons}
        onUpdateCoupons={setCoupons}
        journal={journal}
      />

      {/* ── BOTTOM NAVIGATION BAR (Mobile Only) ── */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#141312]/97 backdrop-blur-xl border-t border-[#2C2825] safe-bottom">
        <div className="flex items-center justify-around px-2 py-2">

          {/* Home */}
          <button
            onClick={() => { const el = document.getElementById('home'); el ? el.scrollIntoView({ behavior: 'smooth' }) : window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex flex-col items-center gap-0.5 px-3 py-2 text-[#A89F91] hover:text-[#FAF8F5] transition-colors min-w-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span className="text-[9px] uppercase tracking-wider font-medium">Inicio</span>
          </button>

          {/* Collection */}
          <button
            onClick={() => { const el = document.getElementById('collection'); el?.scrollIntoView({ behavior: 'smooth' }); }}
            className="flex flex-col items-center gap-0.5 px-3 py-2 text-[#A89F91] hover:text-[#FAF8F5] transition-colors min-w-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
            <span className="text-[9px] uppercase tracking-wider font-medium">Colección</span>
          </button>

          {/* Cart — highlighted */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center gap-0.5 px-3 py-2 relative"
          >
            <div className="bg-[#C5A880] rounded-full p-2.5 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#141312]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
              </svg>
            </div>
            {cart.length > 0 && (
              <span className="absolute top-1 right-2 bg-[#1C1917] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
            <span className="text-[9px] uppercase tracking-wider font-medium text-[#C5A880]">Bolsa</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="flex flex-col items-center gap-0.5 px-3 py-2 text-[#A89F91] hover:text-[#FAF8F5] transition-colors relative min-w-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            {wishlistIds.length > 0 && (
              <span className="absolute top-1 right-2 bg-[#C5A880] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistIds.length}
              </span>
            )}
            <span className="text-[9px] uppercase tracking-wider font-medium">Deseos</span>
          </button>

          {/* Account */}
          <button
            onClick={() => setIsAccountOpen(true)}
            className="flex flex-col items-center gap-0.5 px-3 py-2 text-[#A89F91] hover:text-[#FAF8F5] transition-colors min-w-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <span className="text-[9px] uppercase tracking-wider font-medium">Cuenta</span>
          </button>

        </div>
      </nav>

      {/* Spacer para que el contenido no quede tapado por el bottom nav en móvil */}
      <div className="lg:hidden h-16" />

    </div>
  );
}
