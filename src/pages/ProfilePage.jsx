// src/pages/ProfilePage.jsx
// Uses avatar-placeholder.webp as default user avatar

import { FiUser, FiMail, FiMapPin, FiEdit2 } from 'react-icons/fi';

export default function ProfilePage() {
  // TODO: connect useAuth() — placeholder for now
  const user = null;

  const displayAvatar = user?.avatar ?? import.meta.env.BASE_URL + 'assets/images/banners/avatar-placeholder.webp';
  const displayName = user?.name ?? 'Guest User';
  const displayEmail = user?.email ?? 'guest@VastraHub.in';

  return (
    <main className="container max-w-2xl py-12">
      <h1
        className="text-2xl font-bold mb-8"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
      >
        My Profile
      </h1>

      {/* Avatar + basic info */}
      <div
        className="flex items-center gap-6 p-6 rounded-2xl mb-6"
        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border-light)' }}
      >
        {/* avatar-placeholder.webp used when no real photo */}
        <img
          src={displayAvatar}
          alt={displayName}
          width={200}
          height={200}
          loading="eager"
          className="h-20 w-20 rounded-full object-cover ring-2"
          style={{ ringColor: 'var(--color-primary)' }}
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold truncate" style={{ color: 'var(--color-text)' }}>
            {displayName}
          </h2>
          <p className="text-sm truncate mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            {displayEmail}
          </p>
        </div>
        <button
          aria-label="Edit profile"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition hover:bg-[color:var(--color-bg-secondary)]"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <FiEdit2 size={18} />
        </button>
      </div>

      {/* Info cards */}
      <div className="grid gap-4">
        {[
          { Icon: FiUser, label: 'Full Name', value: displayName },
          { Icon: FiMail, label: 'Email Address', value: displayEmail },
          { Icon: FiMapPin, label: 'Delivery Address', value: 'Not set — add an address' },
        ].map(({ Icon, label, value }) => (
          <div
            key={label}
            className="flex items-start gap-4 p-5 rounded-xl"
            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border-light)' }}
          >
            <Icon size={18} style={{ color: 'var(--color-text-muted)', marginTop: '2px', flexShrink: 0 }} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                {label}
              </p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--color-text)' }}>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
