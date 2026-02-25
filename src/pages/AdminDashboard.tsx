import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  BookOpen,
  Calendar,
  Search,
  AlertCircle,
  X,
  Loader2,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Post, PostFormData } from '@/types';

interface AdminDashboardProps {
  posts: Post[];
  isLoading: boolean;
  onLogout: () => void;
  onCreatePost: (post: PostFormData) => Promise<boolean>;
  onUpdatePost: (id: string, post: Partial<PostFormData>) => Promise<boolean>;
  onDeletePost: (id: string) => Promise<boolean>;
}

const AdminDashboard = ({
  posts,
  isLoading,
  onLogout,
  onCreatePost,
  onUpdatePost,
  onDeletePost
}: AdminDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState<PostFormData>({
    titulo: '',
    fecha_publicacion: new Date().toISOString().split('T')[0],
    contenido: '',
    extracto: '',
  });

  const filteredPosts = posts.filter(post =>
    post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.extracto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (post?: Post) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        titulo: post.titulo,
        fecha_publicacion: post.fecha_publicacion,
        contenido: post.contenido,
        extracto: post.extracto,
      });
    } else {
      setEditingPost(null);
      setFormData({
        titulo: '',
        fecha_publicacion: new Date().toISOString().split('T')[0],
        contenido: '',
        extracto: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
    setFormData({
      titulo: '',
      fecha_publicacion: new Date().toISOString().split('T')[0],
      contenido: '',
      extracto: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let success;
      if (editingPost) {
        success = await onUpdatePost(editingPost.id, formData);
        if (success) {
          toast.success('Escrito modificado exitosamente');
        }
      } else {
        success = await onCreatePost(formData);
        if (success) {
          toast.success('¡Nuevo escrito publicado con éxito!');
        }
      }

      if (success) {
        handleCloseModal();
      } else {
        toast.error('Ocurrió un error. Por favor inténtalo de nuevo.');
      }
    } catch (error) {
      toast.error('Ocurrió un error inesperado de comunicación.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const success = await onDeletePost(id);
    if (success) {
      toast.success('El escrito ha sido eliminado permanentemente.');
      setDeleteConfirm(null);
    } else {
      toast.error('No se pudo eliminar el escrito.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="flex items-center gap-2 text-[hsl(var(--ivory-dim))] hover:text-[hsl(var(--gold))] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Volver al sitio</span>
              </a>
              <div className="h-6 w-px bg-white/10" />
              <h1 className="text-xl font-serif text-[hsl(var(--ivory))]">
                Panel <span className="text-gradient-gold">Editorial</span>
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[hsl(var(--ivory-dim))] text-sm hidden sm:block">
                Bienvenida, <span className="text-[hsl(var(--gold))]">MaJu</span>
              </span>
              <Button
                onClick={onLogout}
                variant="ghost"
                className="text-[hsl(var(--ivory-dim))] hover:text-[hsl(var(--ivory))] hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--gold))]/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[hsl(var(--gold))]" />
              </div>
              <div>
                <p className="text-[hsl(var(--ivory-dim))] text-sm">Total Publicaciones</p>
                <p className="text-2xl font-serif text-[hsl(var(--ivory))]">{posts.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--violet))]/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[hsl(var(--violet))]" />
              </div>
              <div>
                <p className="text-[hsl(var(--ivory-dim))] text-sm">Última Publicación</p>
                <p className="text-lg font-serif text-[hsl(var(--ivory))]">
                  {posts[0] ? formatDate(posts[0].fecha_publicacion) : '—'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-6 flex items-center justify-center"
          >
            <Button
              onClick={() => handleOpenModal()}
              className="w-full h-12 bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold-light))] text-[hsl(var(--graphite))] font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nueva Publicación
            </Button>
          </motion.div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--ivory-dim))]" />
            <Input
              type="text"
              placeholder="Buscar publicaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-white/5 border-white/10 text-[hsl(var(--ivory))] placeholder:text-[hsl(var(--ivory-dim))]/50 focus:border-[hsl(var(--gold))] rounded-xl"
            />
          </div>
        </div>

        {/* Posts Table */}
        <div className="glass rounded-2xl overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[hsl(var(--gold))] animate-spin" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-[hsl(var(--ivory-dim))]/30 mx-auto mb-4" />
              <p className="text-[hsl(var(--ivory-dim))]">
                {searchTerm ? 'No se encontraron publicaciones' : 'Aún no hay publicaciones'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-4 text-[hsl(var(--ivory-dim))] text-sm font-medium">Título</th>
                    <th className="text-left px-6 py-4 text-[hsl(var(--ivory-dim))] text-sm font-medium">Fecha</th>
                    <th className="text-left px-6 py-4 text-[hsl(var(--ivory-dim))] text-sm font-medium">Extracto</th>
                    <th className="text-right px-6 py-4 text-[hsl(var(--ivory-dim))] text-sm font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post, index) => (
                    <motion.tr
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="text-[hsl(var(--ivory))] font-medium">{post.titulo}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[hsl(var(--ivory-dim))] text-sm">{formatDate(post.fecha_publicacion)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[hsl(var(--ivory-dim))] text-sm line-clamp-1 max-w-xs">
                          {post.extracto}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            onClick={() => handleOpenModal(post)}
                            variant="ghost"
                            size="sm"
                            className="text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => setDeleteConfirm(post.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={handleCloseModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-[hsl(var(--ivory-dim))] hover:text-[hsl(var(--ivory))] hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-serif text-[hsl(var(--ivory))] mb-6">
                  {editingPost ? 'Editar Publicación' : 'Nueva Publicación'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="titulo" className="text-[hsl(var(--ivory))]">Título</Label>
                    <Input
                      id="titulo"
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      placeholder="Título de la publicación"
                      required
                      className="bg-white/5 border-white/10 text-[hsl(var(--ivory))] focus:border-[hsl(var(--gold))] rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fecha" className="text-[hsl(var(--ivory))]">Fecha de Publicación</Label>
                    <Input
                      id="fecha"
                      type="date"
                      value={formData.fecha_publicacion}
                      onChange={(e) => setFormData({ ...formData, fecha_publicacion: e.target.value })}
                      required
                      className="bg-white/5 border-white/10 text-[hsl(var(--ivory))] focus:border-[hsl(var(--gold))] rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="extracto" className="text-[hsl(var(--ivory))]">Extracto</Label>
                    <Textarea
                      id="extracto"
                      value={formData.extracto}
                      onChange={(e) => setFormData({ ...formData, extracto: e.target.value })}
                      placeholder="Breve extracto que aparecerá en la tarjeta..."
                      required
                      rows={3}
                      className="bg-white/5 border-white/10 text-[hsl(var(--ivory))] focus:border-[hsl(var(--gold))] rounded-xl resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contenido" className="text-[hsl(var(--ivory))]">Contenido</Label>
                    <Textarea
                      id="contenido"
                      value={formData.contenido}
                      onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
                      placeholder="Contenido completo de la publicación..."
                      required
                      rows={10}
                      className="bg-white/5 border-white/10 text-[hsl(var(--ivory))] focus:border-[hsl(var(--gold))] rounded-xl resize-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      onClick={handleCloseModal}
                      variant="outline"
                      className="flex-1 border-white/20 text-[hsl(var(--ivory))] hover:bg-white/10"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold-light))] text-[hsl(var(--graphite))]"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : editingPost ? (
                        'Guardar Cambios'
                      ) : (
                        'Crear Publicación'
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={() => setDeleteConfirm(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="glass-strong rounded-2xl p-8 max-w-md w-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-xl font-serif text-[hsl(var(--ivory))]">¿Eliminar publicación?</h3>
                </div>
                <p className="text-[hsl(var(--ivory-dim))] mb-6">
                  Esta acción no se puede deshacer. ¿Estás segura de que deseas eliminar esta publicación?
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setDeleteConfirm(null)}
                    variant="outline"
                    className="flex-1 border-white/20 text-[hsl(var(--ivory))] hover:bg-white/10"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
