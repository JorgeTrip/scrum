# Especificación 03: Navegación del Lienzo, Tema Claro/Oscuro y Calidad

## 1. Alcance Funcional
Resolver las fricciones técnicas detectadas en `Swimlanes`, zoom, cámara del Modo Historia, filtrado de aristas, accesibilidad WCAG 2.1 AA, responsividad móvil, soporte de **Tema Claro/Oscuro** (oscuro por defecto) y carga correcta del historial de cambios.

---

## 2. Requerimientos Funcionales

### RF-08: Alineación Real de Swimlanes y Paneo Vertical Contextual
- Corregir `Swimlanes.tsx` para que las 3 franjas horizontales correspondan a las coordenadas reales de flujo de los carriles (alineadas con Roles `y = -53`, Eventos `y = 257` unificando `event-sprint-retrospective` a `y = 257`, y Artefactos `y = 626`), escalando proporcionalmente con el `zoom`.
- En `useArrastreLienzoHorizontal.ts`: mantener paneo bloqueado al eje horizontal cuando toda la altura de los carriles cabe en el viewport, y **habilitar paneo vertical** automáticamente cuando el `zoom` provoque que algún carril supere la altura visible.

### RF-09: Enfoque Automático de Cámara y Contraste en Modo Historia y Filtros
- En `FlowCanvas.tsx` / `useHistoriaScrum.ts`: al cambiar de capítulo o perspectiva en Modo Historia, enfocar suavemente (`fitView` con padding seguro considerando el área del panel) sobre `idsDestacados`, y atenuar nodos no focales a `opacity: 0.45` (en lugar de `0.85`).
- En `App.tsx`: atenuar las aristas en Modo Mapa cuando haya filtro de categoría o búsqueda activa (`opacity: 0.15` si ni `source` ni `target` coinciden con nodos activos).
- En `trayectoriaUtilidades.ts`: aprovechar los parámetros `offset` y `borderRadius` definidos en `datosAristas.ts` dentro del cálculo de ruta para evitar colisiones por defecto.

### RF-10: Accesibilidad (WCAG 2.1 AA), Responsive y Tema Claro/Oscuro
- **Tema Claro/Oscuro:** Agregar toggle en `TopBar` con modo oscuro por defecto (`#121214` / `#1C1C1E`), paleta Grises Pro en modo claro (`#F5F5F7` / `#FFFFFF`) cumpliendo contraste WCAG AA, y persistencia en `localStorage`.
- **Teclado y Responsive:** Soportar `tabIndex={0}` y `Enter`/`Space` en tarjetas de nodos, atajos `ArrowLeft`/`ArrowRight` en Modo Historia (cuando el foco no esté en un input), y adaptar `TopBar`, `PanelHistoria` y controles inferiores para pantallas móviles sin desbordamientos ni solapamientos críticos.
- **Historial y Versión:** Cambiar el `fetch` de `useHistorialCambios.ts` a `./historial-cambios.json` (usando `import.meta.env.BASE_URL`) y unificar versión en `package.json` y `src/version.ts`.

---

## 3. Criterios de Aceptación (Gherkin)

```gherkin
Escenario: Bandas de Swimlanes acompañan el zoom y permiten explorar carriles (Happy Path)
  Dado que el usuario acerca el zoom al 150% en el lienzo
  Cuando observa los nodos de Roles y Artefactos
  Entonces cada nodo permanece dentro de la banda de color de su carril correspondiente
  Y el usuario puede arrastrar verticalmente para inspeccionar el carril inferior sin que quede bloqueado

Escenario: Atenuación coherente de aristas al filtrar por búsqueda o categoría (Happy Path)
  Dado que el usuario está en "Mapa Libre" y escribe "Daily" en el buscador
  Cuando se aplican los filtros visuales
  Entonces solo los nodos coincidentes y sus aristas conectadas permanecen con opacidad completa
  Y las aristas desconectadas se atenúan para despejar la lectura

Escenario: Cambio de tema Claro/Oscuro con persistencia (Happy Path)
  Dado que la aplicación inicia en modo oscuro por defecto
  Cuando el usuario activa el interruptor a modo claro y recarga la página
  Entonces la interfaz mantiene el tema claro con paleta Grises Pro (#F5F5F7) y contraste legible

Escenario: Carga resiliente del changelog en subrutas de despliegue (Failure Mode)
  Dado que la aplicación se sirve bajo una subruta (como /scrum/ en GitHub Pages)
  Cuando el usuario abre el "Historial de cambios"
  Entonces la petición resuelve la ruta relativa a BASE_URL sin fallar con 404
  Y si la red no responde, presenta el fallback compilado sin bloquear la interfaz
```
