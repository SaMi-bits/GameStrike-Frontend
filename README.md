# 🎮 GameStrike

Una aplicación web moderna para gestionar tu colección de videojuegos con un diseño retro-pop inspirado en la estética Y2K japonesa.

## ✨ Características

- 📝 **Gestión de juegos**: Agrega, edita y elimina juegos de tu colección
- ⭐ **Sistema de calificación**: Califica tus juegos con un sistema de estrellas
- 💬 **Reseñas**: Escribe y lee reseñas de juegos
- 🎨 **Diseño retro-pop**: Interfaz moderna con efectos visuales inspirados en la cultura pop japonesa
- 📱 **Responsive**: Diseño adaptable a dispositivos móviles y desktop

## 🚀 Tecnologías

- **Frontend**: React 18 + Vite
- **Routing**: React Router DOM
- **Estilos**: CSS3 con animaciones y efectos glassmorphism
- **Backend**: Node.js + Express (separado)
- **Base de datos**: MongoDB

## 📦 Instalación

### Requisitos previos

- Node.js 16 o superior
- npm o yarn
- MongoDB (local o en la nube)

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/gamestrike.git
cd gamestrike
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:

```env
VITE_API_URL=http://localhost:4000
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Estructura del proyecto

```
gamestrike/
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── AddGameModal.jsx
│   │   ├── EditModal.jsx
│   │   ├── GameCard.jsx
│   │   ├── GameModal.jsx
│   │   ├── RatingModal.jsx
│   │   ├── ReviewCard.jsx
│   │   ├── StarRating.jsx
│   │   ├── Toast.jsx
│   │   ├── Spinner.jsx
│   │   ├── stars.css
│   │   ├── spinner.css
│   │   └── modal.css
│   ├── config/            # Configuraciones
│   │   └── api.js
│   ├── pages/             # Páginas principales
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Reviews.jsx
│   │   └── GameDetail.jsx
│   ├── App.jsx            # Componente raíz
│   ├── main.jsx           # Punto de entrada
│   └── styles.css         # Estilos globales
├── public/                # Archivos estáticos
│   ├── images/           # Imágenes de juegos
│   └── icons/            # Iconos
├── .env.example          # Ejemplo de variables de entorno
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Componentes principales

### GameCard
Tarjeta de juego con información básica y acciones rápidas.

### StarRating
Componente de calificación con estrellas interactivas.

```jsx
<StarRating rating={4} onRate={(newRating) => console.log(newRating)} />
```

### Toast
Sistema de notificaciones temporales.

```jsx
<Toast items={toasts} onRemove={removeToast} />
```

### Spinner
Indicador de carga reutilizable.

```jsx
<Spinner message="Cargando juegos..." size="medium" />
```

## 🔧 API

### Endpoints principales

```javascript
// Obtener todos los juegos
GET /games

// Obtener un juego específico
GET /games/:id

// Crear un nuevo juego
POST /games

// Actualizar un juego
PUT /games/:id

// Eliminar un juego
DELETE /games/:id

// Obtener reseñas de un juego
GET /reviews/game/:gameId

// Crear una reseña
POST /reviews/:gameId
```

## 🎯 Scripts disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Lint
npm run lint
```

## 🌈 Personalización de estilos

Los estilos principales están en `src/styles.css`. Puedes personalizar:

- **Colores principales**: Busca las variables en gradientes
- **Animaciones**: Modifica los `@keyframes`
- **Efectos glassmorphism**: Ajusta `backdrop-filter` y `background`

## 📝 Guía de commits

```bash
# Correcciones de bugs
git commit -m "fix: descripción del bug corregido"

# Nuevas características
git commit -m "feat: descripción de la nueva característica"

# Refactorización
git commit -m "refactor: descripción de la refactorización"

# Estilos
git commit -m "style: descripción del cambio de estilo"

# Documentación
git commit -m "docs: descripción del cambio en documentación"

# Tareas generales
git commit -m "chore: descripción de la tarea"
```

## 🐛 Problemas conocidos

- [ ] Mejorar carga de imágenes grandes
- [ ] Agregar paginación para listas extensas
- [ ] Implementar búsqueda y filtros avanzados

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 👥 Autor

Tu Nombre - [@tu_twitter](https://twitter.com/tu_twitter)

## 🙏 Agradecimientos

- Diseño inspirado en la estética Y2K japonesa
- Iconos de [Lucide Icons](https://lucide.dev/)
- Fuentes de [Google Fonts](https://fonts.google.com/)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!