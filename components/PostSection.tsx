"use client";

import { useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface PostSectionProps {
  onToggleProfile: () => void;
}

export default function PostSection({ onToggleProfile }: PostSectionProps) {
  const { posts, loading, createPost } = usePosts();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;
    
    setIsSubmitting(true);
    const result = await createPost({ title: title.trim(), content: content.trim() });
    
    if (result.success) {
      setTitle('');
      setContent('');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header con botón de perfil */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-gray-800">Publicaciones</h2>
        <Button 
          variant="outline" 
          onClick={onToggleProfile}
          className="text-sm"
        >
          Perfil
        </Button>
      </div>

      {/* Formulario para crear post */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <Input
          placeholder="Título del post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />
        <Textarea
          placeholder="Contenido del post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
          className="min-h-[100px]"
        />
        <Button 
          type="submit" 
          disabled={!title.trim() || !content.trim() || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Publicando...' : 'Publicar'}
        </Button>
      </form>

      {/* Lista de posts */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Cargando posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No hay posts aún</div>
        ) : (
          posts.map((post) => (
            <Card key={post._id} className="p-4 border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{post.content}</p>
              <div className="text-xs text-gray-400 mt-3">
                {post.createdAt && new Date(post.createdAt).toLocaleDateString()}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}