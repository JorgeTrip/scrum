import React, { memo } from 'react';
import { NodeToolbar, Position, type NodeProps } from '@xyflow/react';
import { Users, ShieldCheck, Code2 } from 'lucide-react';
import type { NodoScrum } from '../../types/scrum';
import { HandlesConSeparacion } from './HandlesConSeparacion';
import { TooltipFichaTecnica } from './TooltipFichaTecnica';

/**
 * Componente visual para nodos de la dimensión Personas (Accountabilities / Roles).
 * Incluye soporte de teclado WCAG 2.1 AA y tooltip emergente por pestañas.
 */
export const RoleNode: React.FC<NodeProps<NodoScrum>> = memo(({ data, selected }) => {
  const opacidad = data.opacity ?? 1.0;
  const esFoco = selected || Boolean(data.isSelected);
  const estaAbierto = Boolean(data.estaAbiertoTooltip);

  const obtenerIcono = () => {
    switch (data.id) {
      case 'role-product-owner':
        return <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'role-developers':
        return <Code2 className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case 'role-scrum-master':
        return <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      default:
        return <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
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
      aria-label={`Rol Scrum: ${data.label}. Presiona Enter para ${estaAbierto ? 'ocultar' : 'ver'} ficha`}
      onKeyDown={manejarTeclado}
      style={{ opacity: opacidad }}
      className={`group relative w-64 rounded-2xl p-4 transition-all duration-300 backdrop-blur-md cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/50
        bg-[var(--bg-panel)]/95 hover:bg-zinc-100 dark:hover:bg-[#252528] border-2 shadow-xl shadow-black/15 dark:shadow-black/30
        ${esFoco || estaAbierto ? 'border-amber-500 dark:border-amber-400 ring-4 ring-amber-400/20 scale-[1.03]' : 'border-amber-500/40 hover:border-amber-500/70'}
      `}
    >
      <NodeToolbar isVisible={estaAbierto && !data.ocultarToolbarEnNodo} position={Position.Bottom} offset={12} className="z-50">
        <TooltipFichaTecnica datos={data} onCerrar={cerrarTooltip} />
      </NodeToolbar>

      <HandlesConSeparacion />

      <div className="flex items-center justify-between mb-2">
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/25">
          {obtenerIcono()}
        </div>
        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
          Rol Scrum
        </span>
      </div>

      <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-wide group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
        {data.label}
      </h3>
      {data.akas && data.akas.length > 0 && (
        <p className="text-[10px] text-zinc-600 dark:text-zinc-400 font-medium mb-1.5 truncate">
          <span className="text-zinc-500 font-normal">AKA: </span>
          {data.akas.slice(0, 2).join(' · ')}
        </p>
      )}
      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
        {data.summary}
      </p>

      <div className="mt-3 pt-2.5 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
        <span>{data.details.responsibilities?.length ?? 0} responsabilidades</span>
        <span className="text-amber-700 dark:text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform">
          {estaAbierto ? 'Ocultar ficha' : 'Ver ficha'} &rarr;
        </span>
      </div>
    </div>
  );
});

RoleNode.displayName = 'RoleNode';
