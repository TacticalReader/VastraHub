// src/pages/HomePage.jsx
// Assembles all home section components and their connected images

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import OfferBanner from '../components/home/OfferBanner';
import BestSellers from '../components/home/BestSellers';
import Testimonials from '../components/home/Testimonials';
import CouponPopup from '../components/home/CouponPopup';

// Inline component so we don't create a new file
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
    <section ref={ref} className="stats-section py-16 my-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-32 text-center">
        <div>
          <div className="flex items-center justify-center gap-3 mb-3">
            <FiShoppingBag size={40} style={{ color: 'var(--color-primary)' }} />
            <div className="text-4xl md:text-6xl font-black tracking-tight" style={{ fontFamily: 'var(--font-space)', color: 'var(--color-primary)' }}>
              {products}+
            </div>
          </div>
          <div className="text-sm md:text-base font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-oswald)' }}>
            Products
          </div>
        </div>
        <div className="hidden sm:block w-px h-24" style={{ backgroundColor: 'var(--color-border)' }}></div>
        <div>
          <div className="flex items-center justify-center gap-4 mb-3">
            <FiUsers size={44} style={{ color: 'var(--color-primary)' }} />
            <div className="text-4xl md:text-6xl font-black tracking-tight" style={{ fontFamily: 'var(--font-space)', color: 'var(--color-primary)' }}>
              {customers.toLocaleString()}+
            </div>
          </div>
          <div className="text-sm md:text-base font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-oswald)' }}>
            Happy Customers
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <CouponPopup />
      {/* 1. Full-width hero carousel — hero-1 to hero-4.webp + hero-pattern-bg.svg */}
      <HeroBanner />

      {/* 2. Shop by Category — cat-men-formal, cat-men-outdoor, cat-women-formal, cat-women-outdoor .webp */}
      <CategoryGrid />

      {/* 3. New Arrivals — promo-new-arrivals.webp header + product images from allProducts (isNew: true) */}
      <FeaturedProducts />

      {/* 4. Mid-page offer strip — offer-strip.webp + india-delivery.svg */}
      <OfferBanner />

      {/* 5. Best Sellers horizontal scroll — promo-bestsellers.webp header + product images (isBestSeller: true) */}
      <BestSellers />

      {/* Animated Number Counter */}
      <StatsCounter />

      {/* 6. Testimonial user reviews */}
      <Testimonials />
    </main>
  );
}
