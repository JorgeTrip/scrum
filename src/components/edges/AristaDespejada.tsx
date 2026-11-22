import React, { useRef, useMemo } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  useReactFlow,
  type EdgeProps
} from '@xyflow/react';
import { construirRutaSmoothStepConDesvio } from '../../utils/trayectoriaUtilidades';
import { useArrastreArista } from '../../hooks/useArrastreArista';
import { GuiaDestinoArista } from './GuiaDestinoArista';

interface DatosAristaPersonalizada {
  offset?: number;
  borderRadius?: number;
}

/**
 * Arista personalizada con halo adaptativo al tema, arrastre magnético/elástico de etiqueta
 * y detección de clic corto para abrir su explicación pedagógica y cita APA.
 */
export const AristaDespejada: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  markerEnd,
  label,
  data
}) => {
  const datos = (data as DatosAristaPersonalizada) || {};
  const offsetPersonalizado = datos.offset ?? 25;
  const radioBorde = datos.borderRadius ?? 16;

  const refRuta = useRef<SVGPathElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const {
    desvioEfectivo,
    estaPresionada,
    estaArrastrando,
    destinoProyectado,
    cursorFlotante,
    puntoBaseCurva,
    iniciarArrastreEtiqueta,
    moverEtiqueta,
    finalizarArrastreEtiqueta
  } = useArrastreArista({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    refRuta,
    screenToFlowPosition
  });

  const edgePath = useMemo(() => {
    return construirRutaSmoothStepConDesvio({
      sourceX,
      sourceY,
      targetX,
      targetY,
      desvio: desvioEfectivo,
      borderRadius: radioBorde,
      offset: offsetPersonalizado
    });
  }, [sourceX, sourceY, targetX, targetY, desvioEfectivo, radioBorde, offsetPersonalizado]);

  const renderX = estaArrastrando && cursorFlotante ? cursorFlotante.x : puntoBaseCurva.x;
  const renderY =
    estaArrastrando && cursorFlotante
      ? cursorFlotante.y
      : estaPresionada
      ? puntoBaseCurva.y - 3
      : puntoBaseCurva.y;

  const inspeccionarArista = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('inspeccionar-arista-scrum', { detail: id }));
  };

  return (
    <>
      {/* Halo de corte de fondo adaptativo al tema */}
      <path
        ref={refRuta}
        d={edgePath}
        fill="none"
        stroke="var(--halo-arista, #121214)"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none transition-all duration-75"
      />

      {/* Línea principal coloreada */}
      <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />

      {/* Zona ampliada clicable sobre la línea para inspeccionar relación */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={16}
        onClick={inspeccionarArista}
        className="cursor-pointer"
      />

      {(estaArrastrando || estaPresionada) && destinoProyectado && (
        <GuiaDestinoArista
          puntoDestino={destinoProyectado}
          puntoCursor={{ x: renderX, y: renderY }}
        />
      )}

      {label && (
        <EdgeLabelRenderer>
          <div
            onPointerDown={iniciarArrastreEtiqueta}
            onPointerMove={moverEtiqueta}
            onPointerUp={finalizarArrastreEtiqueta}
            onPointerCancel={finalizarArrastreEtiqueta}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${renderX}px,${renderY}px)`,
              pointerEvents: 'all',
              opacity: style?.opacity ?? 1
            }}
            title="Clic para ver explicación oficial | Arrastra para acomodar o empujar la línea"
            className={`nodrag nopan nowheel px-2.5 py-1 rounded-xl text-[10px] font-bold shadow-lg backdrop-blur-md whitespace-nowrap z-30 select-none transition-all duration-75 ${
              estaArrastrando || estaPresionada
                ? 'cursor-grabbing bg-indigo-600/95 text-white border-2 border-indigo-400 scale-105 shadow-2xl shadow-indigo-500/50'
                : 'cursor-pointer bg-[var(--bg-panel)]/95 hover:bg-zinc-100 dark:hover:bg-[#252528] text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700/80 hover:border-indigo-400'
            }`}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
