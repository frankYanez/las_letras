import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, BookOpen, Feather } from 'lucide-react';
import { useEffect } from 'react';
import { usePosts } from '@/hooks/usePosts';
import { postsData } from '@/sections/Publicaciones';

const PostDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { posts } = usePosts();

    // Validar si usamos la data real o la data local de prueba
    const displayPosts = posts && posts.length > 0 ? posts : postsData;
    const post = displayPosts.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!post) {
        return (
            <div className="min-h-screen bg-[hsl(220,15%,8%)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gold))]/10 to-transparent" />
                <h2 className="text-4xl text-[hsl(var(--gold))] font-serif mb-6 relative z-10">Escrito no encontrado</h2>
                <p className="text-[hsl(var(--ivory-dim))] text-lg mb-10 relative z-10">El fragmento que buscas se ha perdido entre las páginas...</p>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 text-sm tracking-widest uppercase px-8 py-4 rounded-full border border-[hsl(var(--gold))]/30 text-[hsl(var(--ivory))] hover:bg-[hsl(var(--gold))]/10 hover:border-[hsl(var(--gold))] transition-all duration-300 relative z-10"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Volver al inicio
                </button>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    return (
        <div className="min-h-screen bg-[hsl(220,15%,8%)] text-[hsl(var(--ivory))] selection:bg-[hsl(var(--gold))]/30">
            {/* Barra superior */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-[hsl(var(--gold))]/10 bg-[hsl(220,15%,6%)]/80 backdrop-blur-md">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-[hsl(var(--ivory-dim))] hover:text-[hsl(var(--gold))] transition-all duration-300 group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm tracking-widest uppercase font-medium">Volver a los escritos</span>
                    </button>
                    <Feather className="w-6 h-6 text-[hsl(var(--gold))]/50" />
                </div>
            </nav>

            {/* Banner Gigante Impactante */}
            <header className="relative w-full min-h-[70vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
                {/* Imagen de fondo abstracta / literaria */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,15%,8%)]/60 via-[hsl(220,15%,8%)]/80 to-[hsl(220,15%,8%)] opacity-90 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=2940&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover opacity-30 mix-blend-luminosity scale-105"
                    />
                </div>

                <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center mt-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-20 h-20 mx-auto bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/30 rounded-2xl flex items-center justify-center mb-10 shadow-[0_0_30px_rgba(212,175,55,0.15)] backdrop-blur-sm"
                    >
                        <BookOpen className="w-10 h-10 text-[hsl(var(--gold))]" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[hsl(var(--gold))] text-sm sm:text-base mb-8 uppercase tracking-[0.2em] font-medium"
                    >
                        <div className="flex items-center gap-2 bg-[hsl(var(--gold))]/10 px-4 py-2 rounded-full border border-[hsl(var(--gold))]/20">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.fecha_publicacion || post.created_at || new Date().toISOString())}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-[hsl(var(--gold))]/10 px-4 py-2 rounded-full border border-[hsl(var(--gold))]/20">
                            <Clock className="w-4 h-4" />
                            <span>{Math.ceil(post.contenido.length / 1000) || 3} min de lectura</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif leading-tight mb-10 text-transparent bg-clip-text bg-gradient-to-br from-[hsl(var(--ivory))] via-[hsl(var(--ivory))] to-[hsl(var(--gold))]"
                        style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                    >
                        {post.titulo}
                    </motion.h1>

                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
                        className="h-px w-32 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent mx-auto"
                    />
                </div>

                {/* Elemento que conecta el header con el contenido */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(220,15%,8%)] to-transparent z-10" />
            </header>

            <main className="px-4 sm:px-6 relative z-20 -mt-10 pb-24">
                <article className="max-w-3xl mx-auto glass rounded-3xl p-8 sm:p-12 md:p-16 border border-[hsl(var(--gold))]/10 shadow-2xl relative">
                    {/* Contenido principal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="prose prose-invert prose-lg max-w-none prose-p:text-[hsl(var(--ivory-dim))] prose-p:leading-relaxed prose-headings:text-[hsl(var(--gold))] prose-headings:font-serif prose-a:text-[hsl(var(--gold))] hover:prose-a:text-[hsl(var(--ivory))] prose-strong:text-[hsl(var(--ivory))] text-justify"
                    >
                        {post.contenido.split(/\n+/).map((paragraph, index) => {
                            if (!paragraph.trim()) return null;
                            return <p key={index}>{paragraph}</p>;
                        })}
                    </motion.div>

                    {/* Footer del post */}
                    <motion.footer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="mt-24 pt-12 border-t border-[hsl(var(--border))] text-center"
                    >
                        <p className="text-[hsl(var(--gold))] font-serif italic text-2xl mb-8">
                            — MaJu
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase px-8 py-4 rounded-full border border-[hsl(var(--gold))]/30 text-[hsl(var(--ivory))] hover:bg-[hsl(var(--gold))]/10 hover:border-[hsl(var(--gold))] transition-all duration-300"
                        >
                            Leer más escritos
                        </button>
                    </motion.footer>
                </article>
            </main>
        </div>
    );
};

export default PostDetail;
