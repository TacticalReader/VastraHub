import Fuse from 'fuse.js';
import { useMemo, useState } from 'react';
import { allProducts } from '../data/allProducts';

/**
 * Fuzzy-search hook powered by Fuse.js.
 * The Fuse instance is created once via useMemo, so it is not recreated on
 * every keystroke. Both SearchBar and SearchResultsPage can share this hook.
 *
 * Usage:
 *   const { query, setQuery, results } = useSearch();
 */
export function useSearch() {
  const [query, setQuery] = useState('');

  // Create the Fuse instance once; it stays stable across re-renders
  const fuse = useMemo(
    () =>
      new Fuse(allProducts, {
        keys: ['name', 'type', 'category', 'gender', 'fabric'],
        threshold: 0.3,
      }),
    []
  );

  const results =
    query.length > 1 ? fuse.search(query).map((r) => r.item) : [];

  return { query, setQuery, results };
}
