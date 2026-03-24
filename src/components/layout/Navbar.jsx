import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineSearch,
  HiOutlineSun,
  HiOutlineMoon,
  HiMenu,
  HiX,
  HiOutlineLogout,
  HiChevronDown,
} from 'react-icons/hi';

import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useThemeContext } from '../../context/ThemeContext';
import { useSearchContext } from '../../context/SearchContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ROUTES, buildCategoryRoute } from '../../constants/routes';
import SearchBar from '../search/SearchBar';
import SearchDropdown from '../search/SearchDropdown';
import CartDrawer from '../cart/CartDrawer';
import LoginModal from '../auth/LoginModal';
import SignupModal from '../auth/SignupModal';

// ─── Mega Menu Data ───────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Shop All', to: ROUTES.SHOP },
  {
    label: 'Men',
    children: [
      {
        group: 'Formal',
        items: [
          { label: 'Suits', to: buildCategoryRoute('men', 'suits') },
          { label: 'Blazers', to: buildCategoryRoute('men', 'blazers') },
          { label: 'Dress Shirts', to: buildCategoryRoute('men', 'dress-shirts') },
        ],
      },
      {
        group: 'Outdoor',
        items: [
          { label: 'Outdoor Jackets', to: buildCategoryRoute('men', 'jackets') },
          { label: 'Cargo & Chino Pants', to: buildCategoryRoute('men', 'cargo-pants') },
          { label: 'Hoodies & Sweatshirts', to: buildCategoryRoute('men', 'hoodies') },
        ],
      },
    ],
  },
  {
    label: 'Women',
    children: [
      {
        group: 'Formal',
        items: [
          { label: 'Formal Kurtas & Suits', to: buildCategoryRoute('women', 'formal-kurtas') },
          { label: "Women's Blazers", to: buildCategoryRoute('women', 'blazers') },
          { label: 'Formal Dresses', to: buildCategoryRoute('women', 'formal-dresses') },
        ],
      },
      {
        group: 'Outdoor',
        items: [
          { label: 'Windcheaters', to: buildCategoryRoute('women', 'windcheaters') },
          { label: 'Casual Kurtas', to: buildCategoryRoute('women', 'casual-kurtas') },
          { label: 'Track Pants & Joggers', to: buildCategoryRoute('women', 'track-pants') },
        ],
      },
    ],
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────
const dropdownVariants = {
  hidden:  { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.18, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.12 } },
};

