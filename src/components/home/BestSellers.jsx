// src/components/home/BestSellers.jsx
// "Best Sellers" horizontal scroll — uses promo-bestsellers.webp as header bg
// Products with isBestSeller: true shown via ProductCard

import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import allProducts from '../../data/allProducts';
import ProductCard from '../product/ProductCard';

const bestSellers = allProducts.filter((p) => p.isBestSeller);

export default function BestSellers() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  return (
    <section id="best-sellers" className="py-16 md:py-24" aria-labelledby="best-sellers-heading">
      {/* Section header with promo background image */}
      <div
        className="relative mb-12 flex flex-col items-center justify-center overflow-hidden rounded-2xl mx-4 md:mx-8 py-12"
        style={{ minHeight: '160px' }}
      >
        <img
          src={import.meta.env.BASE_URL + 'assets/images/banners/promo-bestsellers.webp'}
          alt="Best Sellers"
          width={1200}
          height={400}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.50)' }} />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-75 mb-2">★ Customer Favourites</p>
          <h2
            id="best-sellers-heading"
            className="text-3xl font-extrabold md:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Best Sellers
          </h2>
          <p className="mt-2 text-sm opacity-80 max-w-md mx-auto">
            Loved by thousands — these pieces fly off the shelf.
          </p>
        </div>
      </div>

      <div className="container relative">
        {/* Scroll controls */}
        {bestSellers.length > 3 && (
          <>
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full shadow-lg transition hover:scale-105 md:flex"
              style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
            >
              <FiChevronLeft size={20} style={{ color: 'var(--color-text)' }} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full shadow-lg transition hover:scale-105 md:flex"
              style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
            >
              <FiChevronRight size={20} style={{ color: 'var(--color-text)' }} />
            </button>
          </>
        )}

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="snap-start shrink-0"
              style={{ width: 'clamp(200px, 26vw, 260px)' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border px-8 py-3 text-sm font-semibold transition-colors hover:opacity-80"
            style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
          >
            Browse All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
