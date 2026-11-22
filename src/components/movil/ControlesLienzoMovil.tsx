import React from 'react';
import { useReactFlow } from '@xyflow/react';
import { Maximize2, RotateCcw, Lock, Unlock, Plus, Minus } from 'lucide-react';

interface ControlesLienzoMovilProps {
  permitirMoverNodos: boolean;
  onAlternarMoverNodos: () => void;
  onRestablecerPosiciones: () => void;
  onEncuadrarTodo?: () => void;
}

/**
 * Barra compacta de controles del lienzo para móvil y landscape compacto.
 * Garantiza botones >= 44x44px para encuadrar, hacer zoom, restablecer posiciones
 * y bloquear el arrastre accidental de tarjetas con un dedo.
 */
export const ControlesLienzoMovil: React.FC<ControlesLienzoMovilProps> = ({
  permitirMoverNodos,
  onAlternarMoverNodos,
  onRestablecerPosiciones,
  onEncuadrarTodo
}) => {
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  return (
    <div
      role="group"
      aria-label="Controles táctiles del mapa"
      className="absolute right-2 top-2 z-20 flex flex-col md:flex-row items-center gap-0.5 p-1 rounded-2xl bg-[var(--bg-panel)]/95 backdrop-blur-xl border border-zinc-300 dark:border-zinc-700/80 shadow-xl"
    >
      <button
        type="button"
        onClick={() => zoomIn({ duration: 200 })}
        aria-label="Acercar mapa"
        title="Acercar"
        className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 active:scale-95 transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => zoomOut({ duration: 200 })}
        aria-label="Alejar mapa"
        title="Alejar"
        className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 active:scale-95 transition-colors cursor-pointer"
      >
        <Minus className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => (onEncuadrarTodo ? onEncuadrarTodo() : fitView({ padding: 0.12, duration: 350 }))}
        aria-label="Encuadrar todo el mapa"
        title="Encuadrar"
        className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 active:scale-95 transition-colors cursor-pointer"
      >
        <Maximize2 className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={onAlternarMoverNodos}
        aria-pressed={permitirMoverNodos}
        aria-label={
          permitirMoverNodos
            ? 'Bloquear arrastre accidental de tarjetas'
            : 'Desbloquear para mover tarjetas'
        }
        title={permitirMoverNodos ? 'Mover tarjetas activo (tocar para bloquear)' : 'Tarjetas bloqueadas (solo explorar)'}
        className={`min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center transition-colors active:scale-95 cursor-pointer ${
          permitirMoverNodos
            ? 'bg-indigo-600 text-white shadow-sm'
            : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200/70 dark:hover:bg-zinc-800'
        }`}
      >
        {permitirMoverNodos ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
      </button>

      <button
        type="button"
        onClick={onRestablecerPosiciones}
        aria-label="Restablecer posiciones de nodos y etiquetas"
        title="Restablecer posiciones"
        className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 active:scale-95 transition-colors cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
};
