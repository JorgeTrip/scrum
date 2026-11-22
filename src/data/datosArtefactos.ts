/**
 * Definición de Prácticas Complementarias de Discovery y Artefactos Oficiales de Scrum 2020.
 * Carril Inferior: y = 626
 */

import type { NodoScrum } from '../types/scrum';

export const nodosArtefactos: NodoScrum[] = [
  {
    id: 'artifact-vision-board',
    type: 'artifactNode',
    position: { x: -174, y: 626 },
    data: {
      id: 'artifact-vision-board',
      label: 'Product Vision Board',
      category: 'artifact',
      summary: 'Práctica estratégica (Pichler) que define público objetivo, necesidades críticas, propuesta de valor y metas del negocio.',
      akas: ['Tablero de Visión', 'Product Vision Canvas', 'Visión del Producto'],
      details: {
        inputs: ['Investigación de mercado', 'Entrevistas con clientes', 'Visión corporativa'],
        outputs: [
          'Salida clave: Visión Clara del Producto',
          'Fundamento estratégico que inspira el Product Goal y el Product Backlog inicial'
        ],
        theoreticalBasis:
          'Práctica complementaria de Roman Pichler (externa a la Guía Scrum oficial); actúa como brújula estratégica respondiendo el «por qué» y «para quién» antes de poblar el backlog.'
      }
    }
  },
  {
    id: 'artifact-impact-mapping',
    type: 'artifactNode',
    position: { x: 252, y: 626 },
    data: {
      id: 'artifact-impact-mapping',
      label: 'Impact Mapping',
      category: 'artifact',
      summary: 'Técnica gráfica colaborativa (Adzic) que conecta metas de negocio con cambios de comportamiento en actores y entregables.',
      akas: ['Mapeo de Impacto', 'Goal-Oriented Mapping', 'Adzic Mapping'],
      details: {
        inputs: ['Product Vision Board', 'Metas estratégicas de negocio', 'Investigación de usuarios'],
        outputs: [
          'Salida clave: Hipótesis de Impacto Validadas',
          'Insumos priorizados para actividades de usuario y entregables medibles'
        ],
        theoreticalBasis:
          'Práctica complementaria de Gojko Adzic; previene la trampa del feature-factory enfocando el esfuerzo solo en cambios de comportamiento que mueven métricas de negocio.'
      }
    }
  },
  {
    id: 'artifact-user-story-mapping',
    type: 'artifactNode',
    position: { x: 676, y: 626 },
    data: {
      id: 'artifact-user-story-mapping',
      label: 'User Story Mapping',
      category: 'artifact',
      summary: 'Mapa visual bidimensional (Patton) que ordena historias a lo largo del viaje del usuario (Backbone) y prioriza en Slices.',
      akas: ['Mapa de Historias', 'Story Map', 'Patton Map', 'User Journey Map'],
      details: {
        inputs: ['Impact Mapping', 'Entrevistas de usuario', 'Flujo de actividades clave'],
        outputs: [
          'Salida clave: Rebanadas de Entrega (Slices)',
          'Historias de usuario contextualizadas listas para refinar en el Product Backlog'
        ],
        theoreticalBasis:
          'Práctica complementaria de Jeff Patton; erradica la pérdida de contexto del backlog plano organizando las historias sobre el viaje completo del cliente.'
      }
    }
  },
  {
    id: 'artifact-product-backlog',
    type: 'artifactNode',
    position: { x: 1124, y: 626 },
    data: {
      id: 'artifact-product-backlog',
      label: 'Product Backlog',
      category: 'artifact',
      summary: 'Lista emergente y ordenada de lo necesario para mejorar el producto; única fuente de trabajo del Scrum Team.',
      akas: ['PBL', 'Pila del Producto', 'Backlog del Producto', 'PBI List'],
      details: {
        inputs: ['User Story Mapping', 'Product Vision Board', 'Feedback continuo de Sprint Review'],
        outputs: [
          'Compromiso: Product Goal (Objetivo del Producto)',
          'Elementos del Product Backlog (PBI) refinados y ordenados por valor'
        ],
        theoreticalBasis:
          'Artefacto oficial de Scrum 2020. Es la única fuente de trabajo del Scrum Team; su compromiso es el Product Goal, objetivo a largo plazo contra el cual el equipo planifica.'
      }
    }
  },
  {
    id: 'artifact-sprint-backlog',
    type: 'artifactNode',
    position: { x: 1429, y: 626 },
    data: {
      id: 'artifact-sprint-backlog',
      label: 'Sprint Backlog',
      category: 'artifact',
      summary: 'Plan creado por y para los Developers compuesto por el Sprint Goal (por qué), PBIs (qué) y plan de acción (cómo).',
      akas: ['SBL', 'Pila del Sprint', 'Backlog del Sprint', 'Plan del Sprint'],
      details: {
        inputs: ['Product Backlog priorizado', 'Capacidad del equipo', 'Definition of Done'],
        outputs: [
          'Compromiso: Sprint Goal (Objetivo del Sprint)',
          'Plan táctico en tiempo real actualizado por los Developers durante el Sprint'
        ],
        theoreticalBasis:
          'Artefacto oficial de Scrum 2020. Es una imagen en tiempo real, muy visible, del trabajo que los Developers planean realizar para lograr su compromiso: el Sprint Goal.'
      }
    }
  },
  {
    id: 'artifact-increment',
    type: 'artifactNode',
    position: { x: 1857, y: 626 },
    data: {
      id: 'artifact-increment',
      label: 'Increment',
      category: 'artifact',
      summary: 'Peldaño concreto, aditivo y utilizable hacia el Product Goal; nace al cumplir la Definition of Done.',
      akas: ['Incremento Utilizable', 'Incremento de Producto', 'PSPI (término 2017)'],
      details: {
        inputs: ['PBIs completados', 'Verificación integrada y pruebas conformes a calidad'],
        outputs: [
          'Compromiso: Definition of Done (Definición de Terminado)',
          'Uno o varios incrementos utilizables y aditivos por Sprint'
        ],
        theoreticalBasis:
          'Artefacto oficial de Scrum 2020. Pueden crearse múltiples Incrementos dentro de un Sprint y entregarse antes de la Sprint Review. Cada Incremento es aditivo a todos los anteriores y debe cumplir la Definition of Done.'
      }
    }
  }
];
