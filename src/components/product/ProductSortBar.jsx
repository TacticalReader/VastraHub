import { FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { SORT_OPTIONS } from '../../constants/sortOptions';
import Button from '../ui/Button';

export default function ProductSortBar({ count, sort, setSort, heading, isFilterOpen, onToggleFilters }) {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4 pb-4 border-b border-dashed" style={{ borderColor: 'var(--color-border-light)' }}>
      <div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
          {heading}
        </h1>
        <p className="text-sm mt-1 font-medium" style={{ color: 'var(--color-text-muted)' }}>
          Showing {count} result{count !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button 
          variant={isFilterOpen ? "primary" : "outline"} 
          size="sm"
          onClick={onToggleFilters}
          className="flex items-center gap-2 rounded-xl"
        >
          <FiFilter size={16} />
          {isFilterOpen ? "Close Filters" : "Show Filters"}
          {isFilterOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
        </Button>
        <div className="flex items-center gap-3">
        <label htmlFor="sort-dropdown" className="text-sm font-bold" style={{ color: 'var(--color-text-secondary)' }}>
          Sort By
        </label>
        <div className="relative">
          <select
            id="sort-dropdown"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
            className="appearance-none rounded-xl border px-4 py-2.5 pr-10 text-sm font-medium outline-none transition-colors hover:border-[color:var(--color-primary)] focus:border-[color:var(--color-primary)] focus:ring-1 focus:ring-[color:var(--color-primary)]"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-card)', color: 'var(--color-text)' }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
