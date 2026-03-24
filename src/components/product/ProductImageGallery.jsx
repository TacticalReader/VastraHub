// src/components/product/ProductImageGallery.jsx
// Used in ProductDetailPage — shows product.images[0] (front) + product.images[1] (back/detail)
// Also shows size-guide.svg in a modal when "Size Guide" is clicked

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Modal from '../ui/Modal';

export default function ProductImageGallery({ product }) {
  const images = product?.images ?? [];
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [sizeGuide, setSizeGuide] = useState(false);

  const prev = () => setSelected((s) => (s - 1 + images.length) % images.length);
  const next = () => setSelected((s) => (s + 1) % images.length);

  if (!images.length) return null;

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row-reverse">
        {/* Thumbnail strip */}
        <div className="flex gap-2 md:flex-col md:w-20">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              aria-label={`View image ${i + 1}`}
              className="rounded-xl overflow-hidden shrink-0 transition-all"
              style={{
                width: '64px', height: '80px',
                border: i === selected ? '2px solid var(--color-primary)' : '2px solid var(--color-border-light)',
                opacity: i === selected ? 1 : 0.65,
              }}
            >
              <img
                src={src}
                alt={`${product.name} view ${i + 1}`}
                width={64}
                height={80}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="relative flex-1 overflow-hidden rounded-2xl" style={{ aspectRatio: '4/5', cursor: 'zoom-in' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={selected}
              src={images[selected]}
              alt={`${product.name} — view ${selected + 1}`}
              width={800}
              height={1000}
              loading={selected === 0 ? 'eager' : 'lazy'}
              onClick={() => setLightbox(true)}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0 }}
              className="h-full w-full object-cover"
            />
          </AnimatePresence>

          {/* Prev/next nav */}
          {images.length > 1 && (
            <>
              <button onClick={prev} aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition">
                <FiChevronLeft size={18} />
              </button>
              <button onClick={next} aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition">
                <FiChevronRight size={18} />
              </button>
            </>
          )}

          {/* Size guide trigger */}
          <button
            onClick={() => setSizeGuide(true)}
            className="absolute bottom-3 right-3 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-sm transition hover:opacity-80"
            style={{ background: 'rgba(0,0,0,0.45)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}
            aria-label="Open size guide"
          >
            Size Guide
          </button>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              onClick={() => setLightbox(false)}
              aria-label="Close lightbox"
            >
              <FiX size={20} />
            </button>
            <img
              src={images[selected]}
              alt={product.name}
              className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Size Guide Modal ── */}
      <Modal isOpen={sizeGuide} onClose={() => setSizeGuide(false)} title="Size Guide" className="max-w-2xl w-[95%]">
        <img
          src={import.meta.env.BASE_URL + 'assets/illustrations/size-guide.svg'}
          alt="Size guide chart — chest, waist, hip measurements mapped to XS–XXL"
          width={500}
          height={400}
          className="mx-auto w-full max-w-md"
          loading="lazy"
        />
      </Modal>
    </>
  );
}
