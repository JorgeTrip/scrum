# Especificación 02: Contenido Interactivo y Laboratorio Scrum

## 1. Alcance Funcional
Transformar la exploración estática en experiencia de aprendizaje activo mediante el **Caso Práctico E-commerce de punta a punta**, el módulo unificado **Laboratorio Scrum** accesible desde `TopBar`, y la inspección interactiva de relaciones (aristas).

---

## 2. Requerimientos Funcionales

### RF-05: Caso Práctico Vivo ("Tienda Digital / E-commerce") en Fichas
- Todas las tarjetas del flujo (`Product Vision Board` hasta `Sprint Retrospective` e `Increment`) incluirán una pestaña **"Ejemplo E-commerce"** dentro de `TooltipFichaTecnica` (junto a **"Teoría y Guía"** y **"Mitos vs. Realidad"**).
- El ejemplo sigue un mismo producto coherente de punta a punta (p. ej. *Tienda Online "MercadoÁgil"*):
  - *Vision Board*: público objetivo, necesidades de compra rápida, propuesta de valor y metas de conversión.
  - *Impact Mapping*: Meta (*+20% checkout completado*) ➔ Actores (*Comprador móvil*) ➔ Impactos (*Reducir pasos de pago*) ➔ Entregables.
  - *User Story Mapping*: Backbone (*Explorar catálogo ➔ Carrito ➔ Checkout ➔ Seguimiento*) y Slices de lanzamiento (*MVP v1*).
  - *Product Backlog*, *Sprint Planning*, *Sprint Backlog*, *Daily*, *Increment*, *Review* y *Retrospective*: historias concretas, *Sprint Goal*, criterio *DoD* cumplido y adaptación del backlog.

### RF-06: Módulo "Laboratorio Scrum" en TopBar
- Botón dedicado en `TopBar` (`Laboratorio Scrum`) que abre un modal/panel interactivo con 4 pestañas, cada una con cita APA 7ª edición:
  1. **Calculadora de Timeboxes:** Deslizador de duración de Sprint (`1, 2, 3, 4 semanas`) que recalcula en tiempo real los máximos oficiales de *Sprint Planning*, *Sprint Review*, *Sprint Retrospective* y destaca la constancia de la *Daily Scrum* (15 min) + regla de cancelación del Sprint.
  2. **Pilares y Valores:** Mapa interactivo de los **3 Pilares Empíricos** (*Transparencia, Inspección, Adaptación*) vinculados a qué artefactos/eventos los concretan, más los **5 Valores de Scrum** con ejemplos aplicados en E-commerce.
  3. **Guía 2017 vs. 2020:** Tabla comparativa interactiva filtrable por categoría (*Equipo, Compromisos, Eventos, Lenguaje*) explicando el motivo de cada cambio oficial.
  4. **Desafío Scrum (Quiz Situacional):** Banco de preguntas prácticas situacionales (mínimo 8 preguntas) con retroalimentación inmediata, puntuación, fuente oficial exacta y botón **"Ver nodo en el mapa"** que cierra el laboratorio, cambia al mapa y enfoca/abre la ficha del nodo relacionado.

### RF-07: Aristas Clickables y Resaltado de Conexiones
- Al pasar el puntero o hacer clic en una arista (`AristaDespejada`), se muestra un popover/panel flotante con: nombre de la relación, origen ➔ destino, explicación pedagógica, qué falla si se omite esa conexión y su cita oficial.
- Al seleccionar un nodo, sus aristas conectadas se destacan visualmente y las no relacionadas se atenúan suavemente para facilitar la lectura topológica.

---

## 3. Criterios de Aceptación (Gherkin)

```gherkin
Escenario: Cálculo dinámico de Timeboxes del Sprint (Happy Path)
  Dado que el usuario abre el "Laboratorio Scrum" en la pestaña "Calculadora de Timeboxes"
  Cuando selecciona una duración de Sprint de "2 semanas"
  Entonces la calculadora muestra Sprint Planning máximo "4 horas", Sprint Review "2 horas", Sprint Retrospective "1.5 horas" y Daily Scrum "15 minutos"

Escenario: Responder el Desafío Scrum y saltar al mapa (Happy Path)
  Dado que el usuario responde una pregunta en "Desafío Scrum"
  Cuando presiona "Ver nodo en el mapa" tras revisar la explicación y la cita APA
  Entonces el laboratorio se cierra, el lienzo centra el nodo vinculado y abre su ficha técnica

Escenario: Arista inspeccionable sin interferir con el arrastre de etiqueta (Edge Case)
  Dado que el usuario arrastra una etiqueta de arista más de 3 px para reacomodar la curva
  Cuando suelta la etiqueta
  Entonces se guarda la nueva posición y desvío sin abrir inadvertidamente la ficha de la arista
  Y si hace clic corto sin arrastrar, se abre el detalle pedagógico de esa relación

Escenario: Navegación del Quiz al finalizar o reiniciar (Failure Mode)
  Dado que el usuario responde todas las preguntas o cierra el laboratorio a mitad del intento
  Cuando vuelve a abrir el "Desafío Scrum" o pulsa "Reiniciar desafío"
  Entonces no se producen errores de índice fuera de rango ni estados inconsistentes de puntaje
```
