import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

export default function Breadcrumb({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-4 overflow-x-auto whitespace-nowrap hide-scrollbar">
      <ol className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
        <li>
          <Link to="/" className="hover:text-[color:var(--color-primary)] transition-colors">Home</Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.label || index} className="flex items-center gap-2">
              <FiChevronRight size={14} className="opacity-40" />
              {isLast || !item.href ? (
                <span style={{ color: 'var(--color-text)' }} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className="hover:text-[color:var(--color-primary)] transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
