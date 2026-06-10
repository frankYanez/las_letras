import { motion, useScroll, useSpring } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, BookOpen, Feather } from 'lucide-react';
import { useEffect } from 'react';
import { usePosts } from '@/hooks/usePosts';
import { postsData } from '@/sections/Publicaciones';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts } = usePosts();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  const displayPosts = posts && posts.length > 0 ? posts : postsData;
  const post = displayPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="section-title mb-4">Escrito no encontrado</h2>
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'hsl(var(--color-text-soft))', marginBottom: '32px' }}>
          El fragmento que buscas se ha perdido entre las páginas...
        </p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 transition-all duration-300"
          style={{
            fontSize: '12px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '12px 28px',
            borderRadius: '50px',
            border: '1px solid rgba(155,35,85,0.3)',
            color: 'hsl(var(--color-primary))',
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ color: 'hsl(var(--color-text-dark))' }}>
      {/* Video de fondo difuminado */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <video
          autoPlay loop muted playsInline
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'blur(40px)',
            transform: 'scale(1.1)',
            opacity: 0.25,
            mixBlendMode: 'luminosity',
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Overlay suave para legibilidad */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(252,228,240,0.7) 0%, rgba(200,144,216,0.5) 100%)',
        }} />
      </div>

      {/* Contenido sobre el video */}
      <div style={{ position: 'relative', zIndex: 1 }}>

      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, hsl(var(--color-primary)), rgba(200,144,216,0.9))',
          transformOrigin: '0%',
          zIndex: 60,
        }}
      />

      {/* Navbar */}
      <nav
        className="fixed top-0 w-full z-50"
        style={{
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(255,255,255,0.4)',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 transition-all duration-300 group"
            style={{ color: 'hsl(var(--color-text-soft))' }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Volver a los escritos
            </span>
          </button>
          <Feather className="w-5 h-5" style={{ color: 'rgba(155,35,85,0.4)' }} />
        </div>
      </nav>

      {/* Header del post */}
      <header className="relative pt-24 pb-12 px-4 sm:px-6 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-8 flex items-center justify-center"
          style={{
            width: '64px',
            height: '64px',
            background: 'rgba(155,35,85,0.1)',
            border: '1px solid rgba(155,35,85,0.2)',
            borderRadius: '18px',
          }}
        >
          <BookOpen className="w-8 h-8" style={{ color: 'hsl(var(--color-primary))' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6"
          style={{
            fontSize: '12px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'hsl(var(--color-primary))',
            background: 'rgba(155,35,85,0.1)',
            border: '1px solid rgba(155,35,85,0.2)',
            borderRadius: '50px',
            padding: '6px 16px',
            display: 'inline-flex',
          }}
        >
          <Calendar className="w-3 h-3" />
          {formatDate(post.fecha_publicacion || post.created_at || new Date().toISOString())}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(36px, 7vw, 72px)',
            fontWeight: 700,
            color: 'hsl(var(--color-primary))',
            lineHeight: 1.15,
            marginBottom: '24px',
          }}
        >
          {post.titulo}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="section-divider"
        />
      </header>

      {/* Contenido */}
      <main className="px-4 sm:px-6 pb-24 max-w-3xl mx-auto">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-deep"
          style={{ borderRadius: '24px', padding: 'clamp(24px, 5vw, 56px)' }}
        >
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(15px, 2vw, 17px)',
            lineHeight: 1.95,
            color: 'hsl(var(--color-text-dark))',
          }}>
            {post.contenido.split(/\n+/).map((paragraph, index) => (
              paragraph.trim()
                ? <p key={index} style={{ marginBottom: '20px' }}>{paragraph}</p>
                : null
            ))}
          </div>

          <footer className="mt-16 pt-10 text-center" style={{ borderTop: '1px solid rgba(155,35,85,0.15)' }}>
            <p style={{
              fontFamily: "'Dancing Script', cursive",
              fontStyle: 'italic',
              fontSize: '28px',
              color: 'hsl(var(--color-primary))',
              marginBottom: '24px',
            }}>
              — MaJu
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 transition-all duration-300"
              style={{
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '12px 28px',
                borderRadius: '50px',
                border: '1px solid rgba(155,35,85,0.3)',
                color: 'hsl(var(--color-primary))',
                background: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(12px)',
              }}
            >
              Leer más escritos
            </button>
          </footer>
        </motion.article>
      </main>
      </div>{/* end z-index wrapper */}
    </div>
  );
};

export default PostDetail;
