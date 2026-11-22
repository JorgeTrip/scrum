import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, FlaskConical, Clock, Eye, GitCompare, Award } from 'lucide-react';
import type { ComparativaGuia2020, ResultadoTimeboxSprint } from '../../dominio/tiposDominio';
import type { PestanaLaboratorio } from '../../hooks/useLaboratorioScrum';
import type { ResumenQuizScrum } from '../../dominio/servicios/evaluadorQuiz';
import { CalculadoraTimebox } from './CalculadoraTimebox';
import { VistaPilaresValores } from './VistaPilaresValores';
import { TablaComparativaGuias } from './TablaComparativaGuias';
import { QuizScrumInteractivo } from './QuizScrumInteractivo';

interface ModalLaboratorioScrumProps {
  abierto: boolean;
  pestanaActiva: PestanaLaboratorio;
  onCambiarPestana: (p: PestanaLaboratorio) => void;
  alCerrar: () => void;
  semanasSprint: number;
  onCambiarSemanas: (s: number) => void;
  timeboxes: ResultadoTimeboxSprint;
  filtroComparativa: 'Todas' | ComparativaGuia2020['categoria'];
  onCambiarFiltroComparativa: (c: 'Todas' | ComparativaGuia2020['categoria']) => void;
  indicePregunta: number;
  respuestasPorId: Record<string, number>;
  resumenQuiz: ResumenQuizScrum;
  onResponderQuiz: (id: string, idx: number) => void;
  onSiguienteQuiz: () => void;
  onAnteriorQuiz: () => void;
  onReiniciarQuiz: () => void;
  onVerNodoEnMapa: (nodeId: string) => void;
}

/**
 * Modal unificado "Laboratorio Scrum" con 4 herramientas interactivas de práctica y fundamentos.
 */
export const ModalLaboratorioScrum: React.FC<ModalLaboratorioScrumProps> = (props) => {
  const { abierto, pestanaActiva, onCambiarPestana, alCerrar } = props;

  useEffect(() => {
    if (!abierto) return;
    const alPresionarEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') alCerrar();
    };
    window.addEventListener('keydown', alPresionarEscape);
    return () => window.removeEventListener('keydown', alPresionarEscape);
  }, [abierto, alCerrar]);

  if (!abierto) return null;

  const pestanas: { id: PestanaLaboratorio; label: string; icono: React.ReactNode }[] = [
    { id: 'timebox', label: 'Calculadora Timebox', icono: <Clock className="w-3.5 h-3.5" /> },
    { id: 'empirismo', label: 'Pilares y Valores', icono: <Eye className="w-3.5 h-3.5" /> },
    { id: 'comparativa', label: '2017 vs. 2020', icono: <GitCompare className="w-3.5 h-3.5" /> },
    { id: 'quiz', label: 'Desafío Quiz', icono: <Award className="w-3.5 h-3.5" /> }
  ];

  const contenido = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-laboratorio-scrum"
      onClick={alCerrar}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-[var(--bg-panel)] border border-zinc-300 dark:border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90dvh] text-zinc-900 dark:text-zinc-200"
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-[#252528]/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-700 dark:text-indigo-400">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <h2 id="titulo-laboratorio-scrum" className="text-sm font-bold text-zinc-900 dark:text-white">
                Laboratorio Interactivo Scrum 2020
              </h2>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                Herramientas activas basadas en fuentes oficiales verificables
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={alCerrar}
            aria-label="Cerrar Laboratorio Scrum"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex flex-wrap gap-1.5 shrink-0">
          {pestanas.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onCambiarPestana(p.id)}
              className={`inline-flex items-center gap-1.5 px-3 min-h-[44px] py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                pestanaActiva === p.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60 hover:border-indigo-400'
              }`}
            >
              {p.icono}
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        <div className="p-5 overflow-y-auto flex-1">
          {pestanaActiva === 'timebox' && (
            <CalculadoraTimebox
              semanas={props.semanasSprint}
              onCambiarSemanas={props.onCambiarSemanas}
              timeboxes={props.timeboxes}
            />
          )}
          {pestanaActiva === 'empirismo' && <VistaPilaresValores />}
          {pestanaActiva === 'comparativa' && (
            <TablaComparativaGuias
              categoriaFiltro={props.filtroComparativa}
              onCambiarFiltro={props.onCambiarFiltroComparativa}
            />
          )}
          {pestanaActiva === 'quiz' && (
            <QuizScrumInteractivo
              indicePregunta={props.indicePregunta}
              respuestasPorId={props.respuestasPorId}
              resumenQuiz={props.resumenQuiz}
              onResponder={props.onResponderQuiz}
              onSiguiente={props.onSiguienteQuiz}
              onAnterior={props.onAnteriorQuiz}
              onReiniciar={props.onReiniciarQuiz}
              onVerNodoEnMapa={props.onVerNodoEnMapa}
            />
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' && document.body
    ? createPortal(contenido, document.body)
    : contenido;
};
