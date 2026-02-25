# Las letras de MaJu 📝✨

Un blog literario personal con diseño editorial elegante, modo oscuro sofisticado y panel de administración completo.

![Versión](https://img.shields.io/badge/versión-1.0.0-8B7355)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)

## 🎨 Características

### Diseño UI/UX
- **Estilo Editorial**: Minimalista, elegante y emotivo
- **Modo Oscuro Sofisticado**: Fondos en tonos grafito con texto en blanco hueso
- **Color de Acento Dorado**: `#C9A66B` para botones y estados hover
- **Tipografía Elegante**: Playfair Display (serif) para títulos, Inter (sans-serif) para cuerpo
- **Animaciones Fluidas**: Framer Motion para transiciones suaves
- **Efecto Glassmorphism**: Tarjetas con fondo translúcido y blur

### Funcionalidades
- **Landing Page** con Hero animado, biografía y grid de publicaciones
- **Sistema de Autenticación** con Supabase Auth
- **Panel de Administración (CRM)** para gestionar publicaciones
- **CRUD Completo**: Crear, leer, actualizar y eliminar posts
- **Diseño 100% Responsive**

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite
- **Estilos**: Tailwind CSS 3.4 + shadcn/ui
- **Animaciones**: Framer Motion
- **Backend/Auth**: Supabase
- **Iconos**: Lucide React

## 🚀 Configuración de Supabase

### 1. Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Copia la **URL** y la **Anon Key** del proyecto

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=tu-url-de-supabase
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

O edita el archivo `src/lib/supabase.ts` y reemplaza los valores:

```typescript
const supabaseUrl = 'https://tu-proyecto.supabase.co';
const supabaseAnonKey = 'tu-anon-key';
```

### 3. Crear Tabla de Posts

En el SQL Editor de Supabase, ejecuta:

```sql
-- Crear tabla de posts
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  fecha_publicacion DATE NOT NULL,
  contenido TEXT NOT NULL,
  extracto TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública
CREATE POLICY "Posts visibles para todos" ON posts
  FOR SELECT USING (true);

-- Política para escritura solo autenticados
CREATE POLICY "Posts editables solo por autenticados" ON posts
  FOR ALL USING (auth.role() = 'authenticated');
```

### 4. Crear Usuario Administrador

1. Ve a Authentication > Users en Supabase
2. Click en "Add user"
3. Crea un usuario con email y contraseña
4. Este será el usuario para acceder al panel administrativo

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes shadcn/ui
│   └── LoginModal.tsx  # Modal de inicio de sesión
├── hooks/              # Custom hooks
│   ├── useAuth.ts      # Hook de autenticación
│   └── usePosts.ts     # Hook de gestión de posts
├── lib/                # Utilidades y configuración
│   └── supabase.ts     # Cliente de Supabase
├── pages/              # Páginas de la aplicación
│   └── AdminDashboard.tsx # Panel de administración
├── sections/           # Secciones de la landing page
│   ├── Hero.tsx        # Sección principal
│   ├── Biografia.tsx   # Sección sobre la autora
│   ├── Publicaciones.tsx # Grid de publicaciones
│   └── Footer.tsx      # Pie de página
├── types/              # Tipos de TypeScript
│   └── index.ts
├── App.tsx             # Componente principal
├── App.css             # Estilos específicos
└── index.css           # Estilos globales y tema
```

## 🎯 Secciones de la Landing Page

### Hero Section
- Título grande y elegante: "Las letras de MaJu"
- Animación de entrada suave (fade-in y slide-up)
- Elementos decorativos flotantes (pluma, libro, corazón)
- Botón de scroll hacia la biografía

### Sección de Biografía
- Presentación de Maye (MaJu)
- Frase emblemática: "soy un libro abierto"
- Descripción de la autora con iconos temáticos
- Tarjeta glassmorphism con información detallada

### Sección de Publicaciones
- Grid responsive (1/2/3 columnas según breakpoint)
- Cards con efecto glassmorphism
- Hover: elevación + borde iluminado
- Datos de prueba basados en escritos reales:
  - "La Panelita 💛"
  - "Caos, el arte de arder sin quemarme"
  - "Nunca recibí rosas"

### Footer
- Logo y nombre del blog
- Enlaces a redes sociales
- Botón de "Acceso Editorial" para login
- Copyright con ❤️

## 🔐 Panel de Administración

### Funcionalidades
- **Tabla de publicaciones** con búsqueda
- **Crear nueva publicación** con formulario completo
- **Editar publicación** existente
- **Eliminar publicación** con confirmación
- **Estadísticas** rápidas (total de posts, última publicación)

### Campos de Post
- `titulo`: Título de la publicación
- `fecha_publicacion`: Fecha de publicación
- `extracto`: Resumen corto (para las cards)
- `contenido`: Contenido completo del post

## 🎨 Sistema de Colores

```css
/* Colores principales */
--gold: #C9A66B;           /* Acento dorado */
--gold-light: #D4B87A;     /* Dorado claro */
--graphite: #111318;       /* Fondo principal */
--graphite-light: #1A1D24; /* Fondo secundario */
--ivory: #F0EBE3;          /* Texto principal */
--ivory-dim: #B8B2A7;      /* Texto secundario */
--terracotta: #B85C4F;     /* Acento terracota */
--violet: #7B6B8D;         /* Acento violeta */
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 columna)
- **Tablet**: 640px - 1024px (2 columnas)
- **Desktop**: > 1024px (3 columnas)

## 🚀 Comandos

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📝 Notas de Desarrollo

- El tema oscuro está forzado en la aplicación
- Las animaciones respetan `prefers-reduced-motion`
- Los datos de prueba se muestran mientras no haya conexión con Supabase
- El panel de administración solo es accesible para usuarios autenticados

## 🔒 Seguridad

- Row Level Security (RLS) habilitado en Supabase
- Políticas de acceso definidas para lectura pública y escritura autenticada
- Validación de formularios en el cliente
- Sanitización de inputs

---

Hecho con 💛 por MaJu
