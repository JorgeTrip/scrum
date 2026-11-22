import React, { useState, useRef } from 'react';
import {
  ArrowLeft, ArrowRight, BookOpen, Compass, RotateCcw,
  ShieldCheck, Crown, Code2, ChevronDown, ChevronUp
} from 'lucide-react';
import type { CapituloHistoria } from '../../data/datosHistoria';
import type { TipoHistoria } from '../../hooks/useHistoriaScrum';

interface PanelHistoriaMovilProps {
  capitulo: CapituloHistoria;
  pasoActual: number;
  totalPasos: number;
  tipoHistoria: TipoHistoria;
  esLandscapeCompacto: boolean;
  colapsado?: boolean;
  onAlternarColapso?: (colapsado: boolean) => void;
  onCambiarTipoHistoria: (tipo: TipoHistoria) => void;
  onSiguiente: () => void;
  onAnterior: () => void;
  onIrAPaso: (paso: number) => void;
  onAlternarModoMapa: () => void;
}

const MODOS_HISTORIA: { id: TipoHistoria; etiqueta: string; claseActiva: string }[] = [
  { id: 'general', etiqueta: 'General', claseActiva: 'bg-indigo-600 text-white' },
  { id: 'scrum-master', etiqueta: 'Scrum Master', claseActiva: 'bg-purple-600 text-white' },
  { id: 'product-owner', etiqueta: 'Product Owner', claseActiva: 'bg-amber-600 text-white' },
  { id: 'developers', etiqueta: 'Developers', claseActiva: 'bg-sky-600 text-white' }
];

function iconoModo(id: TipoHistoria): React.ReactNode {
  if (id === 'scrum-master') return <ShieldCheck className="w-3.5 h-3.5 shrink-0" />;
  if (id === 'product-owner') return <Crown className="w-3.5 h-3.5 shrink-0" />;
  if (id === 'developers') return <Code2 className="w-3.5 h-3.5 shrink-0" />;
  return <BookOpen className="w-3.5 h-3.5 shrink-0" />;
}

/**
 * Panel de Modo Historia adaptado a pantallas pequeñas: en portrait colapsa a píldora
 * inferior y en landscape se ancla lateralmente sin solapar el botón Leyenda ni recortar CTAs.
 */
