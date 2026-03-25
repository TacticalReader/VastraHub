// src/components/search/SearchBar.jsx
import { useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineSearch, HiX } from 'react-icons/hi';
import { useSearchContext } from '../../context/SearchContext';
import { ROUTES } from '../../constants/routes';

export default function SearchBar({ onClose }) {
  const {
    query,
    setQuery,
    closeSearch,
    results,
    highlightedIndex,
    setHighlightedIndex
  } = useSearchContext();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const suggestion = useMemo(() => {
    if (!query || results.length === 0) return '';
    const topResultName = results[0].name;
    if (topResultName.toLowerCase().startsWith(query.toLowerCase())) {
      return query + topResultName.slice(query.length);
    }
    return '';
  }, [query, results]);

  const handleClose = () => { closeSearch(); onClose?.(); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (highlightedIndex >= 0 && results[highlightedIndex]) {
      navigate(`/product/${results[highlightedIndex].id}`);
      handleClose();
    } else if (query.trim()) {
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(query.trim())}`);
      handleClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === 'Tab' || e.key === 'ArrowRight') {
      // Autocomplete if at the end of input
      if (suggestion && inputRef.current?.selectionStart === query.length) {
        e.preventDefault();
        setQuery(suggestion);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
      <HiOutlineSearch className="shrink-0 text-xl" style={{ color: 'var(--color-text-muted)' }} />
      <div className="relative flex-1">
        {suggestion && (
          <div
            className="absolute inset-y-0 left-0 flex items-center pointer-events-none py-2 text-base opacity-30 select-none whitespace-pre"
            style={{ color: 'var(--color-text)' }}
          >
            {suggestion}
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for suits, kurtas, jackets…"
          className="w-full bg-transparent py-2 text-base outline-none placeholder:text-[color:var(--color-text-muted)]"
          style={{ color: 'var(--color-text)' }}
          aria-label="Search products"
        />
      </div>
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label="Clear search"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <HiX size={18} />
        </button>
      )}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close search"
        className="ml-2 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <HiX size={20} />
      </button>
    </form>
  );
}
