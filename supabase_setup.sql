-- =============================================
-- Las Letras de MaJu — Setup SQL
-- Correr en SQL Editor del nuevo proyecto Supabase
-- =============================================

-- Tabla posts
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo text NOT NULL,
  fecha_publicacion text NOT NULL,
  contenido text NOT NULL,
  extracto text NOT NULL,
  url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- RLS (Row Level Security)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Lectura pública (blog visible sin login)
CREATE POLICY "Lectura pública de posts"
  ON public.posts FOR SELECT
  USING (true);

-- Solo usuarios autenticados pueden insertar/editar/borrar
CREATE POLICY "Solo admin puede insertar"
  ON public.posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Solo admin puede actualizar"
  ON public.posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Solo admin puede borrar"
  ON public.posts FOR DELETE
  TO authenticated
  USING (true);
