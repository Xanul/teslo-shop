# Teslo Shop

[English](#english) | [Español](#español)

---

## English

### 📋 Description

**Teslo Shop** is an e-commerce application built with modern web technologies to demonstrate proficiency in full-stack development. This project showcases skills in:

- **Next.js 15** (with Turbopack) - React framework for production
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **PostgreSQL** - Relational database (ready for integration)
- **Zustand** - State management
- **React 19** - Latest React features

This application includes features such as product catalog, shopping cart, checkout process, user authentication, and order management.

### 🚀 Getting Started - Development Mode

Follow these steps to run the application in development mode:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd teslo-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Change the name of env templato to `.env` in the root directory
   - Add your database connection and other required variables:
     ```env
     DATABASE_URL="your-postgres-connection-string"
     DATABASE_USER="your-postgres-user"
     DATABASE_PASSWORD="your-postgres-user-password"
     ```

4. **Get the database running**
   - Get the database using docker and the docker-compose file
   ```
   docker compose up -d
   ```

5. **Run the prisma migrations**
   ```npx prisma migrate dev```

6. **Run the seed**
```npm run seed```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The application will automatically reload when you make changes

### 📦 Production Build

To create and run a production-optimized build:

1. **Build the application**
   ```bash
   npm run build
   ```
   This command creates an optimized production build with Turbopack.

2. **Start the production server**
   ```bash
   npm start
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

### 🛠️ Additional Commands

- **Lint the code**: `npm run lint`

### 📚 Tech Stack

- **Framework**: Next.js 15.5.4
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS v4, PostCSS
- **State Management**: Zustand 5.0.8
- **Image Slider**: Swiper 12.0.2
- **Icons**: React Icons 5.5.0
- **Utilities**: clsx, tailwind-merge
- **Language**: TypeScript 5

---

## Español

### 📋 Descripción

**Teslo Shop** es una aplicación de comercio electrónico construida con tecnologías web modernas para demostrar competencias en desarrollo full-stack. Este proyecto muestra habilidades en:

- **Next.js 15** (con Turbopack) - Framework de React para producción
- **TypeScript** - Desarrollo con tipado seguro
- **Tailwind CSS v4** - Framework CSS utility-first
- **PostgreSQL** - Base de datos relacional (lista para integración)
- **Zustand** - Manejo de estado
- **React 19** - Últimas características de React

Esta aplicación incluye funcionalidades como catálogo de productos, carrito de compras, proceso de checkout, autenticación de usuarios y gestión de pedidos.

### 🚀 Comenzar - Modo Desarrollo

Sigue estos pasos para ejecutar la aplicación en modo desarrollo:

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd teslo-shop
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   - Crea un archivo `.env` en el directorio raíz
   - Agrega tu conexión a la base de datos y otras variables requeridas:
     ```env
     DATABASE_URL="tu-cadena-de-conexion-postgres"
     # Agrega otras variables de entorno según sea necesario
     ```

4. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir tu navegador**
   - Navega a [http://localhost:3000](http://localhost:3000)
   - La aplicación se recargará automáticamente cuando hagas cambios

### 📦 Compilación de Producción

Para crear y ejecutar una compilación optimizada para producción:

1. **Compilar la aplicación**
   ```bash
   npm run build
   ```
   Este comando crea una compilación optimizada para producción con Turbopack.

2. **Iniciar el servidor de producción**
   ```bash
   npm start
   ```
   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### 🛠️ Comandos Adicionales

- **Linter del código**: `npm run lint`

### 📚 Stack Tecnológico

- **Framework**: Next.js 15.5.4
- **Librería UI**: React 19.1.0
- **Estilos**: Tailwind CSS v4, PostCSS
- **Manejo de Estado**: Zustand 5.0.8
- **Slider de Imágenes**: Swiper 12.0.2
- **Iconos**: React Icons 5.5.0
- **Utilidades**: clsx, tailwind-merge
- **Lenguaje**: TypeScript 5

---

### 📄 License

This project is for educational and portfolio purposes.

---


