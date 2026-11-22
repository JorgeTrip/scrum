# Especificación 08: Animación Bidireccional del Modal «Acerca de» Anclada al Botón «S»

## 1. Alcance Funcional
Dotar al componente [`ModalAcercaDe`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/ModalAcercaDe.tsx) de una transición espacial fluida estilo Apple conectada geométricamente con el botón de marca `"S"` situado en el rincón superior izquierdo de [`TopBar`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/TopBar.tsx) (escritorio) y [`TopBarMovil`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/movil/TopBarMovil.tsx) (móvil). Al cerrarse, la tarjeta del modal se encoge y vuela hasta «meterse» dentro del botón `"S"`, enseñando visualmente al usuario dónde consultar nuevamente la información; al abrirse desde la cabecera, realiza el recorrido inverso expandiéndose desde dicho botón.

---

## 2. Requerimientos Funcionales

### RF-27: Animación Bidireccional de Reducción y Expansión Anclada al Botón «S»
- **Cierre animado hacia el ancla**: Al cerrar [`ModalAcercaDe`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/ModalAcercaDe.tsx) por cualquiera de sus vías (`Comenzar`, `Entendido`, botón `X`, tecla `Escape` o clic sobre el fondo oscuro), el contenedor del modal calcula dinámicamente el desplazamiento vectorial `(dx, dy)` y el factor de escala entre su centro visual y el centro del botón `"S"` en pantalla, animando exclusivamente propiedades compuestas por GPU (`transform: translate3d(dx, dy, 0) scale(escala)` y `opacity`) durante `~380 ms` con curva `cubic-bezier(0.32, 0.72, 0, 1)`.
- **Apertura inversa desde el ancla**: Al abrir manualmente el modal desde la cabecera (botón `"S"` o badge `"Guía 2020"`), el diálogo parte desde las coordenadas y escala del botón `"S"` y se expande fluidamente hasta el centro del viewport con la misma duración (`~380 ms`) y curva. Cuando se abre automáticamente en primera visita (`esBienvenida === true`), aparece directamente en el centro como pantalla de bienvenida sin volar desde la esquina.
- **No bloqueo e interrumpibilidad**: Durante el cierre (`~380 ms`), la bienvenida ya queda marcada como vista en `localStorage` y el backdrop aplica `pointer-events-none` para liberar inmediatamente la interacción con el grafo; si el usuario toca nuevamente `"S"` antes de finalizar el cierre, el vuelo se revierte suavemente hacia la apertura.

### RF-28: Micro-pulso de Recepción en el Botón «S»
- Hacia el instante en que el modal aterriza dentro del botón `"S"` (`~320 ms` del cierre), el botón ancla dispara un pulso breve y sutil de recepción (`scale` sutil y resplandor índigo ~420 ms) para reforzar el anclaje visual sin distraer ni mover el layout adyacente.

### RF-29: Accesibilidad, Movimiento Reducido y Degradación Segura
- Cuando el sistema o navegador tenga activa la preferencia `prefers-reduced-motion: reduce`, tanto la apertura como el cierre omitirán el desplazamiento y el pulso espacial, resolviendo de forma inmediata (`0 ms`) sin animaciones.
- En ausencia del elemento ancla `"S"` en el DOM (SSR, pruebas unitarias o vistas aisladas), el motor calculará una transición vertical sutil de respaldo (`translate3d(0px, -24px, 0) scale(0.92)`) sin lanzar excepciones.

---

## 3. Criterios de Aceptación (Gherkin)

```gherkin
Escenario: Cierre de bienvenida hacia el botón S con pulso de recepción (Happy Path)
  Dado que ModalAcercaDe se abrió como pantalla de bienvenida en escritorio o móvil
  Cuando el usuario pulsa "Comenzar" (o "Entendido", "X", Escape o fondo oscuro)
  Entonces la tarjeta del modal se reduce y desplaza mediante GPU hacia el centro del botón "S" en ~380 ms
  Y la marca de bienvenida vista se persiste de inmediato sin bloquear el lienzo detrás
  Y el botón "S" recibe un pulso breve y sutil de recepción antes de desmontar el diálogo

Escenario: Apertura manual inversa desde el rincón superior izquierdo (Happy Path)
  Dado que el usuario cerró previamente la pantalla de bienvenida
  Cuando toca el botón "S" o "Guía 2020" en TopBar o TopBarMovil
  Entonces ModalAcercaDe se expande desde la posición del botón "S" hacia el centro de pantalla
  Y finaliza nítido y legible con el botón principal "Entendido"

Escenario: Reapertura rápida durante cierre en curso e Historial anidado (Edge Case)
  Dado que el modal inició su animación de cierre hacia el botón "S"
  Cuando el usuario vuelve a pulsar el botón "S" antes de que transcurran 380 ms
  Entonces la animación se cancela limpiamente y vuelve a abrir el modal sin quedarse oculto
  Y al cerrar mientras ModalHistorialCambios estaba cerrado tras volver de él, solo cierra ModalAcercaDe sin saltos

Escenario: Respeto estricto de prefers-reduced-motion y ausencia segura de ancla (Failure / Resilience Mode)
  Dado un usuario con prefers-reduced-motion: reduce activo o un entorno sin botón ancla en el DOM
  Cuando cierra o abre ModalAcercaDe
  Entonces con movimiento reducido el modal abre y cierra al instante sin traslación ni pulso animado
  Y sin botón ancla en el DOM la operación degrada a fallback seguro sin errores de consola
```
