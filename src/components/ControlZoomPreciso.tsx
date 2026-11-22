import React, { useCallback } from 'react';
import { useReactFlow, useStoreApi, useViewport } from '@xyflow/react';
import { Plus, Minus, Maximize2 } from 'lucide-react';

const FACTOR_PASO_FINO = 1.05;

interface ControlZoomPrecisoProps {
  onEncuadrarTodo?: () => void;
}

/**
 * Control ergonómico de zoom con micro-pasos del 5%, indicador de porcentaje
 * y encuadre completo adaptado a tema Claro/Oscuro y móviles.
 */
export const ControlZoomPreciso: React.FC<ControlZoomPrecisoProps> = ({ onEncuadrarTodo }) => {
  const store = useStoreApi();
  const { zoomTo, fitView } = useReactFlow();
  const { zoom } = useViewport();

  const acercarFino = useCallback(() => {
    const panZoom = store.getState().panZoom;
    if (panZoom) panZoom.scaleBy(FACTOR_PASO_FINO, { duration: 80 });
  }, [store]);

  const alejarFino = useCallback(() => {
    const panZoom = store.getState().panZoom;
    if (panZoom) panZoom.scaleBy(1 / FACTOR_PASO_FINO, { duration: 80 });
  }, [store]);

  const restablecerEscalaReal = useCallback(() => {
    zoomTo(1.0, { duration: 200 });
  }, [zoomTo]);

  const encuadrarTodo = useCallback(() => {
    if (onEncuadrarTodo) {
      onEncuadrarTodo();
      return;
    }
    fitView({ padding: 0.15, duration: 300 });
  }, [onEncuadrarTodo, fitView]);

  const porcentajeZoom = Math.round((zoom || 1) * 100);

  return (
    <div
      className="absolute right-4 sm:right-[225px] bottom-4 z-10 flex flex-col items-center bg-[var(--bg-panel)]/95 border border-zinc-300 dark:border-zinc-800 rounded-xl shadow-xl backdrop-blur-md overflow-hidden text-zinc-700 dark:text-zinc-300 pointer-events-auto select-none"
    >
      <button
        type="button"
        onClick={acercarFino}
        title="Acercar (paso fino +5%)"
        aria-label="Acercar (paso fino)"
        className="w-8 h-8 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={restablecerEscalaReal}
        title={`Zoom actual: ${porcentajeZoom}%. Clic para restablecer al 100%`}
        aria-label={`Zoom actual ${porcentajeZoom}%, clic para restablecer al 100%`}
        className="w-8 py-1 flex items-center justify-center font-mono text-[9px] font-bold text-indigo-700 dark:text-indigo-400 hover:bg-zinc-200/70 dark:hover:bg-zinc-800/60 border-y border-zinc-200 dark:border-zinc-800/80 transition-colors cursor-pointer"
      >
        {porcentajeZoom}%
      </button>

      <button
        type="button"
        onClick={alejarFino}
        title="Alejar (paso fino -5%)"
        aria-label="Alejar (paso fino)"
        className="w-8 h-8 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
      >
        <Minus className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={encuadrarTodo}
        title="Encuadrar todo el mapa (Fit View)"
        aria-label="Encuadrar todo el mapa"
        className="w-8 h-8 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white border-t border-zinc-200 dark:border-zinc-800/80 transition-colors cursor-pointer"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
