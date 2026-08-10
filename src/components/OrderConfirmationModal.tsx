import React from 'react';
import { X, CheckCircle2, Download, Truck, PackageCheck, ExternalLink } from 'lucide-react';
import { Order, Currency } from '../types';

interface OrderConfirmationModalProps {
  order: Order | null;
  currency: Currency;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  currency,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  const handleDownloadInvoice = () => {
    const invoiceWindow = window.open('', '_blank');
    if (!invoiceWindow) return;

    invoiceWindow.document.write(`
      <html>
        <head>
          <title>Factura ${order.orderNumber} - Nativo Colombia</title>
          <style>
            body { font-family: 'Georgia', serif; padding: 40px; color: #1c1917; background: #faf8f5; }
            .header { border-bottom: 2px solid #1c1917; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; }
            h1 { font-size: 24px; text-transform: uppercase; letter-spacing: 2px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .table th, .table td { border-bottom: 1px solid #e0d8cd; padding: 12px; text-align: left; font-size: 14px; }
            .total { text-align: right; margin-top: 30px; font-size: 18px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>Nativo Colombia | Maison Correas</h1>
              <p>Calle 82 # 11-37, Parque de la 93, Bogotá, Colombia</p>
            </div>
            <div style="text-align: right;">
              <p><strong>FACTURA #${order.orderNumber}</strong></p>
              <p>Fecha: ${order.createdAt}</p>
            </div>
          </div>
          <h3>Cliente: ${order.customerName}</h3>
          <p>Email: ${order.customerEmail}</p>
          <p>Envío: ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country}</p>
          <table class="table">
            <thead>
              <tr><th>Producto</th><th>Detalles</th><th>Cant.</th><th>Precio</th></tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.product.name}</td>
                  <td>${item.selectedVariant.colorName} / ${item.selectedSize}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.product.price * item.quantity} USD</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">Total Pagado (${order.paymentMethod}): $${order.total} USD</div>
        </body>
      </html>
    `);
    invoiceWindow.document.close();
    invoiceWindow.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141312]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] text-[#1C1917] shadow-2xl rounded-sm border border-[#C5A880] p-6 sm:p-8 my-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#7A6E63] hover:text-[#1C1917]">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-[#8C6D3F] mx-auto mb-3" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D3F] font-semibold">
            Pedido Confirmado
          </span>
          <h2 className="text-3xl font-serif-luxury uppercase text-[#1C1917] mt-1">
            Gracias por su Confianza
          </h2>
          <p className="text-xs text-[#7A6E63] mt-1 font-serif italic">
            Su pedido #{order.orderNumber} ha sido ingresado en nuestro taller de Milán.
          </p>
        </div>

        <div className="bg-[#F4EFEA] p-6 border border-[#E0D8CD] rounded-xs space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4C9BD]">
            <div>
              <span className="text-[10px] uppercase text-[#8C7B6B]">Número de Guía Express</span>
              <p className="font-semibold text-[#1C1917] flex items-center gap-1.5 mt-0.5">
                <Truck className="w-4 h-4 text-[#8C6D3F]" />
                <span>{order.trackingNumber}</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase text-[#8C7B6B]">Estado</span>
              <p className="font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block mt-0.5">
                Procesando en Taller
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase text-[#8C7B6B] font-semibold">Piezas Seleccionadas</span>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between font-serif text-[#1C1917]">
                <span>{item.product.name} ({item.selectedVariant.colorName}, {item.selectedSize}) x{item.quantity}</span>
                <span className="font-semibold">${item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#D4C9BD] flex justify-between font-serif font-bold text-sm text-[#1C1917]">
            <span>Monto Total Pagado ({order.paymentMethod})</span>
            <span>${order.total} USD</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadInvoice}
            className="flex-1 py-3 bg-[#1C1917] hover:bg-[#332E2A] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 rounded-xs shadow-sm"
          >
            <Download className="w-4 h-4 text-[#C5A880]" />
            <span>Descargar Factura PDF</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 border border-[#D4C9BD] hover:border-[#1C1917] text-[#1C1917] text-xs uppercase tracking-widest font-semibold rounded-xs"
          >
            Volver a la Tienda
          </button>
        </div>
      </div>
    </div>
  );
};
