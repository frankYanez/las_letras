import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import Hero from '@/sections/Hero';
import Biografia from '@/sections/Biografia';
import Publicaciones from '@/sections/Publicaciones';
import Frases from '@/sections/Frases';
import Galeria from '@/sections/Galeria';
import Footer from '@/sections/Footer';
import LoginModal from '@/components/LoginModal';
import CustomCursor from '@/components/CustomCursor';
import AdminDashboard from '@/pages/AdminDashboard';
import PostDetail from '@/pages/PostDetail';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import { Loader2 } from 'lucide-react';
import './App.css';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { isLoading: isAuthLoading, isAuthenticated, signIn, signOut } = useAuth();
  const { posts, isLoading: isPostsLoading, addPost, editPost, removePost } = usePosts();

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const { error } = await signIn({ email, password });

    if (error) {
      throw error;
    } else {
      setIsLoginModalOpen(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  // Mostrar pantalla de carga inicial
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[hsl(var(--gold))] animate-spin mx-auto mb-4" />
          <p className="text-[hsl(var(--ivory-dim))] text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si está autenticada, mostrar el dashboard
  if (isAuthenticated) {
    return (
      <AdminDashboard
        posts={posts}
        isLoading={isPostsLoading}
        onLogout={handleLogout}
        onCreatePost={addPost}
        onUpdatePost={editPost}
        onDeletePost={removePost}
      />
    );
  }

  // Landing page / main app layout
  return (
    <div className="min-h-screen scrollbar-elegant">
      <CustomCursor />
      {/* Noise texture overlay */}
      <div aria-hidden style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
        opacity: 0.038,
      }} />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Biografia />
              <Publicaciones />
              <Frases />
              <Galeria />
              <Footer onLoginClick={() => setIsLoginModalOpen(true)} />
            </main>
          } />
          <Route path="/escrito/:id" element={<PostDetail />} />
        </Routes>
      </AnimatePresence>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        isLoading={isAuthLoading}
      />

      <Toaster
        theme="light"
        position="top-center"
        richColors
        toastOptions={{
          style: {
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(155,35,85,0.2)',
            color: 'hsl(var(--ivory))'
          }
        }}
      />
    </div>
  );
}

export default App;
