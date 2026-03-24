import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { useWishlist } from '../hooks/useWishlist';
import ProductCard from '../components/product/ProductCard';

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist();

  if (!items.length) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
        {/* empty-wishlist.svg illustration */}
        <img
          src={import.meta.env.BASE_URL + 'assets/illustrations/empty-wishlist.svg'}
          alt="Nothing saved to your wishlist yet"
          width={300}
          height={300}
          loading="eager"
          className="mx-auto"
        />
        <div>
          <h1
            className="text-2xl font-bold md:text-3xl"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
          >
            Nothing saved yet
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Tap the heart icon on any product to save it here.
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white transition hover:opacity-85"
          style={{ background: 'var(--color-primary)' }}
        >
          <FiHeart size={16} /> Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-12 lg:py-20 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            Your Wishlist
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        
        <button
          onClick={clearWishlist}
          className="text-sm font-semibold text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
