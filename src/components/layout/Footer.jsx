// src/components/layout/Footer.jsx
// Images: about-india.webp (decorative bg), payment-badges.webp, logo.svg/logo-dark.svg
// Icon: india-delivery.svg (inline in Ships Across India callout)

import { Link } from 'react-router-dom';
import { BiLogoInstagram, BiLogoFacebook } from 'react-icons/bi';
import { FiTwitter, FiPhone, FiMail, FiMapPin, FiUser, FiGithub, FiHeart } from 'react-icons/fi';
import { useThemeContext } from '../../context/ThemeContext';
import logoLight from '../../assets/logo.svg';
import logoDark from '../../assets/logo-dark.svg';

const NAV_COLS = [
  {
    heading: 'Men',
    links: [
      { label: 'Suits', to: '/category/men/suits' },
      { label: 'Blazers', to: '/category/men/blazers' },
      { label: 'Dress Shirts', to: '/category/men/dress-shirts' },
      { label: 'Outdoor Jackets', to: '/category/men/jackets' },
      { label: 'Cargo Pants', to: '/category/men/cargo-pants' },
      { label: 'Hoodies', to: '/category/men/hoodies' },
    ],
  },
  {
    heading: 'Women',
    links: [
      { label: 'Formal Kurtas', to: '/category/women/formal-kurtas' },
      { label: 'Blazers', to: '/category/women/blazers' },
      { label: 'Formal Dresses', to: '/category/women/formal-dresses' },
      { label: 'Windcheaters', to: '/category/women/windcheaters' },
      { label: 'Casual Kurtas', to: '/category/women/casual-kurtas' },
      { label: 'Track Pants', to: '/category/women/track-pants' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Track Order', to: '/orders' },
      { label: 'Returns & Refunds', to: '/returns' },
      { label: 'Size Guide', to: '/size-guide' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
];

export default function Footer() {
  const { isDark } = useThemeContext();

  return (
    <footer aria-label="Site footer" style={{ background: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}>
      {/* ── Made in India callout strip ── */}
      <div className="relative overflow-hidden">
        <img
          src={import.meta.env.BASE_URL + 'assets/images/banners/about-india.webp'}
          alt="Ships across India — textile background"
          width={800}
          height={400}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative z-10 container flex flex-col items-center justify-center gap-2 py-8 text-center md:flex-row md:gap-6">
          <img
            src={import.meta.env.BASE_URL + 'assets/illustrations/india-delivery.svg'}
            alt="Delivery across India"
            width={40}
            height={40}
            loading="lazy"
            className="shrink-0"
          />
          <div className="text-center md:text-left">
            <p className="text-base font-bold flex items-center justify-center md:justify-start gap-2" style={{ color: 'var(--color-text)' }}>
              <img src="https://flagcdn.com/w20/in.png" srcSet="https://flagcdn.com/w40/in.png 2x" width="20" alt="India flag" className="inline-block rounded-sm shadow-sm" />
              Proudly Indian. Delivered Nationwide.
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Free shipping on all orders above ₹999 · Cash on delivery available
            </p>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="container grid grid-cols-2 gap-10 py-14 md:grid-cols-4 lg:gap-16">
        {/* Brand column */}
        <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
          <Link to="/" aria-label="VastraHub Home">
            <img
              src={isDark ? logoDark : logoLight}
              alt="VastraHub"
              width={160}
              height={40}
              loading="lazy"
              className="h-10 w-auto"
            />
          </Link>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Premium formal &amp; outdoor clothing curated for the modern Indian wardrobe.
          </p>
          {/* Social */}
          <div className="flex gap-3 mt-1">
            {[
              { Icon: BiLogoInstagram, label: 'Instagram', href: '#' },
              { Icon: BiLogoFacebook, label: 'Facebook', href: '#' },
              { Icon: FiTwitter, label: 'Twitter', href: '#' },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border transition hover:scale-110"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {NAV_COLS.map((col) => (
          <div key={col.heading}>
            <p
              className="mb-5 text-sm font-semibold uppercase tracking-wider"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-oswald)' }}
            >
              {col.heading}
            </p>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-all duration-200 hover:text-[color:var(--color-primary)] hover:translate-x-1 inline-block"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="border-t py-6"
        style={{ borderColor: 'var(--color-border-light)' }}
      >
        <div className="container flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="flex flex-col items-center lg:items-start gap-2" style={{ color: 'var(--color-text-muted)' }}>
            <p className="text-xs">
              © {new Date().getFullYear()} VastraHub. All rights reserved.
            </p>
            <div className="flex flex-col items-center lg:items-start gap-1.5 p-3 rounded-xl mt-2" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border-light)' }}>
               <p className="text-xs font-semibold flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                 <FiHeart className="text-[color:var(--color-primary)]" style={{ fill: 'currentColor' }} /> Programmed & Developed by Tanmay Srivastava
               </p>
               <div className="flex flex-wrap items-center justify-center gap-4 text-xs mt-0.5">
                 <a href="tel:6394729329" className="flex items-center gap-1.5 hover:text-[color:var(--color-primary)] transition-colors">
                   <FiPhone size={13} /> 6394729329
                 </a>
                 <a href="https://github.com/TacticalReader" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[color:var(--color-primary)] transition-colors">
                   <FiGithub size={13} /> TacticalReader
                 </a>
               </div>
            </div>
          </div>

          {/* Payment badges */}
          <img
            src={import.meta.env.BASE_URL + 'assets/images/banners/payment-badges.webp'}
            alt="Accepted payment methods: Visa, Mastercard, UPI, Paytm, RuPay"
            width={400}
            height={60}
            loading="lazy"
            className="h-7 w-auto object-contain"
          />

          <div className="flex gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <Link to="/privacy" className="hover:text-[color:var(--color-primary)] transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-[color:var(--color-primary)] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
