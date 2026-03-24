export default function ColorSelector({ colors = [], selectedColor, onSelect }) {
  if (!colors || colors.length === 0) return null;

  return (
    <div>
      <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
        Select Color 
        {selectedColor && <span className="text-xs font-normal" style={{ color: 'var(--color-text-muted)' }}>— {selectedColor.name}</span>}
      </p>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor?.id === color.id;
          const isLight = color.hex?.toLowerCase() === '#ffffff' || color.hex?.toLowerCase() === '#fff';
          return (
            <button
              key={color.id}
              onClick={() => onSelect(color)}
              aria-label={`Select color ${color.name}`}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110 shadow-sm"
              style={{
                background: color.hex,
                border: isLight ? '1px solid var(--color-border)' : 'none',
                boxShadow: isSelected ? '0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-primary)' : 'none'
              }}
            >
              {isSelected && (
                <svg className="h-4 w-4 drop-shadow-md" style={{ color: isLight ? '#000' : '#fff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
