import { motion } from 'framer-motion';
import { Camera, Film } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Tipos de elementos de la galería
type GalleryItem = {
    id: string;
    type: 'image' | 'video';
    url: string;
    alt: string;
};

// Items temporales de prueba (Mixkit para videos, Unsplash para imágenes)
// El usuario reemplazará estos por sus propios archivos en /public
const galleryItems: GalleryItem[] = [
    { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop', alt: 'MaJu escribiendo' },
    { id: '2', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-typing-on-a-laptop-41712-large.mp4', alt: 'Proceso creativo' },
    { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop', alt: 'Retrato MaJu' },
    { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=1974&auto=format&fit=crop', alt: 'Libreta de notas' },
    { id: '5', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-reading-a-book-on-a-bench-42502-large.mp4', alt: 'Inspiración' },
    { id: '6', type: 'image', url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1998&auto=format&fit=crop', alt: 'Libros y café' },
];

const Galeria = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Duplicamos los items para lograr el efecto de scroll infinito sin saltos
    const duplicatedItems = [...galleryItems, ...galleryItems];

    return (
        <section id="galeria" className="relative py-24 sm:py-32 overflow-hidden bg-[hsl(var(--background))]">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/20 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[hsl(var(--gold))]/5 via-transparent to-transparent opacity-50 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex justify-center items-center gap-2 text-[hsl(var(--gold))] text-sm tracking-[0.3em] uppercase mb-4"
                    >
                        <Camera className="w-4 h-4" /> Detrás de las letras
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
                        Galería Visual
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-[hsl(var(--ivory-dim))] text-lg max-w-2xl mx-auto"
                    >
                        Momentos, inspiraciones y retazos de mi día a día.
                    </motion.p>
                </motion.div>
            </div>

            {/* Contenedor del Carousel Infinito */}
            <div className="relative w-full flex overflow-hidden group">
                {/* Máscaras laterales para difuminar la entrada/salida (fade effect) */}
                <div className="absolute top-0 left-0 w-16 md:w-40 h-full bg-gradient-to-r from-[hsl(var(--background))] to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-16 md:w-40 h-full bg-gradient-to-l from-[hsl(var(--background))] to-transparent z-20 pointer-events-none" />

                <motion.div
                    className="flex gap-6 px-3"
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        ease: "linear",
                        duration: 40, // Tiempo que tarda en dar la vuelta (más grande = más lento)
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                    // Se pausa al pasar el ratón para poder ver las imágenes
                    whileHover={{ animationPlayState: "paused" }}
                >
                    {duplicatedItems.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="relative flex-none w-[280px] sm:w-[350px] aspect-[4/5] rounded-2xl overflow-hidden glass border border-[hsl(var(--gold))]/20 group/item shadow-xl select-none"
                        >
                            {item.type === 'image' ? (
                                <img
                                    src={item.url}
                                    alt={item.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105 opacity-90"
                                    draggable={false}
                                />
                            ) : (
                                <div className="w-full h-full relative">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105 opacity-90"
                                    >
                                        <source src={item.url} type="video/mp4" />
                                    </video>
                                    {/* Icono de video indicativo */}
                                    <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full backdrop-blur-sm">
                                        <Film className="w-4 h-4 text-white/80" />
                                    </div>
                                </div>
                            )}

                            {/* Overlay y título en hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))]/90 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                <p className="text-[hsl(var(--ivory))] font-serif text-lg transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500">
                                    {item.alt}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Botón opcional de Instagram o redes */}
            <motion.div
                className="mt-16 text-center relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <p className="text-[hsl(var(--ivory-dim))] text-sm italic mb-4">Sígueme para ver más de mi caos</p>
                <button className="inline-flex items-center gap-2 text-sm tracking-widest uppercase px-6 py-3 rounded-full border border-[hsl(var(--violet))]/50 text-[hsl(var(--ivory))] hover:bg-[hsl(var(--violet))]/10 transition-all duration-300">
                    <span>@maye.ju</span>
                </button>
            </motion.div>
        </section>
    );
};

export default Galeria;
