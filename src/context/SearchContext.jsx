import { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';
import Fuse from 'fuse.js';

const SearchContext = createContext(null);

// Fuse.js options — tune weights to your liking
const FUSE_OPTIONS = {
  keys: [
    { name: 'name', weight: 0.5 },
    { name: 'type', weight: 0.2 },
    { name: 'category', weight: 0.15 },
    { name: 'gender', weight: 0.15 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
};

export function SearchProvider({ children, products = [] }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Create Fuse instance once per products array update
  const fuseRef = useRef(null);
  fuseRef.current = useMemo(() => new Fuse(products, FUSE_OPTIONS), [products]);

  const results = useMemo(() => {
    setHighlightedIndex(-1); // Reset highlight when query changes
    if (!query.trim() || query.length < 2) return [];
    return fuseRef.current
      .search(query.trim())
      .slice(0, 8)
      .map((r) => r.item);
  }, [query]);

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setHighlightedIndex(-1);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results,
        isOpen,
        openSearch,
        closeSearch,
        highlightedIndex,
        setHighlightedIndex
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearchContext must be used within SearchProvider');
  return ctx;
};
