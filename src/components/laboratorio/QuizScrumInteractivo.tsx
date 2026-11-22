import React from 'react';
import { Award, ArrowLeft, ArrowRight, RotateCcw, Compass, CheckCircle2, XCircle } from 'lucide-react';
import { bancoQuizScrum } from '../../dominio/datos/bancoQuizScrum';
import { evaluarRespuestaQuiz, type ResumenQuizScrum } from '../../dominio/servicios/evaluadorQuiz';
import { TarjetaFuenteAPA } from '../common/TarjetaFuenteAPA';

interface QuizScrumInteractivoProps {
  indicePregunta: number;
  respuestasPorId: Record<string, number>;
  resumenQuiz: ResumenQuizScrum;
  onResponder: (preguntaId: string, indiceOpcion: number) => void;
  onSiguiente: () => void;
  onAnterior: () => void;
  onReiniciar: () => void;
  onVerNodoEnMapa: (nodeId: string) => void;
}

/**
 * Desafío situacional interactivo con retroalimentación inmediata, fuente APA y salto al mapa.
 */
export const QuizScrumInteractivo: React.FC<QuizScrumInteractivoProps> = ({
  indicePregunta,
  respuestasPorId,
  resumenQuiz,
  onResponder,
  onSiguiente,
  onAnterior,
  onReiniciar,
  onVerNodoEnMapa
}) => {
  const pregunta = bancoQuizScrum[indicePregunta] ?? bancoQuizScrum[0];
  const seleccion = respuestasPorId[pregunta.id];
  const yaRespondida = typeof seleccion === 'number';
  const evaluacion = yaRespondida ? evaluarRespuestaQuiz(pregunta, seleccion) : null;

  return (
    <div className="space-y-4 text-xs">
      {/* Barra superior de progreso y puntaje */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="font-bold text-zinc-900 dark:text-white">
            Escenario {indicePregunta + 1} de {bancoQuizScrum.length}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 text-[10px] font-bold">
            {pregunta.categoria}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
            Aciertos: {resumenQuiz.correctas}/{resumenQuiz.totalPreguntas} ({resumenQuiz.porcentaje}%)
          </span>
          <button
            type="button"
            onClick={onReiniciar}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:border-indigo-400 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Escenario y opciones */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
        <p className="text-sm font-semibold text-zinc-900 dark:text-white leading-relaxed">
          {pregunta.escenario}
        </p>

        <div className="space-y-2">
          {pregunta.opciones.map((opcion, idx) => {
            const esElegida = seleccion === idx;
            const esCorrecta = idx === pregunta.indiceCorrecto;
            let estilo =
              'bg-zinc-50 dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-indigo-400';

            if (yaRespondida) {
              if (esCorrecta) {
                estilo =
                  'bg-emerald-50 dark:bg-emerald-950/35 border-emerald-500 text-emerald-900 dark:text-emerald-200';
              } else if (esElegida) {
                estilo =
                  'bg-rose-50 dark:bg-rose-950/35 border-rose-500 text-rose-900 dark:text-rose-200';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onResponder(pregunta.id, idx)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-2 cursor-pointer ${estilo}`}
              >
                <span>{opcion}</span>
                {yaRespondida && esCorrecta && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                )}
                {yaRespondida && esElegida && !esCorrecta && (
                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {yaRespondida && evaluacion && (
        <div className="space-y-2.5 animate-in fade-in duration-200">
          <div
            className={`p-3 rounded-xl border ${
              evaluacion.esCorrecta
                ? 'bg-emerald-50 dark:bg-emerald-950/25 border-emerald-300 dark:border-emerald-500/35 text-emerald-900 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/25 border-amber-300 dark:border-amber-500/35 text-amber-900 dark:text-amber-200'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <strong className="text-xs uppercase tracking-wider">
                {evaluacion.esCorrecta ? '¡Respuesta correcta!' : 'Revisa este criterio de la Guía 2020'}
              </strong>
              <button
                type="button"
                onClick={() => onVerNodoEnMapa(pregunta.nodoRelacionadoId)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Ver nodo en el mapa</span>
              </button>
            </div>
            <p className="leading-relaxed">{pregunta.explicacion}</p>
          </div>

          <TarjetaFuenteAPA fuenteId={pregunta.fuenteId} />
        </div>
      )}

      {/* Navegación entre preguntas */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={onAnterior}
          disabled={indicePregunta === 0}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Anterior</span>
        </button>

        <button
          type="button"
          onClick={onSiguiente}
          disabled={indicePregunta === bancoQuizScrum.length - 1}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        >
          <span>Siguiente escenario</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