export const PanelHistoriaMovil: React.FC<PanelHistoriaMovilProps> = ({
  capitulo,
  pasoActual,
  totalPasos,
  tipoHistoria,
  esLandscapeCompacto,
  colapsado: colapsadoProp,
  onAlternarColapso,
  onCambiarTipoHistoria,
  onSiguiente,
  onAnterior,
  onIrAPaso,
  onAlternarModoMapa
}) => {
  const [colapsadoInterno, setColapsadoInterno] = useState(false);
  const colapsado = colapsadoProp ?? colapsadoInterno;
  const cambiarColapso = (nuevoValor: boolean) => {
    setColapsadoInterno(nuevoValor);
    onAlternarColapso?.(nuevoValor);
  };
  const inicioTouchXRef = useRef<number | null>(null);
  const esUltimoPaso = pasoActual === totalPasos - 1;

  const alIniciarTouch = (e: React.TouchEvent) => {
    inicioTouchXRef.current = e.touches[0]?.clientX ?? null;
  };

  const alFinalizarTouch = (e: React.TouchEvent) => {
    if (inicioTouchXRef.current === null) return;
    const finX = e.changedTouches[0]?.clientX ?? inicioTouchXRef.current;
    const deltaX = finX - inicioTouchXRef.current;
    if (deltaX < -55 && !esUltimoPaso) onSiguiente();
    if (deltaX > 55 && pasoActual > 0) onAnterior();
    inicioTouchXRef.current = null;
  };

  if (colapsado && !esLandscapeCompacto) {
    return (
      <div className="fixed bottom-[64px] left-2.5 right-2.5 z-30 bg-[var(--bg-panel)]/95 backdrop-blur-2xl border border-zinc-300 dark:border-zinc-700/80 rounded-2xl px-3 py-1.5 shadow-xl flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => cambiarColapso(false)}
          aria-label="Expandir panel de historia"
          className="flex items-center gap-2 min-w-0 flex-1 min-h-[44px] text-left cursor-pointer"
        >
          <ChevronUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 block">
              Etapa {capitulo.pasoNumero} de {totalPasos}
            </span>
            <span className="text-xs font-bold text-zinc-900 dark:text-white truncate block">
              {capitulo.titulo}
            </span>
          </div>
        </button>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onAnterior}
            disabled={pasoActual === 0}
            aria-label="Paso anterior"
            className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 disabled:opacity-35 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={esUltimoPaso ? () => onIrAPaso(0) : onSiguiente}
            aria-label={esUltimoPaso ? 'Reiniciar historia' : 'Siguiente paso'}
            className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center bg-indigo-600 text-white cursor-pointer"
          >
            {esUltimoPaso ? <RotateCcw className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    );
  }

  const posicionContenedor = esLandscapeCompacto
    ? 'fixed left-2.5 top-[64px] bottom-10 w-[328px] max-w-[44vw] z-30'
    : 'fixed bottom-[64px] left-2.5 right-2.5 z-30 max-h-[46dvh]';

  return (
    <section
      aria-label="Narrativa paso a paso de Scrum"
      onTouchStart={alIniciarTouch}
      onTouchEnd={alFinalizarTouch}
      className={`${posicionContenedor} bg-[var(--bg-panel)]/95 backdrop-blur-2xl border border-zinc-300 dark:border-zinc-700/80 rounded-2xl p-3 shadow-2xl flex flex-col gap-2 overflow-hidden`}
    >
      <div className="flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 text-[10px] font-bold shrink-0">
            Etapa {capitulo.pasoNumero} de {totalPasos}
          </span>
          <span className="text-[11px] text-zinc-600 dark:text-zinc-400 truncate">{capitulo.subtitulo}</span>
        </div>
        {!esLandscapeCompacto && (
          <button
            type="button"
            onClick={() => cambiarColapso(true)}
            aria-label="Contraer panel para ver el mapa"
            className="min-w-[44px] min-h-[44px] -my-2 -mr-1.5 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer shrink-0"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 shrink-0">
        {MODOS_HISTORIA.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onCambiarTipoHistoria(m.id)}
            className={`inline-flex items-center gap-1 px-2.5 min-h-[44px] rounded-xl text-[11px] font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              tipoHistoria === m.id
                ? m.claseActiva
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800'
            }`}
          >
            {iconoModo(m.id)}
            <span>{m.etiqueta}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        <h2 className="text-xs font-extrabold text-zinc-900 dark:text-white mb-1 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>{capitulo.titulo}</span>
        </h2>
        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{capitulo.narrativa}</p>
      </div>

      <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
        <button type="button" onClick={onAlternarModoMapa} className="inline-flex items-center gap-1 px-2.5 min-h-[44px] rounded-xl text-xs font-semibold whitespace-nowrap bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-800 cursor-pointer">
          <Compass className="w-3.5 h-3.5 shrink-0" />
          <span>Ver Mapa</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button type="button" onClick={onAnterior} disabled={pasoActual === 0} className="inline-flex items-center gap-1 px-2.5 min-h-[44px] rounded-xl text-xs font-semibold whitespace-nowrap bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 disabled:opacity-35 cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Anterior</span>
          </button>

          <button type="button" onClick={esUltimoPaso ? () => onIrAPaso(0) : onSiguiente} className="inline-flex items-center gap-1 px-3 min-h-[44px] rounded-xl text-xs font-bold whitespace-nowrap bg-indigo-600 hover:bg-indigo-500 text-white shadow-md cursor-pointer">
            {esUltimoPaso ? <RotateCcw className="w-3.5 h-3.5" /> : null}
            <span>{esUltimoPaso ? 'Reiniciar' : 'Continuar'}</span>
            {!esUltimoPaso ? <ArrowRight className="w-3.5 h-3.5" /> : null}
          </button>
        </div>
      </div>
    </section>
  );
};
