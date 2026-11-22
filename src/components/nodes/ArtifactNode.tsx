import React, { memo } from 'react';
import { NodeToolbar, Position, type NodeProps } from '@xyflow/react';
import { Layers, ListOrdered, CheckCircle2, BookmarkCheck, Compass, Target, Map } from 'lucide-react';
import type { NodoScrum } from '../../types/scrum';
import { contenidoEnriquecidoNodos } from '../../dominio/datos/contenidoEnriquecidoNodos';
import { HandlesConSeparacion } from './HandlesConSeparacion';
import { TooltipFichaTecnica } from './TooltipFichaTecnica';

/**
 * Componente visual para nodos de Documentos:
 * distingue visualmente Prácticas Discovery de Artefactos Oficiales (y sus 3 Compromisos).
 */
export const ArtifactNode: React.FC<NodeProps<NodoScrum>> = memo(({ data, selected }) => {
  const opacidad = data.opacity ?? 1.0;
  const esFoco = selected || Boolean(data.isSelected);
  const estaAbierto = Boolean(data.estaAbiertoTooltip);
  const extra = contenidoEnriquecidoNodos[data.id];
  const esDiscovery = extra?.origenMarco === 'discovery-complementario';

  const obtenerIcono = () => {
    const clase = esDiscovery
      ? 'w-5 h-5 text-teal-600 dark:text-teal-400'
      : 'w-5 h-5 text-emerald-600 dark:text-emerald-400';
    switch (data.id) {
      case 'artifact-vision-board':
        return <Compass className={clase} />;
      case 'artifact-impact-mapping':
        return <Target className={clase} />;
      case 'artifact-user-story-mapping':
        return <Map className={clase} />;
      case 'artifact-product-backlog':
        return <ListOrdered className={clase} />;
      case 'artifact-increment':
        return <CheckCircle2 className={clase} />;
      default:
        return <Layers className={clase} />;
    }
  };

  const compromiso =
    !esDiscovery ? data.details.outputs?.find((o) => o.startsWith('Compromiso:')) ?? null : null;
  const salidaDiscovery =
    esDiscovery ? data.details.outputs?.find((o) => o.startsWith('Salida clave:')) ?? null : null;

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

  const bordeNormal = esDiscovery
    ? 'border-teal-500/40 hover:border-teal-500/70'
    : 'border-emerald-500/40 hover:border-emerald-500/70';
  const bordeFoco = esDiscovery
    ? 'border-teal-500 dark:border-teal-400 ring-4 ring-teal-400/20 scale-[1.03]'
    : 'border-emerald-500 dark:border-emerald-400 ring-4 ring-emerald-400/20 scale-[1.03]';

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={estaAbierto}
      aria-label={`${esDiscovery ? 'Práctica Discovery' : 'Artefacto Oficial'}: ${data.label}. Presiona Enter para ${estaAbierto ? 'ocultar' : 'ver'} ficha`}
      onKeyDown={manejarTeclado}
      style={{ opacity: opacidad }}
      className={`group relative w-64 rounded-2xl p-4 transition-all duration-300 backdrop-blur-md cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50
        bg-[var(--bg-panel)]/95 hover:bg-zinc-100 dark:hover:bg-[#252528] border-2 shadow-xl shadow-black/15 dark:shadow-black/30
        ${esFoco || estaAbierto ? bordeFoco : bordeNormal}
      `}
    >
      <NodeToolbar isVisible={estaAbierto && !data.ocultarToolbarEnNodo} position={Position.Top} offset={12} className="z-50">
        <TooltipFichaTecnica datos={data} onCerrar={cerrarTooltip} />
      </NodeToolbar>

      <HandlesConSeparacion />

      <div className="flex items-center justify-between mb-2">
        <div
          className={`p-2 rounded-xl border ${
            esDiscovery ? 'bg-teal-500/10 border-teal-500/25' : 'bg-emerald-500/10 border-emerald-500/25'
          }`}
        >
          {obtenerIcono()}
        </div>
        <span
          className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${
            esDiscovery
              ? 'bg-teal-500/15 text-teal-800 dark:text-teal-300 border-teal-500/30'
              : 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30'
          }`}
        >
          {esDiscovery ? 'Práctica Discovery' : 'Artefacto Oficial'}
        </span>
      </div>

      <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-wide group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
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

      {compromiso && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/30 text-[11px] text-emerald-800 dark:text-emerald-300">
          <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="truncate font-medium">{compromiso}</span>
        </div>
      )}

      {salidaDiscovery && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-300 dark:border-teal-500/30 text-[11px] text-teal-800 dark:text-teal-300">
          <Compass className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
          <span className="truncate font-medium">{salidaDiscovery}</span>
        </div>
      )}

      <div className="mt-3 pt-2.5 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
        <span>{data.details.inputs?.length ?? 0} insumos</span>
        <span className="text-emerald-700 dark:text-emerald-400 font-medium group-hover:translate-x-0.5 transition-transform">
          {estaAbierto ? 'Ocultar ficha' : 'Ver ficha'} &rarr;
        </span>
      </div>
    </div>
  );
});

ArtifactNode.displayName = 'ArtifactNode';
