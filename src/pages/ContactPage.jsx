import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact Us | VastraHub';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex-1 pb-20 fade-in">
      {/* Header Container */}
      <section className="py-20 text-center" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container max-w-3xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight" style={{ color: 'var(--color-text)' }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-lg md:text-xl" style={{ color: 'var(--color-text-muted)' }}
          >
            Have a question about your order, our products, or just want to say hello?
            We're here to help!
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-16 md:py-24 px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-12">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            className="rounded-[2rem] p-8 md:p-10 shadow-xl border"
            style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border-light)' }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>Send us a Message</h2>
            <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Full Name</label>
                  <input type="text" id="name" required placeholder="John Doe" className="input-field rounded-xl px-4 py-3.5 border transition-shadow focus:outline-none focus:ring-2" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-light)' }} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Email Address</label>
                  <input type="email" id="email" required placeholder="john@example.com" className="input-field rounded-xl px-4 py-3.5 border transition-shadow focus:outline-none focus:ring-2" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-light)' }} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Subject</label>
                <input type="text" id="subject" required placeholder="How can we help you?" className="input-field rounded-xl px-4 py-3.5 border transition-shadow focus:outline-none focus:ring-2" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-light)' }} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Message</label>
                <textarea id="message" required rows="6" placeholder="Your message here..." className="input-field rounded-xl px-4 py-3.5 border transition-shadow focus:outline-none focus:ring-2 resize-y" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-light)' }}></textarea>
              </div>

              <button type="submit" className="mt-4 w-full rounded-xl py-4 font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg focus:scale-[0.98]" style={{ background: 'var(--color-primary)' }}>
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info & Map Row */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            className="flex flex-col gap-10"
          >
            {/* Info Grid */}
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-[color:var(--color-primary)]">
                  <FiMapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1.5 text-lg" style={{ color: 'var(--color-text)' }}>Visit Us</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    VastraHub Headquarters<br />
                    Bahraich,<strong>Brahmanipura</strong> Uttar Pradesh<br />
                    India
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-[color:var(--color-primary)]">
                  <FiPhone size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1.5 text-lg" style={{ color: 'var(--color-text)' }}>Call Us</h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    +91 6394729329
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-[color:var(--color-primary)]">
                  <FiMail size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1.5 text-lg" style={{ color: 'var(--color-text)' }}>Email Us</h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    support@VastraHub.com
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-[color:var(--color-primary)]">
                  <FiClock size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1.5 text-lg" style={{ color: 'var(--color-text)' }}>Business Hours</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    Mon - Fri: 9:00 AM - 6:00 PM<br />
                    Sat - Sun: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Embedded Iframe */}
            <div className="overflow-hidden rounded-[2rem] shadow-lg border relative flex-1" style={{ borderColor: 'var(--color-border-light)', minHeight: '350px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d14147.009415363951!2d81.59134027036133!3d27.57019523867124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1774069221692!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VastraHub Location Map"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
