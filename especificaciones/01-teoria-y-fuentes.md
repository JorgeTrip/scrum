# Especificación 01: Rigor Teórico (Guía Scrum 2020) y Fuentes Oficiales

## 1. Alcance Funcional
Actualizar y completar el modelo teórico en `src/data/` y las vistas de ficha/modal para garantizar fidelidad total con la **Guía Oficial de Scrum 2020**, separación clara respecto a prácticas de *Product Discovery*, citas APA 7ª edición verificables y cobertura completa de los 3 roles oficiales.

---

## 2. Requerimientos Funcionales

### RF-01: Diferenciación Scrum Oficial 2020 vs. Product Discovery
- Los nodos `artifact-vision-board`, `artifact-impact-mapping` y `artifact-user-story-mapping` deben identificarse visualmente con etiqueta `Práctica Discovery` y mostrar su resultado como `Salida clave`, nunca como `Compromiso:`.
- Únicamente `artifact-product-backlog` (`Product Goal`), `artifact-sprint-backlog` (`Sprint Goal`) y `artifact-increment` (`Definition of Done`) mantienen etiqueta `Artefacto Oficial` y el sello de compromiso oficial.

### RF-02: Corrección y Enriquecimiento de Fichas + Antipatrones + Glosario
- Actualizar `role-product-owner`, `role-developers` y `role-scrum-master`:
  - Explicar concepto de *Accountabilities* (2020), que `Dev Team` / `Equipo de Desarrollo` están deprecados, que el PO es una sola persona con autoridad exclusiva para cancelar un Sprint, y explicitar los 3 servicios del SM (Equipo, PO y Organización).
- Actualizar `event-sprint`, `event-sprint-planning`, `event-daily-scrum`, `event-sprint-review` y `event-sprint-retrospective`:
  - Corregir timebox del Sprint a `"1 mes o menos (1 a 4 semanas)"` y aclarar su rol como contenedor temporal.
  - Aclarar eliminación de las 3 preguntas obligatorias en Daily, regla de no presentar ítems sin DoD en Review, inspección de DoD e interacciones en Retrospectiva, y explicación de *Backlog Refinement* como actividad continua.
- Actualizar `artifact-increment`: sustituir foco en *PSPI* por **Incremento utilizable**, aditivo y con posibilidad de múltiples entregas por Sprint.
- Incorporar en cada ficha: pestaña o bloque **Antipatrones (Mito vs. Realidad)** y glosario inline de siglas (`PBI`, `DoD`, `DoR`, `MVP`).

### RF-03: Completitud del Grafo de Relaciones y 4ª Historia (`Developers`)
- Añadir las aristas metodológicas faltantes en `datosAristas.ts`:
  - `role-developers` ➔ `artifact-increment` (*Construyen Incremento utilizable*)
  - `role-developers` ➔ `event-sprint-planning` y `event-sprint-review`
  - `event-sprint-review` ➔ `artifact-product-backlog` (*Adapta Backlog con feedback*, línea punteada)
  - `role-product-owner` ➔ `event-sprint-retrospective` (*Co-inspecciona mejora continua*)
- Incorporar recorrido narrativo **`developers`** (5 pasos) junto a `general`, `scrum-master` y `product-owner`; incluir *Impact Mapping* y *User Story Mapping* en el recorrido `product-owner`.
- Completar `LeyendaRelaciones` explicando la codificación de **colores** además de los trazos.

### RF-04: Fuentes Oficiales en Formato APA 7ª Edición
- Cada ficha técnica (`TooltipFichaTecnica`), cada relación inspeccionada, cada capítulo del Laboratorio y el modal `ModalAcercaDe` debe incluir su cita APA 7ª edición (autor, año, título, sección exacta de la Guía 2020 o libro original) y enlace externo seguro (`target="_blank" rel="noopener noreferrer"`).

---

## 3. Criterios de Aceptación (Gherkin)

```gherkin
Escenario: Distinguir compromisos oficiales de herramientas Discovery (Happy Path)
  Dado que el usuario visualiza el carril inferior de Documentos
  Cuando inspecciona "Product Vision Board" y "Product Backlog"
  Entonces "Product Vision Board" muestra el distintivo "Práctica Discovery" sin sello de Compromiso Scrum
  Y "Product Backlog" muestra "Artefacto Oficial" con el compromiso "Product Goal"

Escenario: Consultar fuentes oficiales APA 7ª edición en una ficha (Happy Path)
  Dado que el usuario abre la ficha técnica de cualquier nodo
  Cuando navega hasta la sección de Fundamentación y Fuentes Oficiales
  Entonces visualiza la cita formateada en APA 7ª edición con la sección exacta de la Guía 2020
  Y un enlace externo clicable hacia la fuente oficial verificada

Escenario: Navegar el nuevo recorrido temático de Developers (Edge Case)
  Dado que el usuario está en "Modo Historia"
  Cuando selecciona la perspectiva "Developers"
  Entonces se muestran 5 etapas progresivas centradas en creación de Sprint Backlog, Daily, calidad DoD, Incremento y Retrospectiva

Escenario: Validación de integridad de fuentes y compromisos en tests (Failure Mode)
  Dado el conjunto consolidado de nodos y aristas del dominio
  Cuando se ejecuta el validador de esquema de dominio
  Entonces falla la validación si algún nodo carece de cita APA o URL con protocolo https://
  Y falla si un nodo de categoría "discovery-complementario" declara un compromiso oficial Scrum
```
