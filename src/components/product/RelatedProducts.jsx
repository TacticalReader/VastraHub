// src/components/product/RelatedProducts.jsx
// Shown in ProductDetailPage — 4 products from same category

import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import allProducts from '../../data/allProducts';
import ProductCard from './ProductCard';

export default function RelatedProducts({ currentProductId, category, gender }) {
  const related = useMemo(() => {
    return allProducts
      .filter(
        (p) =>
          p.id !== currentProductId &&
          p.category === category &&
          p.gender === gender
      )
      .slice(0, 4);
  }, [currentProductId, category, gender]);

  if (!related.length) return null;

  return (
    <section className="py-12" aria-labelledby="related-products-heading">
      <div className="mb-6 flex items-center justify-between">
        <h2
          id="related-products-heading"
          className="text-xl font-bold md:text-2xl"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
        >
          You May Also Like
        </h2>
        <Link
          to={`/shop?gender=${gender}&category=${category}`}
          className="text-xs font-semibold hover:opacity-75 transition-opacity"
          style={{ color: 'var(--color-primary)' }}
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
