import React, { useMemo, useCallback, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  ViewportPortal,
  MiniMap,
  Background,
  BackgroundVariant,
  type NodeMouseHandler,
  type NodeTypes,
  type EdgeTypes
} from '@xyflow/react';
import { RotateCcw } from 'lucide-react';
import '@xyflow/react/dist/style.css';

import { RoleNode } from './nodes/RoleNode';
import { EventNode } from './nodes/EventNode';
import { ArtifactNode } from './nodes/ArtifactNode';
import { AristaDespejada } from './edges/AristaDespejada';
import { PopoverDetalleArista } from './edges/PopoverDetalleArista';
import { Swimlanes } from './Swimlanes';
import { ControlZoomPreciso } from './ControlZoomPreciso';
import { ControlesLienzoMovil } from './movil/ControlesLienzoMovil';
import { useDispositivoMovil } from '../hooks/useDispositivoMovil';
import { useNodosConSnap } from '../hooks/useNodosConSnap';
import { useArrastreLienzoHorizontal } from '../hooks/useArrastreLienzoHorizontal';
import { useEnfoqueCamaraFlow } from '../hooks/useEnfoqueCamaraFlow';
import type { NodoScrum, AristaScrum, DatosNodoScrum } from '../types/scrum';
import type { TemaVisual } from '../dominio/tiposDominio';

interface FlowCanvasProps {
  nodos: NodoScrum[];
  aristas: AristaScrum[];
  onSeleccionarNodo: (datos: DatosNodoScrum) => void;
  onCerrarTooltip?: () => void;
  idsNodosFoco?: string[];
  idsNodosNuevos?: string[];
  modoActivo?: 'historia' | 'mapa';
  idAristaInspeccionada?: string | null;
  onCerrarArista?: () => void;
  tema?: TemaVisual;
  nodoEnfocadoExterno?: { id: string; nonce: number } | null;
  panelHistoriaColapsado?: boolean;
  hojaInferiorAbierta?: boolean;
}

const FlowCanvasInterno: React.FC<FlowCanvasProps> = ({
  nodos,
  aristas,
  onSeleccionarNodo,
  onCerrarTooltip,
  idsNodosFoco = [],
  idsNodosNuevos = [],
  modoActivo = 'historia',
  idAristaInspeccionada = null,
  onCerrarArista,
  tema = 'dark',
  nodoEnfocadoExterno = null,
  panelHistoriaColapsado = false,
  hojaInferiorAbierta = false
}) => {
  const { esMovil, esLandscapeCompacto, esPantallaPequena, esTactil } = useDispositivoMovil();
  const esEntornoTactil = esPantallaPequena || esTactil;
  const [permitirMoverNodos, setPermitirMoverNodos] = useState(false);

  const {
    nodosInternos,
    guiaSnapY,
    onNodesChange,
    restablecerPosicionesOriginales
  } = useNodosConSnap(nodos);

  const {
    refContenedor,
    estaArrastrandoFondo,
    alIniciarArrastre,
    alMoverLienzo,
    alFinalizarArrastre
  } = useArrastreLienzoHorizontal(esEntornoTactil);

  const { encuadrarMapaCompleto } = useEnfoqueCamaraFlow({
    refContenedor,
    modoActivo,
    idsNodosFoco,
    idsNodosNuevos,
    nodoEnfocadoExterno,
    esMovil,
    esLandscapeCompacto,
    esPantallaPequena,
    panelHistoriaColapsado,
    hojaInferiorAbierta
  });

  const nodeTypes = useMemo<NodeTypes>(() => ({
    roleNode: RoleNode as unknown as NodeTypes['roleNode'],
    eventNode: EventNode as unknown as NodeTypes['eventNode'],
    artifactNode: ArtifactNode as unknown as NodeTypes['artifactNode']
  }), []);

  const edgeTypes = useMemo<EdgeTypes>(() => ({ despejada: AristaDespejada }), []);

  const manejarClickEnNodo: NodeMouseHandler<NodoScrum> = useCallback(
    (_, nodo) => {
      onCerrarArista?.();
      onSeleccionarNodo(nodo.data);
    },
    [onSeleccionarNodo, onCerrarArista]
  );

  const manejarClickLienzo = useCallback(() => {
    onCerrarTooltip?.();
    onCerrarArista?.();
  }, [onCerrarTooltip, onCerrarArista]);

  return (
    <div
      ref={refContenedor}
      onPointerDown={alIniciarArrastre}
      onPointerMove={alMoverLienzo}
      onPointerUp={alFinalizarArrastre}
      onPointerCancel={alFinalizarArrastre}
      className={`relative w-full h-full bg-[var(--bg-lienzo)] overflow-hidden touch-none ${
        estaArrastrandoFondo ? 'cursor-grabbing select-none' : 'cursor-grab'
      }`}
    >
      {!esPantallaPequena && (
        <div className="absolute right-4 top-4 z-20">
          <button
            type="button"
            onClick={restablecerPosicionesOriginales}
            title="Restablecer posiciones predeterminadas de nodos y etiquetas"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-panel)]/95 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white text-xs font-medium shadow-lg backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            <span className="hidden sm:inline">Restablecer mapa</span>
          </button>
        </div>
      )}

      <ReactFlow<NodoScrum>
        nodes={nodosInternos}
        edges={aristas}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onNodeClick={manejarClickEnNodo}
        onPaneClick={manejarClickLienzo}
        nodesDraggable={esEntornoTactil ? permitirMoverNodos : true}
        elementsSelectable
        panOnDrag={false}
        minZoom={esPantallaPequena ? 0.1 : 0.2}
        maxZoom={2.2}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color={tema === 'dark' ? '#27272a' : '#d4d4d8'} />
        <Swimlanes tema={tema} />

        <ViewportPortal>
          {guiaSnapY !== null && (
            <div
              style={{ position: 'absolute', top: `${guiaSnapY}px`, left: '-10000px', width: '20000px', pointerEvents: 'none', zIndex: 1000 }}
              className="border-t-2 border-dashed border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.9)]"
            />
          )}
        </ViewportPortal>

        {esPantallaPequena ? (
          <ControlesLienzoMovil
            permitirMoverNodos={permitirMoverNodos}
            onAlternarMoverNodos={() => setPermitirMoverNodos((p) => !p)}
            onRestablecerPosiciones={restablecerPosicionesOriginales}
            onEncuadrarTodo={() => encuadrarMapaCompleto()}
          />
        ) : (
          <ControlZoomPreciso onEncuadrarTodo={() => encuadrarMapaCompleto()} />
        )}

        {!esPantallaPequena && (
          <MiniMap<NodoScrum>
            nodeStrokeWidth={3}
            zoomable
            pannable
            className="!hidden sm:!block !bg-[var(--bg-panel)]/95 !border !border-zinc-300 dark:!border-zinc-800 !rounded-2xl !shadow-xl !backdrop-blur-md"
            nodeColor={(n) => (n.data?.category === 'role' ? '#F59E0B' : n.data?.category === 'event' ? '#6366F1' : '#10B981')}
            maskColor={tema === 'dark' ? 'rgba(18, 18, 20, 0.7)' : 'rgba(245, 245, 247, 0.7)'}
          />
        )}
      </ReactFlow>

      {!esPantallaPequena && <PopoverDetalleArista idArista={idAristaInspeccionada} alCerrar={() => onCerrarArista?.()} />}
    </div>
  );
};

export const FlowCanvas: React.FC<FlowCanvasProps> = (props) => (
  <ReactFlowProvider>
    <FlowCanvasInterno {...props} />
  </ReactFlowProvider>
);
