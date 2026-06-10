import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Biografia = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const highlightStyle: React.CSSProperties = {
    fontFamily: "'Dancing Script', cursive",
    fontStyle: 'normal',
    fontSize: '20px',
    color: 'hsl(var(--color-primary))',
    fontWeight: 600,
    marginBottom: '16px',
  };

  return (
    <section id="biografia" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Encabezado */}
          <motion.div variants={itemVariants} className="text-center mb-4">
            <h2 className="section-title">Sobre la Autora</h2>
            <div className="section-divider" />
          </motion.div>

          {/* Card principal */}
          <motion.div
            variants={itemVariants}
            className="glass-deep p-7 sm:p-12 grid grid-cols-1 sm:grid-cols-[400px_1fr] gap-8 sm:gap-12 items-start"
          >
            {/* Imagen — embed de Instagram */}
            <div className="mx-auto sm:mx-0 w-full flex-shrink-0" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '3px solid rgba(255,255,255,0.6)',
                  boxShadow: '0 16px 40px rgba(155,35,85,0.25)',
                  background: 'rgba(255,255,255,0.2)',
                }}
              >
                <iframe
                  src="https://www.instagram.com/p/DGmr1J0sB-w/embed/?cr=1&v=14"
                  style={{
                    width: '100%',
                    height: '490px',
                    border: 'none',
                    display: 'block',
                  }}
                  scrolling="no"
                  allowTransparency
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Foto de Maye — Las Letras de MaJu"
                />
              </div>
            </div>

            {/* Texto */}
            <div>
              <span style={{
                display: 'inline-block',
                background: 'rgba(180,60,120,0.15)',
                border: '1px solid rgba(180,60,120,0.3)',
                borderRadius: '50px',
                padding: '5px 16px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'hsl(var(--color-secondary))',
                marginBottom: '16px',
              }}>
                ✦ Libro abierto
              </span>

              <h3 style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 700,
                color: 'hsl(var(--color-primary))',
                marginBottom: '20px',
                lineHeight: 1.1,
              }}>
                Hola, soy Maye.
              </h3>

              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                fontSize: '15px',
                lineHeight: 1.9,
                color: 'hsl(var(--color-text-dark))',
              }}>
                <p style={{ marginBottom: '16px' }}>
                  ...y sí, soy un libro abierto. Siempre lo he sido y,
                  sinceramente, no tengo planes de cerrarme.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Escribo porque siento mucho, pienso demasiado y porque
                  algunas emociones encuentran mejor su lugar en las palabras
                  que en el silencio.
                </p>
                <p style={highlightStyle}>
                  Aquí todas las emociones tienen hogar.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Las letras de MaJu es mi manera de conversar con el mundo y,
                  a veces, conmigo misma. Un espacio donde las experiencias se
                  convierten en historias, las preguntas encuentran refugio y
                  las emociones pueden existir sin filtros.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Si alguna vez alguna de mis letras logra acompañarte,
                  abrazarte o ayudarte a ponerle nombre a lo que sientes,
                  entonces habrá valido la pena compartirlas.
                </p>
                <p style={highlightStyle}>
                  Estas son mis letras pero también pueden ser las tuyas.
                </p>
                <p>¡Bienvenidos!</p>
              </div>

              <motion.div
                className="mt-8 text-right"
                whileInView={{ opacity: [0, 1], x: [20, 0] }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <p style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontStyle: 'italic',
                  fontSize: '32px',
                  color: 'hsl(var(--color-primary))',
                }}>
                  — MaJu
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Biografia;
