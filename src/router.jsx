import { HashRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ROUTES } from './constants/routes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import AuthGuard from './components/auth/AuthGuard';

// Lazy-load all pages for code splitting
// loading-spinner.svg used as the Suspense fallback
const HomePage           = lazy(() => import('./pages/HomePage'));
const ShopPage           = lazy(() => import('./pages/ShopPage'));
const CategoryPage       = lazy(() => import('./pages/CategoryPage'));
const ProductDetailPage  = lazy(() => import('./pages/ProductDetailPage'));
const SearchResultsPage  = lazy(() => import('./pages/SearchResultsPage'));
const CartPage           = lazy(() => import('./pages/CartPage'));
const WishlistPage       = lazy(() => import('./pages/WishlistPage'));
const CheckoutPage       = lazy(() => import('./pages/CheckoutPage'));
const ProfilePage        = lazy(() => import('./pages/ProfilePage'));
const AboutPage          = lazy(() => import('./pages/AboutPage'));
const ContactPage        = lazy(() => import('./pages/ContactPage'));
const NotFoundPage       = lazy(() => import('./pages/NotFoundPage'));
const LoginPage          = lazy(() => import('./pages/LoginPage'));
const SignupPage         = lazy(() => import('./pages/SignupPage'));

// Suspense fallback uses loading-spinner.svg
function PageSuspense({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <img
            src={import.meta.env.BASE_URL + 'assets/illustrations/loading-spinner.svg'}
            alt="Loading…"
            width={48}
            height={48}
            className="animate-spin"
          />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export default function Router() {
  return (
    <HashRouter>
      <ScrollToTop />
      {/* Navbar — contains logo.svg/logo-dark.svg and avatar-placeholder.webp in user dropdown */}
      <Navbar />
      <PageSuspense>
        <Routes>
          {/* HomePage — HeroBanner, CategoryGrid, FeaturedProducts, OfferBanner, BestSellers */}
          <Route path={ROUTES.HOME}     element={<HomePage />} />

          {/* ShopPage — all product images via ProductCard, no-results.svg empty state */}
          <Route path={ROUTES.SHOP}     element={<ShopPage />} />

          {/* CategoryPage — filtered product images via ProductCard */}
          <Route path="/category/:gender/:type" element={<CategoryPage />} />

          {/* ProductDetailPage — both image views (a/b), size-guide.svg, india-delivery.svg, RelatedProducts */}
          <Route path="/product/:id"    element={<ProductDetailPage />} />

          {/* SearchResultsPage — no-results.svg empty state, product images via ProductCard */}
          <Route path={ROUTES.SEARCH}   element={<SearchResultsPage />} />

          {/* CartPage — empty-cart.svg illustration */}
          <Route path={ROUTES.CART}     element={<CartPage />} />

          {/* WishlistPage — empty-wishlist.svg illustration */}
          <Route path={ROUTES.WISHLIST} element={<WishlistPage />} />

          {/* CheckoutPage — restricts access if not logged in */}
          <Route path={ROUTES.CHECKOUT} element={<AuthGuard><CheckoutPage /></AuthGuard>} />

          {/* ProfilePage — avatar-placeholder.webp default avatar */}
          <Route path={ROUTES.PROFILE}  element={<AuthGuard><ProfilePage /></AuthGuard>} />
          
          <Route path={ROUTES.ABOUT}    element={<AboutPage />} />
          <Route path={ROUTES.CONTACT}  element={<ContactPage />} />

          {/* Auth Pages */}
          <Route path="/login"          element={<LoginPage />} />
          <Route path="/signup"         element={<SignupPage />} />

          {/* 404 — 404-illustration.svg */}
          <Route path="*"               element={<NotFoundPage />} />
        </Routes>
      </PageSuspense>

      {/* Footer — about-india.webp, india-delivery.svg, logo.svg/logo-dark.svg, payment-badges.webp */}
      <Footer />
    </HashRouter>
  );
}
