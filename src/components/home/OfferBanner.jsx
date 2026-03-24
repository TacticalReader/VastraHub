// src/components/home/OfferBanner.jsx
// Mid-page offer strip — connects offer-strip.webp and india-delivery.svg

import { Link } from 'react-router-dom';

export default function OfferBanner() {
  return (
    <section
      id="offer-banner"
      className="relative overflow-hidden max-md:hidden"
      aria-label="Promotional offer banner"
    >
      {/* Background image */}
      <img
        src={import.meta.env.BASE_URL + 'assets/images/banners/offer-strip.webp'}
        alt="Season Sale Offer"
        width={1440}
        height={240}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark tint overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.62)' }} />

      <div className="relative z-10 container flex flex-col items-center justify-center gap-4 py-12 md:flex-row md:justify-between md:py-10 text-white">
        {/* Left: delivery icon + text */}
        <div className="flex items-center gap-4">
          <img
            src={import.meta.env.BASE_URL + 'assets/illustrations/india-delivery.svg'}
            alt="Free delivery across India"
            width={40}
            height={40}
            loading="lazy"
            className="shrink-0"
          />
          <div>
            <p className="text-base font-bold md:text-lg flex items-center gap-2">
              Free Shipping Across India
              <img src="https://flagcdn.com/w20/in.png" srcSet="https://flagcdn.com/w40/in.png 2x" width="20" alt="India flag" className="inline-block rounded-sm shadow-sm" />
            </p>
            <p className="text-xs opacity-75 mt-1">On all orders above ₹999 — no coupon needed.</p>
          </div>
        </div>

        {/* Center: offer text */}
        <div className="text-center">
          <p className="text-2xl font-extrabold tracking-tight md:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Season Sale — Up to{' '}
            <span style={{ color: 'var(--color-primary)' }}>40% Off</span>
          </p>
          <p className="text-xs opacity-75 mt-1">Limited time · Use code <strong>VASTRA10</strong> for an extra 10%</p>
        </div>

        {/* Right: CTA */}
        <Link
          to="/shop"
          className="shrink-0 rounded-full px-8 py-3 text-sm font-bold transition hover:opacity-85"
          style={{ background: 'var(--color-primary)', color: '#fff' }}
        >
          Shop the Sale →
        </Link>
      </div>
    </section>
  );
}
