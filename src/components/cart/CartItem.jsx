import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div 
      className="flex gap-4 p-4 rounded-2xl shadow-sm transition-shadow hover:shadow-md bg-white dark:bg-zinc-900"
      style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
    >
      <Link to={`/product/${item.product.id}`} className="shrink-0">
        <img 
          src={item.product.images[0]} 
          alt={item.product.name} 
          className="w-24 h-32 object-cover rounded-xl"
        />
      </Link>
      
      <div className="flex flex-col justify-between flex-1 py-1">
        <div>
          <div className="flex justify-between items-start gap-4">
            <Link to={`/product/${item.product.id}`}>
              <h3 className="font-semibold text-base leading-snug hover:text-[color:var(--color-primary)] transition-colors" style={{ color: 'var(--color-text)' }}>
                {item.product.name}
              </h3>
            </Link>
            <button 
              onClick={() => removeFromCart(item.key)}
              className="text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors shrink-0"
              aria-label="Remove item"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Size: {item.size}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
          <div className="flex items-center border rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
            <button 
              onClick={() => updateQuantity(item.key, item.quantity - 1)}
              className="p-2 hover:bg-[color:var(--color-bg-secondary)] transition-colors rounded-l-lg"
              style={{ color: 'var(--color-text)' }}
            >
              <FiMinus size={14} />
            </button>
            <span className="w-10 text-center text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
              {item.quantity}
            </span>
            <button 
              onClick={() => updateQuantity(item.key, item.quantity + 1)}
              className="p-2 hover:bg-[color:var(--color-bg-secondary)] transition-colors rounded-r-lg"
              style={{ color: 'var(--color-text)' }}
            >
              <FiPlus size={14} />
            </button>
          </div>
          
          <span className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>
            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
}
