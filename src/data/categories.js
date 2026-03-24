// src/data/categories.js
// Category card data — images live in public/assets/images/banners/

export const CATEGORIES = [
  {
    id: 'men-formal',
    label: 'Men — Formal',
    gender: 'men',
    type: 'formal',
    slug: 'formal',
    image: import.meta.env.BASE_URL + 'assets/images/banners/cat-men-formal.webp',
    to: '/category/men/formal',
    description: 'Suits, Blazers & Dress Shirts',
  },
  {
    id: 'men-outdoor',
    label: 'Men — Outdoor',
    gender: 'men',
    type: 'outdoor',
    slug: 'outdoor',
    image: import.meta.env.BASE_URL + 'assets/images/banners/cat-men-outdoor.webp',
    to: '/category/men/outdoor',
    description: 'Jackets, Cargo Pants & Hoodies',
  },
  {
    id: 'women-formal',
    label: 'Women — Formal',
    gender: 'women',
    type: 'formal',
    slug: 'formal',
    image: import.meta.env.BASE_URL + 'assets/images/banners/cat-women-formal.webp',
    to: '/category/women/formal',
    description: 'Kurtas, Blazers & Formal Dresses',
  },
  {
    id: 'women-outdoor',
    label: 'Women — Outdoor',
    gender: 'women',
    type: 'outdoor',
    slug: 'outdoor',
    image: import.meta.env.BASE_URL + 'assets/images/banners/cat-women-outdoor.webp',
    to: '/category/women/outdoor',
    description: 'Windcheaters, Casual Kurtas & Track Pants',
  },
];

export default CATEGORIES;
