import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import allProducts from '../../data/allProducts';
import ProductCard from '../product/ProductCard';

const newArrivals = allProducts.filter((p) => p.isNew).slice(0, 8);

export default function FeaturedProducts() {
  return (
    <section id="new-arrivals" className="py-16 md:py-32 bg-gray-50 dark:bg-zinc-950" aria-labelledby="new-arrivals-heading">
      {/* Enhanced Section header with modern overlay and glassmorphism */}
      <div className="container mx-auto px-4 mb-16">
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl min-h-[320px] md:min-h-[400px] shadow-2xl group">
          <img
            src={import.meta.env.BASE_URL + 'assets/images/banners/promo-new-arrivals.webp'}
            alt="New Arrivals Background"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Refined gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          
          {/* Glassmorphic content box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center text-white px-8 py-10 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl mx-4 max-w-lg shadow-xl"
          >
            <div className="inline-flex items-center justify-center space-x-2 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Just Arrived</p>
            </div>
            <h2
              id="new-arrivals-heading"
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
            >
              New Arrivals
            </h2>
            <p className="text-sm md:text-base text-gray-200 font-medium leading-relaxed">
              Discover the latest styles added this week. Elevate your wardrobe with our fresh curated pieces.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {newArrivals.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-lg font-medium">No new arrivals right now.</p>
            <p className="text-sm">Check back soon for fresh drops!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
            {newArrivals.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  delay: i * 0.1, 
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 100
                }}
                className="group cursor-pointer"
              >
                {/* Wrapper interaction for the product card */}
                <div className="transition-transform duration-300 ease-out group-hover:-translate-y-2">
                  <ProductCard product={product} />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modern CTA */}
        {newArrivals.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 rounded-full bg-zinc-900 dark:bg-white px-8 py-4 text-sm font-semibold text-white dark:text-zinc-900 shadow-md transition-all hover:bg-zinc-800 dark:hover:bg-gray-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:focus:ring-white dark:focus:ring-offset-zinc-900"
            >
              <span>Explore All New Arrivals</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
