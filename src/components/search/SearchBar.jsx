// src/components/search/SearchBar.jsx
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineSearch, HiX } from 'react-icons/hi';
import { useSearchContext } from '../../context/SearchContext';
import { ROUTES } from '../../constants/routes';

export default function SearchBar({ onClose }) {
  const { query, setQuery, closeSearch } = useSearchContext();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClose = () => { closeSearch(); onClose?.(); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(query.trim())}`);
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
      <HiOutlineSearch className="shrink-0 text-xl" style={{ color: 'var(--color-text-muted)' }} />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for suits, kurtas, jackets…"
        className="flex-1 bg-transparent py-2 text-base outline-none placeholder:text-[color:var(--color-text-muted)]"
        style={{ color: 'var(--color-text)' }}
        aria-label="Search products"
      />
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
