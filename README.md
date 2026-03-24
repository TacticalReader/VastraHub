# 👔 VastraHub

> A modern, fully responsive static e-commerce frontend for Indian fashion — built with React, Vite, and Tailwind CSS. Deployable on GitHub Pages with zero backend.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-222?logo=github)](https://tacticalreader.github.io/VastraHub/)

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Product Catalog](#-product-catalog)
- [Pages & Routes](#-pages--routes)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Known Limitations](#-known-limitations)
- [License](#-license)

---

## 🧵 About the Project

**VastraHub** ("Vastra" meaning *clothing* in Hindi/Sanskrit) is a portfolio-grade static React application that simulates a full-featured online clothing store targeting Indian men and women. It covers formal and outdoor wear across 12 product categories, with 72 products in total.

The entire application is **100% frontend** — there is no backend, no database, and no real payment gateway. All data lives in static JSON files, and user state (cart, wishlist, auth) is persisted in `localStorage`. This makes it trivially hostable on GitHub Pages while still demonstrating advanced React patterns.

| Property | Details |
|---|---|
| **Project Type** | Frontend-only Static React App |
| **Target Audience** | Indian men & women (formal + outdoor wear) |
| **Deployment Target** | GitHub Pages |
| **Backend** | ❌ None — 100% static |
| **Purpose** | Recruiter / portfolio showcase |
| **Language Breakdown** | JavaScript 96.8% · CSS 2.7% · HTML 0.5% |

---

## 🌐 Live Demo

👉 **[https://tacticalreader.github.io/VastraHub/](https://tacticalreader.github.io/VastraHub/)**

> The site uses `HashRouter`, so all URLs look like `/#/shop`, `/#/product/mens-suit-001`, etc. This is intentional — GitHub Pages does not support server-side routing.

---

## ✨ Features

### 🔐 Auth (UI-Only Simulation)

All authentication features are **cosmetic and purely client-side**. No real credentials are validated — any input will work.

| Feature | Implementation |
|---|---|
| Login Modal | Controlled React form with client-side validation |
| Sign Up Modal | Regex validation, password strength meter |
| Persistent Session | Fake user object stored in `localStorage` |
| Protected Routes | `AuthGuard` redirects to login if no `localStorage` user |
| Logout | Clears `localStorage`, resets `AuthContext` |

> ⚠️ **Note for recruiters**: Auth is a UI prototype only. Do not enter real passwords. All state is visible in browser DevTools.

---

### 🛍️ Core Shopping Features

| Feature | Implementation |
|---|---|
| Product Listing with Filters | Static JSON, filtered client-side |
| Fuzzy Search | `Fuse.js` over all 72 products |
| Category Navigation | Men → Formal / Outdoor · Women → Formal / Outdoor |
| Product Detail Page | Dynamic route `/product/:id`, data from JSON |
| Shopping Cart | `Context API` + `localStorage` persistence |
| Wishlist | `Context API` + `localStorage` persistence |
| Size Selector | Static UI — no inventory system |
| Sort & Filter | By price, category, type — fully client-side |
| Related Products | Filtered from the same category in JSON |
| Image Zoom | `react-medium-image-zoom` |
| Breadcrumb Navigation | Dynamic, route-aware |

---

### 💎 Premium UI/UX & Design

VastraHub features a custom-built premium CSS layer designed to wow users without using additional Tailwind utility classes.

| Feature | Implementation |
|---|---|
| **Dynamic Typography** | 12+ premium Google Fonts (Playfair, Space Grotesk, Syne, etc.) |
| **Glassmorphism & Gradients** | Custom `.glass-card` and `.text-gradient` utility classes |
| **Interactive Cursor** | Custom-built reactive cursor trailer with hover state expansion |
| **Premium Hover Effects** | Shimmer sweeps, image zooms, and subtle float animations |
| **Dynamic Filtering** | Gender-aware category filtering for smoother navigation |
| **Functional Size Guide** | Custom modal component for quick size reference |
| **Smart Interface** | Auto-closing search bar and mobile-specific coupon popups |
| **Skeleton Loaders** | Fake delay + CSS skeleton shimmer |
| **Dark / Light Mode** | CSS variables + `localStorage` preference |
| **Responsive Design** | Tailwind CSS mobile-first breakpoints |
| **Page Transitions** | `Framer Motion` `<AnimatePresence>` |
| **Toast Notifications** | `react-hot-toast` for cart / wishlist events |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React.js** | 18.x | Core UI framework — hooks, Context API, component architecture |
| **Vite** | 5.x | Build tool & dev server (replaces deprecated CRA) |
| **React Router DOM** | 6.x | Client-side routing — **HashRouter** for GitHub Pages compatibility |
| **Tailwind CSS** | 3.x | Utility-first styling, zero unused CSS in prod |
| **Framer Motion** | 11.x | Animations — page transitions, cart drawer, stagger effects |
| **Swiper.js** | 11.x | Touch-friendly hero carousel with mobile swipe support |
| **Fuse.js** | 7.x | Lightweight fuzzy search over static product JSON |
| **react-hot-toast** | 2.x | Accessible, animated toast notifications |
| **react-icons** | 5.x | 10,000+ icons across multiple icon packs |
| **Lucide React** | latest | Clean icon set for UI controls |
| **react-medium-image-zoom** | 5.x | Accessible, smooth product image zoom |
| **clsx + tailwind-merge** | latest | Conditional class utilities |
| **gh-pages** | 6.x | GitHub Pages deployment helper |

### Why Vite over Create React App?

CRA is officially deprecated. Vite provides a much faster dev server (native ESM), smaller production bundles, and clean GitHub Pages support via a single `base` config option.

### Why HashRouter over BrowserRouter?

GitHub Pages does not support server-side URL rewriting. `BrowserRouter` will return a **404 on every page refresh** for any route except `/`. `HashRouter` uses `/#/route` URLs which are resolved entirely on the client — making it the only correct choice for this deployment target.

---

## 📁 Project Structure

```
VastraHub/
│
├── public/
│   ├── favicon.ico
│   ├── og-image.jpg
│   └── assets/images/
│       ├── banners/          # Hero slides + 4 category banners
│       ├── products/
│       │   ├── men/          # suits, blazers, dress-shirts, jackets, cargo-pants, hoodies
│       │   └── women/        # formal-kurtas, blazers, formal-dresses, windcheaters, casual-kurtas, track-pants
│       └── illustrations/    # empty-cart.svg, empty-wishlist.svg, 404.svg
│
├── src/
│   ├── assets/               # Logo SVGs, custom icon SVGs
│   │
│   ├── components/
│   │   ├── layout/           # Navbar, Footer, Sidebar, ScrollToTop
│   │   ├── ui/               # Button, Badge, Skeleton, Modal, Breadcrumb, RatingStars, PriceDisplay, Tooltip
│   │   ├── product/          # ProductCard, ProductGrid, ProductImageGallery, ProductFilters,
│   │   │                     # ProductSortBar, SizeSelector, ColorSelector, RelatedProducts, ProductBadge
│   │   ├── cart/             # CartDrawer, CartItem, CartSummary
│   │   ├── auth/             # LoginModal, SignupModal, AuthGuard
│   │   ├── home/             # HeroBanner, CategoryGrid, FeaturedProducts, BestSellers,
│   │   │                     # OfferBanner, Testimonials
│   │   └── search/           # SearchBar, SearchDropdown
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ShopPage.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── WishlistPage.jsx
│   │   ├── SearchResultsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── CheckoutPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── context/
│   │   ├── CartContext.jsx       # Cart state + localStorage sync
│   │   ├── WishlistContext.jsx   # Wishlist toggle + localStorage
│   │   ├── AuthContext.jsx       # Fake auth + localStorage user
│   │   ├── ThemeContext.jsx      # Dark / light mode
│   │   └── SearchContext.jsx     # Fuse.js query + results state
│   │
│   ├── data/
│   │   ├── products/             # 12 JSON files (one per product type)
│   │   ├── allProducts.js        # Aggregator — merges all JSONs into one flat array
│   │   ├── categories.js         # Category metadata
│   │   └── testimonials.js       # Static fake reviews
│   │
│   ├── hooks/
│   │   ├── useCart.js
│   │   ├── useWishlist.js
│   │   ├── useAuth.js
│   │   ├── useSearch.js
│   │   ├── useLocalStorage.js    # Generic hook with state sync
│   │   ├── useScrollPosition.js  # Returns scroll Y for sticky UI
│   │   └── useMediaQuery.js      # Responsive breakpoint detection
│   │
│   ├── utils/
│   │   ├── formatPrice.js        # Formats to ₹ Indian Rupee
│   │   ├── filterProducts.js
│   │   ├── sortProducts.js
│   │   ├── validateForm.js
│   │   └── generateSlug.js
│   │
│   ├── constants/
│   │   ├── routes.js             # Route path constants
│   │   ├── sizes.js              # ['XS','S','M','L','XL','XXL']
│   │   └── sortOptions.js
│   │
│   ├── styles/
│   │   ├── globals.css           # CSS variables, resets, base
│   │   ├── animations.css        # Keyframe animations
│   │   └── tailwind.css          # Tailwind directives entry
│   │
│   ├── App.jsx                   # Root: providers + Router
│   ├── main.jsx                  # Vite entry point
│   └── router.jsx                # All route definitions (HashRouter)
│
├── .github/workflows/deploy.yml  # CI/CD — build + deploy to gh-pages branch
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
├── .prettierrc
└── package.json
```

---

## 🧶 Product Catalog

### 👔 Men's Collection

| # | Type | Category | Products |
|---|---|---|---|
| 1 | Suits | Formal | 6 |
| 2 | Blazers | Formal | 6 |
| 3 | Dress Shirts | Formal | 6 |
| 4 | Outdoor Jackets | Outdoor | 6 |
| 5 | Cargo & Chino Pants | Outdoor | 6 |
| 6 | Hoodies & Sweatshirts | Outdoor | 6 |

### 👗 Women's Collection

| # | Type | Category | Products |
|---|---|---|---|
| 1 | Formal Kurtas & Suits | Formal | 6 |
| 2 | Women's Blazers | Formal | 6 |
| 3 | Formal Dresses | Formal | 6 |
| 4 | Outdoor Windcheaters | Outdoor | 6 |
| 5 | Casual / Outdoor Kurtas | Outdoor | 6 |
| 6 | Track Pants & Joggers | Outdoor | 6 |

**Total: 12 types × 6 products = 72 products**

### Product JSON Schema

Each product entry follows this structure:

```json
{
  "id": "mens-suit-001",
  "name": "Classic Navy Pinstripe Suit",
  "slug": "classic-navy-pinstripe-suit",
  "gender": "men",
  "category": "formal",
  "type": "suits",
  "price": 8999,
  "originalPrice": 12999,
  "discount": 30,
  "currency": "INR",
  "rating": 4.3,
  "reviewCount": 128,
  "images": [
    "/assets/images/products/men/suits/suit-001-a.webp",
    "/assets/images/products/men/suits/suit-001-b.webp"
  ],
  "sizes": ["S", "M", "L", "XL", "XXL"],
  "colors": ["Navy", "Charcoal", "Black"],
  "badge": "Best Seller",
  "description": "A timeless navy pinstripe suit crafted for the modern Indian professional.",
  "fabric": "80% Wool, 20% Polyester",
  "inStock": true,
  "isNew": false,
  "isFeatured": true
}
```

---

## 🗺️ Pages & Routes

| Route | Page | Auth Required |
|---|---|---|
| `/` | Home Page | No |
| `/#/shop` | Shop — all products | No |
| `/#/shop?gender=men` | Shop — men filtered | No |
| `/#/shop?gender=women` | Shop — women filtered | No |
| `/#/category/men/formal` | Category Page | No |
| `/#/category/men/outdoor` | Category Page | No |
| `/#/category/women/formal` | Category Page | No |
| `/#/category/women/outdoor` | Category Page | No |
| `/#/product/:id` | Product Detail | No |
| `/#/search?q=...` | Search Results | No |
| `/#/cart` | Cart Page | No |
| `/#/wishlist` | Wishlist Page | No |
| `/#/checkout` | Checkout (UI only) | ✅ Yes (AuthGuard) |
| `/#/profile` | Profile (localStorage data) | ✅ Yes (AuthGuard) |
| `*` | 404 Not Found | — |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher (comes with Node)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/TacticalReader/VastraHub.git
cd VastraHub

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build optimized production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all JS/JSX files |
| `npm run deploy` | Build and push to GitHub Pages (`gh-pages` branch) |

---

## 🌍 Deployment

This project is configured for **GitHub Pages** out of the box.

### Manual Deploy

```bash
npm run deploy
```

This runs `vite build` and then uses `gh-pages` to push the `dist/` folder to the `gh-pages` branch. Your site will be live at `https://<your-username>.github.io/VastraHub/`.

### Automated Deploy (GitHub Actions)

A CI/CD workflow is included at `.github/workflows/deploy.yml`. It triggers on every push to `main` and automatically builds and deploys the site.

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Key Config for GitHub Pages

**`vite.config.js`** — sets the correct public base path:
```js
export default defineConfig({
  base: '/VastraHub/',
  plugins: [react()],
})
```

**`router.jsx`** — uses `HashRouter`, not `BrowserRouter`:
```jsx
import { HashRouter } from 'react-router-dom';
// ✅ HashRouter ensures no 404s on page refresh
```

---

## ⚠️ Known Limitations

| Area | Limitation |
|---|---|
| **Authentication** | UI-only simulation. Any input logs you in. No real security. |
| **Checkout** | Multi-step form prototype only. No real payment processing. |
| **Cart / Wishlist** | State persists via `localStorage`. Clears on browser data wipe. |
| **Cross-tab Sync** | Cart changes in one tab won't reflect in another without a reload. |
| **SEO** | Single-page app — no SSR, no per-route meta tags (title set via `document.title`). |
| **Images** | Paths must be relative or prefixed with `import.meta.env.BASE_URL` for GitHub Pages subdirectory compatibility. |
| **Search** | Searches over local JSON only — no server-side full-text search. |

---

## 📊 Estimated Development Timeline

| Phase | Tasks | Estimate |
|---|---|---|
| Phase 1 | Vite + Tailwind + Router + Context setup | 1 day |
| Phase 2 | JSON data entry (72 products × schema) | 2 days |
| Phase 3 | Core components (Navbar, Footer, ProductCard, ProductGrid) | 2 days |
| Phase 4 | All pages (Home, Shop, Category, Product Detail) | 3 days |
| Phase 5 | Cart, Wishlist, Search (Fuse.js) | 2 days |
| Phase 6 | Auth modals, Profile, Checkout flow | 1.5 days |
| Phase 7 | Animations, Dark mode, UI polish | 1.5 days |
| Phase 8 | Image optimisation, bundle splitting, deploy | 1 day |
| **Total** | | **~14 days** |

---

## 📄 License

Distributed under the **Apache License 2.0**. See [`LICENSE`](./LICENSE) for full details.

---

<p align="center">
  Made with ❤️ for the Indian wardrobe · <a href="https://github.com/TacticalReader/VastraHub">VastraHub</a>
</p>
