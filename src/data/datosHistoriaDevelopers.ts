/**
 * Definición formal de los 5 capítulos narrativos del modo temático:
 * "La Perspectiva de los Developers" (Construcción de Incrementos Utilizables).
 */

import type { CapituloHistoria } from './datosHistoria';

export const capitulosHistoriaDevelopers: CapituloHistoria[] = [
  {
    id: 0,
    pasoNumero: 1,
    titulo: 'Autogestión y Multidisciplinariedad',
    subtitulo: 'Developers & Sprint Planning',
    narrativa:
      'Los Developers son profesionales sin subequipos ni jerarquías que asumen la responsabilidad de crear Incrementos utilizables. En el Sprint Planning seleccionan junto al PO qué PBI pueden completar y diseñan cómo realizar el trabajo.',
    idsNodosNuevos: ['role-developers', 'event-sprint-planning', 'artifact-product-backlog'],
    idsDestacados: ['role-developers', 'event-sprint-planning']
  },
  {
    id: 1,
    pasoNumero: 2,
    titulo: 'El Plan Táctico del Sprint',
    subtitulo: 'Propiedad del Sprint Backlog',
    narrativa:
      'Como resultado de su análisis técnico, los Developers crean el Sprint Backlog: un pronóstico visible del trabajo necesario para cumplir el Sprint Goal. Es propiedad exclusiva suya y se actualiza a medida que aprenden durante el ciclo.',
    idsNodosNuevos: ['artifact-sprint-backlog'],
    idsDestacados: ['role-developers', 'artifact-sprint-backlog']
  },
  {
    id: 2,
    pasoNumero: 3,
    titulo: 'Sincronización Diaria de 15 Minutos',
    subtitulo: 'La Daily Scrum',
    narrativa:
      'Cada 24 horas los Developers celebran la Daily Scrum utilizando el formato que prefieran (sin las 3 preguntas obligatorias desde 2020) para inspeccionar su progreso hacia el Sprint Goal y adaptar su plan táctico inmediato.',
    idsNodosNuevos: ['event-daily-scrum'],
    idsDestacados: ['role-developers', 'event-daily-scrum']
  },
  {
    id: 3,
    pasoNumero: 4,
    titulo: 'Calidad e Incremento Utilizable',
    subtitulo: 'Adherencia a la Definition of Done',
    narrativa:
      'Los Developers infunden calidad cumpliendo estrictamente la Definition of Done. Cada vez que un elemento alcanza ese estándar nace un Incremento utilizable y aditivo, pudiendo entregarse múltiples veces dentro del mismo Sprint.',
    idsNodosNuevos: ['artifact-increment'],
    idsDestacados: ['role-developers', 'artifact-increment']
  },
  {
    id: 4,
    pasoNumero: 5,
    titulo: 'Inspección de Valor y Mejora Técnica',
    subtitulo: 'Sprint Review & Retrospective',
    narrativa:
      'En la Sprint Review colaboran con interesados inspeccionando los Incrementos terminados; luego, en la Sprint Retrospective, revisan sus prácticas, herramientas y Definition of Done para elevar la calidad del próximo ciclo.',
    idsNodosNuevos: ['event-sprint-review', 'event-sprint-retrospective'],
    idsDestacados: ['role-developers', 'event-sprint-review', 'event-sprint-retrospective']
  }
];
