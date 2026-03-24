import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiHeart, FiShield, FiTrendingUp, FiTarget, FiZap } from 'react-icons/fi';

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us | VastraHub';
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7, ease: "easeOut" }
  };

  return (
    <main className="flex-1 overflow-x-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* ─── Premium Hero Section ─── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-24 sm:py-32">
        {/* Animated Background Mesh Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,var(--color-primary)_0%,transparent_50%)] animate-pulse"></div>
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-20 filter blur-[100px]" style={{ background: 'var(--color-primary)' }}></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-20 filter blur-[100px]" style={{ background: 'var(--color-accent)' }}></div>
        </div>

        <div className="relative z-10 container max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border" 
                  style={{ color: 'var(--color-primary)', borderColor: 'var(--color-border)', background: 'var(--color-bg-secondary)' }}>
              Est. 2024
            </span>
            <h1 
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              Elevating the <span style={{ color: 'var(--color-primary)' }}>Indian</span> <br /> <em>Sartorial</em> Experience
            </h1>
            <p 
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
            >
              VastraHub blends <strong>heritage craftsmanship</strong> with <strong>modern silhouettes</strong>, creating a unique signature for the contemporary Indian wardrobe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Our Narrative ─── */}
      <section className="py-20 md:py-32 relative">
        <div className="container px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 relative inline-block" style={{ fontFamily: 'var(--font-heading)' }}>
                Our Story
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-[color:var(--color-primary)]"></div>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                <p>
                  VastraHub wasn't born in a boardroom, but in the <em>vibrant looms</em> of India's textile heartlands. We started with a simple yet <strong>profound vision</strong>: to create clothing that resonates with the ambition of the modern Indian.
                </p>
                <p>
                  We believe that <strong>fashion is a form of self-expression</strong>. Whether it's the crisp lines of a <em>tailored suit</em> for a high-stakes meeting or the rugged durability of an <em>outdoor jacket</em> for a Himalayan trek, every stitch we make is a testament to our commitment to <strong>Quality above all</strong>.
                </p>
                <p>
                  Our journey is a continuous exploration of <em>minimalist aesthetics</em> and <em>maximalist performance</em>. We don't just sell clothes; we provide the <strong>confidence</strong> to conquer your day.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <img
                src={import.meta.env.BASE_URL + 'assets/images/banners/hero-1.webp'}
                alt="VastraHub Craftsmanship"
                className="absolute inset-0 w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-3xl font-bold font-heading">Crafting Excellence</p>
                <p className="text-sm opacity-80 uppercase tracking-widest mt-2">Hand-inspected by masters</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Our Pillars (Grid) ─── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--color-bg-secondary)' }}>
        {/* Decorative background circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-dashed border-[color:var(--color-border)] rounded-full opacity-30 animate-[spin_60s_linear_infinite]"></div>

        <div className="container px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              The VastraHub Pillars
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>Founded on values that define <em>longevity</em> and <em>integrity</em> in every thread.</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: FiAward, title: 'Uncompromising Quality', desc: 'We source only the <strong>finest long-staple cotton</strong> and technical fabrics to ensure <em>multi-generational durability</em>.' },
              { icon: FiTarget, title: 'Precision Tailoring', desc: 'Every pattern is <strong>anatomically drafted</strong> to provide a fit that feels like a <em>second skin</em>.' },
              { icon: FiTrendingUp, title: 'Modern Innovation', desc: 'Integrating <strong>smart-fabrics</strong> with <em>timeless styles</em> to keep you ahead of the trend.' },
              { icon: FiShield, title: 'Ethical Sourcing', desc: 'Committed to <strong>fair-wage practices</strong> and <em>sustainable manufacturing</em> across our entire supply chain.' },
              { icon: FiZap, title: 'Direct to Hearts', desc: 'By cutting out the middlemen, we deliver <strong>premium luxury</strong> at <em>accessible prices</em>.' },
              { icon: FiHeart, title: 'Proudly Indian', desc: 'Celebrating <strong>local craft</strong> while catering to the <em>global Indian jetsetter</em>.' },
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group p-8 rounded-[2rem] border transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border-light)' }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl mb-6 transition-colors group-hover:scale-110 duration-300" 
                     style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }} dangerouslySetInnerHTML={{ __html: item.desc }}></p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Founder's Commitment ─── */}
      <section className="py-24 md:py-32">
        <div className="container max-w-4xl px-6">
          <motion.div 
            {...fadeIn}
            className="p-10 md:p-16 rounded-[3rem] text-center border relative overflow-hidden" 
            style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
          >
            {/* Quote marks bg */}
            <div className="absolute top-0 left-10 text-[10rem] font-serif opacity-5 leading-none select-none">“</div>
            
            <h2 className="text-2xl md:text-3xl font-bold italic mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              "Real style isn't about being noticed, but about being <strong>remembered</strong>."
            </h2>
            <div className="w-16 h-1 bg-[color:var(--color-primary)] mx-auto mb-8"></div>
            <p className="text-lg italic" style={{ color: 'var(--color-text-secondary)' }}>
              Our mission is to help you build a wardrobe that speaks for you before you even say a word.
            </p>
            <div className="mt-10">
              <p className="font-bold text-xl" style={{ color: 'var(--color-text)' }}>Tanmay Srivastava</p>
              <p className="text-sm uppercase tracking-widest mt-1" style={{ color: 'var(--color-primary)' }}>Visionary & Founder</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
