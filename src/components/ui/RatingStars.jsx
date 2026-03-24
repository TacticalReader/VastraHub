import React from 'react';
import { FiStar } from 'react-icons/fi';

export default function RatingStars({ rating = 0, count, size = 14, className = '' }) {
  // Ensure rating is between 0 and 5
  const normalizedRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 !== 0;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex text-amber-500">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <FiStar key={i} size={size} className="fill-current text-amber-500" />;
          } else if (i === fullStars && hasHalfStar) {
            // Half star representation (visually dimmed fill)
            return <FiStar key={i} size={size} className="fill-current text-amber-500 opacity-60" />;
          } else {
            return <FiStar key={i} size={size} className="text-zinc-300 dark:text-zinc-700" />;
          }
        })}
      </div>
      
      {count !== undefined && (
        <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
          ({count})
        </span>
      )}
    </div>
  );
}
