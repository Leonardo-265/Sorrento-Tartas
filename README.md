# Sorrento Tartas — Tienda pública

Tienda web pública donde los clientes eligen sus tartas y confirman el pedido sin llamar por teléfono.

## Estructura

```
sorrento-tartas/
├── index.html    → Estructura de la página (HTML)
├── style.css     → Todos los estilos visuales
├── config.js     → Credenciales y datos editables
└── app.js        → Toda la lógica de la aplicación
```

## Cómo editar la configuración

Abrí **`config.js`** para cambiar:

- `SUPA_URL` / `SUPA_KEY` → deben ser las mismas credenciales que usa el panel interno (misma base de datos, así los pedidos de la tienda aparecen en el Historial).
- `NUMERO_LOCAL` → número de WhatsApp del local, formato `549` + código de área + número, sin espacios ni guiones.
- `ALIAS_TRANSFERENCIA` / `TITULAR_TRANSFERENCIA` → datos bancarios que se muestran cuando el cliente elige pagar por Transferencia.

No hace falta tocar `app.js` para estos cambios.

## Cómo funciona

1. El catálogo de tartas se carga en vivo desde la tabla `productos` de Supabase (categoría "Tartas", subcategorías Tarta Grande / Media Tarta / Tartelleta). Si falla la conexión, usa una copia de respaldo embebida en `app.js` (`PRODUCTOS_FALLBACK`).
2. El cliente arma su carrito, completa sus datos y confirma.
3. El pedido se guarda directo en la tabla `pedidos` de Supabase, marcado con `TIENDA WEB` en observaciones.
4. Se abre automáticamente WhatsApp con el detalle completo del pedido para avisar al local.

## Cómo correrlo localmente

Sitio 100% estático, sin build ni dependencias.

- **Rápido:** abrí `index.html` con doble clic.
- **Recomendado:** extensión "Live Server" en VS Code/Cursor.

## Cómo publicarlo

Arrastrá la carpeta completa a [Netlify Drop](https://app.netlify.com/drop), o conectá el repo desde GitHub. `index.html` debe quedar en la raíz del sitio publicado.
