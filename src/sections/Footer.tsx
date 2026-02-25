import { motion } from 'framer-motion';
import { Lock, Instagram, Twitter, Heart, Mail, ExternalLink } from 'lucide-react';

interface FooterProps {
  onLoginClick: () => void;
}

const Footer = ({ onLoginClick }: FooterProps) => {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:contacto@lasletrasdemaju.com', label: 'Email' },
  ];

  return (
    <footer className="relative py-16 sm:py-20 overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-[hsl(220,15%,6%)]" />

      {/* Línea superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Logo/Nombre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl sm:text-3xl font-serif text-[hsl(var(--ivory))] mb-2">
              Las letras de <span className="text-gradient-gold">MaJu</span>
            </h3>
            <p className="text-[hsl(var(--ivory-dim))] text-sm italic">
              Donde las palabras encuentran su hogar
            </p>
          </motion.div>

          {/* Línea decorativa */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="decorative-line mb-8"
          />

          {/* Redes sociales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 mb-10"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="group relative w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 hover:bg-[hsl(var(--gold))]/20"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-[hsl(var(--ivory-dim))] group-hover:text-[hsl(var(--gold))] transition-colors duration-300" />
              </motion.a>
            ))}
          </motion.div>

          {/* Acceso Editorial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-10"
          >
            <motion.button
              onClick={onLoginClick}
              className="group flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-[hsl(var(--gold))]/10 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Lock className="w-4 h-4 text-[hsl(var(--gold))]" />
              <span className="text-[hsl(var(--ivory-dim))] text-sm group-hover:text-[hsl(var(--gold))] transition-colors duration-300">
                Acceso Editorial
              </span>
              <ExternalLink className="w-3 h-3 text-[hsl(var(--ivory-dim))] opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </motion.button>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-[hsl(var(--ivory-dim))]/60 text-sm flex items-center gap-1 justify-center">
              Hecho con <Heart className="w-3 h-3 text-[hsl(var(--terracotta))] fill-current" /> por MaJu &copy; {new Date().getFullYear()}
            </p>
            <p className="text-[hsl(var(--ivory-dim))]/40 text-xs mt-2">
              Todos los derechos reservados
            </p>
          </motion.div>
        </div>
      </div>

      {/* Elemento decorativo inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/10 to-transparent" />
    </footer>
  );
};

export default Footer;
