"use client";

import { useState } from 'react';
import { useTextBoxes } from '@/hooks/useTextBoxes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TextBox } from '@/types';

export default function TextBoxSection() {
  const { textBoxes, loading, createTextBox } = useTextBoxes();
  const [newText, setNewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTextBox, setSelectedTextBox] = useState<TextBox | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newText.trim()) return;
    
    setIsSubmitting(true);
    const result = await createTextBox({ content: newText.trim() });
    
    if (result.success) {
      setNewText('');
    }
    
    setIsSubmitting(false);
  };

  const filteredTextBoxes = textBoxes.filter(textBox =>
    textBox.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openTextBoxModal = (textBox: TextBox) => {
    setSelectedTextBox(textBox);
  };

  const closeModal = () => {
    setSelectedTextBox(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-800 mb-4">Cuadros de Texto</h2>
        
        {/* Formulario para agregar cuadro */}
        <form onSubmit={handleSubmit} className="space-y-3 mb-4">
          <Textarea
            placeholder="Escribe el contenido del cuadro"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            disabled={isSubmitting}
            className="min-h-[80px]"
          />
          <Button 
            type="submit" 
            disabled={!newText.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Agregando...' : 'Agregar Cuadro'}
          </Button>
        </form>

        {/* Buscador */}
        <Input
          placeholder="Buscar cuadros..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Lista de cuadros */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Cargando cuadros...</div>
        ) : filteredTextBoxes.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {searchTerm ? 'No se encontraron cuadros' : 'No hay cuadros aún'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredTextBoxes.map((textBox) => (
              <Card 
                key={textBox._id} 
                className="p-3 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => openTextBoxModal(textBox)}
              >
                <p className="text-sm text-gray-700 line-clamp-3">
                  {textBox.content.length > 100 
                    ? `${textBox.content.substring(0, 100)}...`
                    : textBox.content
                  }
                </p>
                <div className="text-xs text-gray-400 mt-2">
                  {textBox.createdAt && new Date(textBox.createdAt).toLocaleDateString()}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal para ver el contenido completo */}
      <Dialog open={!!selectedTextBox} onOpenChange={closeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contenido del Cuadro</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700 leading-relaxed">
              {selectedTextBox?.content}
            </p>
            <div className="text-xs text-gray-400 mt-4">
              Creado: {selectedTextBox?.createdAt && new Date(selectedTextBox.createdAt).toLocaleDateString()}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}