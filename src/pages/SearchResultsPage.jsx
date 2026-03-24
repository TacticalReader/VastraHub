// src/pages/SearchResultsPage.jsx
// Uses no-results.svg when search returns empty results

import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import allProducts from '../data/allProducts';
import ProductCard from '../components/product/ProductCard';

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const lower = q.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.gender.toLowerCase().includes(lower) ||
        p.type.toLowerCase().includes(lower)
    );
  }, [q]);

  return (
    <main className="container py-12">
      <h1
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
      >
        {q ? `Results for "${q}"` : 'Search'}
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
        {results.length} product{results.length !== 1 ? 's' : ''} found
      </p>

      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
          {/* no-results.svg illustration */}
          <img
            src={import.meta.env.BASE_URL + 'assets/illustrations/no-results.svg'}
            alt="No search results found"
            width={280}
            height={280}
            loading="eager"
            className="mx-auto"
          />
          <div>
            <p className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
              No results found
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Try a different search term or browse our categories.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
