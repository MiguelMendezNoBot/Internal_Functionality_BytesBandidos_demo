"use client";

import { useState } from 'react';
import PostSection from '@/components/PostSection';
import UserProfile from '@/components/UserProfile';
import TextBoxSection from '@/components/TextBoxSection';

export default function Home() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header principal */}
        <header className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Mi Aplicación Web
          </h1>
          <p className="text-gray-600 mt-2">
            Gestiona tus publicaciones y cuadros de texto
          </p>
        </header>

        {/* Layout de dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Columna 1: Posts o Perfil */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {showProfile ? (
              <UserProfile onBack={() => setShowProfile(false)} />
            ) : (
              <PostSection onToggleProfile={() => setShowProfile(true)} />
            )}
          </div>

          {/* Columna 2: Cuadros de texto */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <TextBoxSection />
          </div>
        </div>
      </div>
    </div>
  );
}