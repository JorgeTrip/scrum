/**
 * Metadatos pedagógicos y citas APA para relaciones entre Artefactos, Eventos y Bucles Empíricos.
 */

import type { MetadatoAristaScrum } from '../tiposDominio';

export const metadatosAristasFlujo: Record<string, MetadatoAristaScrum> = {
  'edge-vision-to-im': {
    edgeId: 'edge-vision-to-im',
    tituloRelacion: 'Product Vision Board ➔ Impact Mapping',
    familiaColor: 'artefactos',
    explicacion: 'Traduce los objetivos de negocio de la visión en metas medibles e impactos en actores.',
    impactoSiSeRompe: 'Se diseñan funcionalidades sin comprobar qué comportamiento del usuario cambian.',
    fuenteId: 'adzic-impact-mapping',
    seccionFuente: 'Why & Who'
  },
  'edge-im-to-usm': {
    edgeId: 'edge-im-to-usm',
    tituloRelacion: 'Impact Mapping ➔ User Story Mapping',
    familiaColor: 'artefactos',
    explicacion: 'Ubica los entregables validados dentro del viaje secuencial real del usuario.',
    impactoSiSeRompe: 'Las historias quedan fragmentadas sin visibilidad del flujo completo de uso.',
    fuenteId: 'patton-story-mapping',
    seccionFuente: 'The Big Picture'
  },
  'edge-usm-to-pb': {
    edgeId: 'edge-usm-to-pb',
    tituloRelacion: 'User Story Mapping ➔ Product Backlog',
    familiaColor: 'artefactos',
    explicacion: 'Convierte las rebanadas (Slices) del mapa de historias en PBIs ordenados por valor.',
    impactoSiSeRompe: 'Backlog plano y abrumador sin coherencia de lanzamiento.',
    fuenteId: 'patton-story-mapping',
    seccionFuente: 'Release Slices to Backlog'
  },
  'edge-sprint-to-planning': {
    edgeId: 'edge-sprint-to-planning',
    tituloRelacion: 'Sprint ➔ Sprint Planning',
    familiaColor: 'eventos',
    explicacion: 'El Sprint contiene los cuatro eventos formales y comienza con el Sprint Planning.',
    impactoSiSeRompe: 'El equipo comienza a trabajar sin Sprint Goal ni alcance consensuado.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'El Sprint & Sprint Planning'
  },
  'edge-pb-to-planning': {
    edgeId: 'edge-pb-to-planning',
    tituloRelacion: 'Product Backlog ➔ Sprint Planning',
    familiaColor: 'artefactos',
    explicacion: 'Provee los PBIs más prioritarios y refinados para seleccionar el alcance del Sprint.',
    impactoSiSeRompe: 'El Planning se traba discutiendo requerimientos ambiguos o sin orden.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Sprint Planning'
  },
  'edge-planning-to-sb': {
    edgeId: 'edge-planning-to-sb',
    tituloRelacion: 'Sprint Planning ➔ Sprint Backlog',
    familiaColor: 'artefactos',
    explicacion: 'Resulta en el Sprint Goal, los PBIs elegidos y el plan inicial de entrega.',
    impactoSiSeRompe: 'No existe referencia compartida sobre qué significa tener éxito en el Sprint.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Sprint Backlog'
  },
  'edge-planning-to-daily': {
    edgeId: 'edge-planning-to-daily',
    tituloRelacion: 'Sprint Planning ➔ Daily Scrum',
    familiaColor: 'eventos',
    explicacion: 'El plan acordado en Planning se inspecciona y adapta cada 24 horas en la Daily.',
    impactoSiSeRompe: 'El plan inicial se vuelve letra muerta frente a imprevistos reales.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Daily Scrum'
  },
  'edge-daily-to-review': {
    edgeId: 'edge-daily-to-review',
    tituloRelacion: 'Daily Scrum ➔ Sprint Review',
    familiaColor: 'eventos',
    explicacion: 'La sincronización diaria sostiene el avance hasta la inspección formal de fin de Sprint.',
    impactoSiSeRompe: 'Se llega a la Review con trabajo incompleto sin haber reaccionado a tiempo.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Eventos de Scrum'
  },
  'edge-sb-to-increment': {
    edgeId: 'edge-sb-to-increment',
    tituloRelacion: 'Sprint Backlog ➔ Increment',
    familiaColor: 'artefactos',
    explicacion: 'El trabajo ejecutado en el Sprint Backlog converge en Incrementos verificados con la DoD.',
    impactoSiSeRompe: 'Esfuerzo invertido en tareas que no se traducen en software utilizable.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Increment'
  },
  'edge-increment-to-review': {
    edgeId: 'edge-increment-to-review',
    tituloRelacion: 'Increment ➔ Sprint Review',
    familiaColor: 'artefactos',
    explicacion: 'Solo los Incrementos que cumplen la Definition of Done se inspeccionan con stakeholders.',
    impactoSiSeRompe: 'Se genera falsa transparencia presentando trabajo sin terminar.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Sprint Review & Definition of Done'
  },
  'edge-review-to-retro': {
    edgeId: 'edge-review-to-retro',
    tituloRelacion: 'Sprint Review ➔ Sprint Retrospective',
    familiaColor: 'eventos',
    explicacion: 'Tras inspeccionar el producto, el equipo cierra el Sprint evaluando cómo trabajó.',
    impactoSiSeRompe: 'No se capitalizan aprendizajes de proceso o calidad antes del nuevo ciclo.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Sprint Retrospective'
  },
  'edge-review-to-pb': {
    edgeId: 'edge-review-to-pb',
    tituloRelacion: 'Sprint Review ➔ Product Backlog (Bucle de Producto)',
    familiaColor: 'empirismo',
    explicacion: 'El feedback obtenido con interesados adapta directamente el orden y contenido del Product Backlog.',
    impactoSiSeRompe: 'El producto ignora el aprendizaje real del mercado entre Sprints.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Sprint Review — Resultado'
  },
  'edge-retro-to-next-cycle': {
    edgeId: 'edge-retro-to-next-cycle',
    tituloRelacion: 'Sprint Retrospective ➔ Siguiente Ciclo',
    familiaColor: 'empirismo',
    explicacion: 'Las mejoras prioritarias pueden incorporarse al siguiente Sprint Backlog o al Backlog general.',
    impactoSiSeRompe: 'Los impedimentos sistémicos y fallas de calidad se repiten ciclo tras ciclo.',
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Sprint Retrospective'
  }
};
