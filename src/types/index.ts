// Tipos para el blog Las letras de MaJu

export interface Post {
  id: string;
  titulo: string;
  fecha_publicacion: string;
  contenido: string;
  extracto: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  email: string;
  created_at?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface PostFormData {
  titulo: string;
  fecha_publicacion: string;
  contenido: string;
  extracto: string;
}
