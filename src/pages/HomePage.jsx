import { useEffect, useState, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import OfferBanner from '../components/home/OfferBanner';
import BestSellers from '../components/home/BestSellers';
import Testimonials from '../components/home/Testimonials';
import CouponPopup from '../components/home/CouponPopup';

import { FiShoppingBag, FiUsers } from 'react-icons/fi';

function StatsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [products, setProducts] = useState(0);
  const [customers, setCustomers] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const stepTime = Math.abs(Math.floor(duration / steps));
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setProducts(Math.floor((500 / steps) * currentStep));
      setCustomers(Math.floor((10000 / steps) * currentStep));
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setProducts(500);
        setCustomers(10000);
      }
    }, stepTime);
    
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-slate-50/50">
      {/* Decorative blurred background elements for a modern glass feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden opacity-60 pointer-events-none">
         <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-200/50 blur-3xl"></div>
         <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-200/50 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-32 bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-indigo-900/5 rounded-3xl p-12 md:p-16 max-w-5xl mx-auto"
        >
          {/* Products Stat */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center transform group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-indigo-200 transition-all duration-300 border border-indigo-100">
              <FiShoppingBag size={32} strokeWidth={1.5} />
            </div>
            <div className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-2 drop-shadow-sm">
              {products}+
            </div>
            <div className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
              Premium Products
            </div>
          </div>

          {/* Refined Divider */}
          <div className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>

          {/* Customers Stat */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center transform group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-purple-200 transition-all duration-300 border border-purple-100">
              <FiUsers size={32} strokeWidth={1.5} />
            </div>
            <div className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-2 drop-shadow-sm">
              {customers.toLocaleString()}+
            </div>
            <div className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
              Happy Customers
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <CouponPopup />
      
      {/* Using space-y for consistent vertical rhythm while allowing full-bleed components */}
      <div className="flex flex-col space-y-12 md:space-y-24 pb-24">
        <HeroBanner />
        <CategoryGrid />
        <FeaturedProducts />
        <OfferBanner />
        <BestSellers />
        <StatsCounter />
        <Testimonials />
      </div>
    </main>
  );
}
