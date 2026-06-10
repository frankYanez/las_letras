import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const frases = [
  {
    texto: 'He conocido mucha gente mediocre toreándose en grandes plazas, y no me han llamado nunca la atención. Disfruto de aquellos que viven creyéndose jodidamente brillantes y simplemente proyectando, eso terminan brillando. A veces creer en algo te hace ganador.',
    deep: true,
  },
  {
    texto: 'Todo lo que hoy me hace feliz, en algún momento me dio miedo...',
    deep: false,
  },
  {
    texto: 'Odio estar encerrada sin poder salir de casa. No es lo mismo mirar el sol a través de una ventana.',
    deep: true,
  },
];

const FraseCard = ({ texto, deep, index }: { texto: string; deep: boolean; index: number }) => (
  <motion.div
    className={deep ? 'glass-deep' : 'glass'}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    style={{ padding: '32px 36px', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}
  >
    {/* Comilla decorativa */}
    <span
      aria-hidden="true"
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '120px',
        color: 'rgba(155,35,85,0.1)',
        position: 'absolute',
        top: '-10px',
        left: '16px',
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      &#8220;
    </span>

    <p style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: '16px',
      fontStyle: 'italic',
      color: 'hsl(var(--color-text-soft))',
      lineHeight: 1.8,
      position: 'relative',
      zIndex: 1,
      paddingLeft: '16px',
    }}>
      {texto}
    </p>
  </motion.div>
);

const Frases = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="frases" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="section-title">Frases</h2>
          <div className="section-divider" />
        </motion.div>

        {frases.map((f, i) => (
          <FraseCard key={i} texto={f.texto} deep={f.deep} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Frases;