const mobileMenuVariants = {
  hidden:  { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: '0%',  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
  exit:    { opacity: 0, x: '100%', transition: { duration: 0.22 } },
};

const searchVariants = {
  hidden:  { opacity: 0, y: -16, scaleY: 0.92 },
  visible: { opacity: 1, y: 0,   scaleY: 1,   transition: { duration: 0.22 } },
  exit:    { opacity: 0, y: -10, scaleY: 0.95, transition: { duration: 0.15 } },
};

// ─── Icon Badge ───────────────────────────────────────────────────────────────
function IconBadge({ count }) {
  if (!count || count === 0) return null;
  return (
    <span
      aria-label={`${count} items`}
      className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold leading-none"
      style={{ background: 'var(--color-primary)', color: '#fff' }}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}

// ─── Search Bar (overlaid) ────────────────────────────────────────────────────
function SearchOverlay({ onClose }) {
  const { closeSearch } = useSearchContext();
  const ref = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        closeSearch();
        onClose?.();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeSearch, onClose]);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      // If the click is outside the search bar area
      if (ref.current && !ref.current.contains(e.target)) {
        // Also ensure we're not clicking the search toggle button itself,
        // otherwise it would close and then likely re-open immediately
        if (e.target.closest('#nav-search-btn')) return;
        
        closeSearch();
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeSearch, onClose]);

  return (
    <motion.div
      key="search-overlay"
      ref={ref}
      variants={searchVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-0 right-0 top-full z-[var(--z-dropdown)] origin-top"
      style={{
        background: 'var(--color-nav-bg)',
        borderBottom: '1px solid var(--color-nav-border)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div className="container py-4">
        <SearchBar onClose={onClose} />
        <SearchDropdown onClose={onClose} />
      </div>
    </motion.div>
  );
}

// ─── Desktop Mega Nav Item ────────────────────────────────────────────────────
function DesktopNavItem({ link }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const openMenu  = () => { clearTimeout(timerRef.current); setOpen(true); };
  const closeMenu = () => { timerRef.current = setTimeout(() => setOpen(false), 120); };

  if (!link.children) {
    return (
      <NavLink
        to={link.to}
        className={({ isActive }) =>
          `relative text-[15px] font-medium tracking-wide uppercase transition-colors duration-150 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-[var(--color-primary)] after:transition-transform after:duration-200 hover:after:scale-x-100 ${isActive ? 'after:scale-x-100' : ''}`
        }
        style={{ color: 'var(--color-text)', fontFamily: 'var(--font-oswald)' }}
      >
        {link.label}
      </NavLink>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <button
        className="flex items-center gap-1 text-[15px] font-medium tracking-wide uppercase transition-colors duration-150"
        style={{ color: 'var(--color-text)', fontFamily: 'var(--font-oswald)' }}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {link.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <HiChevronDown size={15} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-1/2 top-full z-[var(--z-dropdown)] mt-3 -translate-x-1/2 rounded-xl p-5"
            style={{
              background: 'var(--color-nav-bg-scrolled)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-lg)',
              minWidth: '320px',
            }}
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <div className="grid grid-cols-2 gap-6">
              {link.children.map((col) => (
                <div key={col.group}>
                  <p
                    className="mb-2 text-[11px] font-semibold uppercase tracking-widest"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {col.group}
                  </p>
                  <ul className="space-y-1">
                    {col.items.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className="group flex w-full items-center rounded-lg px-3 py-2 -mx-3 text-sm font-medium transition-all duration-200 hover:translate-x-1 hover:bg-[color:var(--color-bg-secondary)]"
                        >
                          <span className="text-[color:var(--color-text-secondary)] transition-colors duration-200 group-hover:text-[color:var(--color-primary)]">
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Shop all link at bottom */}
            <div
              className="mt-4 border-t pt-3"
              style={{ borderColor: 'var(--color-border-light)' }}
            >
              <Link
                to={`${ROUTES.SHOP}?gender=${link.label.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="link-underline text-xs font-semibold uppercase tracking-wide transition-colors hover:opacity-80"
                style={{ color: 'var(--color-primary)' }}
              >
                Shop all {link.label} →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── User Dropdown ────────────────────────────────────────────────────────────
function UserDropdown({ user, isLoggedIn, logout, onOpenLogin, onOpenSignup }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate(ROUTES.HOME);
  };

  return (
    <div ref={ref} className="relative">
      <button
        id="nav-user-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="User menu"
        aria-haspopup="true"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[color:var(--color-bg-secondary)]"
        style={{ color: 'var(--color-text)' }}
      >
        {isLoggedIn && user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-7 w-7 rounded-full object-cover"
          />
        ) : (
          <HiOutlineUser size={22} />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="user-dropdown"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-full z-[var(--z-dropdown)] mt-3 w-52 rounded-xl py-2 shadow-xl"
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            {isLoggedIn ? (
              <>
                <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--color-border-light)' }}>
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                    {user?.name}
                  </p>
                  <p className="text-xs truncate mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    {user?.email}
                  </p>
                </div>
                <Link
                  to={ROUTES.PROFILE}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <HiOutlineUser size={17} /> My Profile
                </Link>
                <Link
                  to={ROUTES.WISHLIST}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <HiOutlineHeart size={17} /> Wishlist
                </Link>
                <div className="border-t my-1" style={{ borderColor: 'var(--color-border-light)' }} />
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  <HiOutlineLogout size={17} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setOpen(false); onOpenLogin(); }}
                  className="block w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                  style={{ color: 'var(--color-text)' }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setOpen(false); onOpenSignup(); }}
                  className="block w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Create Account
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({ onClose, onOpenLogin, onOpenSignup }) {
  const { user, isLoggedIn, logout } = useAuth();
  const [expandedItem, setExpandedItem] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate(ROUTES.HOME);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[var(--z-navbar)] bg-black/50 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.div
        key="drawer"
        variants={mobileMenuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed right-0 top-0 bottom-0 z-[var(--z-dropdown)] w-[min(85vw,360px)] overflow-y-auto flex flex-col"
        style={{
          background: 'var(--color-bg)',
          borderLeft: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b shrink-0"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <Link
            to={ROUTES.HOME}
            onClick={onClose}
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}
          >
            Vastra<span style={{ color: 'var(--color-text)' }}>Hub</span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[color:var(--color-bg-secondary)]"
            style={{ color: 'var(--color-text)' }}
          >
            <HiX size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => {
            if (!link.children) {
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[color:var(--color-primary)] bg-[color:var(--color-primary-light)]'
                        : 'text-[color:var(--color-text)] hover:bg-[color:var(--color-bg-secondary)]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            }

            const isExpanded = expandedItem === link.label;
            return (
              <div key={link.label}>
                <button
                  onClick={() => setExpandedItem(isExpanded ? null : link.label)}
                  className="flex w-full items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                  style={{ color: 'var(--color-text)' }}
                >
                  {link.label}
                  <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <HiChevronDown size={16} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      {link.children.map((col) => (
                        <div key={col.group} className="ml-3 mt-1 mb-2">
                          <p
                            className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            {col.group}
                          </p>
                          {col.items.map((item) => (
                            <NavLink
                              key={item.to}
                              to={item.to}
                              onClick={onClose}
                              className={({ isActive }) =>
                                `block px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                                  isActive
                                    ? 'text-[color:var(--color-primary)] font-medium bg-[color:var(--color-primary-light)]'
                                    : 'text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-bg-secondary)] hover:translate-x-1 hover:text-[color:var(--color-primary)]'
                                }`
                              }
                            >
                              {item.label}
                            </NavLink>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Bottom Auth section */}
        <div
          className="mt-auto px-4 py-4 border-t shrink-0"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {isLoggedIn ? (
            <div className="space-y-1">
              <div className="px-3 py-2">
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                  {user?.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {user?.email}
                </p>
              </div>
              <Link
                to={ROUTES.PROFILE}
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <HiOutlineUser size={17} /> My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                style={{ color: 'var(--color-primary)' }}
              >
                <HiOutlineLogout size={17} /> Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => { onClose(); onOpenLogin(); }}
                className="block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-opacity hover:opacity-85"
                style={{ background: 'var(--color-primary)', color: '#fff' }}
              >
                Sign In
              </button>
              <button
                onClick={() => { onClose(); onOpenSignup(); }}
                className="block w-full rounded-lg py-2.5 text-center text-sm font-medium transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                style={{ color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
              >
                Create Account
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const { totalItems: cartCount }     = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { isDark, toggleTheme }       = useThemeContext();
  const { isOpen: isSearchOpen, openSearch } = useSearchContext();
  const scrollY    = useScrollPosition();
  const isMobile   = useMediaQuery('(max-width: 768px)');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const isScrolled = scrollY > 12;

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen || cartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, cartOpen]);

  // Close mobile menu on window resize to desktop
  useEffect(() => {
    if (!isMobile && mobileOpen) setMobileOpen(false);
  }, [isMobile]);

  const handleSearchOpen = useCallback(() => {
    setMobileOpen(false);
    openSearch();
  }, [openSearch]);

  return (
    <>
      <header
        id="main-navbar"
        role="banner"
        className="fixed left-0 right-0 top-0 z-[var(--z-navbar)] transition-all duration-300"
        style={{
          background: isScrolled ? 'var(--color-nav-bg-scrolled)' : 'var(--color-nav-bg)',
          borderBottom: `1px solid ${isScrolled ? 'var(--color-nav-border)' : 'transparent'}`,
          boxShadow: isScrolled ? 'var(--shadow-nav)' : 'none',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Top strip — optional promo bar */}
        <div
          className="hidden md:flex items-center justify-center py-1.5 text-xs font-medium tracking-wide gap-2"
          style={{ background: 'var(--color-primary)', color: '#fff' }}
        >
          <img src="https://flagcdn.com/w20/in.png" srcSet="https://flagcdn.com/w40/in.png 2x" width="20" alt="India flag" className="inline-block rounded-sm shadow-sm" />
          Free shipping on orders above ₹999 &nbsp;·&nbsp; Use code{' '}
          <strong className="ml-1">VASTRA10</strong>&nbsp;for 10% off
        </div>

        <div className="container relative flex h-16 items-center gap-4">
          {/* ── Logo ── */}
          <Link
            to={ROUTES.HOME}
            id="nav-logo"
            className="mr-6 shrink-0 text-3xl font-normal tracking-tight"
            style={{ fontFamily: 'var(--font-marcellus)' }}
            aria-label="VastraHub Home"
          >
            <span style={{ color: 'var(--color-primary)' }}>Vastra</span>
            <span style={{ color: 'var(--color-text)', fontFamily: 'var(--font-syne)', fontWeight: '800', letterSpacing: '-0.03em', marginLeft: '1px' }}>Hub</span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          {!isMobile && (
            <nav aria-label="Main navigation" className="flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <DesktopNavItem key={link.label} link={link} />
              ))}
            </nav>
          )}

          {/* ── Spacer ── */}
          <div className="flex-1" />

          {/* ── Right Action Icons ── */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <button
              id="nav-search-btn"
              onClick={handleSearchOpen}
              aria-label="Search products"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[color:var(--color-bg-secondary)]"
              style={{ color: 'var(--color-text)' }}
            >
              <HiOutlineSearch size={21} />
            </button>

            {/* Theme Toggle */}
            <button
              id="nav-theme-btn"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[color:var(--color-bg-secondary)]"
              style={{ color: 'var(--color-text)' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{ rotate: 30,  opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {isDark ? <HiOutlineSun size={21} /> : <HiOutlineMoon size={21} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Wishlist */}
            {!isMobile && (
              <Link
                id="nav-wishlist-btn"
                to={ROUTES.WISHLIST}
                aria-label={`Wishlist (${wishlistCount} items)`}
                className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                style={{ color: 'var(--color-text)' }}
              >
                <HiOutlineHeart size={21} />
                <IconBadge count={wishlistCount} />
              </Link>
            )}

            {/* Cart */}
            <button
              id="nav-cart-btn"
              onClick={() => setCartOpen(true)}
              aria-label={`Cart (${cartCount} items)`}
              className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[color:var(--color-bg-secondary)]"
              style={{ color: 'var(--color-text)' }}
            >
              <HiOutlineShoppingBag size={21} />
              <IconBadge count={cartCount} />
            </button>

            {/* User (desktop only) */}
            {!isMobile && (
              <UserDropdown 
                user={user} isLoggedIn={isLoggedIn} logout={logout} 
                onOpenLogin={() => setLoginOpen(true)} 
                onOpenSignup={() => setSignupOpen(true)} 
              />
            )}

            {/* Hamburger (mobile) */}
            {isMobile && (
              <button
                id="nav-mobile-menu-btn"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                style={{ color: 'var(--color-text)' }}
              >
                <HiMenu size={22} />
              </button>
            )}
          </div>

          {/* ── Search Overlay (attached to nav bottom) ── */}
          <AnimatePresence>
            {isSearchOpen && <SearchOverlay />}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Mobile Menu Drawer ── */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} onOpenLogin={() => setLoginOpen(true)} onOpenSignup={() => setSignupOpen(true)} />}
      </AnimatePresence>

      {/* ── Auth Modals ── */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} onSwitchToSignup={() => { setLoginOpen(false); setSignupOpen(true); }} />
      <SignupModal isOpen={signupOpen} onClose={() => setSignupOpen(false)} onSwitchToLogin={() => { setSignupOpen(false); setLoginOpen(true); }} />

      {/* ── Slide-in Cart Drawer ── */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* ── Spacer to push page content below fixed navbar ── */}
      {/* spacer height: 64px (mobile) or 96px (desktop with promo strip) */}
      <div className="h-16 md:h-24" aria-hidden="true" />
    </>
  );
}
