/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingCart, 
  MessageCircle, 
  X, 
  Zap, 
  Target, 
  Monitor, 
  Bot, 
  Settings, 
  ChevronRight,
  ShieldCheck,
  Clock,
  CheckCircle2
} from "lucide-react";

interface Price {
  name: string;
  price: number;
}

interface Product {
  name: string;
  icon: ReactNode;
  prices: Price[];
}

const PRODUCTS: Product[] = [
  {
    name: "Alight Motion",
    icon: <Zap className="w-6 h-6 text-blue-600" />,
    prices: [
      { name: "1 Tahun (Sharing)", price: 5000 },
      { name: "1 Tahun (Private)", price: 10000 }
    ]
  },
  {
    name: "Canva",
    icon: <Target className="w-6 h-6 text-blue-600" />,
    prices: [
      { name: "Member 1 Bulan", price: 5000 },
      { name: "Bisnis 1 Bulan", price: 10000 },
      { name: "Owner 1 Bulan", price: 15000 }
    ]
  },
  {
    name: "Supergrok",
    icon: <Monitor className="w-6 h-6 text-blue-600" />,
    prices: [
      { name: "3 Hari (Sharing No Garansi)", price: 15000 },
      { name: "1 Bulan (Sharing No Garansi)", price: 30000 },
      { name: "1 Bulan (Private Garansi 15 Hari)", price: 50000 }
    ]
  },
  {
    name: "ChatGPT",
    icon: <Bot className="w-6 h-6 text-blue-600" />,
    prices: [
      { name: "ChatGPT+ Private 1 Bulan", price: 25000 },
      { name: "ChatGPT Head Business 1 Bulan", price: 30000 }
    ]
  },
  {
    name: "CapCut",
    icon: <Settings className="w-6 h-6 text-blue-600" />,
    prices: [
      { name: "Private 7 Hari (Full Garansi)", price: 10000 },
      { name: "Private 1 Bulan (No Garansi)", price: 25000 },
      { name: "Private 1 Bulan (Garansi 15 Hari)", price: 30000 }
    ]
  }
];

const WHATSAPP_CONFIG = {
  url: "https://wa.me/6287720938486",
  message: "Halo, saya ingin membeli {package} di Sinz Store"
};

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleBuy = (pkg: string) => {
    const message = WHATSAPP_CONFIG.message.replace("{package}", pkg);
    const encodedMessage = encodeURIComponent(message);
    window.open(`${WHATSAPP_CONFIG.url}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 dark-overlay" />
        <div className="floating-shape w-96 h-96 -top-20 -left-20 animate-pulse" />
        <div className="floating-shape w-[500px] h-[500px] top-1/2 -right-40 animate-pulse delay-700" />
        <div className="floating-shape w-80 h-80 bottom-0 left-1/4 animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-grow py-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block mb-4"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-2 drop-shadow-lg">
              Sinz Store
            </h1>
            <div className="h-1.5 w-24 bg-blue-500 mx-auto rounded-full blue-glow" />
          </motion.div>
          <p className="text-blue-100 text-xl md:text-2xl font-medium opacity-90">
            Premium Apps Murah & Terpercaya
          </p>
        </motion.header>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-premium rounded-[16px] p-8 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                {product.icon}
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                {product.name}
              </h2>
              <button
                onClick={() => setSelectedProduct(product)}
                className="btn-blue-gradient w-full py-4 rounded-xl flex items-center justify-center gap-2 group/btn"
              >
                Lihat Harga
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / Popup */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[24px] shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {selectedProduct.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {selectedProduct.name}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
                {selectedProduct.prices.map((pkg, idx) => (
                  <motion.button
                    key={pkg.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleBuy(`${selectedProduct.name} - ${pkg.name}`)}
                    className="w-full flex items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-blue-500 hover:bg-blue-50 group/item transition-all"
                  >
                    <div className="text-left">
                      <p className="font-semibold text-slate-700 group-hover/item:text-blue-700 transition-colors">
                        {pkg.name}
                      </p>
                      <p className="text-lg font-bold text-blue-600">
                        {formatPrice(pkg.price)}
                      </p>
                    </div>
                    <ShoppingCart className="w-5 h-5 text-slate-300 group-hover/item:text-blue-500 transition-colors" />
                  </motion.button>
                ))}
              </div>

              <div className="p-4 bg-slate-50 text-center">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                  Klik untuk memesan via WhatsApp
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-950 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <div className="flex gap-8 text-white/40">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">Terpercaya</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">Proses Cepat</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">Garansi Aman</span>
            </div>
          </div>
          <div className="h-px w-full max-w-xs bg-white/10" />
          <p className="text-white/60 text-sm font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Sinz Store - All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
