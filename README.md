# Aplicación Web Modular con MongoDB

Una aplicación web moderna construida con Next.js, React, Tailwind CSS y MongoDB, diseñada con una arquitectura completamente modular.

## 🚀 Características

- **Arquitectura modular**: Componentes, hooks y utilidades organizados por funcionalidad
- **Dos secciones principales**:
  - Sección de publicaciones con sistema de posts
  - Sección de cuadros de texto con búsqueda
- **Perfil de usuario**: Navegación simple entre vistas
- **Integración completa con MongoDB**: Lista para conectar tu base de datos
- **API REST**: Endpoints organizados para operaciones CRUD
- **Responsive Design**: Funciona en móvil, tablet y desktop

## 📦 Tecnologías

- **Frontend**: Next.js 13+, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de datos**: MongoDB con Mongoose
- **UI**: shadcn/ui, Lucide React
- **TypeScript**: Tipado completo en toda la aplicación

## 🛠️ Instalación

### 1. Clona el proyecto
```bash
git clone <tu-repositorio>
cd <nombre-proyecto>
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. Configura la base de datos

#### Para MongoDB local:
1. Instala MongoDB en tu sistema
2. Copia `.env.example` a `.env.local`
3. Actualiza la variable `MONGODB_URI`:
```env
MONGODB_URI=mongodb://localhost:27017/tu_base_de_datos
```

#### Para MongoDB Atlas (recomendado):
1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea un nuevo cluster
3. Obtén tu connection string
4. Actualiza `.env.local`:
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/tu_base_de_datos?retryWrites=true&w=majority
```

### 4. Ejecuta la aplicación
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del proyecto

```
├── app/
│   ├── api/                 # API Routes de Next.js
│   │   ├── posts/          # Endpoints para posts
│   │   └── textboxes/      # Endpoints para cuadros de texto
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout principal
│   └── page.tsx           # Página principal
├── components/
│   ├── ui/                 # Componentes base de shadcn/ui
│   ├── PostSection.tsx     # Sección de publicaciones
│   ├── TextBoxSection.tsx  # Sección de cuadros de texto
│   └── UserProfile.tsx     # Perfil de usuario
├── hooks/
│   ├── usePosts.ts         # Hook para gestión de posts
│   └── useTextBoxes.ts     # Hook para gestión de cuadros
├── lib/
│   ├── db/
│   │   └── connection.ts   # Conexión a MongoDB
│   └── utils.ts           # Utilidades generales
├── models/
│   ├── Post.ts            # Esquema de posts
│   ├── TextBox.ts         # Esquema de cuadros de texto
│   └── User.ts            # Esquema de usuarios
└── types/
    └── index.ts           # Tipos TypeScript
```

## 🗃️ Esquemas de base de datos

### Posts
```javascript
{
  title: String,        // Título del post
  content: String,      // Contenido del post
  createdAt: Date,     // Fecha de creación
  updatedAt: Date      // Fecha de actualización
}
```

### TextBoxes
```javascript
{
  content: String,      // Contenido del cuadro
  createdAt: Date,     // Fecha de creación
  updatedAt: Date      // Fecha de actualización
}
```

### Users
```javascript
{
  name: String,         // Nombre del usuario
  email: String,        // Email (único)
  age: Number,         // Edad
  location: String,    // Ubicación
  bio: String,         // Biografía
  createdAt: Date,     // Fecha de creación
  updatedAt: Date      // Fecha de actualización
}
```

## 🔧 Personalización

### Agregar nuevos campos a la base de datos:

1. **Modifica el modelo** en `/models/`
2. **Actualiza los tipos** en `/types/index.ts`
3. **Actualiza los componentes** según sea necesario
4. **Modifica las API routes** en `/app/api/`

### Ejemplo - Agregar campo "categoría" a los posts:

```javascript
// models/Post.ts
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true }, // Nuevo campo
}, { timestamps: true });
```

```typescript
// types/index.ts
export interface Post {
  _id?: string;
  title: string;
  content: string;
  category: string; // Nuevo campo
  createdAt?: Date;
  updatedAt?: Date;
}
```

## 🚀 Deployment

### Vercel (Recomendado):
1. Conecta tu repositorio a Vercel
2. Agrega las variables de entorno
3. Deploy automático

### Otras plataformas:
- Asegúrate de configurar las variables de entorno
- El proyecto usa `output: 'export'` para compatibilidad

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📝 Notas importantes

- **Modularidad**: Cada componente tiene una responsabilidad única
- **Escalabilidad**: Fácil agregar nuevas funcionalidades
- **Mantenibilidad**: Código limpio y bien organizado
- **Flexibilidad**: Configurable para diferentes casos de uso

¡Tu aplicación está lista para usar! Solo conecta tu base de datos MongoDB y comienza a desarrollar. 🎉# Internal_Functionality_BytesBandidos_demo
