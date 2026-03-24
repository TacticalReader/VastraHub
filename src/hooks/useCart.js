import { useCartContext } from '../context/CartContext';

// Sugar hook over CartContext
export const useCart = () => useCartContext();
