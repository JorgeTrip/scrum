import { useMemo, useState, useCallback, useEffect } from 'react';
import { useFiltroScrum, aplicarFiltroANodos } from './useFiltroScrum';
import { useFlujoScrum } from './useFlujoScrum';
import { useHistoriaScrum } from './useHistoriaScrum';
import { useTemaAplicacion } from './useTemaAplicacion';
import { useInspeccionArista } from './useInspeccionArista';
import { useLaboratorioScrum } from './useLaboratorioScrum';
import { useDispositivoMovil } from './useDispositivoMovil';
import { useModalBienvenida } from './useModalBienvenida';
import { calcularEstadoAristas } from '../dominio/servicios/filtroRelaciones';
import { nodosScrum, aristasScrum } from '../data/scrumData';

/**
 * Hook orquestador principal de la aplicación: unifica estado del flujo, filtros,
 * modo historia/mapa, laboratorio interactivo y adaptación móvil/landscape.
 */
export function useControladorScrum() {
  const { tema, alternarTema } = useTemaAplicacion();
  const { idAristaInspeccionada, cerrarInspeccionArista } = useInspeccionArista();
  const dispositivo = useDispositivoMovil();
  const bienvenida = useModalBienvenida();
  const lab = useLaboratorioScrum();
  const filtro = useFiltroScrum();
  const historia = useHistoriaScrum(nodosScrum, aristasScrum);
  const flujo = useFlujoScrum();

  const [nodoEnfocadoExterno, setNodoEnfocadoExterno] = useState<{ id: string; nonce: number } | null>(null);
  const [vistaMapaMovil, setVistaMapaMovil] = useState<'mapa' | 'lista'>('mapa');
  const [leyendaMovilAbierta, setLeyendaMovilAbierta] = useState(false);
  const [panelHistoriaColapsado, setPanelHistoriaColapsado] = useState(false);

  const { cerrarTooltip, abrirTooltipPorId, idNodoConTooltip } = flujo;
  const { setModoActivo, modoActivo, nodosVisibles, aristasVisibles } = historia;
  const { busqueda, categoriaSeleccionada, limpiarFiltros } = filtro;
  const { esMovil, esPantallaPequena } = dispositivo;

  useEffect(() => {
    if (idAristaInspeccionada) cerrarTooltip();
  }, [idAristaInspeccionada, cerrarTooltip]);

  const nodosFinales = useMemo(() => {
    let nodosBase =
      modoActivo === 'mapa'
        ? aplicarFiltroANodos(nodosScrum, categoriaSeleccionada, busqueda)
        : nodosVisibles;

    if (modoActivo === 'historia' && busqueda.trim()) {
      nodosBase = aplicarFiltroANodos(nodosBase, 'all', busqueda);
    }

    return nodosBase.map((nodo) => ({
      ...nodo,
      data: {
        ...nodo.data,
        estaAbiertoTooltip: nodo.id === idNodoConTooltip,
        ocultarToolbarEnNodo: esPantallaPequena
      }
    }));
  }, [modoActivo, categoriaSeleccionada, busqueda, nodosVisibles, idNodoConTooltip, esPantallaPequena]);

  const nodoConFichaMovil = useMemo(
    () =>
      esPantallaPequena && idNodoConTooltip
        ? nodosFinales.find((n) => n.id === idNodoConTooltip) ?? null
        : null,
    [esPantallaPequena, idNodoConTooltip, nodosFinales]
  );

  const hayFiltroActivo =
    busqueda.trim().length > 0 || (modoActivo === 'mapa' && categoriaSeleccionada !== 'all');

  const hojaInferiorAbierta = Boolean(
    nodoConFichaMovil || (esPantallaPequena && idAristaInspeccionada) || (esMovil && leyendaMovilAbierta)
  );

  const aristasFinales = useMemo(
    () => calcularEstadoAristas(aristasVisibles, nodosFinales, idNodoConTooltip, hayFiltroActivo),
    [aristasVisibles, nodosFinales, idNodoConTooltip, hayFiltroActivo]
  );

  const cambiarModo = useCallback(
    (nuevoModo: 'historia' | 'mapa') => {
      setModoActivo(nuevoModo);
      setLeyendaMovilAbierta(false);
      if (nuevoModo === 'historia') {
        setVistaMapaMovil('mapa');
        setPanelHistoriaColapsado(false);
      }
    },
    [setModoActivo]
  );

  const ubicarNodoDesdeLista = useCallback(
    (nodeId: string) => {
      setVistaMapaMovil('mapa');
      cerrarInspeccionArista();
      setLeyendaMovilAbierta(false);
      abrirTooltipPorId(nodeId);
      setNodoEnfocadoExterno((prev) => ({ id: nodeId, nonce: (prev?.nonce ?? 0) + 1 }));
    },
    [cerrarInspeccionArista, abrirTooltipPorId]
  );

  const saltarANodoDesdeQuiz = useCallback(
    (nodeId: string) => {
      lab.cerrarLaboratorio();
      setModoActivo('mapa');
      setVistaMapaMovil('mapa');
      setLeyendaMovilAbierta(false);
      limpiarFiltros();
      cerrarInspeccionArista();
      abrirTooltipPorId(nodeId);
      setNodoEnfocadoExterno((prev) => ({ id: nodeId, nonce: (prev?.nonce ?? 0) + 1 }));
    },
    [lab, setModoActivo, limpiarFiltros, cerrarInspeccionArista, abrirTooltipPorId]
  );

  const alternarLeyendaMovil = useCallback(() => {
    cerrarTooltip();
    cerrarInspeccionArista();
    setLeyendaMovilAbierta((prev) => !prev);
  }, [cerrarTooltip, cerrarInspeccionArista]);

  return {
    tema, alternarTema, idAristaInspeccionada, cerrarInspeccionArista,
    dispositivo, bienvenida, lab, filtro, historia, flujo,
    nodosFinales, aristasFinales, nodoConFichaMovil, hayFiltroActivo,
    hojaInferiorAbierta, panelHistoriaColapsado, setPanelHistoriaColapsado,
    nodoEnfocadoExterno, vistaMapaMovil, setVistaMapaMovil,
    leyendaMovilAbierta, setLeyendaMovilAbierta, alternarLeyendaMovil,
    cambiarModo, ubicarNodoDesdeLista, saltarANodoDesdeQuiz
  };
}
