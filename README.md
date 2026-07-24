# Deco Floristería — Landing page

Landing page moderna y responsive para **Deco Floristería**, un negocio de arreglos florales en Tegucigalpa, Honduras. El sitio presenta servicios, galería, catálogo, testimonios y un formulario de contacto, con un **chat tipo WhatsApp** integrado para atender pedidos sin salir de la página.

---

## ¿Qué incluye?

- **Hero** a pantalla completa con llamada a la acción
- **Servicios** organizados por tipo de pedido (ramos, eventos, piñatas, cajas, etc.)
- **Galería** de diseños florales
- **Catálogo** con precios de referencia y pedido rápido
- **Proceso** en 4 pasos (elegir → personalizar → confirmar → entregar)
- **Testimonios** de clientes
- **Preguntas frecuentes**
- **Contacto** con formulario, horario, ubicación y mapa
- **Chat de WhatsApp en la web**: se abre al pulsar el botón verde y se ve como el chat del teléfono (sin redirigir de inmediato). Opcionalmente se puede continuar en la app de WhatsApp
- Diseño **responsive** (móvil, tablet y escritorio)
- Animaciones suaves con Framer Motion

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| [React 19](https://react.dev/) | Interfaz de usuario |
| [Vite](https://vite.dev/) | Desarrollo y build |
| [Material UI](https://mui.com/) | Componentes y tema visual |
| [Framer Motion](https://www.framer.com/motion/) | Animaciones |
| [React Hook Form](https://react-hook-form.com/) | Validación del formulario de contacto |
| [React Icons](https://react-icons.github.io/react-icons/) | Iconos |

Tipografías: **Playfair Display** (títulos) y **DM Sans** (texto).

---

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (incluido con Node.js)

---

## Cómo empezar

1. Clona o abre el proyecto e instala dependencias:

```bash
npm install
```

2. Arranca el servidor de desarrollo:

```bash
npm run dev
```

3. Abre en el navegador la URL que muestre la terminal (por lo general `http://localhost:5173`).

### Otros comandos

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera la versión de producción en la carpeta `dist/` |
| `npm run preview` | Previsualiza el build de producción en local |
| `npm run lint` | Revisa el código con ESLint |

---

## Estructura del proyecto

```
landingDecoFloristeria/
├── public/                 # Archivos estáticos (robots.txt, etc.)
├── src/
│   ├── components/         # Secciones y UI (Hero, Galería, Chat, etc.)
│   ├── context/            # Contexto del chat de WhatsApp
│   ├── data/               # Imágenes y datos compartidos
│   ├── theme/              # Tema de Material UI (colores y tipografía)
│   ├── utils/              # Utilidades (número y enlaces de WhatsApp)
│   ├── App.jsx             # Composición de la landing
│   └── main.jsx            # Punto de entrada
├── index.html
├── package.json
└── vite.config.ts
```

---

## Configuración importante

### Número de WhatsApp

Antes de publicar, edita el archivo `src/utils/whatsapp.js` y sustituye el número de ejemplo por el real:

```js
export const WHATSAPP_NUMBER = '50499990000';   // solo dígitos, con código de país
export const DISPLAY_WHATSAPP = '+504 9999-0000'; // cómo se muestra en la web
```

Todos los botones y el chat usan estos valores de forma centralizada.

### Contenido e imágenes

- Textos, precios y productos: componentes en `src/components/` (por ejemplo `CatalogoSection.jsx`).
- URLs de imágenes: `src/data/images.js`.

### Colores y tipografía

El tema visual está en `src/theme/theme.js` (paleta rosa suave, verde secundario y fondos crema).

---

## Chat de WhatsApp

El botón flotante verde abre un **panel de chat dentro del sitio**, similar a WhatsApp en el móvil:

1. El visitante escribe o usa respuestas rápidas.
2. Recibe mensajes de bienvenida y respuestas automáticas básicas.
3. Si lo desea, puede pulsar **“Continuar en la app de WhatsApp”** para enviar la conversación al número real.

Hero, catálogo, servicios, contacto y footer también abren este mismo chat (con el mensaje ya preparado cuando corresponde).

---

## Despliegue

1. Genera el build:

```bash
npm run build
```

2. Sube el contenido de la carpeta `dist/` a tu hosting (Netlify, Vercel, GitHub Pages, hosting compartido, etc.).

Ejemplos rápidos:

- **Netlify / Vercel**: conecta el repositorio; el comando de build es `npm run build` y la carpeta de salida es `dist`.
- **Vista previa local del build**: `npm run preview`.

---

## Licencia

Proyecto privado para Deco Floristería. Todos los derechos reservados.
