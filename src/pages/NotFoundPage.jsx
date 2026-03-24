// src/pages/NotFoundPage.jsx
// Shown on all unmatched routes — uses 404-illustration.svg

import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center gap-6 px-4 text-center">
      {/* 404-illustration.svg */}
      <img
        src={import.meta.env.BASE_URL + 'assets/illustrations/404-illustration.svg'}
        alt="Page not found"
        width={400}
        height={320}
        loading="eager"
        className="mx-auto max-w-xs md:max-w-sm"
      />
      <div>
        <h1
          className="text-3xl font-extrabold md:text-4xl"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
        >
          Page Not Found
        </h1>
        <p className="mt-2 text-sm md:text-base" style={{ color: 'var(--color-text-muted)' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center rounded-full px-8 py-3 text-sm font-semibold text-white transition hover:opacity-85"
        style={{ background: 'var(--color-primary)' }}
      >
        ← Go Home
      </Link>
    </main>
  );
}
