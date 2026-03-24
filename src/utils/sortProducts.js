/**
 * Takes a filtered product array and reorders it based on the sort key.
 * Options: price-asc, price-desc, rating.
 */
export const sortProducts = (products, sortKey) => {
  const sorted = [...products]; // never mutate original
  
  if (sortKey === 'price-asc') {
    return sorted.sort((a, b) => a.price - b.price);
  }
  
  if (sortKey === 'price-desc') {
    return sorted.sort((a, b) => b.price - a.price);
  }
  
  if (sortKey === 'rating') {
    return sorted.sort((a, b) => b.rating - a.rating);
  }
  
  return sorted; // default: original order
};
