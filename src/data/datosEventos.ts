/**
 * Definición de los Eventos oficiales de Scrum (Guía 2020).
 * Carril Medio alineado uniformemente en y = 257.
 */

import type { NodoScrum } from '../types/scrum';

export const nodosEventos: NodoScrum[] = [
  {
    id: 'event-sprint',
    type: 'eventNode',
    position: { x: 430, y: 257 },
    data: {
      id: 'event-sprint',
      label: 'Sprint',
      category: 'event',
      summary: 'Contenedor de longitud fija donde las ideas se convierten en valor y ocurren todos los demás eventos.',
      akas: ['El Sprint', 'Iteración', 'Contenedor Temporal', 'Timebox'],
      details: {
        timebox: 'Un mes o menos (1 a 4 semanas, duración constante).',
        inputs: ['Product Backlog ordenado', 'Product Goal', 'Capacidad del Scrum Team'],
        outputs: ['Uno o más Incrementos utilizables inspeccionables que cumplen la Definition of Done'],
        theoreticalBasis:
          'Contiene al Planning, Daily, Review y Retrospective. Durante el Sprint no se hacen cambios que pongan en peligro el Sprint Goal, la calidad no disminuye y solo el Product Owner puede cancelarlo.'
      }
    }
  },
  {
    id: 'event-sprint-planning',
    type: 'eventNode',
    position: { x: 851, y: 257 },
    data: {
      id: 'event-sprint-planning',
      label: 'Sprint Planning',
      category: 'event',
      summary: 'Evento que inicia el Sprint definiendo el trabajo a realizar de forma colaborativa por todo el Scrum Team.',
      akas: ['Planificación del Sprint', 'Planning', 'Reunión de Planificación'],
      details: {
        timebox: 'Máximo 8 horas para un Sprint de un mes (proporcionalmente menor para Sprints más breves).',
        inputs: ['Product Backlog (con Backlog Refinement continuo)', 'Capacidad proyectada', 'Definition of Done'],
        outputs: ['Sprint Goal formalizado', 'Selección de PBI para el Sprint', 'Plan inicial de entrega'],
        theoreticalBasis:
          'Aborda tres temas esenciales: ¿Por qué es valioso este Sprint? (Sprint Goal), ¿Qué se puede hacer en este Sprint? y ¿Cómo se llevará a cabo el trabajo seleccionado?'
      }
    }
  },
  {
    id: 'event-daily-scrum',
    type: 'eventNode',
    position: { x: 1334, y: 257 },
    data: {
      id: 'event-daily-scrum',
      label: 'Daily Scrum',
      category: 'event',
      summary: 'Evento diario de 15 minutos para que los Developers inspeccionen el progreso hacia el Sprint Goal.',
      akas: ['Daily Standup', 'Daily', 'Scrum Diario'],
      details: {
        timebox: '15 minutos diarios fijos (sin importar duración del Sprint).',
        inputs: ['Sprint Backlog actual', 'Avance hacia el Sprint Goal', 'Impedimentos emergentes'],
        outputs: ['Sprint Backlog adaptado', 'Plan práctico para las próximas 24 horas'],
        theoreticalBasis:
          'La Guía 2020 eliminó las 3 preguntas obligatorias: los Developers eligen cualquier estructura o técnica enfocada en el Sprint Goal. PO y SM solo participan como Developers si trabajan en ítems del Sprint Backlog.'
      }
    }
  },
  {
    id: 'event-sprint-review',
    type: 'eventNode',
    position: { x: 1815, y: 257 },
    data: {
      id: 'event-sprint-review',
      label: 'Sprint Review',
      category: 'event',
      summary: 'Sesión colaborativa de trabajo donde el Scrum Team y los interesados inspeccionan el resultado del Sprint.',
      akas: ['Revisión del Sprint', 'Demo (evitar formato pasivo)'],
      details: {
        timebox: 'Máximo 4 horas para un Sprint de un mes (proporcionalmente menor para Sprints más breves).',
        inputs: ['Incremento utilizable que cumple 100% la Definition of Done', 'Cambios del entorno y negocio'],
        outputs: ['Product Backlog adaptado con feedback directo', 'Proyecciones compartidas de avance'],
        theoreticalBasis:
          'No es una mera presentación pasiva ni admite elementos sin terminar. Los asistentes colaboran sobre lo logrado y lo que cambió en el entorno para decidir qué sigue a continuación.'
      }
    }
  },
  {
    id: 'event-sprint-retrospective',
    type: 'eventNode',
    position: { x: 2205, y: 257 },
    data: {
      id: 'event-sprint-retrospective',
      label: 'Sprint Retrospective',
      category: 'event',
      summary: 'Evento final del Sprint para planificar cómo aumentar la calidad y la efectividad del Scrum Team.',
      akas: ['Retrospectiva del Sprint', 'Retro', 'Sprint Retro'],
      details: {
        timebox: 'Máximo 3 horas para un Sprint de un mes (proporcionalmente menor para Sprints más breves).',
        inputs: ['Último Sprint respecto a individuos, interacciones, procesos, herramientas y Definition of Done'],
        outputs: ['Mejoras de mayor impacto priorizadas (incluso agregables al próximo Sprint Backlog)'],
        theoreticalBasis:
          'Cierra el Sprint analizando qué salió bien, qué problemas surgieron y cómo se resolvieron, incluyendo la revisión explícita de la Definition of Done para elevar continuamente la calidad.'
      }
    }
  }
];
