import { useState } from 'react';
import Modal from '../ui/Modal';

export default function SizeSelector({ sizes, selectedSize, onSelect }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  if (!sizes || sizes.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Select Size</p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="text-xs font-bold transition-opacity hover:opacity-75" 
          style={{ color: 'var(--color-primary)' }}
        >
          Size Guide
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map((sz) => (
          <button
            key={sz}
            onClick={() => onSelect(sz)}
            className="h-10 rounded-lg px-4 text-sm font-bold transition-all active:scale-[0.98]"
            style={{ 
              border: selectedSize === sz ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', 
              color: selectedSize === sz ? 'var(--color-primary)' : 'var(--color-text)', 
              background: 'var(--color-bg-card)' 
            }}
          >
            {sz}
          </button>
        ))}
      </div>

      {/* Size Guide Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Size Guide"
        className="max-w-2xl"
      >
        <div className="flex flex-col items-center">
          <img 
            src={import.meta.env.BASE_URL + 'assets/illustrations/size-guide.svg'} 
            alt="Size Guide Chart" 
            className="w-full h-auto rounded-lg"
          />
          <p className="mt-4 text-xs text-center leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            All measurements are in inches. Standard fit applied. If between sizes, we recommend choosing the larger size for formal wear.
          </p>
        </div>
      </Modal>
    </div>
  );
}
