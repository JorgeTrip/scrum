import React, { memo } from 'react';
import { NodeToolbar, Position, type NodeProps } from '@xyflow/react';
import { Calendar, Clock, RotateCcw, Eye, Sparkles, Repeat } from 'lucide-react';
import type { NodoScrum } from '../../types/scrum';
import { HandlesConSeparacion } from './HandlesConSeparacion';
import { TooltipFichaTecnica } from './TooltipFichaTecnica';

/**
 * Componente visual para nodos de la dimensión Eventos Oficiales de Scrum.
 * Incluye soporte de teclado WCAG 2.1 AA y tooltip emergente por pestañas.
 */
export const EventNode: React.FC<NodeProps<NodoScrum>> = memo(({ data, selected }) => {
  const opacidad = data.opacity ?? 1.0;
  const esFoco = selected || Boolean(data.isSelected);
  const estaAbierto = Boolean(data.estaAbiertoTooltip);

  const obtenerIcono = () => {
    switch (data.id) {
      case 'event-sprint':
        return <Repeat className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'event-sprint-planning':
        return <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'event-daily-scrum':
        return <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'event-sprint-review':
        return <Eye className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'event-sprint-retrospective':
        return <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <RotateCcw className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  const cerrarTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('cerrar-tooltip-scrum'));
  };

  const manejarTeclado = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('alternar-tooltip-scrum', { detail: data }));
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={estaAbierto}
      aria-label={`Evento Scrum: ${data.label}. Presiona Enter para ${estaAbierto ? 'ocultar' : 'ver'} ficha`}
      onKeyDown={manejarTeclado}
      style={{ opacity: opacidad }}
      className={`group relative w-64 rounded-2xl p-4 transition-all duration-300 backdrop-blur-md cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/50
        bg-[var(--bg-panel)]/95 hover:bg-zinc-100 dark:hover:bg-[#252528] border-2 shadow-xl shadow-black/15 dark:shadow-black/30
        ${esFoco || estaAbierto ? 'border-indigo-500 dark:border-indigo-400 ring-4 ring-indigo-400/20 scale-[1.03]' : 'border-indigo-500/40 hover:border-indigo-500/70'}
      `}
    >
      <NodeToolbar isVisible={estaAbierto && !data.ocultarToolbarEnNodo} position={Position.Top} offset={12} className="z-50">
        <TooltipFichaTecnica datos={data} onCerrar={cerrarTooltip} />
      </NodeToolbar>

      <HandlesConSeparacion />

      <div className="flex items-center justify-between mb-2">
        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/25">
          {obtenerIcono()}
        </div>
        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border border-indigo-500/30">
          Evento Scrum
        </span>
      </div>

      <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-wide group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
        {data.label}
      </h3>
      {data.akas && data.akas.length > 0 && (
        <p className="text-[10px] text-zinc-600 dark:text-zinc-400 font-medium mb-1.5 truncate">
          <span className="text-zinc-500 font-normal">AKA: </span>
          {data.akas.slice(0, 2).join(' · ')}
        </p>
      )}
      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-2.5">
        {data.summary}
      </p>

      {data.details.timebox && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-700 dark:text-zinc-300">
          <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span className="truncate font-mono">{data.details.timebox}</span>
        </div>
      )}

      <div className="mt-3 pt-2.5 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
        <span>{data.details.outputs?.length ?? 0} entregables</span>
        <span className="text-indigo-700 dark:text-indigo-400 font-medium group-hover:translate-x-0.5 transition-transform">
          {estaAbierto ? 'Ocultar ficha' : 'Ver ficha'} &rarr;
        </span>
      </div>
    </div>
  );
});

EventNode.displayName = 'EventNode';
