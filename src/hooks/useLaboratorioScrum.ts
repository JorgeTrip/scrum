import { useState, useMemo, useCallback } from 'react';
import { calcularTimeboxesSprint } from '../dominio/servicios/calculadoraTimebox';
import { calcularResumenQuiz } from '../dominio/servicios/evaluadorQuiz';
import { bancoQuizScrum } from '../dominio/datos/bancoQuizScrum';
import type { ComparativaGuia2020 } from '../dominio/tiposDominio';

export type PestanaLaboratorio = 'timebox' | 'empirismo' | 'comparativa' | 'quiz';

/**
 * Hook de aplicación que orquesta las herramientas interactivas del Laboratorio Scrum.
 */
export function useLaboratorioScrum() {
  const [abierto, setAbierto] = useState(false);
  const [pestanaActiva, setPestanaActiva] = useState<PestanaLaboratorio>('timebox');
  const [semanasSprint, setSemanasSprint] = useState(2);
  const [filtroComparativa, setFiltroComparativa] = useState<'Todas' | ComparativaGuia2020['categoria']>('Todas');

  const [indicePregunta, setIndicePregunta] = useState(0);
  const [respuestasPorId, setRespuestasPorId] = useState<Record<string, number>>({});

  const timeboxes = useMemo(() => calcularTimeboxesSprint(semanasSprint), [semanasSprint]);
  const resumenQuiz = useMemo(() => calcularResumenQuiz(bancoQuizScrum, respuestasPorId), [respuestasPorId]);

  const abrirEnPestana = useCallback((pestana: PestanaLaboratorio = 'timebox') => {
    setPestanaActiva(pestana);
    setAbierto(true);
  }, []);

  const cerrarLaboratorio = useCallback(() => setAbierto(false), []);

  const responderPregunta = useCallback((preguntaId: string, indiceOpcion: number) => {
    setRespuestasPorId((prev) => ({ ...prev, [preguntaId]: indiceOpcion }));
  }, []);

  const siguientePregunta = useCallback(() => {
    setIndicePregunta((prev) => Math.min(prev + 1, bancoQuizScrum.length - 1));
  }, []);

  const anteriorPregunta = useCallback(() => {
    setIndicePregunta((prev) => Math.max(prev - 1, 0));
  }, []);

  const reiniciarQuiz = useCallback(() => {
    setRespuestasPorId({});
    setIndicePregunta(0);
  }, []);

  return {
    abierto,
    pestanaActiva,
    setPestanaActiva,
    abrirEnPestana,
    cerrarLaboratorio,
    semanasSprint,
    setSemanasSprint,
    timeboxes,
    filtroComparativa,
    setFiltroComparativa,
    indicePregunta,
    setIndicePregunta,
    respuestasPorId,
    resumenQuiz,
    responderPregunta,
    siguientePregunta,
    anteriorPregunta,
    reiniciarQuiz
  };
}
