/**
 * Tipos puros de dominio para Flujo Metodológico Scrum.
 * Capa 100% aislada de frameworks de UI o librerías externas.
 */

export type OrigenMarcoScrum = 'scrum-oficial' | 'discovery-complementario';
export type TemaVisual = 'dark' | 'light';

export interface FuenteOficialAPA {
  id: string;
  citaApa: string;
  seccion: string;
  urlOficial: string;
  etiquetaEnlace: string;
}

export interface AntipatronScrum {
  mito: string;
  realidad: string;
  consecuencia: string;
}

export interface ContenidoEnriquecidoNodo {
  nodeId: string;
  origenMarco: OrigenMarcoScrum;
  compromisoOficial?: string;
  glosarioSiglas?: { sigla: string; significado: string }[];
  antipatrones: AntipatronScrum[];
  fuenteId: string;
  seccionFuente: string;
}

export interface EjemploEcommerceNodo {
  nodeId: string;
  tituloPaso: string;
  artefactoEjemplo: string;
  elementosClave: string[];
  conexionSiguiente: string;
}

export interface MetadatoAristaScrum {
  edgeId: string;
  tituloRelacion: string;
  familiaColor: 'po' | 'developers' | 'sm' | 'eventos' | 'artefactos' | 'empirismo';
  explicacion: string;
  impactoSiSeRompe: string;
  fuenteId: string;
  seccionFuente: string;
}

export interface PilarEmpirico {
  id: 'transparencia' | 'inspeccion' | 'adaptacion';
  nombre: string;
  definicion: string;
  dondeSeMaterializa: string[];
  ejemploEcommerce: string;
  fuenteId: string;
}

export interface ValorScrum {
  id: 'compromiso' | 'foco' | 'franqueza' | 'respeto' | 'coraje';
  nombre: string;
  descripcion: string;
  ejemploPractico: string;
  fuenteId: string;
}

export interface ComparativaGuia2020 {
  id: string;
  categoria: 'Equipo' | 'Compromisos' | 'Eventos' | 'Lenguaje';
  aspecto: string;
  guia2017: string;
  guia2020: string;
  razonCambio: string;
  fuenteId: string;
}

export interface EscenarioQuizScrum {
  id: string;
  categoria: 'Roles' | 'Eventos' | 'Artefactos' | 'Empirismo';
  escenario: string;
  opciones: string[];
  indiceCorrecto: number;
  explicacion: string;
  nodoRelacionadoId: string;
  fuenteId: string;
}

export interface ResultadoTimeboxSprint {
  semanas: number;
  etiquetaDuracion: string;
  planningHorasMax: number;
  reviewHorasMax: number;
  retrospectiveHorasMax: number;
  dailyMinutos: number;
  notaOficial: string;
}
