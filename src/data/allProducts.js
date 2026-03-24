// src/data/allProducts.js

import menSuits from './products/men-suits.json';
import menBlazers from './products/men-blazers.json';
import menShirts from './products/men-dress-shirts.json';
import menJackets from './products/men-jackets.json';
import menCargo from './products/men-cargo-pants.json';
import menHoodies from './products/men-hoodies.json';

import womenKurtas from './products/women-formal-kurtas.json';
import womenBlazers from './products/women-blazers.json';
import womenDresses from './products/women-formal-dresses.json';
import womenWindcheaters from './products/women-windcheaters.json';
import womenCasualKurtas from './products/women-casual-kurtas.json';
import womenTrackPants from './products/women-track-pants.json';

// Merge everything into ONE flat array of 72 products
const allProducts = [
  ...menSuits,
  ...menBlazers,
  ...menShirts,
  ...menJackets,
  ...menCargo,
  ...menHoodies,
  ...womenKurtas,
  ...womenBlazers,
  ...womenDresses,
  ...womenWindcheaters,
  ...womenCasualKurtas,
  ...womenTrackPants,
];

export default allProducts;
