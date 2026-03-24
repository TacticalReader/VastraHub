/**
 * Takes the full flat array of products and returns a filtered subset 
 * based on selected filters: gender, type, size, price range.
 */
export const filterProducts = (products, filters) => {
  return products.filter(p => {
    if (filters.gender && p.gender !== filters.gender) return false;
    if (filters.type && p.type !== filters.type) return false;
    if (filters.size && !p.sizes.includes(filters.size)) return false;
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
    return true;
  });
};
