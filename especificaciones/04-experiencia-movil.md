# Especificación 04: Experiencia Mobile-First y Ergonomía Táctil

## 1. Alcance Funcional
Rediseñar la experiencia móvil (`< 768px` y pantallas táctiles/landscape de baja altura) de **Flujo Metodológico Scrum** para resolver los desbordes de fichas fuera de pantalla, solapamientos entre paneles flotantes, filtros ocultos, objetivos táctiles reducidos y bloqueos al arrastrar sobre aristas detectados en la auditoría con Playwright.

---

## 2. Requerimientos Funcionales

### RF-11: Bottom Sheet Unificado para Fichas de Nodos y Relaciones en Móvil
- En viewports `< 768px`, abrir la ficha de un nodo (`TooltipFichaTecnica`: pestañas *Teoría y APA*, *Mitos vs Realidad*, *Caso E-commerce*) o el detalle de una arista (`PopoverDetalleArista`) dentro de un **Bottom Sheet** anclado en la parte inferior (`w-full`, `max-h-[78dvh]`), con backdrop oscuro para cerrar al tocar, botón `X` (`>= 44×44px`) siempre dentro del viewport y cierre por `Escape`.
- En escritorio (`>= 768px`), conservar el comportamiento actual de `NodeToolbar` y `PopoverDetalleArista`.
- Retirar o unificar el componente huérfano `DetailDrawer.tsx` para mantener cero módulos desconectados en `src/`.

### RF-12: Header Compacto y Barra de Navegación Inferior (Bottom Tab Bar)
- En `< 768px`, compactar `TopBar` a una única fila (`<= 56px`): logo `S` / badge `Guía 2020`, título corto, botón de búsqueda expandible (despliega input de ancho completo sin truncar placeholder) y selector Claro/Oscuro.
- Añadir una **Bottom Tab Bar fija** en móvil con acceso por pulgar (`>= 44px` de alto) a: `Historia`, `Mapa`, `Lab` y `Leyenda`.
- Ocultar el `Footer` en `< 768px` (`hidden md:flex`), conservando autoría y créditos en `ModalAcercaDe`.

### RF-13: `PanelHistoria` Colapsable (Portrait) y Lateral (Landscape)
- En `< 768px`, sustituir la posición flotante `top: 84` por una hoja inferior anclada encima de la Bottom Tab Bar con dos estados: **expandida** (`max-h-[42dvh]`, scroll interno) y **colapsada a píldora compacta** (`Etapa X/Y` + controles rápidos `Anterior`/`Continuar` para visualizar el grafo superior).
- Permitir selección horizontal limpia de las 4 perspectivas (`General`, `Scrum Master`, `Product Owner`, `Developers`) sin truncamiento y navegación por **swipe horizontal**.
- En baja altura / `landscape` (`max-height: 500px`), ubicar `PanelHistoria` como panel lateral izquierdo con altura acotada (`max-h-[calc(100dvh-96px)]`) y scroll interno para mantener siempre accesibles `Ver Mapa`, `Anterior` y `Continuar`.

### RF-14: Vista Alternativa "Lista Guiada por Carriles" en Móvil
- En `< 768px` (Modo Mapa), ofrecer alternancia rápida `Mapa / Lista` para explorar los nodos agrupados por carril (*Personas*, *Eventos*, *Documentos*), respetando búsqueda textual y filtro de categoría.
- Tocar una tarjeta de la lista abre su Bottom Sheet o permite **Ubicar en el mapa**, cambiando a vista grafo centrada en el nodo con zoom legible (`>= 0.75`).

### RF-15: Ergonomía Táctil del Lienzo, Filtros y Carriles
- Reemplazar el cálculo fijo `Math.max(innerHeight - 96, 500)` de `useArrastreLienzoHorizontal` por la altura real medida del contenedor `<main>`, habilitando paneo vertical contextual tanto en portrait como en landscape.
- En móvil/táctil: permitir paneo con 1 dedo aunque el gesto inicie sobre un trazado de arista (distinguiendo tap corto para inspeccionar relación vs. arrastre) y bloquear el arrastre accidental de nodos (`nodesDraggable={false}` por defecto con candado opcional de edición).
- Exponer los filtros de categoría (`Todos`, `Roles`, `Eventos`, `Documentos`) en una barra horizontal deslizable visible en móvil durante Modo Mapa, mostrar etiquetas breves de carriles en `Swimlanes` y sustituir `ControlZoomPreciso` en móvil por `pinch-to-zoom` + botón flotante `Encuadrar` (`>= 44×44px`).

### RF-16: Accesibilidad Móvil (`WCAG 2.1 AA`), Targets `>= 44px` y Modales
- Garantizar `aria-label` explícito en todos los botones iconográficos (incluidos `Modo Historia`, `Mapa Libre` y opciones de `CalculadoraTimebox`).
- Asegurar un mínimo de `44×44px` de área táctil en botones críticos móviles y evitar saltos de línea incómodos en los botones de duración del Sprint (`grid-cols-2 sm:grid-cols-4`, `whitespace-nowrap`) y en `Ver Mapa` (`360px`).
- Ajustar modales (`ModalLaboratorioScrum`, `ModalAcercaDe`, `ModalHistorialCambios`) a `max-h-[90dvh]` para evitar recortes en landscape.

---

## 3. Criterios de Aceptación (Gherkin)

```gherkin
Escenario: Apertura y cierre accesible de ficha técnica desde el mapa o salto del Quiz en móvil (Happy Path)
  Dado que el usuario navega desde un viewport móvil (< 768px)
  Cuando toca cualquier nodo (como "Product Owner" o "Increment" vía "Ver nodo en el mapa")
  Entonces la ficha técnica se despliega en un Bottom Sheet centrado en el borde inferior
  Y su botón de cierre "X" (>= 44x44px) y las 3 pestañas permanecen 100% dentro del viewport visible

Escenario: Navegación entre modos y filtros sin superposiciones (Happy Path)
  Dado que el usuario inicia la aplicación en portrait (390x844 o 360x740)
  Cuando observa la cabecera, la Bottom Tab Bar y el Panel Historia
  Entonces ningún panel tapa el buscador expandible ni el botón de tema
  Y en Modo Mapa dispone de filtros visibles ("Todos", "Roles", "Eventos", "Documentos") y toggle "Lista / Mapa"

Escenario: Navegación en Modo Horizontal / Landscape móvil (Edge Case)
  Dado que el usuario rota su teléfono a 844x390 en Modo Historia
  Cuando visualiza el panel narrativo y los botones "Ver Mapa", "Anterior" y "Continuar"
  Entonces todos los botones de acción permanecen dentro del viewport y operables sin solapar la leyenda

Escenario: Paneo táctil sobre zonas con aristas sin mover nodos por accidente (Failure Mode)
  Dado que el usuario desliza un dedo sobre el lienzo en Modo Mapa tocando encima de una relación
  Cuando supera el umbral de arrastre
  Entonces el lienzo se desplaza fluidamente sin arrastrar tarjetas ni bloquear el eje horizontal
```
