import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

export default function CartPage() {
  const { items } = useCart();

  if (!items.length) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <img
          src={import.meta.env.BASE_URL + 'assets/illustrations/empty-cart.svg'}
          alt="Your cart is empty"
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
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Looks like you haven't added anything yet. Start exploring!
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white transition hover:opacity-85"
          style={{ background: 'var(--color-primary)' }}
        >
          <FiShoppingCart size={16} /> Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-12 lg:py-20 animate-fade-in">
      <h1 className="text-3xl font-extrabold mb-10" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
        Your Cart Checkout
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <CartItem key={item.key} item={item} />
          ))}
        </div>
        
        <div className="lg:w-[380px] shrink-0">
          <div className="sticky top-24">
            <CartSummary />
          </div>
        </div>
      </div>
    </main>
  );
}
