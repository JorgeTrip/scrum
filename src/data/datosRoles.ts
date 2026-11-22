/**
 * Definición de los Roles / Accountabilities oficiales de Scrum (Guía 2020).
 * Carril Superior: y = -53
 */

import type { NodoScrum } from '../types/scrum';

export const nodosRoles: NodoScrum[] = [
  {
    id: 'role-product-owner',
    type: 'roleNode',
    position: { x: 107, y: -53 },
    data: {
      id: 'role-product-owner',
      label: 'Product Owner',
      category: 'role',
      summary: 'Responsable único (accountability) de maximizar el valor del producto y optimizar la gestión del Product Backlog.',
      akas: ['PO', 'Dueño del Producto', 'Responsable del Producto'],
      details: {
        responsibilities: [
          'Desarrollar y comunicar explícitamente el Product Goal (Objetivo del Producto).',
          'Crear, comunicar claramente y ordenar de forma transparente los elementos del Product Backlog.',
          'Garantizar que el Product Backlog sea visible, transparente y entendido por todos.',
          'Actuar como una sola persona (no un comité) con autoridad exclusiva para cancelar un Sprint si el objetivo queda obsoleto.'
        ],
        theoreticalBasis:
          'El Product Owner es una persona, no un comité. Para que tenga éxito, toda la organización debe respetar sus decisiones, las cuales se reflejan en el contenido y orden del Product Backlog.'
      }
    }
  },
  {
    id: 'role-developers',
    type: 'roleNode',
    position: { x: 631, y: -53 },
    data: {
      id: 'role-developers',
      label: 'Developers',
      category: 'role',
      summary: 'Profesionales multidisciplinarios del Scrum Team comprometidos con crear cualquier aspecto de un Incremento utilizable cada Sprint.',
      akas: ['Desarrolladores', 'Dev Team (deprecado 2017)', 'Equipo de Desarrollo (deprecado 2017)'],
      details: {
        responsibilities: [
          'Crear el plan para el Sprint (el Sprint Backlog) y realizar el dimensionamiento técnico.',
          'Infundir calidad adhiriéndose estrictamente a la Definition of Done.',
          'Adaptar diariamente su plan hacia el Sprint Goal durante la Daily Scrum.',
          'Responsabilizarse mutuamente como profesionales autogestionados sin subequipos ni jerarquías internas.'
        ],
        theoreticalBasis:
          'La Guía 2020 eliminó el subequipo «Development Team» integrando un único Scrum Team sin jerarquías. Los Developers abarcan todas las habilidades necesarias para crear valor cada Sprint.'
      }
    }
  },
  {
    id: 'role-scrum-master',
    type: 'roleNode',
    position: { x: 1210, y: -53 },
    data: {
      id: 'role-scrum-master',
      label: 'Scrum Master',
      category: 'role',
      summary: 'Verdadero líder que sirve al Scrum Team y a la organización, responsable de instaurar Scrum y promover su efectividad.',
      akas: ['SM', 'Facilitador Ágil', 'True Leader Who Serves (ex Servant Leader 2017)'],
      details: {
        responsibilities: [
          'Al Scrum Team: guiar en autogestión, multidisciplinariedad, enfoque en Incrementos de alto valor y eliminación de impedimentos.',
          'Al Product Owner: facilitar técnicas para definir el Product Goal y gestionar empíricamente el Product Backlog.',
          'A la Organización: liderar y capacitar la adopción de Scrum y derribar barreras entre stakeholders y equipos.',
          'Asegurar que todos los eventos de Scrum ocurran y sean positivos, productivos y dentro de su timebox.'
        ],
        theoreticalBasis:
          'Los Scrum Masters son verdaderos líderes que sirven al Scrum Team y a la organización en general, promoviendo la teoría y práctica del empirismo definida en la Guía de Scrum 2020.'
      }
    }
  }
];
