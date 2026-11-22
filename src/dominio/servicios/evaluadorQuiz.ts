/**
 * Servicio puro de dominio para evaluación del Quiz Situacional de Scrum 2020.
 */

import type { EscenarioQuizScrum } from '../tiposDominio';

export interface ResultadoPreguntaQuiz {
  esCorrecta: boolean;
  indiceSeleccionado: number;
  indiceCorrecto: number;
}

export interface ResumenQuizScrum {
  totalPreguntas: number;
  respondidas: number;
  correctas: number;
  porcentaje: number;
}

/**
 * Evalúa una única pregunta frente al índice elegido por el usuario.
 */
export function evaluarRespuestaQuiz(
  pregunta: EscenarioQuizScrum,
  indiceElegido: number
): ResultadoPreguntaQuiz {
  const indiceValido =
    Number.isInteger(indiceElegido) &&
    indiceElegido >= 0 &&
    indiceElegido < pregunta.opciones.length;

  return {
    esCorrecta: indiceValido && indiceElegido === pregunta.indiceCorrecto,
    indiceSeleccionado: indiceValido ? indiceElegido : -1,
    indiceCorrecto: pregunta.indiceCorrecto
  };
}

/**
 * Calcula estadísticas globales tolerando claves huérfanas o índices fuera de rango.
 */
export function calcularResumenQuiz(
  preguntas: EscenarioQuizScrum[],
  respuestasPorId: Record<string, number>
): ResumenQuizScrum {
  const totalPreguntas = preguntas.length;
  if (totalPreguntas === 0) {
    return { totalPreguntas: 0, respondidas: 0, correctas: 0, porcentaje: 0 };
  }

  let respondidas = 0;
  let correctas = 0;

  for (const pregunta of preguntas) {
    const elegida = respuestasPorId[pregunta.id];
    if (typeof elegida === 'number' && elegida >= 0 && elegida < pregunta.opciones.length) {
      respondidas += 1;
      if (elegida === pregunta.indiceCorrecto) {
        correctas += 1;
      }
    }
  }

  const porcentaje = Math.round((correctas / totalPreguntas) * 100);
  return { totalPreguntas, respondidas, correctas, porcentaje };
}
