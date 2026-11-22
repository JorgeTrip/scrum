/**
 * Metadatos pedagógicos y citas APA para relaciones originadas en los Roles de Scrum.
 */

import type { MetadatoAristaScrum } from '../tiposDominio';

export const metadatosAristasRoles: Record<string, MetadatoAristaScrum> = {
  'edge-po-to-vision': {
    edgeId: 'edge-po-to-vision',
    tituloRelacion: 'Product Owner ➔ Product Vision Board',
    familiaColor: 'po',
    explicacion: 'El PO sintetiza la estrategia del producto antes de poblar el backlog.',
    impactoSiSeRompe: 'El equipo construye funcionalidades aisladas sin rumbo ni criterio de negocio.',
    fuenteId: 'pichler-vision-board',
    seccionFuente: 'Product Vision Board'
  },
  'edge-po-to-pb': {
    edgeId: 'edge-po-to-pb',
    tituloRelacion: 'Product Owner ➔ Product Backlog',
    familiaColor: 'po',
    explicacion: 'El PO crea, comunica y ordena los ítems del Product Backlog para maximizar el valor.',
    impactoSiSeRompe: 'Aparecen prioridades contradictorias y múltiples listas paralelas de pedidos.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Product Owner & Product Backlog'
  },
  'edge-po-to-planning': {
    edgeId: 'edge-po-to-planning',
    tituloRelacion: 'Product Owner ➔ Sprint Planning',
    familiaColor: 'po',
    explicacion: 'Propone cómo puede incrementar el valor del producto en el Sprint actual.',
    impactoSiSeRompe: 'El equipo planifica tareas técnicas desconectadas de un Sprint Goal de negocio.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Sprint Planning — Tema 1'
  },
  'edge-po-to-devs': {
    edgeId: 'edge-po-to-devs',
    tituloRelacion: 'Product Owner ➔ Developers',
    familiaColor: 'po',
    explicacion: 'Clarifica dudas de negocio y negocia alcance sin comprometer el Sprint Goal.',
    impactoSiSeRompe: 'Bloqueos por incertidumbre funcional o suposiciones erróneas durante la implementación.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'El Sprint & El Equipo Scrum'
  },
  'edge-po-to-review': {
    edgeId: 'edge-po-to-review',
    tituloRelacion: 'Product Owner ➔ Sprint Review',
    familiaColor: 'po',
    explicacion: 'Colabora con interesados para evaluar el Incremento y ajustar las próximas entregas.',
    impactoSiSeRompe: 'Los cambios del mercado no se reflejan en el orden futuro del Product Backlog.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Sprint Review'
  },
  'edge-po-to-retro': {
    edgeId: 'edge-po-to-retro',
    tituloRelacion: 'Product Owner ➔ Sprint Retrospective',
    familiaColor: 'po',
    explicacion: 'Como parte del único Scrum Team, co-inspecciona la colaboración y el flujo de valor.',
    impactoSiSeRompe: 'Se perpetúa la brecha entre negocio e ingeniería dentro del mismo equipo.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'El Equipo Scrum & Sprint Retrospective'
  },
  'edge-devs-to-daily': {
    edgeId: 'edge-devs-to-daily',
    tituloRelacion: 'Developers ➔ Daily Scrum',
    familiaColor: 'developers',
    explicacion: 'Inspeccionan diariamente el avance hacia el Sprint Goal y adaptan su plan de 24 horas.',
    impactoSiSeRompe: 'Los bloqueos técnicos se descubren recién al final del Sprint.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Daily Scrum'
  },
  'edge-devs-to-sb': {
    edgeId: 'edge-devs-to-sb',
    tituloRelacion: 'Developers ➔ Sprint Backlog',
    familiaColor: 'developers',
    explicacion: 'Planifican, poseen y actualizan el plan táctico durante todo el Sprint.',
    impactoSiSeRompe: 'El plan queda obsoleto y desaparece la visibilidad real del trabajo en curso.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Sprint Backlog'
  },
  'edge-devs-to-increment': {
    edgeId: 'edge-devs-to-increment',
    tituloRelacion: 'Developers ➔ Increment',
    familiaColor: 'developers',
    explicacion: 'Crean cada aspecto del Incremento utilizable adhiriéndose estrictamente a la DoD.',
    impactoSiSeRompe: 'Se acumula código sin verificar ni integrar, generando deuda técnica oculta.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Developers & Increment'
  },
  'edge-devs-to-planning': {
    edgeId: 'edge-devs-to-planning',
    tituloRelacion: 'Developers ➔ Sprint Planning',
    familiaColor: 'developers',
    explicacion: 'Estiman cuánto puede completarse en el Sprint y definen cómo realizarán el trabajo.',
    impactoSiSeRompe: 'Compromisos irrealistas impuestos desde afuera sin respaldo técnico.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Sprint Planning — Temas 2 y 3'
  },
  'edge-devs-to-review': {
    edgeId: 'edge-devs-to-review',
    tituloRelacion: 'Developers ➔ Sprint Review',
    familiaColor: 'developers',
    explicacion: 'Demuestran y analizan el Incremento terminado junto al PO y los interesados.',
    impactoSiSeRompe: 'Se pierde feedback técnico directo de quienes usan la solución.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Sprint Review'
  },
  'edge-sm-to-retro': {
    edgeId: 'edge-sm-to-retro',
    tituloRelacion: 'Scrum Master ➔ Sprint Retrospective',
    familiaColor: 'sm',
    explicacion: 'Asegura que los eventos sean positivos y productivos fomentando la mejora continua.',
    impactoSiSeRompe: 'La retrospectiva deriva en silencio defensivo o quejas sin acciones concretas.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Scrum Master & Sprint Retrospective'
  },
  'edge-sm-to-sprint': {
    edgeId: 'edge-sm-to-sprint',
    tituloRelacion: 'Scrum Master ➔ Sprint',
    familiaColor: 'sm',
    explicacion: 'Garantiza que todos los eventos ocurran y se mantengan dentro de sus timeboxes.',
    impactoSiSeRompe: 'Se saltan eventos clave o las reuniones se extienden sin foco.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Scrum Master'
  },
  'edge-sm-to-devs': {
    edgeId: 'edge-sm-to-devs',
    tituloRelacion: 'Scrum Master ➔ Developers',
    familiaColor: 'sm',
    explicacion: 'Guía en autogestión y remueve impedimentos que exceden el alcance del equipo.',
    impactoSiSeRompe: 'Cuellos de botella organizacionales paralizan la entrega de valor.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Scrum Master — Servicio al Scrum Team'
  },
  'edge-sm-to-po': {
    edgeId: 'edge-sm-to-po',
    tituloRelacion: 'Scrum Master ➔ Product Owner',
    familiaColor: 'sm',
    explicacion: 'Ayuda con técnicas de definición de Product Goal y gestión empírica del Backlog.',
    impactoSiSeRompe: 'El Product Backlog pierde claridad y transparencia para el equipo e interesados.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Scrum Master — Servicio al Product Owner'
  },
  'edge-sm-to-increment': {
    edgeId: 'edge-sm-to-increment',
    tituloRelacion: 'Scrum Master ➔ Increment',
    familiaColor: 'sm',
    explicacion: 'Promueve que el equipo cree incrementos de alto valor sin relajar la Definition of Done.',
    impactoSiSeRompe: 'Se sacrifica calidad bajo presión debilitando la transparencia del Incremento.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Scrum Master & Definition of Done'
  }
};
