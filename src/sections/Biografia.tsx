import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Flame, Heart, Quote } from 'lucide-react';

const Biografia = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="biografia"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Fondo sutil */}
      <div className="absolute inset-0 bg-[hsl(var(--background))]" />

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/20 to-transparent" />

      <motion.div
        className="absolute top-20 right-10 text-[hsl(var(--gold))]/5"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles size={120} />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Título de sección */}
          <motion.div variants={itemVariants} className="mb-12">
            <span className="text-[hsl(var(--gold))] text-sm tracking-[0.3em] uppercase">
              Sobre la Autora
            </span>
          </motion.div>

          {/* Línea decorativa */}
          <motion.div variants={itemVariants} className="decorative-line mx-auto mb-12" />

          {/* Contenido principal con Layout de dos columnas */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-16 text-left">
            {/* Columna Izquierda: Foto */}
            <motion.div
              variants={itemVariants}
              className="relative mx-auto lg:mx-0 max-w-md w-full"
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative group">
                {/* Fallback brillante si no hay foto */}
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gold))]/20 to-[hsl(var(--violet))]/20 flex items-center justify-center">
                  <span className="text-6xl font-serif text-[hsl(var(--ivory))]/30 italic">MaJu</span>
                </div>

                <img
                  src="/assets/IMG_0525.png"
                  alt="MaJu"
                  className="absolute inset-0 w-full h-full object-contain opacity-90 transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Ocultar imagen rota si no existe aún
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />

                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))]/80 via-transparent to-transparent" />
              </div>

              {/* Elemento decorativo borde */}
              <div className="absolute -inset-4 border border-[hsl(var(--gold))]/20 rounded-[2.5rem] -z-10" />
            </motion.div>

            {/* Columna Derecha: Texto */}
            <motion.div variants={itemVariants} className="relative">
              {/* Comillas decorativas */}
              <Quote className="absolute -top-10 -left-6 text-[hsl(var(--gold))]/10 w-16 h-16 rotate-180" />

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[hsl(var(--ivory))] mb-6 leading-tight">
                Hola, soy <span className="text-gradient-gold italic">Maye</span>{' '}
                <span className="text-[hsl(var(--gold))]">(MaJu)</span>
              </h2>

              <p className="text-xl sm:text-2xl text-[hsl(var(--ivory-dim))] font-light italic mb-10 leading-relaxed">
                ...y sí, soy un libro abierto. Siempre lo he sido y, sinceramente, no tengo planes de cerrarme.
              </p>

              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[hsl(var(--terracotta))]/20 flex items-center justify-center mt-1">
                    <Flame className="w-5 h-5 text-[hsl(var(--terracotta))]" />
                  </div>
                  <p className="text-[hsl(var(--ivory))]/90 leading-relaxed">
                    Soy una escritora que <span className="text-[hsl(var(--terracotta))] font-medium">abraza el caos</span> como quien abraza a un viejo amigo. Odio las zonas de confort con la misma pasión con la que amo las historias que me hacen sentir viva.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[hsl(var(--violet))]/20 flex items-center justify-center mt-1">
                    <Heart className="w-5 h-5 text-[hsl(var(--violet))]" />
                  </div>
                  <p className="text-[hsl(var(--ivory))]/90 leading-relaxed">
                    Utilizo mis letras para compartir <span className="text-[hsl(var(--violet))] font-medium">anécdotas, emociones y amor</span> de forma positiva y expresiva. Cada palabra que escribo es un pedacito de mi alma que regalo al mundo.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[hsl(var(--gold))]/20 flex items-center justify-center mt-1">
                    <Sparkles className="w-5 h-5 text-[hsl(var(--gold))]" />
                  </div>
                  <p className="text-[hsl(var(--ivory))]/90 leading-relaxed">
                    Este espacio es mi refugio, mi confesionario y mi galería de emociones. Aquí encontrarás desde reflexiones profundas hasta historias cotidianas, todas tejidas con la misma honestidad que me caracteriza.
                  </p>
                </div>
              </div>

              {/* Firma animada */}
              <motion.div
                className="mt-12 text-right"
                whileInView={{ opacity: [0, 1], x: [20, 0] }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <p className="text-[hsl(var(--gold))] font-serif italic text-3xl">
                  — MaJu
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(var(--background))] to-transparent" />
    </section>
  );
};

export default Biografia;
