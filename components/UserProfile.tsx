"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User } from '@/types';

interface UserProfileProps {
  onBack: () => void;
}

export default function UserProfile({ onBack }: UserProfileProps) {
  // Datos de ejemplo - aquí podrías cargar datos reales del usuario
  const userData: User = {
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    age: 28,
    location: "Ciudad de México",
    bio: "Desarrollador web con pasión por crear aplicaciones modernas y funcionales."
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header con botón de regresar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-gray-800">Perfil de Usuario</h2>
        <Button 
          variant="outline" 
          onClick={onBack}
          className="text-sm"
        >
          Volver
        </Button>
      </div>

      {/* Información del usuario */}
      <Card className="p-6 border border-gray-200">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500 block mb-1">
              Nombre
            </label>
            <p className="text-gray-800">{userData.name}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500 block mb-1">
              Email
            </label>
            <p className="text-gray-800">{userData.email}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500 block mb-1">
              Edad
            </label>
            <p className="text-gray-800">{userData.age} años</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500 block mb-1">
              Ubicación
            </label>
            <p className="text-gray-800">{userData.location}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500 block mb-1">
              Biografía
            </label>
            <p className="text-gray-600 text-sm leading-relaxed">{userData.bio}</p>
          </div>
        </div>
      </Card>

      {/* Espacio para futuras funcionalidades */}
      <div className="mt-6">
        <Button variant="outline" className="w-full" disabled>
          Editar Perfil (Próximamente)
        </Button>
      </div>
    </div>
  );
}