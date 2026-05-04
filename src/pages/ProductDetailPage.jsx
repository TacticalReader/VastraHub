// src/pages/ProductDetailPage.jsx
// Uses ProductImageGallery (connects both a/b product images + size-guide.svg)
// Uses RelatedProducts (connects same-category product images)
// Uses india-delivery.svg (inline delivery badge)

import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import allProducts from '../data/allProducts';
import ProductImageGallery from '../components/product/ProductImageGallery';
import RelatedProducts from '../components/product/RelatedProducts';
import { FiShoppingCart, FiHeart, FiShare2, FiCheck } from 'react-icons/fi';
import { useAddToCartAnimation } from '../hooks/useAddToCartAnimation';
import { useWishlist } from '../hooks/useWishlist';
import SizeSelector from '../components/product/SizeSelector';
import ColorSelector from '../components/product/ColorSelector';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';
import PriceDisplay from '../components/ui/PriceDisplay';
import RatingStars from '../components/ui/RatingStars';
import Tooltip from '../components/ui/Tooltip';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

/* ── particle burst helper (same as ProductCard) ── */
function spawnParticles(originEl) {
  if (!originEl) return;
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const COUNT = 8;
  for (let i = 0; i < COUNT; i++) {
    const dot = document.createElement('span');
    dot.className = 'cart-particle';
    const angle = (360 / COUNT) * i;
    const dist = 70 + Math.random() * 50;
    const tx = Math.cos((angle * Math.PI) / 180) * dist;
    const ty = Math.sin((angle * Math.PI) / 180) * dist;
    dot.style.cssText = `left:${cx}px;top:${cy}px;--tx:${tx}px;--ty:${ty}px;`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 800);
  }
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = useMemo(() => allProducts.find((p) => p.id === id), [id]);
  
  // Initialize state variables first
  const [size, setSize] = useState('');
  const [color, setColor] = useState(null);
  const [ripples, setRipples] = useState([]);
  
  const { wrappedAddToCart, animating } = useAddToCartAnimation();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const ctaBtnRef = useRef(null);

  // Reset size and color when product changes
  useEffect(() => {
    if (product) {
      const resolvedSizes = product?.sizes ?? SIZES;
      const resolvedColors = product?.colors ?? [
        { id: 'c1', name: 'Navy', hex: '#1E3A8A' },
        { id: 'c2', name: 'Black', hex: '#111827' },
        { id: 'c3', name: 'Charcoal', hex: '#374151' }
      ];
      setSize(resolvedSizes[0]);
      setColor(resolvedColors[0]);
    }
  }, [product?.id]);

  const handleAddToCart = useCallback((e) => {
    // 1. ripple
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((ri) => ri.id !== id)), 700);
    // 2. particles
    spawnParticles(ctaBtnRef.current);
    // 3. add + toast
    wrappedAddToCart(product, size, 1);
  }, [wrappedAddToCart, product, size]);
   
  const resolvedSizes = product?.sizes ?? SIZES;
  const resolvedColors = product?.colors ?? [
    { id: 'c1', name: 'Navy', hex: '#1E3A8A' },
    { id: 'c2', name: 'Black', hex: '#111827' },
    { id: 'c3', name: 'Charcoal', hex: '#374151' }
  ];

  const inWishlist = product ? isWishlisted(product.id) : false;

  if (!product) {
    return (
      <main className="container py-20 text-center">
        <p style={{ color: 'var(--color-text-muted)' }}>Product not found.</p>
        <Link to="/shop" className="mt-4 inline-block text-sm" style={{ color: 'var(--color-primary)' }}>
          ← Back to shop
        </Link>
      </main>
    );
  }

  const discount = product.discount ?? Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <main className="container py-10">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Breadcrumb items={[
          { label: 'Shop', href: '/shop' },
          { label: product.category.replace(/-/g, ' '), href: `/category/${product.gender}/${product.category}` },
          { label: product.name }
        ]} />
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
        {/* Gallery — connects product.images[0] (a) and product.images[1] (b) + size-guide.svg */}
        <ProductImageGallery product={product} />

        {/* Info panel */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-oswald)' }}>
              {product.gender} · {product.category.replace(/-/g, ' ')}
            </p>
            <h1 className="text-3xl font-bold md:text-5xl italic" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--color-text)' }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3">
              <RatingStars rating={product.rating} count={`${product.rating} — ${product.reviews} reviews`} size={16} />
            </div>
          </div>

          {/* Price */}
          <PriceDisplay price={product.price} mrp={product.mrp} size="xl" className="my-2" />

          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            {product.description}
          </p>

          <div className="flex flex-col gap-6">
            <ColorSelector colors={resolvedColors} selectedColor={color} onSelect={setColor} />
            <SizeSelector sizes={resolvedSizes} selectedSize={size} onSelect={setSize} />
          </div>

          {/* Delivery badge with india-delivery.svg */}
          <div className="flex items-center gap-3 rounded-xl p-4"
            style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-light)' }}>
            <img
              src={import.meta.env.BASE_URL + 'assets/illustrations/india-delivery.svg'}
              alt="Free delivery"
              width={40}
              height={40}
              loading="lazy"
              className="shrink-0"
            />
            <div>
              <p className="text-base font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-syne)' }}>
                Free delivery across India
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                Orders above ₹999 · Est. 3–5 business days
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3">
            <button
              ref={ctaBtnRef}
              className={`cart-ripple-wrap flex-1 flex items-center justify-center gap-2 rounded-full tracking-wide uppercase font-bold text-sm px-8 py-4 ${animating ? 'cart-btn-animating' : ''}`}
              style={{
                background: animating ? '#16a34a' : 'var(--color-primary)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-syne)',
                transition: 'background 0.3s',
                minHeight: '3.5rem',
              }}
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              {/* ripples */}
              {ripples.map(({ id, x, y }) => (
                <span key={id} className="cart-ripple" style={{ left: x, top: y }} />
              ))}

              <span style={{ display:'flex', alignItems:'center', transition:'transform 0.25s', transform: animating ? 'scale(1.25)' : 'scale(1)' }}>
                {animating ? <FiCheck size={20} strokeWidth={3} /> : <FiShoppingCart size={18} />}
              </span>
              {animating ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            
            <Tooltip content={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}>
              <button
                onClick={() => toggleWishlist(product)}
                aria-label={`${inWishlist ? 'Remove from' : 'Add to'} wishlist`}
                className="flex h-[3.5rem] w-[3.5rem] shrink-0 items-center justify-center rounded-full border transition hover:bg-[color:var(--color-bg-secondary)] active:scale-[0.98]"
                style={{ borderColor: 'var(--color-border)', color: inWishlist ? '#ef4444' : 'var(--color-text)' }}
              >
                <FiHeart size={20} className={inWishlist ? 'fill-current shadow-sm' : ''} />
              </button>
            </Tooltip>
            
            <Tooltip content="Share Product">
              <button
                aria-label="Share product"
                className="flex h-[3.5rem] w-[3.5rem] shrink-0 items-center justify-center rounded-full border transition hover:bg-[color:var(--color-bg-secondary)] active:scale-[0.98]"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <FiShare2 size={20} />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Related products — connects same-category product images */}
      <div className="mt-16">
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
          gender={product.gender}
        />
      </div>
    </main>
  );
}