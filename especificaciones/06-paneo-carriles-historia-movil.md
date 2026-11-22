# Especificación 06: Paneo Horizontal por Pasos con Zoom Constante de 3 Carriles en Móvil Vertical

## 1. Alcance Funcional
Evolucionar el encuadre del **Modo Historia** exclusivamente en pantallas móviles verticales (`esMovil && !esLandscapeCompacto`, ej. `390×664` y `360×740`) para eliminar los cambios bruscos de acercamiento/alejamiento entre etapas. En cada capítulo de cualquiera de las cuatro perspectivas narrativas (`General`, `Scrum Master`, `Product Owner` y `Developers`), la cámara mantendrá una distancia de zoom vertical constante que abarque los **3 carriles completos** (`Personas`, `Eventos` y `Documentos`), alineados hacia arriba, desplazando únicamente el eje horizontal hacia los nuevos elementos agregados en ese paso ([`idsNodosNuevos`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/data/datosHistoria.ts#L12-L13)).

Los modos `landscape` compacto (`<= 500px` de alto) y escritorio (`>= 768px`), así como el encuadre al tocar **Ubicar en el mapa**, **Desafío Quiz** o **Encuadrar todo el mapa**, conservan su comportamiento contextual definido en [`05-encuadre-superior-y-ergonomia.md`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/especificaciones/05-encuadre-superior-y-ergonomia.md).

---

## 2. Requerimientos Funcionales

### RF-21: Zoom Vertical Constante de 3 Carriles Completos en Móvil Vertical
- En **Modo Historia** sobre viewport móvil vertical (`esMovil && !esLandscapeCompacto`):
  - El nivel de `zoom` ya no dependerá de la altura ni del ancho de los nodos destacados de cada capítulo, sino únicamente de encajar la altura completa de los 3 carriles ([`ALTURA_TOTAL_FLUJO_CARRILES`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/utils/swimlanesGeometria.ts#L21)) dentro de la franja útil disponible por encima de [`PanelHistoriaMovil`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/movil/PanelHistoriaMovil.tsx).
  - La posición vertical `y` alineará siempre el límite superior de los carriles ([`LIMITE_SUPERIOR_CARRILES_FLOW`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/utils/swimlanesGeometria.ts#L20)) en la parte superior visible debajo de la cabecera.
  - Por lo tanto, mientras el panel narrativo mantenga su mismo estado (expandido o colapsado), avanzar o retroceder entre capítulos conservará exactamente el mismo `zoom` y la misma coordenada `y`.

### RF-22: Foco Horizontal Exclusivo sobre [`idsNodosNuevos`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/data/datosHistoria.ts#L12-L13)
- En **Modo Historia** móvil vertical, el desplazamiento horizontal (`x`) centrará dentro del área útil horizontal (descontando los controles flotantes derechos en [`ControlesLienzoMovil`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/movil/ControlesLienzoMovil.tsx)) la caja combinada de los nodos pertenecientes a `idsNodosNuevos` del capítulo actual.
- Los nodos previos o relaciones hacia atrás incluidos solo en `idsDestacados` no arrastrarán ni alejarán la cámara: permanecerán resaltados visualmente manteniendo su estilo de foco, accesibles mediante paneo táctil horizontal del usuario.
- Cuando un capítulo incorpore múltiples nodos en `idsNodosNuevos` cuyo ancho supere la franja útil en ese zoom, se mantendrá invariable el zoom constante de los 3 carriles centrando el eje `x` en el punto medio horizontal del grupo nuevo.
- Navegar hacia atrás (**Anterior** o seleccionando un paso en el indicador superior) aplicará exactamente la misma regla simétrica centrando `x` en `idsNodosNuevos` de ese capítulo sin variar el zoom.

### RF-23: Recalibración del Zoom de 3 Carriles al Colapsar o Expandir el Panel
- Si en móvil vertical el usuario colapsa [`PanelHistoriaMovil`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/movil/PanelHistoriaMovil.tsx), la cámara recalculará el `zoom` vertical para que los 3 carriles completos aprovechen toda la nueva altura libre útil disponible sobre la píldora colapsada, manteniendo la alineación superior y el centrado horizontal en `idsNodosNuevos` del capítulo activo.
- Al volver a expandir `PanelHistoriaMovil`, la cámara retornará suavemente al `zoom` vertical calculado sobre la altura útil reducida superior.

---

## 3. Criterios de Aceptación (Gherkin)

```gherkin
Escenario: Paneo horizontal puro hacia la derecha con zoom constante entre etapas (Happy Path)
  Dado que el usuario navega en Modo Historia desde un móvil vertical (390×664 o 360×740) con PanelHistoriaMovil expandido
  Cuando avanza desde la Etapa 1 hasta la Etapa 4 pulsando "Continuar" (donde Etapa 4 destaca también al Product Owner atrás)
  Entonces el valor de zoom y la coordenada vertical Y permanecen constantes mostrando los 3 carriles completos alineados arriba
  Y la cámara solo se desplaza horizontalmente centrando los nodos definidos en idsNodosNuevos de cada etapa

Escenario: Múltiples nodos nuevos en una misma etapa sin alejar el zoom (Edge Case)
  Dado que el usuario alcanza una etapa con varios elementos en idsNodosNuevos (como Etapa 5 con Developers, Scrum Master y Sprint, o Product Owner Etapa 2)
  Cuando la cámara encuadra ese capítulo en móvil vertical
  Entonces el zoom sigue siendo idéntico al de una etapa con un solo nodo (altura completa de los 3 carriles)
  Y el eje X centra el punto medio horizontal del grupo de idsNodosNuevos permitiendo desplazamiento manual lateral con el dedo

Escenario: Navegación inversa y cambios entre las cuatro historias temáticas (Happy Path)
  Dado que el usuario cambia entre General, Scrum Master, Product Owner o Developers o pulsa "Anterior"
  Cuando pasa a un paso anterior o a una perspectiva diferente
  Entonces el encuadre conserva la altura constante de los 3 carriles alineados arriba
  Y centra horizontalmente los idsNodosNuevos del capítulo resultante

Escenario: Recálculo al colapsar o expandir PanelHistoriaMovil y respaldo defensivo (Failure / Resilience Mode)
  Dado que el usuario colapsa la tarjeta de PanelHistoriaMovil en móvil vertical o accede a un capítulo sin idsNodosNuevos válidos
  Cuando cambia el área útil vertical o se resuelve el conjunto objetivo de cámara
  Entonces al colapsar el zoom aumenta suavemente para ocupar la nueva altura libre con los 3 carriles alineados arriba sin perder el eje X actual
  Y ante una lista vacía de idsNodosNuevos la cámara toma como respaldo idsDestacados o los nodos visibles sin desbordes ni errores
```
