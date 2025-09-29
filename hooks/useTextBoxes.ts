"use client";

import { useState, useEffect } from 'react';
import { TextBox, ApiResponse } from '@/types';

export const useTextBoxes = () => {
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTextBoxes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/textboxes');
      const data: ApiResponse<TextBox[]> = await response.json();
      
      if (data.success && data.data) {
        setTextBoxes(data.data);
      } else {
        setError(data.error || 'Error al cargar cuadros de texto');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const createTextBox = async (textBoxData: Omit<TextBox, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/textboxes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(textBoxData),
      });
      
      const data: ApiResponse<TextBox> = await response.json();
      
      if (data.success && data.data) {
        setTextBoxes(prev => [data.data!, ...prev]);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Error al crear cuadro de texto' };
      }
    } catch (err) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  useEffect(() => {
    fetchTextBoxes();
  }, []);

  return { textBoxes, loading, error, createTextBox, refetch: fetchTextBoxes };
};