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
  const [currency, setCurrency] = useState<Currency>('USD');

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
    </div>
  );
}
