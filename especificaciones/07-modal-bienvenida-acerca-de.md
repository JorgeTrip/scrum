# Especificación 07: Modal «Acerca de» como Pantalla de Bienvenida

## 1. Alcance Funcional
Utilizar el componente [`ModalAcercaDe`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/ModalAcercaDe.tsx) como pantalla de bienvenida automática al abrir la aplicación web por primera vez en el navegador (tanto en escritorio como en móvil y landscape). Una vez cerrado, el usuario accederá directamente al flujo interactivo en visitas o recargas posteriores, manteniendo siempre disponible su reapertura manual desde el botón del logo `S` o el badge `Guía 2020` en [`TopBar`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/TopBar.tsx) y [`TopBarMovil`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/movil/TopBarMovil.tsx).

### Operación de Cierre y Entrega Git (`/push`)
Una vez completado íntegramente el ciclo obligatorio `SDD ➔ Arquitectura C4 ➔ TDD (Rojo/Verde) ➔ Implementación` y verificadas todas las pruebas y auditorías, se reubicarán `.git` y `.gitattributes` desde la carpeta padre `2026 - Scrum\` hacia la raíz real del proyecto `2026 - Scrum\scrum\`, confirmando commits conformes y ejecutando `/push` de todo el trabajo conjunto.

---

## 2. Requerimientos Funcionales

### RF-24: Apertura Automática en Primera Visita con Persistencia Local
- Al iniciar la aplicación en un navegador sin registro previo de bienvenida vista en `localStorage` (clave dedicada con prefijo del proyecto: `scrum_bienvenida_vista_v1`), [`ModalAcercaDe`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/ModalAcercaDe.tsx) se mostrará abierto automáticamente en modo bienvenida, sin distinción de viewport (escritorio, móvil portrait o landscape compacto).
- Al cerrar el modal por cualquiera de las vías admitidas (botón principal `"Comenzar"`, botón `X`, tecla `Escape` o clic sobre el fondo oscuro), se persistirá inmediatamente en `localStorage` la marca de bienvenida vista para evitar que reaparezca automáticamente al recargar (`F5`) o reabrir la web en el mismo navegador.
- Si durante la pantalla de bienvenida el usuario accede al **Historial de cambios** ([`ModalHistorialCambios`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/ModalHistorialCambios.tsx)) y luego vuelve o cierra, el cierre definitivo del modal registrará de igual forma la bienvenida como vista.

### RF-25: Botón Principal Contextual y Contenido Idéntico
- El contenido visual e informativo de `ModalAcercaDe` permanecerá 100% intacto: título *«Acerca de Scrum Flow & Guía 2020»*, subtítulo, bloque explicativo de la Guía 2020, bibliografía oficial APA 7ª ed., autoría y propósito educativo, versión, enlace a *Historial de cambios* y criterios de accesibilidad (`role="dialog"`, `aria-modal="true"`, objetivos táctiles `>= 44px`, soporte de tecla `Escape`).
- Únicamente la etiqueta del botón de acción principal en el pie del modal variará según el contexto de apertura:
  - **Modo bienvenida automática (primera visita)**: mostrará `"Comenzar"`.
  - **Modo consulta manual (logo `S` o badge `Guía 2020`)**: conservará `"Entendido"`.

### RF-26: Resiliencia ante Almacenamiento No Disponible
- Todas las operaciones de lectura y escritura sobre `localStorage` deberán estar encapsuladas en manejo seguro de excepciones (`try / catch`), evitando bloqueos de renderizado o errores de consola ante entornos SSR, navegación privada restrictiva o políticas de seguridad de almacenamiento deshabilitado.
- Si `localStorage` no está disponible o falla al escribir, se utilizará un respaldo en memoria para recordar durante la sesión en curso que la bienvenida ya fue cerrada sin volver a abrirla ante re-renderizados.

---

## 3. Criterios de Aceptación (Gherkin)

```gherkin
Escenario: Primera visita automática como bienvenida y recarga sin reaparición (Happy Path)
  Dado que el usuario accede por primera vez a la web sin marca previa en localStorage
  Cuando la aplicación termina de cargar en escritorio o en móvil
  Entonces ModalAcercaDe se muestra automáticamente en modo bienvenida
  Y su botón principal de cierre inferior muestra la etiqueta "Comenzar"
  Cuando el usuario pulsa "Comenzar" y posteriormente recarga la página (F5)
  Entonces se persiste la clave de bienvenida vista en localStorage
  Y al recargar la aplicación el modal no vuelve a abrirse automáticamente

Escenario: Reapertura manual posterior desde la cabecera con etiqueta estándar (Happy Path)
  Dado que la bienvenida ya fue cerrada y marcada como vista en localStorage
  Cuando el usuario pulsa el botón del logo "S" o el badge "Guía 2020" en TopBar o TopBarMovil
  Entonces ModalAcercaDe se abre mostrando exactamente su contenido completo
  Y el botón principal de cierre inferior conserva la etiqueta "Entendido"

Escenario: Cierre por vías alternativas e interacción con Historial de cambios (Edge Case)
  Dado que el modal de bienvenida se encuentra abierto en la primera visita
  Cuando el usuario abre "Historial de cambios" y regresa con el botón de retorno
  Entonces el modal de bienvenida continúa visible preservando su estado y etiqueta "Comenzar"
  Cuando posteriormente cierra el modal pulsando la tecla Escape, el botón "X" o el fondo oscuro
  Entonces el modal se cierra y persiste la marca de bienvenida vista para futuras visitas

Escenario: Funcionamiento seguro cuando localStorage falla o está restringido (Failure / Resilience Mode)
  Dado un entorno sin window.localStorage o donde getItem/setItem lanzan una excepción de seguridad
  Cuando se renderiza la aplicación y se cierra la pantalla de bienvenida
  Entonces no se producen excepciones no capturadas ni errores en consola
  Y el estado cerrado se sostiene en memoria durante la sesión actual permitiendo explorar el flujo
```
