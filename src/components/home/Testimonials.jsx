import { motion } from 'framer-motion';
import { testimonials } from '../../data/testimonials';

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-24" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <div className="text-center mb-12">
          <p className="font-bold text-center mb-2 text-[var(--color-primary)] text-xl" style={{ fontFamily: 'var(--font-script)' }}>Real Stories</p>
          <h2 className="text-gradient text-4xl lg:text-5xl font-bold mb-4 italic" style={{ fontFamily: 'var(--font-playfair)' }}>
            Loved by Thousands
          </h2>
          <p className="max-w-2xl mx-auto text-base" style={{ color: 'var(--color-text-muted)' }}>
            See what our customers have to say about their VastraHub experience. We pride ourselves on delivering premium quality and exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="card-hover glass-card flex flex-col p-8 rounded-2xl"
            >
              <div className="flex items-center gap-1 mb-4 text-yellow-500">
                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
              </div>
              <p className="text-lg leading-relaxed mb-8 italic" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-cormorant)' }}>
                "{t.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
              <div className="avatar-ring">
                <img 
                  src={t.avatar} 
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
              </div>
                <div>
                  <p className="font-medium text-base uppercase tracking-wide" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-oswald)' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
