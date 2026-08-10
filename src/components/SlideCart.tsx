import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Truck } from 'lucide-react';
import { CartItem, Currency, CMSSettings, Coupon } from '../types';

interface SlideCartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  cms: CMSSettings;
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  onUpdateQuantity: (productId: string, variantId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, variantId: string, size: string) => void;
  onProceedToCheckout: () => void;
}

export const SlideCart: React.FC<SlideCartProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  cms,
  coupons,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const discountAmount = appliedCoupon
    ? (rawSubtotal * appliedCoupon.discountPercentage) / 100
    : 0;

  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const freeShippingThreshold = cms.freeShippingThreshold || 500;
  const isFreeShipping = subtotalAfterDiscount >= freeShippingThreshold;
  const shippingFee = isFreeShipping || rawSubtotal === 0 ? 0 : 45;
  const tax = Math.round(subtotalAfterDiscount * 0.08); // 8% luxury tax/VAT
  const total = subtotalAfterDiscount + shippingFee + tax;

  const shippingProgress = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCodeInput.trim()) return;

    const success = onApplyCoupon(couponCodeInput.trim());
    if (!success) {
      setCouponError('Cupón no válido o importe mínimo no alcanzado.');
    } else {
      setCouponCodeInput('');
    }
  };

  const formatPrice = (amountUSD: number) => {
    switch (currency) {
      case 'EUR':
        return `€${Math.round(amountUSD * 0.92)}`;
      case 'GBP':
        return `£${Math.round(amountUSD * 0.78)}`;
      default:
        return `$${amountUSD.toLocaleString()}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#141312]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen sm:max-w-md bg-[#FAF8F5] text-[#1C1917] shadow-2xl border-l border-[#D4C9BD] flex flex-col justify-between">
          {/* Cart Header */}
          <div className="p-6 border-b border-[#E8E2D9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8C6D3F]" />
              <h3 className="text-xl font-serif-luxury uppercase tracking-wider text-[#1C1917]">
                Bolsa de Compras Curada
              </h3>
            </div>

            <button onClick={onClose} className="p-2 text-[#7A6E63] hover:text-[#1C1917]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="bg-[#F4EFEA] px-6 py-3 border-b border-[#E8E2D9] text-xs">
              <div className="flex items-center justify-between text-[#5C534A] mb-1.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#8C6D3F]" />
                  {isFreeShipping ? (
                    <strong className="text-[#1C1917]">¡Envío Express de Cortesía Activado!</strong>
                  ) : (
                    <span>Faltan <strong>{formatPrice(freeShippingThreshold - rawSubtotal)}</strong> para Envío Gratuito</span>
                  )}
                </span>
                <span className="text-[10px] text-[#8C7B6B]">{Math.round(shippingProgress)}%</span>
              </div>

              <div className="w-full bg-[#E0D8CD] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#1C1917] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-[#EBE5DC]">
            {cart.map((item) => {
              const key = `${item.product.id}-${item.selectedVariant.id}-${item.selectedSize}`;
              return (
                <div key={key} className="pt-4 first:pt-0 flex gap-4">
                  <img
                    src={item.selectedVariant.image || item.product.images[0]?.url}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xs border border-[#D4C9BD] bg-white shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-serif-luxury font-medium text-[#1C1917]">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedVariant.id, item.selectedSize)}
                          className="text-[#9A8C7E] hover:text-[#1C1917] transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#7A6E63] mt-0.5">
                        Color: <strong>{item.selectedVariant.colorName}</strong> &bull; Talla: <strong>{item.selectedSize}</strong>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#D4C9BD] bg-white rounded-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedVariant.id, item.selectedSize, -1)}
                          className="px-2 py-0.5 text-xs text-[#4A443F] hover:bg-[#F4EFEA]"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedVariant.id, item.selectedSize, 1)}
                          className="px-2 py-0.5 text-xs text-[#4A443F] hover:bg-[#F4EFEA]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-serif font-semibold text-[#1C1917]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {cart.length === 0 && (
              <div className="text-center py-20 text-[#7A6E63]">
                <ShoppingBag className="w-12 h-12 mx-auto text-[#D4C9BD] mb-3" />
                <p className="text-base font-serif italic">Su bolsa de compras se encuentra vacía.</p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium"
                >
                  Explorar la Colección
                </button>
              </div>
            )}
          </div>

          {/* Cart Footer Calculation & Coupon */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F4EFEA] border-t border-[#E8E2D9] space-y-4">
              {/* Coupon Code Input */}
              <div>
                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      placeholder="Código de Promoción (ej. VIPMONACO)"
                      className="flex-1 p-2 bg-white border border-[#D4C9BD] text-xs uppercase tracking-wider text-[#1C1917] focus:outline-none focus:border-[#C5A880] rounded-xs"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1C1917] text-white text-xs uppercase tracking-wider font-semibold rounded-xs"
                    >
                      Aplicar
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded-xs">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      Cupón <strong>{appliedCoupon.code}</strong> ({appliedCoupon.discountPercentage}% Descuento)
                    </span>
                    <button
                      onClick={onRemoveCoupon}
                      className="text-emerald-700 hover:underline font-semibold"
                    >
                      Remover
                    </button>
                  </div>
                )}
                {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
              </div>

              {/* Price Summary Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5C534A]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1C1917]">{formatPrice(rawSubtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Descuento Promocional ({appliedCoupon.discountPercentage}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Envío Express Internacional</span>
                  <span className="font-medium text-[#1C1917]">
                    {isFreeShipping ? 'GRATIS' : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Impuestos Estimados (IVA/EUTax)</span>
                  <span className="font-medium text-[#1C1917]">{formatPrice(tax)}</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#D4C9BD] text-base font-serif font-bold text-[#1C1917]">
                  <span>Total Esti.</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => { onClose(); onProceedToCheckout(); }}
                className="w-full py-4 bg-[#1C1917] hover:bg-[#332E2A] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 rounded-xs shadow-md"
              >
                <span>Proceder al Checkout Seguro</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
