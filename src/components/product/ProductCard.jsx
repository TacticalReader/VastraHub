// src/components/product/ProductCard.jsx
// Used in ShopPage, CategoryPage, FeaturedProducts, BestSellers, RelatedProducts
// Displays product.images[0] (primary) and product.images[1] on hover

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import PriceDisplay from '../ui/PriceDisplay';
import RatingStars from '../ui/RatingStars';
import Tooltip from '../ui/Tooltip';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const inWishlist = isWishlisted(product.id);

  const displayImg = !imgError && hovered && product.images[1]
    ? product.images[1]
    : product.images[0];

  const discountPct = product.discount ?? Math.round(((product.mrp - product.price) / product.mrp) * 100);

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

        {/* Quick add to cart */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-10">
          <Button
            variant="primary"
            fullWidth
            className="rounded-none py-3 h-auto justify-center rounded-b-[15px]"
            onClick={(e) => { e.preventDefault(); addToCart(product, product.sizes?.[0] || 'One Size', 1); }}
            aria-label={`Add ${product.name} to cart`}
          >
            <FiShoppingCart size={14} className="mr-2" /> Add to Cart
          </Button>
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
