import React, { useState } from 'react';
import { X, ShieldCheck, LayoutDashboard, Package, ShoppingBag, Settings, Tag, BookOpen, Plus, Trash2, Edit, Save } from 'lucide-react';
import { Product, Order, CMSSettings, Coupon, JournalArticle } from '../types';
import { LUXURY_IMAGES } from '../data/imageAssets';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  cms: CMSSettings;
  onUpdateCMS: (newCMS: CMSSettings) => void;
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  orders: Order[];
  onUpdateOrder: (orderId: string, status: Order['status']) => void;
  coupons: Coupon[];
  onUpdateCoupons: (coupons: Coupon[]) => void;
  journal: JournalArticle[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  cms,
  onUpdateCMS,
  products,
  onUpdateProducts,
  orders,
  onUpdateOrder,
  coupons,
  onUpdateCoupons,
  journal,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'dashboard' | 'cms' | 'products' | 'orders' | 'coupons'>('dashboard');

  // CMS Form State
  const [cmsForm, setCmsForm] = useState<CMSSettings>({ ...cms });
  const [cmsSavedMsg, setCmsSavedMsg] = useState('');

  // New Product Modal Form State
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(780);
  const [newProductCategory, setNewProductCategory] = useState<Product['category']>('Monaco');

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCMS(cmsForm);
    setCmsSavedMsg('Configuración de marca y CMS actualizada con éxito.');
    setTimeout(() => setCmsSavedMsg(''), 3000);
  };

  const handleAddProduct = () => {
    if (!newProductName) return;
    const newProd: Product = {
      id: `prod-custom-${Date.now()}`,
      sku: `AET-CST-${Math.floor(100 + Math.random() * 900)}`,
      name: newProductName,
      subtitle: 'Italian Handcrafted Woven Belt',
      price: newProductPrice,
      currency: 'USD',
      category: newProductCategory,
      tags: ['New Arrival'],
      descriptionShort: 'Nueva incorporación artesanal de edición limitada.',
      descriptionLong: 'Confeccionada a mano en nuestros telares de Milán con hilo elástico técnico y piel de becerro.',
      material: 'Viscosa Elástica & Algodón Náutico',
      leatherType: 'Piel de Becerro de Grano Entero (Toscana)',
      buckleMaterial: 'Latón Macizo Cepillado',
      width: '35 mm',
      elasticity: 'Elasticidad de Confort (18%)',
      weight: '180 g',
      origin: 'Bogotá, Colombia',
      stockCount: 10,
      rating: 5.0,
      reviewCount: 1,
      craftsmanshipNotes: ['14 horas de tejido artesanal'],
      variants: [
        {
          id: `var-${Date.now()}`,
          colorName: 'Azul Noche & Latón',
          colorHex: '#1B2A4A',
          buckleFinish: 'Brushed Brass',
          inStock: true,
          image: LUXURY_IMAGES.heroBelts,
        },
      ],
      sizes: ['85 cm', '90 cm', '95 cm', '100 cm', '105 cm'],
      images: [
        {
          id: `img-${Date.now()}`,
          title: 'Exposición',
          url: LUXURY_IMAGES.heroBelts,
          tag: 'Studio',
        },
      ],
    };

    onUpdateProducts([newProd, ...products]);
    setNewProductName('');
  };

  const handleDeleteProduct = (id: string) => {
    onUpdateProducts(products.filter((p) => p.id !== id));
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#141312]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#FAF8F5] text-[#1C1917] shadow-2xl rounded-sm border border-[#D4C9BD] p-6 sm:p-8 my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#7A6E63] hover:text-[#1C1917]">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#E8E2D9] mb-6">
          <ShieldCheck className="w-6 h-6 text-[#8C6D3F]" />
          <div>
            <h2 className="text-2xl font-serif-luxury uppercase tracking-wider text-[#1C1917]">
              Panel Administrador & CMS de Marca
            </h2>
            <p className="text-xs text-[#7A6E63]">
              Gestione la identidad visual ({cms.brandName}), productos, inventario, pedidos y cupones.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-3 border-b border-[#E0D8CD] pb-3 mb-6 text-xs uppercase tracking-wider font-semibold">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs transition-all ${
              activeTab === 'dashboard' ? 'bg-[#1C1917] text-white' : 'text-[#5C534A] hover:bg-[#F4EFEA]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs transition-all ${
              activeTab === 'cms' ? 'bg-[#1C1917] text-white' : 'text-[#5C534A] hover:bg-[#F4EFEA]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Ajustes CMS & Marca</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs transition-all ${
              activeTab === 'products' ? 'bg-[#1C1917] text-white' : 'text-[#5C534A] hover:bg-[#F4EFEA]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Catálogo ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs transition-all ${
              activeTab === 'orders' ? 'bg-[#1C1917] text-white' : 'text-[#5C534A] hover:bg-[#F4EFEA]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pedidos ({orders.length})</span>
          </button>
        </div>

        {/* Tab 1: Dashboard Analytics */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-white border border-[#D4C9BD] rounded-xs shadow-sm">
                <span className="text-[10px] uppercase tracking-wider text-[#8C7B6B] font-semibold">Ventas Totales</span>
                <p className="text-2xl font-serif font-bold text-[#1C1917] mt-1">${totalRevenue.toLocaleString()} USD</p>
              </div>

              <div className="p-5 bg-white border border-[#D4C9BD] rounded-xs shadow-sm">
                <span className="text-[10px] uppercase tracking-wider text-[#8C7B6B] font-semibold">Pedidos Registrados</span>
                <p className="text-2xl font-serif font-bold text-[#1C1917] mt-1">{orders.length}</p>
              </div>

              <div className="p-5 bg-white border border-[#D4C9BD] rounded-xs shadow-sm">
                <span className="text-[10px] uppercase tracking-wider text-[#8C7B6B] font-semibold">Productos en Catálogo</span>
                <p className="text-2xl font-serif font-bold text-[#1C1917] mt-1">{products.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: CMS Site Settings */}
        {activeTab === 'cms' && (
          <form onSubmit={handleSaveCMS} className="space-y-4 max-w-2xl bg-white p-6 border border-[#D4C9BD] rounded-xs">
            {cmsSavedMsg && (
              <div className="p-3 bg-emerald-100 text-emerald-800 text-xs rounded-xs font-semibold mb-3">
                {cmsSavedMsg}
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                Nombre Temporal / Marca
              </label>
              <input
                type="text"
                value={cmsForm.brandName}
                onChange={(e) => setCmsForm({ ...cmsForm, brandName: e.target.value })}
                className="w-full p-2.5 bg-[#FAF8F5] border border-[#D4C9BD] text-xs font-semibold text-[#1C1917] rounded-xs"
              />
              <p className="text-[10px] text-[#7A6E63] mt-1">
                Puede alternar entre "Maison Correas" y "Nativo Colombia" libremente sin tocar código.
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                Lema de Marca / Subtítulo
              </label>
              <input
                type="text"
                value={cmsForm.brandTagline}
                onChange={(e) => setCmsForm({ ...cmsForm, brandTagline: e.target.value })}
                className="w-full p-2.5 bg-[#FAF8F5] border border-[#D4C9BD] text-xs text-[#1C1917] rounded-xs"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                Título del Hero Principal
              </label>
              <input
                type="text"
                value={cmsForm.heroTitle}
                onChange={(e) => setCmsForm({ ...cmsForm, heroTitle: e.target.value })}
                className="w-full p-2.5 bg-[#FAF8F5] border border-[#D4C9BD] text-xs text-[#1C1917] rounded-xs"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                Barra de Anuncios Superior
              </label>
              <input
                type="text"
                value={cmsForm.announcementText}
                onChange={(e) => setCmsForm({ ...cmsForm, announcementText: e.target.value })}
                className="w-full p-2.5 bg-[#FAF8F5] border border-[#D4C9BD] text-xs text-[#1C1917] rounded-xs"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                Umbral para Envío Gratuito (USD)
              </label>
              <input
                type="number"
                value={cmsForm.freeShippingThreshold}
                onChange={(e) => setCmsForm({ ...cmsForm, freeShippingThreshold: Number(e.target.value) })}
                className="w-full p-2.5 bg-[#FAF8F5] border border-[#D4C9BD] text-xs text-[#1C1917] rounded-xs"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#1C1917] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 rounded-xs shadow-sm"
            >
              <Save className="w-4 h-4 text-[#C5A880]" />
              <span>Guardar Cambios en Vivo</span>
            </button>
          </form>
        )}

        {/* Tab 3: Products Catalog Manager */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Quick Add Product */}
            <div className="p-4 bg-white border border-[#D4C9BD] rounded-xs space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1C1917] flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#8C6D3F]" />
                <span>Agregar Nuevo Modelo de Correa Tejida</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Nombre de la Correa"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="p-2.5 border border-[#D4C9BD] text-xs rounded-xs"
                />
                <input
                  type="number"
                  placeholder="Precio USD"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(Number(e.target.value))}
                  className="p-2.5 border border-[#D4C9BD] text-xs rounded-xs"
                />
                <select
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value as any)}
                  className="p-2.5 border border-[#D4C9BD] text-xs rounded-xs"
                >
                  <option value="Monaco">Monaco Edition</option>
                  <option value="Classic">Clásicas</option>
                  <option value="Business">Business</option>
                  <option value="Navy">Navy Collection</option>
                  <option value="Summer">Summer</option>
                  <option value="Limited">Edición Limitada</option>
                </select>
              </div>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-[#1C1917] text-white text-xs uppercase tracking-wider font-semibold rounded-xs"
              >
                Crear Pieza
              </button>
            </div>

            {/* List Products */}
            <div className="divide-y divide-[#EBE5DC] bg-white border border-[#D4C9BD] rounded-xs">
              {products.map((p) => (
                <div key={p.id} className="p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]?.url} alt={p.name} className="w-10 h-12 object-cover rounded-xs border border-[#D4C9BD]" />
                    <div>
                      <p className="font-serif font-medium text-[#1C1917]">{p.name}</p>
                      <p className="text-[10px] text-[#7A6E63]">{p.sku} &bull; {p.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-serif font-bold text-[#1C1917]">${p.price} USD</span>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="text-[#9A8C7E] hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Orders Manager */}
        {activeTab === 'orders' && (
          <div className="space-y-3 max-h-[50vh] overflow-y-auto">
            {orders.map((ord) => (
              <div key={ord.id} className="p-4 bg-white border border-[#D4C9BD] rounded-xs flex items-center justify-between text-xs">
                <div>
                  <span className="font-serif font-bold text-[#1C1917]">Pedido #{ord.orderNumber} ({ord.customerName})</span>
                  <p className="text-[10px] text-[#7A6E63]">{ord.createdAt} &bull; Total: ${ord.total} USD</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={ord.status}
                    onChange={(e) => onUpdateOrder(ord.id, e.target.value as any)}
                    className="p-1.5 border border-[#D4C9BD] text-xs rounded-xs font-semibold bg-emerald-50 text-emerald-800"
                  >
                    <option value="Pending">Pendiente</option>
                    <option value="Processing">Procesando</option>
                    <option value="Shipped">Enviado</option>
                    <option value="Delivered">Entregado</option>
                  </select>
                </div>
              </div>
            ))}

            {orders.length === 0 && (
              <div className="text-center py-10 text-[#7A6E63] font-serif italic">
                Aún no hay pedidos registrados.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
