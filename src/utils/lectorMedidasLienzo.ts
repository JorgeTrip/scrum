/**
 * Utilidades de apoyo DOM y resolución de viewport contextual para React Flow,
 * manteniendo `useEnfoqueCamaraFlow` delgado y por debajo del límite de líneas.
 */

import type { Node } from '@xyflow/react';
import {
  calcularReservasViewport,
  calcularViewportEncuadre,
  type CajaLimitesFlow,
  type DimensionesLienzo,
  type ViewportCalculado
} from './encuadreCamara';
import { LIMITE_SUPERIOR_CARRILES_FLOW } from './swimlanesGeometria';

export interface ContextoResolucionViewport {
  caja: CajaLimitesFlow;
  lienzo: DimensionesLienzo;
  esMovil: boolean;
  esLandscapeCompacto: boolean;
  esPantallaPequena: boolean;
  modoActivo: 'historia' | 'mapa';
  panelHistoriaColapsado: boolean;
  hojaInferiorAbierta: boolean;
  padding?: number;
  minZoom?: number;
  maxZoom?: number;
  alinearArriba?: boolean;
  esMapaCompleto?: boolean;
  fijarZoomAlturaTresCarriles?: boolean;
}

/**
 * Indica si corresponde el modo de zoom constante a altura de 3 carriles (solo Historia en móvil vertical).
 */
export function esModoZoomFijoTresCarriles(
  esMovil: boolean,
  esLandscapeCompacto: boolean,
  modoActivo: 'historia' | 'mapa'
): boolean {
  return esMovil && !esLandscapeCompacto && modoActivo === 'historia';
}

/**
 * Prioriza los nodos recién incorporados en el capítulo; si la lista viene vacía, usa respaldo seguro.
 */
export function resolverIdsObjetivoHistoria(
  idsNodosNuevos: string[] | undefined,
  idsDestacados: string[]
): string[] {
  return idsNodosNuevos && idsNodosNuevos.length > 0 ? idsNodosNuevos : idsDestacados;
}

/**
 * Obtiene ancho y alto reales del contenedor del grafo con fallback seguro para SSR.
 */
export function leerDimensionesLienzoDom(el: HTMLDivElement | null): DimensionesLienzo {
  const rect = el?.getBoundingClientRect();
  if (rect && rect.width > 0 && rect.height > 0) {
    return { ancho: Math.round(rect.width), alto: Math.round(rect.height) };
  }
  return {
    ancho: typeof window !== 'undefined' ? window.innerWidth : 1280,
    alto: typeof window !== 'undefined' ? Math.max(240, window.innerHeight - 96) : 720
  };
}

/**
 * Mide en runtime la altura real del panel narrativo móvil cuando está expandido.
 */
export function obtenerAltoPanelHistoriaDom(): number | undefined {
  if (typeof document === 'undefined') return undefined;
  const el = document.querySelector('[aria-label="Narrativa paso a paso de Scrum"]');
  const h = el?.getBoundingClientRect().height;
  return h && h > 40 ? Math.round(h) : undefined;
}

/**
 * Calcula una altura de reserva estable acorde al tope `max-h-[46dvh]` del panel móvil,
 * evitando microvariaciones de zoom entre capítulos con textos de distinta longitud.
 */
function obtenerAltoTopePanelMovil(altoLienzo: number): number {
  const topeVentana =
    typeof window !== 'undefined' && window.innerHeight > 0
      ? Math.round(window.innerHeight * 0.46) + 4
      : Math.round(altoLienzo * 0.57);
  return Math.min(Math.round(altoLienzo * 0.6), Math.max(220, topeVentana));
}

/**
 * Resuelve reservas y viewport óptimo para la caja de nodos objetivo según entorno y overlays.
 */
export function resolverViewportContextual(ctx: ContextoResolucionViewport): ViewportCalculado {
  const usaAlturaEstablePanel = Boolean(
    ctx.fijarZoomAlturaTresCarriles && ctx.esMovil && ctx.modoActivo === 'historia'
  );
  const altoPanelHistoriaMovil =
    ctx.esMovil && ctx.modoActivo === 'historia' && !ctx.panelHistoriaColapsado
      ? usaAlturaEstablePanel
        ? obtenerAltoTopePanelMovil(ctx.lienzo.alto)
        : obtenerAltoPanelHistoriaDom()
      : undefined;

  const { reservas } = calcularReservasViewport({
    anchoLienzo: ctx.lienzo.ancho,
    altoLienzo: ctx.lienzo.alto,
    esMovil: ctx.esMovil,
    esLandscapeCompacto: ctx.esLandscapeCompacto,
    modoActivo: ctx.modoActivo,
    panelHistoriaColapsado: ctx.panelHistoriaColapsado,
    hojaInferiorAbierta: ctx.hojaInferiorAbierta,
    altoPanelHistoriaMovil
  });

  return calcularViewportEncuadre(ctx.caja, ctx.lienzo, {
    reservas,
    padding: ctx.padding ?? 0.08,
    minZoom: ctx.minZoom ?? (ctx.esPantallaPequena ? 0.1 : 0.2),
    maxZoom: ctx.maxZoom ?? 1.15,
    alinearArriba: ctx.alinearArriba,
    topReferenciaSiAlineado: ctx.esMapaCompleto ? LIMITE_SUPERIOR_CARRILES_FLOW : undefined,
    fijarZoomAlturaTresCarriles: ctx.fijarZoomAlturaTresCarriles
  });
}

/**
 * Filtra nodos visibles por ID preservando fallback completo si no hay coincidencias.
 */
export function seleccionarNodosObjetivo(todos: Node[], ids: string[]): Node[] {
  const filtrados = todos.filter((n) => ids.includes(n.id));
  return filtrados.length > 0 ? filtrados : todos;
}
