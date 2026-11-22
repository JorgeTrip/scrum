import React from 'react';
import { BookOpen, Compass, FlaskConical, GitCommit } from 'lucide-react';

interface BottomTabBarMovilProps {
  modoActivo: 'historia' | 'mapa';
  leyendaAbierta: boolean;
  onCambiarModo: (modo: 'historia' | 'mapa') => void;
  onAbrirLaboratorio: () => void;
  onAlternarLeyenda: () => void;
}

/**
 * Barra inferior fija ergonómica (Mobile-First) con áreas táctiles >= 44px para el pulgar.
 */
export const BottomTabBarMovil: React.FC<BottomTabBarMovilProps> = ({
  modoActivo,
  leyendaAbierta,
  onCambiarModo,
  onAbrirLaboratorio,
  onAlternarLeyenda
}) => {
  const claseBase =
    'flex-1 min-h-[48px] py-1.5 px-1 flex flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-semibold transition-colors cursor-pointer';

  return (
    <nav
      aria-label="Navegación principal móvil"
      className="md:hidden shrink-0 z-30 bg-[var(--bg-panel)]/95 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 px-2 py-1 pb-[max(4px,env(safe-area-inset-bottom))] flex items-center gap-1 shadow-lg"
    >
      <button
        type="button"
        onClick={() => onCambiarModo('historia')}
        aria-label="Modo Historia"
        aria-current={modoActivo === 'historia' ? 'page' : undefined}
        className={`${claseBase} ${
          modoActivo === 'historia'
            ? 'bg-indigo-600/15 text-indigo-700 dark:text-indigo-300'
            : 'text-zinc-600 dark:text-zinc-400'
        }`}
      >
        <BookOpen className="w-4 h-4" />
        <span>Historia</span>
      </button>

      <button
        type="button"
        onClick={() => onCambiarModo('mapa')}
        aria-label="Mapa Libre"
        aria-current={modoActivo === 'mapa' ? 'page' : undefined}
        className={`${claseBase} ${
          modoActivo === 'mapa'
            ? 'bg-indigo-600/15 text-indigo-700 dark:text-indigo-300'
            : 'text-zinc-600 dark:text-zinc-400'
        }`}
      >
        <Compass className="w-4 h-4" />
        <span>Mapa</span>
      </button>

      <button
        type="button"
        onClick={onAbrirLaboratorio}
        aria-label="Abrir Laboratorio Scrum"
        className={`${claseBase} text-amber-700 dark:text-amber-300`}
      >
        <FlaskConical className="w-4 h-4" />
        <span>Lab</span>
      </button>

      <button
        type="button"
        onClick={onAlternarLeyenda}
        aria-label="Ver simbología de relaciones"
        aria-pressed={leyendaAbierta}
        className={`${claseBase} ${
          leyendaAbierta
            ? 'bg-indigo-600/15 text-indigo-700 dark:text-indigo-300'
            : 'text-zinc-600 dark:text-zinc-400'
        }`}
      >
        <GitCommit className="w-4 h-4" />
        <span>Leyenda</span>
      </button>
    </nav>
  );
};
