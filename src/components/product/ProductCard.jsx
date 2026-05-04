// src/components/product/ProductCard.jsx
// Used in ShopPage, CategoryPage, FeaturedProducts, BestSellers, RelatedProducts
// Displays product.images[0] (primary) and product.images[1] on hover

import { Link } from 'react-router-dom';
import { useState, useRef, useCallback } from 'react';
import { FiHeart, FiShoppingCart, FiEye, FiCheck } from 'react-icons/fi';
import { useWishlist } from '../../hooks/useWishlist';
import { useAddToCartAnimation } from '../../hooks/useAddToCartAnimation';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import PriceDisplay from '../ui/PriceDisplay';
import RatingStars from '../ui/RatingStars';
import Tooltip from '../ui/Tooltip';

/* ── tiny helper: fire particle burst from a clicked element ── */
function spawnParticles(originEl) {
  if (!originEl) return;
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const COUNT = 7;
  for (let i = 0; i < COUNT; i++) {
    const dot = document.createElement('span');
    dot.className = 'cart-particle';
    const angle = (360 / COUNT) * i;
    const dist = 55 + Math.random() * 40;
    const tx = Math.cos((angle * Math.PI) / 180) * dist;
    const ty = Math.sin((angle * Math.PI) / 180) * dist;
    dot.style.cssText = `left:${cx}px;top:${cy}px;--tx:${tx}px;--ty:${ty}px;`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 750);
  }
}

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [ripples, setRipples] = useState([]);
  const btnRef = useRef(null);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { wrappedAddToCart, animating } = useAddToCartAnimation();

  const inWishlist = isWishlisted(product.id);

  const displayImg = !imgError && hovered && product.images[1]
    ? product.images[1]
    : product.images[0];

  const discountPct = product.discount ?? Math.round(((product.mrp - product.price) / product.mrp) * 100);

  /* ── Add to cart with full animation suite ── */
  const handleAddToCart = useCallback((e) => {
    e.preventDefault();

    // 1. ripple
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((ri) => ri.id !== id)), 700);

    // 2. particles
    spawnParticles(btnRef.current);

    // 3. add + toast
    wrappedAddToCart(product, product.sizes?.[0] || 'One Size', 1);
  }, [product, wrappedAddToCart]);

  return (
    <article
      className="card-hover group relative flex flex-col overflow-hidden rounded-2xl"
      style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border-light)' }}
    >
      {/* Image area */}
      <div
        className="img-zoom relative block"
        style={{ aspectRatio: '4/5' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link
          to={`/product/${product.id}`}
          tabIndex={-1}
          className="absolute inset-0 z-0"
        >
          <img
            src={displayImg.startsWith('http') ? displayImg : import.meta.env.BASE_URL + displayImg}
            alt={product.name}
            width={800}
            height={1000}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && <Badge variant="new">New</Badge>}
          {discountPct > 0 && <Badge variant="discount">-{discountPct}%</Badge>}
        </div>

        <div className="absolute right-2.5 top-2.5 flex flex-col gap-2 translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 z-10">
          <Tooltip content={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"} position="left">
            <button
              onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
              aria-label={`${inWishlist ? 'Remove from' : 'Add to'} wishlist`}
              className="flex h-9 w-9 items-center justify-center rounded-full shadow-md transition hover:scale-110"
              style={{ background: 'var(--color-bg)', color: inWishlist ? '#ef4444' : 'var(--color-text)' }}
            >
              <FiHeart size={16} className={inWishlist ? 'fill-current' : ''} />
            </button>
          </Tooltip>

          <Tooltip content="Quick View" position="left">
            <Link
              to={`/product/${product.id}`}
              aria-label={`Quick view ${product.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-full shadow-md transition hover:scale-110"
              style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}
            >
              <FiEye size={16} />
            </Link>
          </Tooltip>
        </div>

        {/* Quick add to cart — animated */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-10">
          <button
            ref={btnRef}
            className={`cart-ripple-wrap w-full py-3 flex items-center justify-center gap-2 font-semibold text-sm tracking-wide transition-colors rounded-b-[15px] ${animating ? 'cart-btn-animating' : ''}`}
            style={{
              background: animating ? '#16a34a' : 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            {/* ripple elements */}
            {ripples.map(({ id, x, y }) => (
              <span
                key={id}
                className="cart-ripple"
                style={{ left: x, top: y }}
              />
            ))}

            {/* icon toggles between cart and check */}
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                transition: 'transform 0.25s, opacity 0.25s',
                transform: animating ? 'scale(1.2)' : 'scale(1)',
              }}
            >
              {animating
                ? <FiCheck size={16} strokeWidth={3} />
                : <FiShoppingCart size={14} />
              }
            </span>

            <span style={{ transition: 'opacity 0.2s', opacity: 1 }}>
              {animating ? 'Added!' : 'Add to Cart'}
            </span>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 p-3">
        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 text-base italic font-bold leading-snug hover:text-[color:var(--color-primary)] transition-colors"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-playfair)' }}
        >
          {product.name}
        </Link>

        {/* Rating */}
        {product.rating && (
          <RatingStars rating={product.rating} count={product.reviews} size={12} className="mb-0.5" />
        )}

        {/* Price */}
        <PriceDisplay price={product.price} mrp={product.mrp} size="md" />
      </div>
    </article>
  );
}
