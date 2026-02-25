import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, BookOpen, Clock } from 'lucide-react';
import type { Post } from '@/types';

// Datos de prueba basados en los escritos reales de MaJu
export const postsData: Post[] = [
  {
    id: '1',
    titulo: 'La Panelita 💛',
    fecha_publicacion: '2025-12-20',
    extracto: 'Mi hermano mayor, Michael, no lo sabe, pero yo tenía 14 años cuando me regaló mi primera cámara...',
    contenido: 'Mi hermano mayor, Michael, no lo sabe, pero yo tenía 14 años cuando me regaló mi primera cámara. Era una cámara digital de color gris metalizado, pequeña, que a mis ojos, parecía un tesoro invaluable. Recuerdo que él estaba atravesando una época difícil pero, a pesar de todo, invirtió el dinero que tenía en algo que no necesitaba.\n\nEse regalo no era solo un objeto; era una forma de decirme: "Aquí tienes, haz con esto algo que te haga feliz". Nunca le dije cuánto significó.',
  },
  {
    id: '2',
    titulo: 'Caos, el arte de arder sin quemarme',
    fecha_publicacion: '2025-06-01',
    extracto: 'Me gusta el caos, lo dijo esa Maye, que después de un día duro, estresante, por fin se sentó en calma...',
    contenido: 'Me gusta el caos, lo dijo esa Maye, que después de un día duro, estresante, por fin se sentó en calma y pensó en lo adictiva que es la necesidad de siempre estar intentando abarcar todo y en el abismo constante que la habita por buscarle color al mundo.\n\nEsa es ella, amando el caos pero sin la menor intención de sumergirse del todo, porque el caos le ayuda a crear.',
  },
  {
    id: '3',
    titulo: 'Nunca recibí rosas',
    fecha_publicacion: '2025-07-28',
    extracto: 'Con lo que me gustan las rosas... Y solo las recibo en fechas obligatorias o por cortesía...',
    contenido: 'Con lo que me gustan las rosas... Y solo las recibo en fechas obligatorias o por cortesía.\n\nNunca alguien ha llegado a mi puerta en un día cualquiera, sin razón aparente, solo para decirme que pensó en mí al ver una. Quizá la vida me está enseñando que, antes de esperar rosas de otros, debo aprender a plantar mi propio jardín.',
  },
];

interface PostCardProps {
  post: Post;
  index: number;
}

const PostCard = ({ post, index }: PostCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/escrito/${post.id}`)}
      className="group relative cursor-pointer"
    >
      <motion.div
        className="relative h-full glass rounded-2xl p-6 sm:p-8 overflow-hidden"
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px -10px hsl(35 50% 55% / 0.2)'
            : '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Borde brillante al hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, hsl(35 50% 55% / 0.3) 0%, transparent 50%, hsl(280 25% 45% / 0.3) 100%)',
            padding: '1px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
          }}
        />

        {/* Icono de libro */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            className="w-12 h-12 rounded-xl bg-[hsl(var(--gold))]/10 flex items-center justify-center"
            animate={{
              backgroundColor: isHovered ? 'hsl(35 50% 55% / 0.2)' : 'hsl(35 50% 55% / 0.1)',
            }}
            transition={{ duration: 0.3 }}
          >
            <BookOpen className="w-5 h-5 text-[hsl(var(--gold))]" />
          </motion.div>

          <motion.div
            animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-5 h-5 text-[hsl(var(--gold))]" />
          </motion.div>
        </div>

        {/* Fecha */}
        <div className="flex items-center gap-2 text-[hsl(var(--ivory-dim))] text-sm mb-4">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(post.fecha_publicacion || post.created_at || new Date().toISOString())}</span>
        </div>

        {/* Título */}
        <h3 className="text-xl sm:text-2xl font-serif text-[hsl(var(--ivory))] mb-4 leading-tight group-hover:text-gradient-gold transition-all duration-300">
          {post.titulo}
        </h3>

        {/* Extracto */}
        <p className="text-[hsl(var(--ivory-dim))] text-sm sm:text-base leading-relaxed line-clamp-3">
          {post.extracto}
        </p>

        {/* Tiempo de lectura estimado */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-[hsl(var(--border))]">
          <Clock className="w-4 h-4 text-[hsl(var(--ivory-dim))]" />
          <span className="text-[hsl(var(--ivory-dim))] text-sm">
            {Math.ceil(post.contenido.length / 1000) || 3} min de lectura
          </span>
        </div>

        {/* Efecto de brillo */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isHovered
              ? 'radial-gradient(circle at 50% 0%, hsl(35 50% 55% / 0.1) 0%, transparent 50%)'
              : 'radial-gradient(circle at 50% 0%, transparent 0%, transparent 50%)',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.article>
  );
};

import { usePosts } from '@/hooks/usePosts';

const Publicaciones = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { posts } = usePosts();

  // Usar los posts reales si existen, sino usar los de prueba
  const displayPosts = posts && posts.length > 0 ? posts : postsData;

  return (
    <section
      id="publicaciones"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Fondo */}
      <div className="absolute inset-0 bg-[hsl(var(--background))]" />

      {/* Líneas decorativas */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/20 to-transparent" />

      {/* Elementos decorativos */}
      <motion.div
        className="absolute bottom-20 left-10 text-[hsl(var(--violet))]/5"
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <BookOpen size={100} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Encabezado de sección */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[hsl(var(--gold))] text-sm tracking-[0.3em] uppercase block mb-4"
            >
              Mis Escritos
            </motion.span>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="decorative-line mx-auto mb-6"
            />

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-[hsl(var(--ivory))] mb-4"
            >
              Publicaciones Recientes
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-[hsl(var(--ivory-dim))] text-lg max-w-2xl mx-auto"
            >
              Fragmentos de mi alma, historias que mecen el corazón y reflexiones que invitan a soñar.
            </motion.p>
          </div>

          {/* Grid de publicaciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* Mensaje de más contenido próximamente */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-[hsl(var(--ivory-dim))] text-sm italic">
              Más historias pronto... ✨
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(var(--background))] to-transparent" />
    </section>
  );
};

export default Publicaciones;
