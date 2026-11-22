/**
 * Banco de preguntas situacionales para el Desafío Scrum (alineado a la Guía 2020).
 */

import type { EscenarioQuizScrum } from '../tiposDominio';

export const bancoQuizScrum: EscenarioQuizScrum[] = [
  {
    id: 'quiz-01-dod-review',
    categoria: 'Artefactos',
    escenario:
      'En MercadoÁgil faltan 2 horas para la Sprint Review y un PBI de pago con QR aún no pasó las pruebas de seguridad exigidas por la Definition of Done. ¿Qué debe ocurrir?',
    opciones: [
      'Se presenta en la Review con una advertencia para que el negocio opine sobre la interfaz.',
      'No se presenta ni se considera parte del Incremento; regresa al Product Backlog para decisión del PO.',
      'El Scrum Master autoriza una excepción temporal por única vez.'
    ],
    indiceCorrecto: 1,
    explicacion:
      'Si un PBI no cumple la Definition of Done, no puede liberarse ni presentarse en la Sprint Review; vuelve al Product Backlog para consideración futura.',
    nodoRelacionadoId: 'artifact-increment',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'quiz-02-cancelar-sprint',
    categoria: 'Eventos',
    escenario:
      'La gerencia cambia la estrategia comercial y el Sprint Goal actual queda completamente obsoleto a mitad del ciclo. ¿Quién tiene la autoridad para cancelar el Sprint?',
    opciones: [
      'El Scrum Master, tras consultar a los Developers.',
      'Únicamente el Product Owner.',
      'Cualquier gerente o stakeholder principal.'
    ],
    indiceCorrecto: 1,
    explicacion:
      'Un Sprint puede cancelarse si el Sprint Goal se vuelve obsoleto, y únicamente el Product Owner tiene la autoridad para hacerlo.',
    nodoRelacionadoId: 'event-sprint',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'quiz-03-daily-formato',
    categoria: 'Eventos',
    escenario:
      'Un Scrum Master nuevo exige que todos los Developers respondan las 3 preguntas clásicas frente al tablero durante 25 minutos en la Daily Scrum. ¿Qué indica la Guía 2020?',
    opciones: [
      'Es correcto porque las 3 preguntas son obligatorias en toda Daily.',
      'La Daily dura máximo 15 minutos y los Developers eligen la estructura técnica que mejor enfoque el progreso hacia el Sprint Goal.',
      'La Daily debe durar 30 minutos si el Sprint es de 4 semanas.'
    ],
    indiceCorrecto: 1,
    explicacion:
      'La Guía 2020 eliminó las 3 preguntas prescriptivas y mantiene fijo el timebox de 15 minutos independientemente de la duración del Sprint.',
    nodoRelacionadoId: 'event-daily-scrum',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'quiz-04-po-persona',
    categoria: 'Roles',
    escenario:
      'Para agilizar decisiones en la tienda digital, la empresa propone crear un «Comité de Product Owners» de 3 gerentes con igual poder sobre el Backlog. ¿Es válido en Scrum?',
    opciones: [
      'Sí, siempre que los tres asistan al Sprint Planning.',
      'No; el Product Owner es una sola persona, no un comité, aunque represente las necesidades de muchos interesados.',
      'Sí, si el Scrum Master actúa como árbitro de desempate.'
    ],
    indiceCorrecto: 1,
    explicacion:
      'La Guía 2020 establece explícitamente que el Product Owner es una persona, no un comité, para asegurar claridad de responsabilidad sobre el Product Backlog.',
    nodoRelacionadoId: 'role-product-owner',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'quiz-05-discovery-compromiso',
    categoria: 'Artefactos',
    escenario:
      'Un estudiante afirma que el Product Vision Board y el Impact Mapping son compromisos oficiales definidos en la Guía Scrum 2020. ¿Cuál es la afirmación correcta?',
    opciones: [
      'Los tres compromisos oficiales son únicamente Product Goal, Sprint Goal y Definition of Done.',
      'Vision Board e Impact Mapping son compromisos oficiales de planificación.',
      'El único compromiso oficial en Scrum es la Definition of Done.'
    ],
    indiceCorrecto: 0,
    explicacion:
      'La Guía Scrum 2020 define exactamente tres compromisos: Product Goal (Product Backlog), Sprint Goal (Sprint Backlog) y DoD (Increment). Vision Board, Impact Mapping y Story Mapping son prácticas complementarias.',
    nodoRelacionadoId: 'artifact-product-backlog',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'quiz-06-timebox-planning',
    categoria: 'Eventos',
    escenario:
      'Tu equipo trabaja con Sprints de 2 semanas. ¿Cuál es el timebox máximo recomendado para el Sprint Planning según la proporcionalidad oficial?',
    opciones: [
      '8 horas en todos los casos.',
      '4 horas (proporcional a la mitad de un mes).',
      '2 horas sin importar el alcance.'
    ],
    indiceCorrecto: 1,
    explicacion:
      'El Sprint Planning tiene un tope de 8 horas para un Sprint de un mes; para Sprints más breves (como 2 semanas) suele ser proporcionalmente menor (4 horas).',
    nodoRelacionadoId: 'event-sprint-planning',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'quiz-07-multiples-incrementos',
    categoria: 'Empirismo',
    escenario:
      'En el día 5 del Sprint, los Developers completan un PBI de validación de cupones cumpliendo toda la Definition of Done. ¿Deben esperar al Sprint Review para entregarlo?',
    opciones: [
      'Sí, nunca se puede liberar antes del cierre del Sprint.',
      'No; pueden crearse y entregarse múltiples Incrementos utilizables dentro del mismo Sprint sin esperar a la Review.',
      'Solo si el Scrum Master firma una orden de despliegue.'
    ],
    indiceCorrecto: 1,
    explicacion:
      'En el instante en que un elemento cumple la DoD nace un Incremento utilizable que puede entregarse a los interesados antes de finalizar el Sprint.',
    nodoRelacionadoId: 'artifact-increment',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'quiz-08-retrospectiva-dod',
    categoria: 'Empirismo',
    escenario:
      '¿Qué aspectos inspecciona el Scrum Team durante la Sprint Retrospective según la Guía 2020?',
    opciones: [
      'Solo el código fuente y las métricas de velocidad individual.',
      'Individuos, interacciones, procesos, herramientas y su Definition of Done.',
      'Únicamente los requisitos funcionales pendientes con los clientes.'
    ],
    indiceCorrecto: 1,
    explicacion:
      'La Sprint Retrospective inspecciona cómo fue el último Sprint respecto a individuos, interacciones, procesos, herramientas y la Definition of Done.',
    nodoRelacionadoId: 'event-sprint-retrospective',
    fuenteId: 'scrum-guide-2020'
  }
];
