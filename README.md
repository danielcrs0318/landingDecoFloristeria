# Deco Fiesta — landing

Landing responsive para **Deco Fiesta Floristería**, basada en la información pública del perfil [@deco_fiesta2023](https://www.instagram.com/deco_fiesta2023/): Taulabé, Comayagua; WhatsApp **+504 8800-6800**; arreglos con rosas y dulces, bouquets y guirnaldas de globos, desayunos sorpresa y arreglos fúnebres.

## Desarrollo

```bash
npm install
npm run dev
```

Para verificar la versión de producción: `npm run build`.

## Contenido y contacto

- La landing usa React, Vite, CSS y React Icons.
- Los enlaces de consulta abren **WhatsApp directamente** con un mensaje preparado. El número se administra en `src/utils/whatsapp.js`.
- Las imágenes de `public/images/instagram/` proceden de publicaciones públicas de [@deco_fiesta2023](https://www.instagram.com/deco_fiesta2023/), incluida la foto de perfil. Las fotos de productos enlazan a sus publicaciones originales.
- El diseño visual está guiado por [Modern Flower Landing page Website Design](https://www.figma.com/design/qCx9PPcaxyVY3Xosxs60Ix/Modern-Flower-Landing-page-Website-Design--Community-?node-id=0-1&p=f), adaptado a la marca y al contenido real de Deco Fiesta.
- No se muestran precios, horarios, testimonios ni una dirección exacta porque no estaban verificados en el perfil consultado.

Actualiza los textos de `src/App.jsx` si cambia la oferta del negocio. El estilo responsive está en `src/App.css`.
