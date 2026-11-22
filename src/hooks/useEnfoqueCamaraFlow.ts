import { useEffect, useRef, useCallback } from 'react';
import { useReactFlow, useNodesInitialized, type Node } from '@xyflow/react';
import {
  esModoZoomFijoTresCarriles,
  leerDimensionesLienzoDom,
  resolverIdsObjetivoHistoria,
  resolverViewportContextual,
  seleccionarNodosObjetivo
} from '../utils/lectorMedidasLienzo';

const IDS_INICIO_MAPA_MOVIL = [
  'role-product-owner',
  'artifact-vision-board',
  'artifact-product-backlog',
  'event-sprint-planning'
];

interface ParametrosEnfoqueCamara {
  refContenedor: React.RefObject<HTMLDivElement | null>;
  modoActivo: 'historia' | 'mapa';
  idsNodosFoco: string[];
  idsNodosNuevos?: string[];
  nodoEnfocadoExterno: { id: string; nonce: number } | null;
  esMovil: boolean;
  esLandscapeCompacto: boolean;
  esPantallaPequena: boolean;
  panelHistoriaColapsado: boolean;
  hojaInferiorAbierta: boolean;
}

/**
 * Hook modular que sincroniza la cámara del grafo mediante cálculo geométrico asimétrico:
 * reserva espacio de paneles activos, alinea carriles hacia arriba y fija el zoom de 3 carriles en móvil vertical.
 */
