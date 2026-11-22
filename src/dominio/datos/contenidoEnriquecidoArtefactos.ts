/**
 * Contenido enriquecido para Prácticas Discovery y Artefactos Oficiales de Scrum 2020.
 */

import type { ContenidoEnriquecidoNodo } from '../tiposDominio';

export const contenidoEnriquecidoArtefactos: Record<string, ContenidoEnriquecidoNodo> = {
  'artifact-vision-board': {
    nodeId: 'artifact-vision-board',
    origenMarco: 'discovery-complementario',
    antipatrones: [
      {
        mito: 'Es un artefacto obligatorio oficial de la Guía Scrum.',
        realidad: 'Es una práctica complementaria creada por Roman Pichler para alinear el Product Goal inicial.',
        consecuencia: 'Confundir herramientas de estrategia de producto con reglas base de Scrum.'
      }
    ],
    fuenteId: 'pichler-vision-board',
    seccionFuente: 'Target Group, Needs, Product & Business Goals'
  },
  'artifact-impact-mapping': {
    nodeId: 'artifact-impact-mapping',
    origenMarco: 'discovery-complementario',
    antipatrones: [
      {
        mito: 'Cada funcionalidad solicitada por un área debe entrar directo al Product Backlog.',
        realidad: 'Conecta metas (Why) con actores (Who) e impactos medibles (How) antes de definir entregables (What).',
        consecuencia: 'Feature-factory: construir software que nadie usa.'
      }
    ],
    fuenteId: 'adzic-impact-mapping',
    seccionFuente: 'Why, Who, How, What'
  },
  'artifact-user-story-mapping': {
    nodeId: 'artifact-user-story-mapping',
    origenMarco: 'discovery-complementario',
    glosarioSiglas: [{ sigla: 'MVP', significado: 'Minimum Viable Product (corte mínimo para validar aprendizaje).' }],
    antipatrones: [
      {
        mito: 'Las historias de usuario independientes en lista plana bastan para entender el viaje del cliente.',
        realidad: 'Organiza el Backbone de extremo a extremo y recorta Slices coherentes de entrega.',
        consecuencia: 'Entregar piezas técnicas aisladas sin flujo completo utilizable.'
      }
    ],
    fuenteId: 'patton-story-mapping',
    seccionFuente: 'Backbone, Walking Skeleton & Release Slices'
  },
  'artifact-product-backlog': {
    nodeId: 'artifact-product-backlog',
    origenMarco: 'scrum-oficial',
    compromisoOficial: 'Product Goal (Objetivo del Producto)',
    glosarioSiglas: [
      { sigla: 'PBL / PBI', significado: 'Product Backlog / Product Backlog Item.' },
      { sigla: 'DoR', significado: 'Definition of Ready (práctica complementaria de preparación, no oficial).' }
    ],
    antipatrones: [
      {
        mito: 'Es una lista cerrada e inmutable de requerimientos tipo contrato.',
        realidad: 'Es emergente y ordenada continuamente; los PBIs más cercanos al tope son los más refinados.',
        consecuencia: 'Rigidez frente a cambios de negocio y desperdicio detallando trabajo lejano.'
      }
    ],
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Artefactos de Scrum — Product Backlog y Product Goal'
  },
  'artifact-sprint-backlog': {
    nodeId: 'artifact-sprint-backlog',
    origenMarco: 'scrum-oficial',
    compromisoOficial: 'Sprint Goal (Objetivo del Sprint)',
    antipatrones: [
      {
        mito: 'Es un compromiso fijo de tareas que el PO modifica a diario o que no se adapta.',
        realidad: 'Pertenece a los Developers, quienes lo actualizan diariamente manteniendo intacto el Sprint Goal.',
        consecuencia: 'Pérdida de autonomía técnica y desalineación táctica.'
      }
    ],
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Artefactos de Scrum — Sprint Backlog y Sprint Goal'
  },
  'artifact-increment': {
    nodeId: 'artifact-increment',
    origenMarco: 'scrum-oficial',
    compromisoOficial: 'Definition of Done (Definición de Terminado)',
    glosarioSiglas: [
      { sigla: 'DoD', significado: 'Definition of Done: criterios formales de calidad para liberar valor.' },
      { sigla: 'PSPI', significado: 'Denominación previa (2017); en 2020 se denomina Incremento utilizable.' }
    ],
    antipatrones: [
      {
        mito: 'Solo existe un único Incremento por Sprint y recién se entrega al terminar la Sprint Review.',
        realidad: 'Pueden nacer múltiples Incrementos utilizables y aditivos durante el mismo Sprint al cumplir la DoD.',
        consecuencia: 'Acumulación de entregas al final del ciclo y retraso en obtener feedback real.'
      }
    ],
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Artefactos de Scrum — Increment y Definition of Done'
  }
};
