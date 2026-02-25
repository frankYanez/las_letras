import { useState, useEffect, useCallback } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '@/lib/supabase';
import type { Post, PostFormData } from '@/types';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError('Error al cargar las publicaciones');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const addPost = useCallback(async (postData: PostFormData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newPost = await createPost(postData);
      if (newPost) {
        setPosts(prev => [newPost, ...prev]);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error creating post:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const editPost = useCallback(async (id: string, postData: Partial<PostFormData>): Promise<boolean> => {
    setIsLoading(true);
    try {
      const updatedPost = await updatePost(id, postData);
      if (updatedPost) {
        setPosts(prev => prev.map(post => post.id === id ? updatedPost : post));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating post:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removePost = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const success = await deletePost(id);
      if (success) {
        setPosts(prev => prev.filter(post => post.id !== id));
      }
      return success;
    } catch (err) {
      console.error('Error deleting post:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
    addPost,
    editPost,
    removePost,
  };
};
