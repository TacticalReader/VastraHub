// Route path constants — avoids magic strings throughout the app
export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  SHOP_MEN: '/shop?gender=men',
  SHOP_WOMEN: '/shop?gender=women',
  CATEGORY: '/category/:gender/:type',
  PRODUCT: '/product/:id',
  SEARCH: '/search',
  CART: '/cart',
  WISHLIST: '/wishlist',
  CHECKOUT: '/checkout',
  PROFILE: '/profile',
  ABOUT: '/about',
  CONTACT: '/contact',
  NOT_FOUND: '*',
};

// Helper to build dynamic routes
export const buildCategoryRoute = (gender, type) =>
  `/category/${gender}/${type}`;

export const buildProductRoute = (id) => `/product/${id}`;

export const buildSearchRoute = (query) => `/search?q=${encodeURIComponent(query)}`;
