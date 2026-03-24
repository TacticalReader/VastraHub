// src/components/home/HeroBanner.jsx
// Hero carousel — images from public/assets/images/banners/hero-{1-4}.webp
// Background tile — public/assets/illustrations/hero-pattern-bg.svg

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const SLIDES = [
  {
    id: 1,
    image: import.meta.env.BASE_URL + 'assets/images/banners/hero-1.webp',
    heading: 'Dress for the Boardroom',
    subheading: 'Men\'s premium formal wear — suits, blazers and more.',
    cta: 'Shop Men\'s Formal',
    ctaLink: '/category/men/formal',
    align: 'left',
    font: 'var(--font-cinzel)',
  },
  {
    id: 2,
    image: import.meta.env.BASE_URL + 'assets/images/banners/hero-2.webp',
    heading: 'Formal, But Make It You',
    subheading: 'Kurtas, blazers and dresses curated for the modern woman.',
    cta: 'Explore Women\'s Collection',
    ctaLink: '/category/women/formal',
    align: 'right',
    font: 'var(--font-cormorant)',
  },
  {
    id: 3,
    image: import.meta.env.BASE_URL + 'assets/images/banners/hero-3.webp',
    heading: 'Built for the Outdoors',
    subheading: 'Jackets, windcheaters and hoodies for every adventure.',
    cta: 'Shop Outdoor Wear',
    ctaLink: '/category/all/outdoor',
    align: 'left',
    font: 'var(--font-space)',
  },
  {
    id: 4,
    image: import.meta.env.BASE_URL + 'assets/images/banners/hero-4.webp',
    heading: 'Season Sale — Up to 40% Off',
    subheading: 'Premium styles. Unbeatable prices. Limited time only.',
    cta: 'Shop the Sale',
    ctaLink: '/shop',
    align: 'center',
    font: 'var(--font-bebas)',
  },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
  exit: (dir) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0, transition: { duration: 0.45 } }),
};

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = SLIDES.length;

  const goTo = useCallback((index, dir = 1) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => goTo((current + 1) % total, 1), [current, goTo, total]);
  const prev = useCallback(() => goTo((current - 1 + total) % total, -1), [current, goTo, total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next, paused]);

  const slide = SLIDES[current];
  const textAlign = slide.align === 'center' ? 'items-center text-center' : slide.align === 'right' ? 'items-end text-right' : 'items-start text-left';

  return (
    <section
      id="hero-banner"
      className="relative w-full overflow-hidden h-[60vh] md:h-[75vh] lg:h-[85vh] min-h-[400px] max-h-[800px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero banner"
    >
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: `url(\${import.meta.env.BASE_URL}assets/illustrations/hero-pattern-bg.svg)` }}
        aria-hidden="true"
      />

      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 z-[2]"
        >
          <img
            src={slide.image}
            alt={slide.heading}
            width={1440}
            height={800}
            loading={current === 0 ? 'eager' : 'lazy'}
            className="h-full w-full object-cover object-[center_20%]"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ 
              background: slide.align === 'right' 
                ? 'linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
                : slide.align === 'center'
                ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
                : 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
            }}
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Text overlay */}
      <div className={`absolute inset-0 z-[3] flex flex-col justify-center px-8 md:px-20 gap-4 ${textAlign}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.4 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            className={`flex flex-col gap-3 ${textAlign}`}
          >
            <h1
              className="text-4xl font-normal leading-tight text-white md:text-6xl"
              style={{ fontFamily: slide.font || 'var(--font-heading)', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
            >
              {slide.heading}
            </h1>
            <p className="max-w-lg text-base text-white/90 md:text-lg" style={{ fontFamily: 'var(--font-body)', textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
              {slide.subheading}
            </p>
            <Link
              to={slide.ctaLink}
              className="btn-glow mt-4 inline-flex w-fit items-center rounded-full px-8 py-3.5 text-[15px] font-bold tracking-wide uppercase text-white shadow-lg"
              style={{ background: 'var(--color-primary)', fontFamily: 'var(--font-syne)' }}
            >
              {slide.cta}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-[4] -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
      >
        <FiChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-[4] -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
      >
        <FiChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 z-[4] flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === current ? '28px' : '8px',
              background: i === current ? 'var(--color-primary)' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
