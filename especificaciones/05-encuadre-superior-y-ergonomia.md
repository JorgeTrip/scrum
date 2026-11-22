# Especificación 05: Encuadre Asimétrico, Carriles Alineados Arriba y Pulido Táctil

## 1. Alcance Funcional
Evolucionar el sistema de cámara, el renderizado de carriles ([`Swimlanes`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/Swimlanes.tsx)) y los controles táctiles restantes de **Flujo Metodológico Scrum** para garantizar que los diagramas y nodos enfocados aprovechen siempre el área libre real del lienzo (tanto en móvil como en escritorio), sin quedar ocultos detrás de paneles narrativos o hojas inferiores y manteniendo consistencia visual en las etiquetas de carril.

---

## 2. Requerimientos Funcionales

### RF-17: Cálculo Puro de Encuadre por Área Útil Asimétrica
- Reemplazar el centrado simétrico genérico de `fitView` en [`useEnfoqueCamaraFlow`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/hooks/useEnfoqueCamaraFlow.ts) por un cálculo geométrico puro (`setViewport`) parametrizado por márgenes reservados reales (`arriba`, `derecha`, `abajo`, `izquierda`) según el panel visible en cada viewport:
  - **Modo Historia Portrait (`< 768px`, panel expandido):** reservar la altura inferior ocupada por [`PanelHistoriaMovil`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/movil/PanelHistoriaMovil.tsx) y los controles flotantes derechos, encuadrando los nodos del capítulo dentro de la franja libre superior visible (sin obligar a colapsar el cuadro de descripción). Si el usuario colapsa el panel a píldora inferior, ampliar dinámicamente el área libre para mostrar más lienzo.
  - **Bottom Sheet Abierto (`HojaInferiorMovil` en móvil o landscape):** al enfocar un nodo desde *Ubicar en el mapa* o desde el *Desafío Quiz*, reservar la franja inferior ocupada por el sheet para que el nodo enfocado permanezca visible en la parte superior del lienzo.
  - **Panel Narrativo Lateral (`landscape` `<= 500px` de alto y Escritorio `>= 768px`):** reservar el ancho izquierdo ocupado por el panel narrativo lateral ([`PanelHistoriaMovil`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/movil/PanelHistoriaMovil.tsx) en landscape `~340px` y [`PanelHistoria`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/PanelHistoria.tsx) en escritorio `~456px` mientras no sea desplazado) para que el primer nodo del capítulo no quede cubierto detrás del panel.

### RF-18: Alineación Vertical Superior al Visualizar los 3 Carriles Completos
- En **Modo Historia**, **Mapa Libre** (inicio / redimensionado) y al pulsar **Encuadrar todo el mapa** (tanto en [`ControlesLienzoMovil`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/movil/ControlesLienzoMovil.tsx) como en [`ControlZoomPreciso`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/ControlZoomPreciso.tsx) de escritorio), cuando los 3 carriles completos quepan verticalmente en el área útil disponible (`ALTURA_TOTAL_FLUJO_CARRILES * zoom <= altoDisponible`), alinear verticalmente el bloque hacia la **parte superior** del área útil (anclado a partir de `LIMITE_SUPERIOR_CARRILES_FLOW = -120` con un margen superior limpio) en lugar de centrarlo verticalmente en mitad de la pantalla, dejando libre la zona inferior.

### RF-19: Rótulos Dinámicos Sincronizados en [`Swimlanes`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/Swimlanes.tsx)
- Sustituir las posiciones verticales porcentuales estáticas (`20px`, `calc(33.333% + 16px)`, `calc(66.666% + 12px)`) de las 3 etiquetas laterales (*Personas*, *Eventos*, *Documentos*) por coordenadas verticales derivadas de cada franja real del grafo (`banda.top * zoom + y + margenInterno`), ancladas al borde izquierdo del lienzo y acotadas dentro de su franja tricolor.
- Mantener la legibilidad en Dark Mode y Light Mode con contraste `WCAG 2.1 AA` sin solapar el margen superior del header ni invadir controles derechos.

### RF-20: Pulido Táctil `>= 44×44px` en Filtros, Laboratorio y Cabecera Landscape
- Ampliar el chip de filtro `Docs` en [`TopBarMovil`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/movil/TopBarMovil.tsx) a `min-w-[44px] min-h-[44px]`.
- Ampliar las 4 pestañas de [`ModalLaboratorioScrum`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/laboratorio/ModalLaboratorioScrum.tsx) (`Calculadora Timebox`, `Pilares y Valores`, `2017 vs. 2020`, `Desafío Quiz`) de `40px` a `min-h-[44px]`.
- En entorno táctil / landscape compacto (`844×390`), asegurar altura mínima táctil accesible (`>= 44px`) en los botones de cabecera ([`TopBar`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/TopBar.tsx) y [`BarraFiltrosTopBar`](file:///E:/@Documentos/OneDrive/IT/Proyectos/2026%20-%20Scrum/scrum/src/components/BarraFiltrosTopBar.tsx)) conservando una única fila de barra superior sin envolver a segunda línea.

---

## 3. Criterios de Aceptación (Gherkin)

```gherkin
Escenario: Encuadre superior de nodos y carriles con Panel de Historia expandido en móvil (Happy Path)
  Dado que el usuario abre la aplicación en viewport móvil portrait (390×664 o 360×740) en Modo Historia
  Cuando navega desde la Etapa 1 hasta la Etapa 3 (o cualquier etapa con nodos en carril inferior o los 3 carriles)
  Entonces el zoom y la posición vertical Y encuadran los nodos activos en la zona superior libre por encima de PanelHistoriaMovil
  Y ningún nodo destacado queda oculto detrás del cuadro de descripción sin necesidad de colapsarlo

Escenario: Alineación superior de los 3 carriles completos al encuadrar mapa (Happy Path)
  Dado que el usuario está en Mapa Libre (en móvil o escritorio) y visualiza o pulsa "Encuadrar todo el mapa"
  Cuando los 3 carriles completos caben dentro de la altura útil del lienzo
  Entonces el bloque de carriles queda alineado hacia la parte superior visible debajo del margen superior
  Y los rótulos Personas, Eventos y Documentos de Swimlanes coinciden verticalmente con la banda tricolor de cada carril

Escenario: Reserva de ancho izquierdo en Landscape y Escritorio durante Modo Historia (Edge Case)
  Dado que el usuario navega en Modo Historia desde landscape compacto (844×390) o escritorio (1280×800)
  Cuando avanza por los capítulos con nodos cercanos al borde izquierdo del encuadre
  Entonces la cámara desplaza el área útil hacia la derecha respetando el ancho del panel narrativo izquierdo
  Y en landscape táctil los controles principales de cabecera y Laboratorio mantienen altura mínima >= 44px sin salto de fila

Escenario: Recalibración al colapsar o expandir PanelHistoriaMovil (Failure / Resilience Mode)
  Dado que el usuario alterna entre estado expandido y colapsado de PanelHistoriaMovil o rota la pantalla
  Cuando cambia el área libre disponible del contenedor del lienzo
  Entonces la cámara recalcula suavemente el viewport sin desbordes horizontales ni pérdida de los nodos del capítulo
```
