import React, { useState } from 'react';
import { X, User, Package, MapPin, ShieldCheck, Truck, Clock } from 'lucide-react';
import { Order, Currency } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  currency: Currency;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  orders,
  currency,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141312]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] text-[#1C1917] shadow-2xl rounded-sm border border-[#D4C9BD] p-6 sm:p-8 my-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#7A6E63] hover:text-[#1C1917]">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6 pb-4 border-b border-[#E8E2D9]">
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-[#8C6D3F] font-semibold mb-1">
            <User className="w-3.5 h-3.5" />
            <span>Club Privado Nativo Colombia</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury uppercase text-[#1C1917]">
            Cuenta de Cliente Distinguido
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E0D8CD] text-xs uppercase tracking-[0.18em] font-medium text-[#7A6E63] gap-6 mb-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2 border-b-2 transition-all ${
              activeTab === 'orders' ? 'border-[#1C1917] text-[#1C1917] font-semibold' : 'border-transparent'
            }`}
          >
            Historial de Pedidos ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2 border-b-2 transition-all ${
              activeTab === 'profile' ? 'border-[#1C1917] text-[#1C1917] font-semibold' : 'border-transparent'
            }`}
          >
            Perfil de Estilo
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-2 border-b-2 transition-all ${
              activeTab === 'addresses' ? 'border-[#1C1917] text-[#1C1917] font-semibold' : 'border-transparent'
            }`}
          >
            Direcciones de Envío
          </button>
        </div>

        {activeTab === 'orders' && (
          <div className="space-y-4 max-h-[50vh] overflow-y-auto">
            {orders.map((ord) => (
              <div key={ord.id} className="p-4 bg-white border border-[#D4C9BD] rounded-xs space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#EBE5DC]">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#1C1917]">Pedido #{ord.orderNumber}</span>
                    <p className="text-[10px] text-[#7A6E63]">{ord.createdAt}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded-full text-[10px]">
                      {ord.status}
                    </span>
                    <p className="font-serif font-bold text-sm text-[#8C6D3F] mt-0.5">${ord.total} USD</p>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-[#5C534A]">
                  {ord.items.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{item.product.name} ({item.selectedVariant.colorName}, Talla {item.selectedSize}) x{item.quantity}</span>
                      <span>${item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#EBE5DC] flex items-center justify-between text-[11px] text-[#7A6E63]">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#8C6D3F]" />
                    Guía: <strong>{ord.trackingNumber}</strong>
                  </span>
                  <span>Método de Pago: {ord.paymentMethod}</span>
                </div>
              </div>
            ))}

            {orders.length === 0 && (
              <div className="text-center py-12 text-[#7A6E63] font-serif italic">
                Aún no ha registrado compras en esta sesión.
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-6 bg-white border border-[#D4C9BD] rounded-xs text-xs space-y-3">
            <div><span className="text-[#8C7B6B] uppercase font-semibold">Cliente:</span> Lord Harrison Sterling</div>
            <div><span className="text-[#8C7B6B] uppercase font-semibold">Membresía:</span> Nativo Colombia Private Circle</div>
            <div><span className="text-[#8C7B6B] uppercase font-semibold">Talla Predilecta:</span> 90 cm / 34"</div>
            <div><span className="text-[#8C7B6B] uppercase font-semibold">Estilista Asignado:</span> Alejandro Correa (Bogotá)</div>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="p-6 bg-white border border-[#D4C9BD] rounded-xs text-xs space-y-2">
            <span className="font-semibold text-[#1C1917] block uppercase">Residencia Principal</span>
            <p className="text-[#5C534A]">74 Eaton Square, Belgravia, London SW1W 9AN, United Kingdom</p>
          </div>
        )}
      </div>
    </div>
  );
};
