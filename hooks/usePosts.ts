"use client";

import { useState, useEffect } from 'react';
import { Post, ApiResponse } from '@/types';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts');
      const data: ApiResponse<Post[]> = await response.json();
      
      if (data.success && data.data) {
        setPosts(data.data);
      } else {
        setError(data.error || 'Error al cargar posts');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: Omit<Post, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      const data: ApiResponse<Post> = await response.json();
      
      if (data.success && data.data) {
        setPosts(prev => [data.data!, ...prev]);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Error al crear post' };
      }
    } catch (err) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, createPost, refetch: fetchPosts };
};