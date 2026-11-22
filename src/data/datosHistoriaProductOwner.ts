/**
 * Definición formal de los 5 capítulos narrativos del modo temático:
 * "El Rol del Product Owner" (Maximizador de Valor).
 */

import type { CapituloHistoria } from './datosHistoria';

export const capitulosHistoriaProductOwner: CapituloHistoria[] = [
  {
    id: 0,
    pasoNumero: 1,
    titulo: 'La Visión Estratégica',
    subtitulo: 'Product Owner & Product Vision Board',
    narrativa:
      'El Product Owner (una sola persona, no un comité) define la brújula estratégica del producto con el Product Vision Board: público objetivo, necesidades críticas, propuesta de valor diferenciadora y metas del negocio.',
    idsNodosNuevos: ['role-product-owner', 'artifact-vision-board'],
    idsDestacados: ['role-product-owner', 'artifact-vision-board']
  },
  {
    id: 1,
    pasoNumero: 2,
    titulo: 'Discovery, Product Goal y Product Backlog',
    subtitulo: 'Impact Mapping ➔ Story Map ➔ Backlog',
    narrativa:
      'Traduce la visión en hipótesis medibles (Impact Mapping) y las organiza a lo largo del viaje del usuario (User Story Mapping) antes de formalizar el Product Goal y ordenar el Product Backlog como única fuente de trabajo.',
    idsNodosNuevos: ['artifact-impact-mapping', 'artifact-user-story-mapping', 'artifact-product-backlog'],
    idsDestacados: ['role-product-owner', 'artifact-impact-mapping', 'artifact-user-story-mapping', 'artifact-product-backlog']
  },
  {
    id: 2,
    pasoNumero: 3,
    titulo: 'Alineación en Sprint Planning',
    subtitulo: 'El Foco de Valor para el Sprint',
    narrativa:
      'Al comenzar el Sprint, el Product Owner propone cómo incrementar el valor del producto en el Sprint Planning. Colabora activamente con los Developers para negociar un Sprint Goal viable y motivador.',
    idsNodosNuevos: ['event-sprint-planning'],
    idsDestacados: ['role-product-owner', 'event-sprint-planning']
  },
  {
    id: 3,
    pasoNumero: 4,
    titulo: 'Clarificación y Soporte Continuo',
    subtitulo: 'Colaboración Directa con Developers',
    narrativa:
      'Durante todo el ciclo del Sprint, el Product Owner acompaña a los Developers para resolver dudas funcionales, refinar criterios y renegociar alcance si surgen imprevistos, siendo además el único con autoridad para cancelar un Sprint si su objetivo queda obsoleto.',
    idsNodosNuevos: ['role-developers', 'artifact-sprint-backlog'],
    idsDestacados: ['role-product-owner', 'role-developers', 'artifact-sprint-backlog']
  },
  {
    id: 4,
    pasoNumero: 5,
    titulo: 'Inspección de Valor con Stakeholders',
    subtitulo: 'La Sprint Review',
    narrativa:
      'En la Sprint Review, el Product Owner colabora con los clientes y partes interesadas inspeccionando el Incremento utilizable que cumple la DoD, y adapta el orden del Product Backlog para los próximos Sprints.',
    idsNodosNuevos: ['event-sprint-review', 'artifact-increment'],
    idsDestacados: ['role-product-owner', 'event-sprint-review', 'artifact-increment']
  }
];
