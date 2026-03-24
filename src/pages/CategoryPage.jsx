// src/pages/CategoryPage.jsx
// Category-specific product listing — same as ShopPage but fixed to one category
// Uses no-results.svg for empty state, product images via ProductCard

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import allProducts from '../data/allProducts';
import ProductCard from '../components/product/ProductCard';

export default function CategoryPage() {
  const { gender, type } = useParams();

  const products = useMemo(() => {
    let list = allProducts;
    if (gender && gender !== 'all') list = list.filter((p) => p.gender === gender);
    if (type) {
      // Filter by type (e.g., suits) or category (e.g., formal)
      list = list.filter((p) => p.type === type || p.category === type);
    }
    return list;
  }, [gender, type]);

  const heading = [
    gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : '',
    type ? type.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : '',
  ]
    .filter(Boolean)
    .join(' — ');

  return (
    <main className="container py-12">
      <h1
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
      >
        {heading || 'Category'}
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
        {products.length} product{products.length !== 1 ? 's' : ''}
      </p>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-6 py-16 text-center">
          {/* no-results.svg for empty category state */}
          <img
            src={import.meta.env.BASE_URL + 'assets/illustrations/no-results.svg'}
            alt="No products in this category"
            width={280}
            height={280}
            loading="eager"
            className="mx-auto"
          />
          <p className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>
            No products found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
