/**
 * Servicio puro de dominio para cálculo proporcional oficial de Timeboxes en Scrum (Guía 2020).
 */

import type { ResultadoTimeboxSprint } from '../tiposDominio';
import { normalizarSemanasSprint } from '../validacion/esquemasDominio';

/**
 * Calcula las duraciones máximas oficiales de los eventos de Scrum según la duración del Sprint.
 * Referencia: Guía Scrum 2020 — Sección "Eventos de Scrum".
 */
export function calcularTimeboxesSprint(semanasEntrada: number): ResultadoTimeboxSprint {
  const semanas = normalizarSemanasSprint(semanasEntrada);
  const factorMes = semanas / 4;

  const planningHorasMax = Number((8 * factorMes).toFixed(2));
  const reviewHorasMax = Number((4 * factorMes).toFixed(2));
  const retrospectiveHorasMax = Number((3 * factorMes).toFixed(2));

  const etiquetaDuracion =
    semanas === 1
      ? '1 semana'
      : semanas === 4
      ? '4 semanas (1 mes)'
      : `${semanas} semanas`;

  return {
    semanas,
    etiquetaDuracion,
    planningHorasMax,
    reviewHorasMax,
    retrospectiveHorasMax,
    dailyMinutos: 15,
    notaOficial:
      'Para Sprints más cortos que un mes, Planning, Review y Retrospective suelen ser proporcionalmente menores. La Daily Scrum siempre dura 15 minutos.'
  };
}
