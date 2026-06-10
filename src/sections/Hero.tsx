import { motion, useScroll, useTransform } from 'framer-motion';
import { Feather, BookOpen, Heart } from 'lucide-react';

const Hero = () => {
  const { scrollY } = useScroll();
  const contentY    = useTransform(scrollY, [0, 600], [0, -140]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const decoY       = useTransform(scrollY, [0, 600], [0, -60]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-30 transition-opacity duration-1000"
        style={{
          maskImage: 'radial-gradient(ellipse 100% 100% at 50% 30%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 30%, black 20%, transparent 100%)'
        }}
        poster="/hero-fallback.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/20 to-white/50" />

      {/* Elementos decorativos flotantes */}
      <motion.div
        className="absolute top-20 left-10"
        style={{ color: 'rgba(139, 26, 69, 0.12)', y: decoY }}
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Feather size={80} />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-16"
        style={{ color: 'rgba(139, 26, 69, 0.1)' }}
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <BookOpen size={60} />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4"
        style={{ color: 'rgba(155, 35, 85, 0.12)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart size={40} />
      </motion.div>

      {/* Líneas decorativas */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(155,35,85,0.2)] to-transparent" />
      <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(155,35,85,0.2)] to-transparent" />

      {/* Contenido principal */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Label superior */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base tracking-[0.3em] uppercase mb-6 font-light"
          style={{ color: 'hsl(var(--color-primary))' }}
        >
          Bienvenidos a
        </motion.p>

        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 700,
            color: 'hsl(var(--color-primary))'
          }}
        >
          Las Letras de{' '}
          <span className="text-gradient-gold">MaJu</span>
        </motion.h1>

        {/* Línea decorativa */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="section-divider mx-auto mb-8"
        />

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(15px, 2.2vw, 20px)',
            color: 'hsl(var(--color-text-soft))',
            maxWidth: '560px',
            lineHeight: 1.8,
            margin: '0 auto 40px',
            textAlign: 'center'
          }}
        >
          La adrenalina al escribir es como una montaña de emociones,
          a veces quiero hacer cosas grandes jugando con las palabras,
          otras solo concibo redactar sin ninguna pasión.
        </motion.p>

        {/* Botón de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-8"
        >
          <motion.button
            onClick={() => document.getElementById('biografia')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex flex-col items-center gap-2 transition-colors duration-300"
            style={{ color: 'hsl(var(--color-text-soft))' }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm tracking-widest uppercase">Descubrir</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
