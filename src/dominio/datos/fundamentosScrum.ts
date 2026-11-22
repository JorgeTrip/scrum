/**
 * Fundamentos transversales de Scrum 2020: Pilares Empíricos, Valores y Comparativa 2017 vs 2020.
 */

import type { ComparativaGuia2020, PilarEmpirico, ValorScrum } from '../tiposDominio';

export const pilaresEmpiricos: PilarEmpirico[] = [
  {
    id: 'transparencia',
    nombre: 'Transparencia',
    definicion:
      'El proceso y el trabajo emergentes deben ser visibles tanto para quienes los realizan como para quienes reciben el trabajo.',
    dondeSeMaterializa: ['Product Backlog + Product Goal', 'Sprint Backlog + Sprint Goal', 'Increment + Definition of Done'],
    ejemploEcommerce:
      'En MercadoÁgil, cualquier interesado ve qué historias de Checkout están priorizadas y qué criterios DoD garantizan su salida a producción.',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'inspeccion',
    nombre: 'Inspección',
    definicion:
      'Los artefactos de Scrum y el progreso hacia los objetivos acordados deben inspeccionarse con frecuencia para detectar variaciones indeseadas.',
    dondeSeMaterializa: ['Sprint Planning', 'Daily Scrum', 'Sprint Review', 'Sprint Retrospective'],
    ejemploEcommerce:
      'En la Daily Scrum, los Developers revisan si el flujo de pago con tarjeta avanza según el Sprint Goal o requiere reasignar pares.',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'adaptacion',
    nombre: 'Adaptación',
    definicion:
      'Si algún aspecto del proceso se desvía de los límites aceptables o el producto resultante es inaceptable, debe ajustarse lo antes posible.',
    dondeSeMaterializa: ['Sprint Backlog (diario)', 'Product Backlog (Sprint Review)', 'Plan de mejoras (Retrospective)'],
    ejemploEcommerce:
      'Si en la Sprint Review los usuarios prefieren pago con QR antes que cuotas sin interés, el PO reordena el Product Backlog ese mismo día.',
    fuenteId: 'scrum-guide-2020'
  }
];

export const valoresScrum: ValorScrum[] = [
  {
    id: 'compromiso',
    nombre: 'Compromiso (Commitment)',
    descripcion: 'El Scrum Team se compromete a alcanzar sus metas y a apoyarse mutuamente.',
    ejemploPractico: 'En MercadoÁgil, todo el equipo se alinea para que el flujo de carrito quede utilizable y sin deuda oculta al cierre del Sprint.',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'foco',
    nombre: 'Foco (Focus)',
    descripcion: 'El enfoque principal está en el trabajo del Sprint para lograr el mayor progreso posible hacia los objetivos.',
    ejemploPractico: 'Evitar distraerse con nuevas secciones del catálogo mientras el Sprint Goal de pasarela de pago está en curso.',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'franqueza',
    nombre: 'Franqueza (Openness)',
    descripcion: 'El Scrum Team y los interesados acuerdan ser transparentes sobre todo el trabajo y los desafíos que enfrentan.',
    ejemploPractico: 'Comunicar de inmediato cuando la API del proveedor de envíos presenta latencia que pone en riesgo el objetivo.',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'respeto',
    nombre: 'Respeto (Respect)',
    descripcion: 'Los miembros del Scrum Team se respetan entre sí como personas capaces e independientes.',
    ejemploPractico: 'Los interesados respetan la decisión del Product Owner sobre el orden del Backlog y el equipo respeta las estimaciones técnicas.',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'coraje',
    nombre: 'Coraje (Courage)',
    descripcion: 'Los miembros tienen el coraje de hacer lo correcto y trabajar en problemas difíciles.',
    ejemploPractico: 'No presentar en la Sprint Review una pantalla de checkout que no cumple la Definition of Done, aunque haya presión comercial.',
    fuenteId: 'scrum-guide-2020'
  }
];

export const comparativa2017vs2020: ComparativaGuia2020[] = [
  {
    id: 'equipo-unico',
    categoria: 'Equipo',
    aspecto: 'Estructura interna del Scrum Team',
    guia2017: 'Existía el «Development Team» como subequipo separado dentro del Scrum Team.',
    guia2020: 'Un único Scrum Team cohesionado con tres Accountabilities: PO, SM y Developers.',
    razonCambio: 'Eliminar mentalidades de «nosotros vs. ellos» entre PO y equipo técnico.',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'tres-compromisos',
    categoria: 'Compromisos',
    aspecto: 'Compromisos explícitos de los artefactos',
    guia2017: 'Solo existía la Definition of Done; el Product Goal no existía formalmente.',
    guia2020: 'Cada artefacto tiene un compromiso: Product Goal (PB), Sprint Goal (SB) y DoD (Increment).',
    razonCambio: 'Aumentar la transparencia y alinear decisiones de largo y corto plazo.',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'autogestion',
    categoria: 'Equipo',
    aspecto: 'Autoorganización vs. Autogestión',
    guia2017: 'El Development Team era «autoorganizado» (decidía cómo hacer el trabajo).',
    guia2020: 'El Scrum Team completo es «autogestionado» (decide quién, cómo y en qué trabajar).',
    razonCambio: 'Reflejar mayor autonomía integral del equipo completo enfocado en valor.',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'daily-sin-guion',
    categoria: 'Eventos',
    aspecto: 'Formato de la Daily Scrum',
    guia2017: 'Sugería explícitamente las 3 preguntas clásicas (qué hice, qué haré, impedimentos).',
    guia2020: 'Elimina las 3 preguntas: los Developers eligen la técnica enfocada en el Sprint Goal.',
    razonCambio: 'Evitar que la Daily se reduzca a un reporte mecánico de estatus.',
    fuenteId: 'scrum-guide-2020'
  },
  {
    id: 'increment-usable',
    categoria: 'Lenguaje',
    aspecto: 'Naturaleza del Incremento y Liderazgo SM',
    guia2017: 'Hablaba de incremento «potencialmente entregable» y Scrum Master como «Servant Leader».',
    guia2020: 'Usa «Incremento utilizable» (usable) y define al SM como «verdadero líder que sirve».',
    razonCambio: 'Adoptar lenguaje menos prescriptivo y válido más allá del software tradicional.',
    fuenteId: 'scrum-guide-2020'
  }
];
