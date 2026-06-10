import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram } from 'lucide-react';

// Pegar aquí los links completos de cada Reel de Instagram
// Ejemplo: https://www.instagram.com/reel/ABC123xyz/
const REELS: string[] = [
  'https://www.instagram.com/reel/DQIbgjIDSSV/',
  'https://www.instagram.com/reel/DORNfGoDUFz/',
  'https://www.instagram.com/reel/DKgLzSjte-i/',
];

function getEmbedUrl(reelUrl: string): string {
  // Normaliza la URL y agrega /embed/
  const clean = reelUrl.replace(/\/$/, '');
  return `${clean}/embed/?cr=1&v=14&wp=420&rd=https%3A%2F%2Flasletras.vercel.app`;
}

const ReelPlaceholder = ({ index }: { index: number }) => (
  <div
    className="glass flex flex-col items-center justify-center gap-3"
    style={{ aspectRatio: '4/5', borderRadius: '20px' }}
  >
    <Instagram style={{ color: 'rgba(155,35,85,0.4)', width: 40, height: 40 }} />
    <p style={{
      fontFamily: "'Lato', sans-serif",
      fontSize: '12px',
      color: 'rgba(155,35,85,0.5)',
      textAlign: 'center',
      padding: '0 16px',
    }}>
      Reel {index + 1}<br />
      <span style={{ opacity: 0.7 }}>Agregar link en Galeria.tsx</span>
    </p>
  </div>
);

const Galeria = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const configured = REELS.filter(Boolean);

  return (
    <section id="videos" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="section-title">En Movimiento</h2>
          <div className="section-divider" />
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            color: 'hsl(var(--color-text-soft))',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}>
            <Instagram size={14} />
            @maje.ju
          </p>
        </motion.div>

        {/* Grid de Reels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
            >
              {configured[i] ? (
                <div
                  className="glass"
                  style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    aspectRatio: '4/5',
                    position: 'relative',
                  }}
                >
                  <iframe
                    src={getEmbedUrl(configured[i])}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                    scrolling="no"
                    allowTransparency
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={`Reel de Instagram ${i + 1}`}
                  />
                </div>
              ) : (
                <ReelPlaceholder index={i} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Link al perfil */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="https://www.instagram.com/maje.ju"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-all duration-300"
            style={{
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '10px 24px',
              borderRadius: '50px',
              border: '1px solid rgba(155,35,85,0.3)',
              color: 'hsl(var(--color-primary))',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Instagram size={15} />
            Ver más en Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Galeria;
