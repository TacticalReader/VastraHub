// src/components/home/CategoryGrid.jsx
// "Shop by Category" section — images from public/assets/images/banners/cat-*.webp

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CATEGORIES from '../../data/categories';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.45, ease: 'easeOut' },
  }),
};

export default function CategoryGrid() {
  return (
    <section id="shop-by-category" className="py-16 md:py-24" aria-labelledby="category-heading">
      <div className="container">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2
            id="category-heading"
            className="text-gradient text-4xl mb-1 font-normal md:text-5xl"
            style={{ fontFamily: 'var(--font-dm)' }}
          >
            Shop by Category
          </h2>
          <p className="mt-2 text-sm md:text-base" style={{ color: 'var(--color-text-muted)' }}>
            Explore our curated collections for every occasion.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Link
                to={cat.to}
                className="group relative block overflow-hidden rounded-2xl"
                style={{ aspectRatio: '6/7' }}
                aria-label={`Browse ${cat.label}`}
              >
                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.label}
                  width={600}
                  height={700}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)' }}
                />

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
                    {cat.label.split('—')[0].trim()}
                  </p>
                  <h3 className="mt-0.5 text-xl font-bold leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>
                    {cat.label.split('—')[1]?.trim() ?? cat.label}
                  </h3>
                  <p className="mt-1 text-xs opacity-70">{cat.description}</p>
                  <span
                    className="mt-3 inline-block translate-y-2 rounded-full px-4 py-1.5 text-xs font-semibold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    style={{ background: 'var(--color-primary)', color: '#fff' }}
                  >
                    Shop Now
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
