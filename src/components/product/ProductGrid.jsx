import ProductCard from './ProductCard';

export default function ProductGrid({ products, emptyMessage = 'No products found.', className = '' }) {
  if (!products || products.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-24 text-center ${className}`}>
        <p className="text-lg font-medium" style={{ color: 'var(--color-text-muted)' }}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 xl:gap-8 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
