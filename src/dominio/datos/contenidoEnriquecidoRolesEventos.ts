/**
 * Contenido enriquecido (fuentes APA, glosario de siglas y antipatrones) para Roles y Eventos.
 */

import type { ContenidoEnriquecidoNodo } from '../tiposDominio';

export const contenidoEnriquecidoRolesEventos: Record<string, ContenidoEnriquecidoNodo> = {
  'role-product-owner': {
    nodeId: 'role-product-owner',
    origenMarco: 'scrum-oficial',
    glosarioSiglas: [{ sigla: 'PO', significado: 'Product Owner (responsable único de maximizar el valor).' }],
    antipatrones: [
      {
        mito: 'El Product Owner puede ser un comité o aprobar pedidos directos de gerentes sin ordenarlos.',
        realidad: 'Es una sola persona y toda la organización debe respetar sus decisiones en el Product Backlog.',
        consecuencia: 'Backlog contradictorio sin Product Goal claro y pérdida de foco.'
      }
    ],
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'El Equipo Scrum — Product Owner'
  },
  'role-developers': {
    nodeId: 'role-developers',
    origenMarco: 'scrum-oficial',
    glosarioSiglas: [
      { sigla: 'DoD', significado: 'Definition of Done (estándar obligatorio de calidad).' },
      { sigla: 'Dev Team', significado: 'Término de la Guía 2017 reemplazado por Developers en 2020.' }
    ],
    antipatrones: [
      {
        mito: 'Hay subequipos internos (Frontend, Backend, QA) o un jefe técnico que asigna tareas.',
        realidad: 'No existen subequipos ni jerarquías; los Developers se autogestionan y comparten la responsabilidad.',
        consecuencia: 'Silos internos, traspasos lentos y baja calidad en el Incremento.'
      }
    ],
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'El Equipo Scrum — Developers'
  },
  'role-scrum-master': {
    nodeId: 'role-scrum-master',
    origenMarco: 'scrum-oficial',
    glosarioSiglas: [{ sigla: 'SM', significado: 'Scrum Master (verdadero líder que sirve al equipo y organización).' }],
    antipatrones: [
      {
        mito: 'El Scrum Master es un secretario que agenda reuniones o un jefe que controla horas.',
        realidad: 'Sirve al Scrum Team, al PO y a la organización habilitando empirismo y removiendo impedimentos.',
        consecuencia: 'Microgestión disfrazada de agilidad y equipos dependientes.'
      }
    ],
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'El Equipo Scrum — Scrum Master'
  },
  'event-sprint': {
    nodeId: 'event-sprint',
    origenMarco: 'scrum-oficial',
    antipatrones: [
      {
        mito: 'El Sprint es una etapa más antes del Planning o puede extenderse unos días si falta trabajo.',
        realidad: 'Es el contenedor de longitud fija (un mes o menos) que aloja a los otros cuatro eventos.',
        consecuencia: 'Pérdida de cadencia empírica y dificultad para prever el progreso.'
      }
    ],
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Eventos de Scrum — El Sprint'
  },
  'event-sprint-planning': {
    nodeId: 'event-sprint-planning',
    origenMarco: 'scrum-oficial',
    glosarioSiglas: [
      { sigla: 'PBI', significado: 'Product Backlog Item (elemento unitario del Product Backlog).' },
      { sigla: 'Refinement', significado: 'Actividad continua para detallar y dividir PBIs antes del Planning.' }
    ],
    antipatrones: [
      {
        mito: 'El Product Owner impone cuántas historias entran al Sprint sin consultar capacidad.',
        realidad: 'Solo los Developers evalúan qué trabajo pueden completar conforme a la DoD.',
        consecuencia: 'Sobrecompromiso crónico, horas extra y deuda técnica.'
      }
    ],
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Eventos de Scrum — Sprint Planning'
  },
  'event-daily-scrum': {
    nodeId: 'event-daily-scrum',
    origenMarco: 'scrum-oficial',
    antipatrones: [
      {
        mito: 'Es obligatorio responder las 3 preguntas clásicas rindiendo cuentas al Scrum Master.',
        realidad: 'La Guía 2020 eliminó las 3 preguntas obligatorias; es una sincronización táctica entre Developers.',
        consecuencia: 'Reuniones de estatus pasivas donde nadie adapta el plan diario.'
      }
    ],
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Eventos de Scrum — Daily Scrum'
  },
  'event-sprint-review': {
    nodeId: 'event-sprint-review',
    origenMarco: 'scrum-oficial',
    antipatrones: [
      {
        mito: 'Es una demo unilateral con diapositivas donde también se muestran ítems a medio terminar.',
        realidad: 'Es una sesión colaborativa sobre Incrementos que cumplen la DoD para adaptar el Backlog.',
        consecuencia: 'Falsa sensación de avance y desconexión con el mercado.'
      }
    ],
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Eventos de Scrum — Sprint Review'
  },
  'event-sprint-retrospective': {
    nodeId: 'event-sprint-retrospective',
    origenMarco: 'scrum-oficial',
    antipatrones: [
      {
        mito: 'Se cancela cuando hay apuro o se limita a quejas sin acciones concretas.',
        realidad: 'Inspecciona personas, interacciones, procesos, herramientas y la DoD generando mejoras accionables.',
        consecuencia: 'Repetición indefinida de los mismos cuellos de botella.'
      }
    ],
    fuenteId: 'scrum-guide-2020',
    seccionFuente: 'Eventos de Scrum — Sprint Retrospective'
  }
};
