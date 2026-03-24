// src/components/home/FeaturedProducts.jsx
// "New Arrivals" section — uses promo-new-arrivals.webp as header bg
// Products with isNew: true are shown via ProductCard

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import allProducts from '../../data/allProducts';
import ProductCard from '../product/ProductCard';

const newArrivals = allProducts.filter((p) => p.isNew).slice(0, 8);

export default function FeaturedProducts() {
  return (
    <section id="new-arrivals" className="py-16 md:py-24" aria-labelledby="new-arrivals-heading">
      {/* Section header with promo background image */}
      <div
        className="relative mb-12 flex flex-col items-center justify-center overflow-hidden rounded-2xl mx-4 md:mx-8 py-12"
        style={{ minHeight: '160px' }}
      >
        <img
          src={import.meta.env.BASE_URL + 'assets/images/banners/promo-new-arrivals.webp'}
          alt="New Arrivals"
          width={1200}
          height={400}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.48)' }} />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-75 mb-2">✦ Just Arrived</p>
          <h2
            id="new-arrivals-heading"
            className="text-3xl font-extrabold md:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            New Arrivals
          </h2>
          <p className="mt-2 text-sm opacity-80 max-w-md mx-auto">
            Fresh styles added every week — be the first to wear them.
          </p>
        </div>
      </div>

      <div className="container">
        {newArrivals.length === 0 ? (
          <p className="py-12 text-center" style={{ color: 'var(--color-text-muted)' }}>
            No new arrivals right now. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {newArrivals.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border px-8 py-3 text-sm font-semibold transition-colors hover:opacity-80"
            style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
          >
            View All New Arrivals →
          </Link>
        </div>
      </div>
    </section>
  );
}
