import { motion } from 'framer-motion';
import { Feather, BookOpen, Heart } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[hsl(220,15%,6%)]">
      {/* Video de fondo con efecto super difuminado hacia las orillas / fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40 transition-opacity duration-1000"
        style={{
          maskImage: 'radial-gradient(ellipse 100% 100% at 50% 30%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 30%, black 20%, transparent 100%)'
        }}
        poster="/hero-fallback.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        {/* Video literario / estético temporal como fallback si no subes tu mp4 (tinta en agua) */}
        <source src="https://www.pexels.com/es-es/download/video/5529463/" type="video/mp4" />
      </video>

      {/* Overlay Oscuro / Gradiente para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,15%,6%)]/40 via-[hsl(220,15%,8%)]/60 to-[hsl(220,15%,10%)]/90" />


      {/* Elementos decorativos flotantes */}
      <motion.div
        className="absolute top-20 left-10 text-[hsl(var(--gold))]/10"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Feather size={80} />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-16 text-[hsl(var(--gold))]/10"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <BookOpen size={60} />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4 text-[hsl(var(--violet))]/10"
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart size={40} />
      </motion.div>

      {/* Líneas decorativas */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/20 to-transparent" />
      <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/20 to-transparent" />

      {/* Contenido principal */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Subtítulo animado */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[hsl(var(--gold))] text-sm sm:text-base tracking-[0.3em] uppercase mb-6 font-light"
        >
          Bienvenidos a
        </motion.p>

        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[hsl(var(--ivory))] mb-8 leading-tight"
        >
          Las letras de{' '}
          <span className="text-gradient-gold italic">MaJu</span>
        </motion.h1>

        {/* Línea decorativa */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="decorative-line mx-auto mb-8"
        />

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-[hsl(var(--ivory-dim))] text-lg sm:text-xl md:text-2xl font-light italic max-w-2xl mx-auto leading-relaxed"
        >
          "Un libro abierto donde las palabras bailan,\nel caos se transforma en arte y cada emoción encuentra su voz."
        </motion.p>

        {/* Botón de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16"
        >
          <motion.button
            onClick={() => document.getElementById('biografia')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex flex-col items-center gap-2 text-[hsl(var(--ivory-dim))] hover:text-[hsl(var(--gold))] transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm tracking-widest uppercase">Descubrir</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(220,15%,8%)] to-transparent" />
    </section>
  );
};

export default Hero;