export function useEnfoqueCamaraFlow(params: ParametrosEnfoqueCamara) {
  const {
    refContenedor, modoActivo, idsNodosFoco, idsNodosNuevos = [], nodoEnfocadoExterno,
    esMovil, esLandscapeCompacto, esPantallaPequena,
    panelHistoriaColapsado, hojaInferiorAbierta
  } = params;

  const { getNodes, getNodesBounds, setViewport } = useReactFlow();
  const nodosInicializados = useNodesInitialized();
  const prevModoRef = useRef<'historia' | 'mapa'>(modoActivo);
  const ultimoNonceExternoRef = useRef<number>(nodoEnfocadoExterno?.nonce ?? 0);
  const encuadreInicialHechoRef = useRef(false);
  const pendienteInicioMapaRef = useRef(false);

  const encuadrarNodos = useCallback(
    (
      objetivos: Node[],
      opciones: {
        padding?: number; minZoom?: number; maxZoom?: number;
        duration?: number; alinearArriba?: boolean; esMapaCompleto?: boolean;
        fijarZoomAlturaTresCarriles?: boolean;
      } = {}
    ) => {
      if (objetivos.length === 0) return;
      const caja = getNodesBounds(objetivos);
      if (caja.width <= 0 || caja.height <= 0) return;

      const vp = resolverViewportContextual({
        caja,
        lienzo: leerDimensionesLienzoDom(refContenedor.current),
        esMovil,
        esLandscapeCompacto,
        esPantallaPequena,
        modoActivo,
        panelHistoriaColapsado,
        hojaInferiorAbierta,
        ...opciones
      });
      setViewport(vp, { duration: opciones.duration ?? 350 });
    },
    [
      refContenedor, getNodesBounds, esMovil, esLandscapeCompacto,
      esPantallaPequena, modoActivo, panelHistoriaColapsado, hojaInferiorAbierta, setViewport
    ]
  );

  const encuadrarCapituloActual = useCallback(
    (duration: number) => {
      const modoFijoPortrait = esModoZoomFijoTresCarriles(esMovil, esLandscapeCompacto, modoActivo);
      const idsObjetivo = modoFijoPortrait
        ? resolverIdsObjetivoHistoria(idsNodosNuevos, idsNodosFoco)
        : idsNodosFoco;
      encuadrarNodos(seleccionarNodosObjetivo(getNodes(), idsObjetivo), {
        padding: modoFijoPortrait ? 0.06 : esPantallaPequena ? 0.09 : 0.14,
        maxZoom: esPantallaPequena ? 0.95 : 1.05,
        fijarZoomAlturaTresCarriles: modoFijoPortrait,
        duration
      });
    },
    [
      esMovil, esLandscapeCompacto, modoActivo, idsNodosNuevos,
      idsNodosFoco, encuadrarNodos, getNodes, esPantallaPequena
    ]
  );

  const encuadrarMapaCompleto = useCallback(
    (duration = 350) => {
      encuadrarNodos(getNodes(), {
        padding: esPantallaPequena ? 0.05 : 0.06,
        minZoom: esPantallaPequena ? 0.1 : 0.2,
        maxZoom: 1.0,
        duration,
        alinearArriba: true,
        esMapaCompleto: true
      });
    },
    [encuadrarNodos, getNodes, esPantallaPequena]
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const alRedimensionar = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (modoActivo === 'historia' && (idsNodosFoco.length > 0 || idsNodosNuevos.length > 0)) {
          encuadrarCapituloActual(250);
        } else {
          encuadrarMapaCompleto(250);
        }
      }, 120);
    };
    window.addEventListener('resize', alRedimensionar);
    return () => {
      window.removeEventListener('resize', alRedimensionar);
      clearTimeout(timer);
    };
  }, [modoActivo, idsNodosFoco, idsNodosNuevos, encuadrarCapituloActual, encuadrarMapaCompleto]);

  useEffect(() => {
    const modoAnterior = prevModoRef.current;
    if (modoAnterior !== modoActivo) {
      prevModoRef.current = modoActivo;
      const huboSaltoExterno = (nodoEnfocadoExterno?.nonce ?? 0) !== ultimoNonceExternoRef.current;
      pendienteInicioMapaRef.current = esPantallaPequena && modoActivo === 'mapa' && !huboSaltoExterno;
    }
    if (!nodosInicializados) return;

    if (!encuadreInicialHechoRef.current) {
      encuadreInicialHechoRef.current = true;
      if (modoActivo === 'mapa') {
        const timer = setTimeout(() => encuadrarMapaCompleto(0), 20);
        return () => clearTimeout(timer);
      }
    }

    if (pendienteInicioMapaRef.current) {
      const timer = setTimeout(() => {
        pendienteInicioMapaRef.current = false;
        encuadrarNodos(seleccionarNodosObjetivo(getNodes(), IDS_INICIO_MAPA_MOVIL), {
          padding: 0.08, maxZoom: 0.62, duration: 380, alinearArriba: true, esMapaCompleto: true
        });
      }, 90);
      return () => clearTimeout(timer);
    }
  }, [nodosInicializados, modoActivo, esPantallaPequena, nodoEnfocadoExterno, getNodes, encuadrarNodos, encuadrarMapaCompleto]);

  useEffect(() => {
    if (!nodosInicializados || modoActivo !== 'historia') return;
    if (idsNodosFoco.length === 0 && idsNodosNuevos.length === 0) return;
    const timer = setTimeout(() => encuadrarCapituloActual(380), 60);
    return () => clearTimeout(timer);
  }, [nodosInicializados, modoActivo, idsNodosFoco, idsNodosNuevos, panelHistoriaColapsado, encuadrarCapituloActual]);

  useEffect(() => {
    if (!nodosInicializados || !nodoEnfocadoExterno?.id) return;
    ultimoNonceExternoRef.current = nodoEnfocadoExterno.nonce;
    const timer = setTimeout(() => {
      encuadrarNodos(getNodes().filter((n) => n.id === nodoEnfocadoExterno.id), {
        padding: esPantallaPequena ? 0.14 : 0.22,
        minZoom: esPantallaPequena ? 0.72 : undefined,
        maxZoom: 1.1,
        duration: 420
      });
    }, 70);
    return () => clearTimeout(timer);
  }, [nodosInicializados, nodoEnfocadoExterno, getNodes, encuadrarNodos, esPantallaPequena]);

  return { encuadrarMapaCompleto };
}
