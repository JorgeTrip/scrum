/**
 * Caso práctico coherente de punta a punta: Tienda Digital "MercadoÁgil" (E-commerce).
 * Conecta Product Discovery, Gestión de Valor, Eventos y Entrega Incremental.
 */

import type { EjemploEcommerceNodo } from '../tiposDominio';

export const ejemplosEcommercePorNodo: Record<string, EjemploEcommerceNodo> = {
  'role-product-owner': {
    nodeId: 'role-product-owner',
    tituloPaso: 'Gobernanza de Valor en MercadoÁgil',
    artefactoEjemplo: 'Decisión de priorizar pago en 1 clic frente al rediseño visual de reseñas.',
    elementosClave: ['Alineación con meta de conversión (+20%)', 'Negociación de alcance con Finanzas y Logística'],
    conexionSiguiente: 'Transfiere la visión estratégica al Product Vision Board y ordena el Product Backlog.'
  },
  'role-developers': {
    nodeId: 'role-developers',
    tituloPaso: 'Ingeniería Multidisciplinaria del Checkout',
    artefactoEjemplo: 'Equipo full-stack + QA + UX diseñando la integración con pasarela de pagos y pruebas automatizadas.',
    elementosClave: ['Estimación técnica propia del carrito', 'Cobertura de tests antes de marcar Terminado'],
    conexionSiguiente: 'Transforman ítems seleccionados en el Sprint Backlog y generan el Incremento utilizable.'
  },
  'role-scrum-master': {
    nodeId: 'role-scrum-master',
    tituloPaso: 'Remoción de Bloqueos Externos',
    artefactoEjemplo: 'Destraba credenciales de sandbox con el proveedor de tarjetas antes de que frene el Sprint.',
    elementosClave: ['Coaching en flujo continuo', 'Facilitación de acuerdos de trabajo y DoD'],
    conexionSiguiente: 'Potencia a PO y Developers y facilita la Sprint Retrospective.'
  },
  'artifact-vision-board': {
    nodeId: 'artifact-vision-board',
    tituloPaso: 'Product Vision Board de MercadoÁgil',
    artefactoEjemplo: 'Grupo: compradores móviles urbanos. Necesidad: pagar en menos de 45 s. Meta: reducir abandono del carrito.',
    elementosClave: ['Público: Compradores móviles recurrentes', 'Meta negocio: +20% compras completadas en Q3'],
    conexionSiguiente: 'El objetivo de negocio alimenta el primer nivel (Why) del Impact Mapping.'
  },
  'artifact-impact-mapping': {
    nodeId: 'artifact-impact-mapping',
    tituloPaso: 'Impact Mapping del Abandono en Carrito',
    artefactoEjemplo: 'Why: +20% conversión ➔ Who: comprador nuevo ➔ How: completar dirección sin registro ➔ What: Checkout invitado.',
    elementosClave: ['Actores priorizados por impacto en ventas', 'Descarta programa de puntos por bajo impacto inmediato'],
    conexionSiguiente: 'Los entregables validados (What) estructuran el mapa del usuario.'
  },
  'artifact-user-story-mapping': {
    nodeId: 'artifact-user-story-mapping',
    tituloPaso: 'Story Map del Viaje de Compra',
    artefactoEjemplo: 'Backbone: Buscar producto ➔ Agregar al carrito ➔ Pagar como invitado ➔ Recibir tracking.',
    elementosClave: ['Slice 1 (MVP): Compra con tarjeta sin login', 'Slice 2: Cupones y billeteras virtuales'],
    conexionSiguiente: 'Cada Slice priorizado nutre con contexto real al Product Backlog.'
  },
  'artifact-product-backlog': {
    nodeId: 'artifact-product-backlog',
    tituloPaso: 'Product Backlog y Product Goal',
    artefactoEjemplo: 'Product Goal: «Permitir compras móviles completas en menos de 45 segundos sin registro obligatorio».',
    elementosClave: ['PBI-01: Checkout invitado', 'PBI-02: Validación postal automática', 'PBI-03: Pago con QR'],
    conexionSiguiente: 'Los PBIs superiores refinados ingresan como candidatos al Sprint Planning.'
  },
  'event-sprint': {
    nodeId: 'event-sprint',
    tituloPaso: 'Sprint 4: Ciclo Fijo de 2 Semanas',
    artefactoEjemplo: 'Iteración enfocada únicamente en estabilizar y lanzar el flujo básico de checkout invitado.',
    elementosClave: ['Timebox fijo de 14 días', 'Sin cambios que pongan en riesgo el Sprint Goal'],
    conexionSiguiente: 'Contiene Planning, Daily, Review y Retrospective dentro del mismo ciclo.'
  },
  'event-sprint-planning': {
    nodeId: 'event-sprint-planning',
    tituloPaso: 'Planning: ¿Por qué, Qué y Cómo?',
    artefactoEjemplo: 'Sprint Goal: «Habilitar checkout invitado con tarjeta de crédito verificada en entorno productivo».',
    elementosClave: ['¿Por qué?: Reducir fricción móvil', '¿Qué?: PBI-01 y PBI-02', '¿Cómo?: API pagos + UI responsive'],
    conexionSiguiente: 'Consolida el Sprint Backlog inicial del equipo.'
  },
  'artifact-sprint-backlog': {
    nodeId: 'artifact-sprint-backlog',
    tituloPaso: 'Sprint Backlog Activo del Checkout',
    artefactoEjemplo: 'Sprint Goal + PBI-01/02 + tareas técnicas (endpoint de orden, validaciones, suite E2E).',
    elementosClave: ['Propiedad exclusiva de Developers', 'Actualizado cada día según hallazgos técnicos'],
    conexionSiguiente: 'Guía la ejecución diaria sincronizada en cada Daily Scrum.'
  },
  'event-daily-scrum': {
    nodeId: 'event-daily-scrum',
    tituloPaso: 'Daily Scrum de 15 Minutos',
    artefactoEjemplo: 'Día 6: detectan error de webhook en pasarela; dos Developers hacen pair programming para proteger el Sprint Goal.',
    elementosClave: ['Inspección del progreso hacia el Sprint Goal', 'Replanificación táctica de las próximas 24 horas'],
    conexionSiguiente: 'Mantiene el ritmo hasta consolidar un Incremento utilizable.'
  },
  'artifact-increment': {
    nodeId: 'artifact-increment',
    tituloPaso: 'Incremento Utilizable con DoD',
    artefactoEjemplo: 'Checkout invitado desplegado detrás de feature flag, con pruebas unitarias/E2E y auditoría de seguridad en verde.',
    elementosClave: ['Cumple 100% la Definition of Done', 'Aditivo sobre el catálogo de Sprints previos'],
    conexionSiguiente: 'Se inspecciona colaborativamente en la Sprint Review.'
  },
  'event-sprint-review': {
    nodeId: 'event-sprint-review',
    tituloPaso: 'Sprint Review con Compradores Piloto y Negocio',
    artefactoEjemplo: 'Prueban compra real en móvil en 38 s; stakeholders detectan necesidad de autocompletar código postal en el próximo ciclo.',
    elementosClave: ['Inspección del Incremento terminado', 'Adaptación directa del Product Backlog'],
    conexionSiguiente: 'Nuevas prioridades regresan al Product Backlog.'
  },
  'event-sprint-retrospective': {
    nodeId: 'event-sprint-retrospective',
    tituloPaso: 'Retrospective: Mejora de Calidad y Flujo',
    artefactoEjemplo: 'Acuerdan automatizar mocks de la pasarela en la Definition of Done para evitar bloqueos futuros de sandbox.',
    elementosClave: ['Revisión de procesos, herramientas y DoD', 'Acción priorizada para el Sprint 5'],
    conexionSiguiente: 'Eleva la efectividad y actualiza acuerdos del próximo Sprint.'
  }
};
