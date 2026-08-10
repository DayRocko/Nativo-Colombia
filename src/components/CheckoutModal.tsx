import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { CartItem, Currency, Order, Coupon } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  appliedCoupon: Coupon | null;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  appliedCoupon,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'Stripe' | 'Apple Pay' | 'Google Pay' | 'PayPal' | 'Mercado Pago'>('Stripe');
  const [isProcessing, setIsProcessing] = useState(false);

  // Customer Form State
  const [fullName, setFullName] = useState('Lord Harrison Sterling');
  const [email, setEmail] = useState('harrison.sterling@mayfair.co.uk');
  const [address, setAddress] = useState('74 Eaton Square, Belgravia');
  const [city, setCity] = useState('London');
  const [postalCode, setPostalCode] = useState('SW1W 9AN');
  const [country, setCountry] = useState('United Kingdom');

  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (rawSubtotal * appliedCoupon.discountPercentage) / 100 : 0;
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const shippingFee = subtotalAfterDiscount >= 500 ? 0 : 45;
  const tax = Math.round(subtotalAfterDiscount * 0.08);
  const total = subtotalAfterDiscount + shippingFee + tax;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderNum = `AET-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: orderNum,
        createdAt: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
        customerName: fullName,
        customerEmail: email,
        items: [...cart],
        subtotal: rawSubtotal,
        tax,
        shipping: shippingFee,
        discount: discountAmount,
        total,
        status: 'Processing',
        paymentMethod,
        shippingAddress: {
          address,
          city,
          country,
          postalCode,
        },
        trackingNumber: `DHL-EXP-${Math.floor(100000000 + Math.random() * 900000000)}`,
      };

      setIsProcessing(false);
      onOrderComplete(newOrder);
    }, 1200);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141312]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] text-[#1C1917] shadow-2xl rounded-sm border border-[#D4C9BD] p-6 sm:p-8 my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7A6E63] hover:text-[#1C1917]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6 pb-4 border-b border-[#E8E2D9]">
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-[#8C6D3F] font-semibold mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Encriptación BANCARIA SSL de 256 BITS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury uppercase text-[#1C1917]">
            Checkout Exclusivo de un Paso
          </h2>
        </div>

        <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Details & Payment Methods (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1917] mb-3">
                1. Dirección de Envío Personal
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10px] uppercase text-[#7A6E63] mb-1 font-medium">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D4C9BD] text-xs font-medium text-[#1C1917] rounded-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase text-[#7A6E63] mb-1 font-medium">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#D4C9BD] text-xs text-[#1C1917] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#7A6E63] mb-1 font-medium">Dirección / Residencia</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#D4C9BD] text-xs text-[#1C1917] rounded-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase text-[#7A6E63] mb-1 font-medium">Ciudad</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#D4C9BD] text-xs text-[#1C1917] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#7A6E63] mb-1 font-medium">Código Postal</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#D4C9BD] text-xs text-[#1C1917] rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#7A6E63] mb-1 font-medium">País</label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#D4C9BD] text-xs text-[#1C1917] rounded-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1917] mb-3">
                2. Método de Pago Garantizado
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'Stripe', label: 'Stripe / Tarjeta' },
                  { id: 'Apple Pay', label: 'Apple Pay' },
                  { id: 'Google Pay', label: 'Google Pay' },
                  { id: 'PayPal', label: 'PayPal' },
                  { id: 'Mercado Pago', label: 'Mercado Pago' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`py-2.5 px-3 border text-xs font-medium rounded-xs text-center transition-all ${
                      paymentMethod === pm.id
                        ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-sm'
                        : 'bg-white text-[#4A443F] border-[#D4C9BD] hover:border-[#8C6D3F]'
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order (5 cols) */}
          <div className="lg:col-span-5 bg-[#F4EFEA] p-6 border border-[#E0D8CD] rounded-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1917] mb-4 pb-2 border-b border-[#D4C9BD]">
                Resumen del Pedido
              </h3>

              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-serif font-medium text-[#1C1917]">{item.product.name}</p>
                      <p className="text-[10px] text-[#7A6E63]">{item.selectedVariant.colorName} &bull; Talla {item.selectedSize} (x{item.quantity})</p>
                    </div>
                    <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#D4C9BD] space-y-1.5 text-xs text-[#5C534A]">
                <div className="flex justify-between"><span>Subtotal:</span><span>{formatPrice(rawSubtotal)}</span></div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Descuento ({appliedCoupon.code}):</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between"><span>Envío Express:</span><span>{shippingFee === 0 ? 'GRATIS' : formatPrice(shippingFee)}</span></div>
                <div className="flex justify-between"><span>Impuestos:</span><span>{formatPrice(tax)}</span></div>
                <div className="flex justify-between pt-2 border-t border-[#D4C9BD] text-base font-serif font-bold text-[#1C1917]">
                  <span>Total Final:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="mt-6 w-full py-4 bg-[#1C1917] hover:bg-[#332E2A] text-[#FAF8F5] text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 rounded-xs shadow-md"
            >
              {isProcessing ? (
                <span>Procesando Pago Seguro...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>Completar Pedido Exclusivo</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
