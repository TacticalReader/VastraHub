export default function ProductBadge({ type, value }) {
  if (type === 'new') {
    return (
      <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
        style={{ background: 'var(--color-primary)' }}>
        New
      </span>
    );
  }

  if (type === 'discount' && value > 0) {
    return (
      <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
        -{value}%
      </span>
    );
  }

  return null;
}
