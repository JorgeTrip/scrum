/**
 * Validadores tipados en frontera para entidades del dominio, entradas externas y preferencias.
 * Implementación pura en TypeScript sin dependencias externas.
 */

import type {
  ContenidoEnriquecidoNodo,
  FuenteOficialAPA,
  TemaVisual
} from '../tiposDominio';

export interface ResultadoValidacion<T> {
  valido: boolean;
  datos?: T;
  errores: string[];
}

function esTextoNoVacio(valor: unknown, longitudMinima = 1): valor is string {
  return typeof valor === 'string' && valor.trim().length >= longitudMinima;
}

/**
 * Valida y parsea una referencia bibliográfica APA 7ª edición en frontera.
 */
export function validarFuenteApa(entrada: unknown): ResultadoValidacion<FuenteOficialAPA> {
  const errores: string[] = [];
  if (!entrada || typeof entrada !== 'object') {
    return { valido: false, errores: ['La fuente debe ser un objeto válido.'] };
  }

  const obj = entrada as Record<string, unknown>;
  if (!esTextoNoVacio(obj.id, 2)) errores.push('Falta identificador de fuente.');
  if (!esTextoNoVacio(obj.citaApa, 15)) errores.push('La cita APA es demasiado breve o está vacía.');
  if (!esTextoNoVacio(obj.seccion, 2)) errores.push('Falta la sección de referencia.');
  if (!esTextoNoVacio(obj.urlOficial) || !String(obj.urlOficial).startsWith('https://')) {
    errores.push('La URL oficial debe iniciar con https://');
  }
  if (!esTextoNoVacio(obj.etiquetaEnlace, 3)) errores.push('Falta etiqueta legible del enlace.');

  if (errores.length > 0) return { valido: false, errores };
  return { valido: true, datos: obj as unknown as FuenteOficialAPA, errores: [] };
}

/**
 * Valida los invariantes de marco oficial vs Discovery para contenido enriquecido de nodos.
 */
export function validarNodoEnriquecido(
  entrada: unknown
): ResultadoValidacion<ContenidoEnriquecidoNodo> {
  const errores: string[] = [];
  if (!entrada || typeof entrada !== 'object') {
    return { valido: false, errores: ['Contenido enriquecido inválido.'] };
  }

  const obj = entrada as Record<string, unknown>;
  if (!esTextoNoVacio(obj.nodeId, 3)) errores.push('nodeId inválido.');
  if (obj.origenMarco !== 'scrum-oficial' && obj.origenMarco !== 'discovery-complementario') {
    errores.push('origenMarco debe ser scrum-oficial o discovery-complementario.');
  }
  if (obj.origenMarco === 'discovery-complementario' && esTextoNoVacio(obj.compromisoOficial)) {
    errores.push('Una práctica Discovery no puede declarar un compromiso oficial de Scrum.');
  }
  if (!esTextoNoVacio(obj.fuenteId)) errores.push('Falta fuenteId.');
  if (!esTextoNoVacio(obj.seccionFuente)) errores.push('Falta seccionFuente.');
  if (!Array.isArray(obj.antipatrones) || obj.antipatrones.length === 0) {
    errores.push('Debe incluir al menos un antipatrón documentado.');
  }

  if (errores.length > 0) return { valido: false, errores };
  return { valido: true, datos: obj as unknown as ContenidoEnriquecidoNodo, errores: [] };
}

/**
 * Normaliza la preferencia de tema leída desde almacenamiento externo (localStorage).
 */
export function normalizarTemaPreferido(valorExterno: unknown): TemaVisual {
  return valorExterno === 'light' ? 'light' : 'dark';
}

/**
 * Normaliza la duración en semanas del Sprint dentro del límite oficial (1 a 4 semanas).
 */
export function normalizarSemanasSprint(valor: unknown): number {
  const num = typeof valor === 'number' ? Math.round(valor) : Number(valor);
  if (!Number.isFinite(num) || num < 1) return 1;
  if (num > 4) return 4;
  return num;
}
