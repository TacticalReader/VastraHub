import { GENDERS } from '../../constants/sortOptions';
import { CLOTHING_CATEGORIES } from '../../constants/sizes';
import { useState } from 'react';
import Button from '../ui/Button';
import { FiCheck } from 'react-icons/fi';

const MEN_CATEGORIES = ['suits', 'blazers', 'dress-shirts', 'jackets', 'cargo-pants', 'hoodies'];
const WOMEN_CATEGORIES = ['formal-kurtas', 'blazers', 'formal-dresses', 'windcheaters', 'casual-kurtas', 'track-pants'];

export default function ProductFilters({ 
  selectedGenders, setSelectedGenders, 
  selectedCategories, setSelectedCategories,
  maxPrice, setMaxPrice,
  onApply
}) {
  const [openSections, setOpenSections] = useState({ gender: true, category: true, price: true });

  const toggleSection = (sec) => setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));

  const handleGenderToggle = (id) => {
    setSelectedGenders(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  };

  const handleCategoryToggle = (id) => {
    setSelectedCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const displayCategories = CLOTHING_CATEGORIES.filter(cat => {
    if (!selectedGenders || selectedGenders.length === 0) return true;
    
    // If both genders are selected, show all categories
    if (selectedGenders.includes('men') && selectedGenders.includes('women')) return true;
    
    if (selectedGenders.includes('men')) return MEN_CATEGORIES.includes(cat.id);
    if (selectedGenders.includes('women')) return WOMEN_CATEGORIES.includes(cat.id);
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Filters</h2>
        <button 
          onClick={() => { setSelectedGenders([]); setSelectedCategories([]); setMaxPrice(20000); }}
          className="text-xs font-bold uppercase tracking-wider transition-colors hover:text-[color:var(--color-primary-dark)]" 
          style={{ color: 'var(--color-primary)' }}
        >
          Clear All
        </button>
      </div>

      {/* Gender Filter */}
      <div>
        <button onClick={() => toggleSection('gender')} className="flex w-full items-center justify-between py-2 text-left text-base font-bold transition-opacity hover:opacity-80" style={{ color: 'var(--color-text)' }}>
          Gender
          <span className="text-xs">{openSections.gender ? '—' : '+'}</span>
        </button>
        {openSections.gender && (
          <div className="mt-3 space-y-3">
            {GENDERS.map(gender => (
              <label key={gender.id} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedGenders.includes(gender.id)}
                  onChange={() => handleGenderToggle(gender.id)}
                  className="h-4.5 w-4.5 rounded text-[color:var(--color-primary)] focus:ring-[color:var(--color-primary)] focus:ring-offset-0"
                  style={{ borderColor: 'var(--color-border)' }} 
                />
                <span className="text-sm font-medium transition-colors group-hover:text-[color:var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>
                  {gender.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-t" style={{ borderColor: 'var(--color-border-light)' }} />

      {/* Categories Filter */}
      <div>
        <button onClick={() => toggleSection('category')} className="flex w-full items-center justify-between py-2 text-left text-base font-bold transition-opacity hover:opacity-80" style={{ color: 'var(--color-text)' }}>
          Category
          <span className="text-xs">{openSections.category ? '—' : '+'}</span>
        </button>
        {openSections.category && (
          <div className="mt-3 space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {displayCategories.map(cat => (
              <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => handleCategoryToggle(cat.id)}
                  className="h-4.5 w-4.5 rounded text-[color:var(--color-primary)] focus:ring-[color:var(--color-primary)] focus:ring-offset-0"
                  style={{ borderColor: 'var(--color-border)' }} 
                />
                <span className="text-sm font-medium transition-colors group-hover:text-[color:var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>
                  {cat.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-t" style={{ borderColor: 'var(--color-border-light)' }} />

      {/* Price Filter */}
      <div>
        <button onClick={() => toggleSection('price')} className="flex w-full items-center justify-between py-2 text-left text-base font-bold transition-opacity hover:opacity-80" style={{ color: 'var(--color-text)' }}>
          Price Range
          <span className="text-xs">{openSections.price ? '—' : '+'}</span>
        </button>
        {openSections.price && (
          <div className="mt-5">
            <input 
              type="range" 
              min="0" 
              max="20000" 
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[color:var(--color-primary)]"
              style={{ background: 'var(--color-border-light)' }}
            />
            <div className="flex items-center justify-between mt-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              <span className="font-medium">₹0</span>
              <span className="font-bold py-1 px-3 rounded-md" style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text)' }}>
                Up to ₹{maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}
      <div className="pt-4 mt-2">
        <Button variant="primary" fullWidth onClick={onApply} className="rounded-xl flex items-center justify-center gap-2">
          <FiCheck size={18} /> Apply Filters
        </Button>
      </div>
      </div>
    </div>
  );
}
