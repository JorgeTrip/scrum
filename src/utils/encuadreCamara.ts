/**
 * Cálculos geométricos puros de cámara para React Flow:
 * encuadra nodos dentro del área realmente visible según paneles activos
 * y alinea los 3 carriles hacia arriba cuando caben completos en pantalla.
 */

import {
  ALTURA_TOTAL_FLUJO_CARRILES,
  LIMITE_SUPERIOR_CARRILES_FLOW
} from './swimlanesGeometria';

export interface CajaLimitesFlow {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DimensionesLienzo {
  ancho: number;
  alto: number;
}

export interface ReservasViewport {
  arriba: number;
  derecha: number;
  abajo: number;
  izquierda: number;
}

export interface ParametrosReservasViewport {
  anchoLienzo: number;
  altoLienzo: number;
  esMovil: boolean;
  esLandscapeCompacto: boolean;
  modoActivo: 'historia' | 'mapa';
  panelHistoriaColapsado: boolean;
  hojaInferiorAbierta: boolean;
  altoPanelHistoriaMovil?: number;
  anchoPanelLateral?: number;
}

export interface ResultadoReservasViewport {
  reservas: ReservasViewport;
  anchoUtil: number;
  altoUtil: number;
}

export interface OpcionesEncuadreAsimetrico {
  reservas: ReservasViewport;
  padding?: number;
  minZoom: number;
  maxZoom: number;
  alinearArriba?: boolean;
  topReferenciaSiAlineado?: number;
  /** Fija zoom y alineación Y según altura total de los 3 carriles (paneo horizontal por etapas en móvil) */
  fijarZoomAlturaTresCarriles?: boolean;
}

export interface ViewportCalculado {
  x: number;
  y: number;
  zoom: number;
}

function acotarValor(valor: number, minimo: number, maximo: number): number {
  return Math.min(maximo, Math.max(minimo, valor));
}

/**
 * Calcula los márgenes internos reservados por paneles flotantes, barras de control
 * y hojas inferiores para obtener la ventana libre útil real del grafo.
 */
export function calcularReservasViewport(
  p: ParametrosReservasViewport
): ResultadoReservasViewport {
  const esCompacto = p.esMovil || p.esLandscapeCompacto;
  const reservas: ReservasViewport = p.esLandscapeCompacto
    ? { arriba: 58, derecha: 16, abajo: 14, izquierda: 16 }
    : esCompacto
      ? { arriba: 10, derecha: 58, abajo: 14, izquierda: 12 }
      : { arriba: 16, derecha: 56, abajo: 16, izquierda: 16 };

  if (p.hojaInferiorAbierta && esCompacto) {
    const reservaHoja = Math.round(
      Math.min(p.altoLienzo * 0.62, Math.max(200, p.altoLienzo - 165))
    );
    reservas.abajo = Math.max(reservas.abajo, reservaHoja);
  } else if (p.modoActivo === 'historia') {
    if (p.esMovil && !p.esLandscapeCompacto) {
      if (p.panelHistoriaColapsado) {
        reservas.abajo = Math.max(reservas.abajo, 72);
      } else {
        const altoPanel =
          p.altoPanelHistoriaMovil ?? Math.min(Math.round(p.altoLienzo * 0.56), 312);
        reservas.abajo = Math.max(reservas.abajo, altoPanel + 10);
      }
    } else if (p.esLandscapeCompacto) {
      const anchoLateral = Math.min(344, Math.round(p.anchoLienzo * 0.44) + 16);
      reservas.izquierda = Math.max(reservas.izquierda, anchoLateral);
    } else {
      const anchoDeskt = p.anchoPanelLateral ?? 464;
      const maxSeguro = Math.max(260, p.anchoLienzo - 320);
      reservas.izquierda = Math.max(reservas.izquierda, Math.min(anchoDeskt, maxSeguro));
    }
  }

  return {
    reservas,
    anchoUtil: Math.max(120, p.anchoLienzo - reservas.izquierda - reservas.derecha),
    altoUtil: Math.max(120, p.altoLienzo - reservas.arriba - reservas.abajo)
  };
}

/**
 * Calcula `x`, `y` y `zoom` encajando `caja` dentro del área útil descontando `reservas`.
 * Alinea verticalmente hacia arriba cuando `alinearArriba` está activo o cuando los
 * 3 carriles completos caben dentro del alto visible disponible.
 */
export function calcularViewportEncuadre(
  caja: CajaLimitesFlow,
  lienzo: DimensionesLienzo,
  opciones: OpcionesEncuadreAsimetrico
): ViewportCalculado {
  const { reservas, padding = 0.08, minZoom, maxZoom } = opciones;
  const anchoUtil = Math.max(120, lienzo.ancho - reservas.izquierda - reservas.derecha);
  const altoUtil = Math.max(120, lienzo.alto - reservas.arriba - reservas.abajo);

  const widthSeguro = Math.max(1, caja.width);
  const heightSeguro = Math.max(1, caja.height);
  const usarTresCarrilesFijos = Boolean(opciones.fijarZoomAlturaTresCarriles);

  const escalaX = (anchoUtil * (1 - padding * 2)) / widthSeguro;
  const escalaY = (altoUtil * (1 - padding * 2)) / heightSeguro;
  const escalaTresCarriles = (altoUtil * (1 - padding * 2)) / ALTURA_TOTAL_FLUJO_CARRILES;
  const zoom = usarTresCarrilesFijos
    ? acotarValor(escalaTresCarriles, minZoom, maxZoom)
    : acotarValor(Math.min(escalaX, escalaY), minZoom, maxZoom);

  const anchoContenidoPx = widthSeguro * zoom;
  const altoContenidoPx = heightSeguro * zoom;

  const x = Math.round(
    reservas.izquierda + (anchoUtil - anchoContenidoPx) / 2 - caja.x * zoom
  );

  const cabenTresCarriles = ALTURA_TOTAL_FLUJO_CARRILES * zoom <= altoUtil * 1.12;
  const debeAlinearArriba =
    usarTresCarrilesFijos || Boolean(opciones.alinearArriba) || cabenTresCarriles;

  let y: number;
  if (debeAlinearArriba) {
    const topReferencia = usarTresCarrilesFijos
      ? LIMITE_SUPERIOR_CARRILES_FLOW
      : opciones.topReferenciaSiAlineado ??
        (cabenTresCarriles ? Math.min(caja.y, LIMITE_SUPERIOR_CARRILES_FLOW) : caja.y);
    const margenSuperior = Math.min(18, Math.max(8, Math.round(altoUtil * 0.05)));
    y = Math.round(reservas.arriba + margenSuperior - topReferencia * zoom);
    const fondoMaximo = lienzo.alto - reservas.abajo - 6;
    const limiteInferiorFlow = usarTresCarrilesFijos
      ? LIMITE_SUPERIOR_CARRILES_FLOW + ALTURA_TOTAL_FLUJO_CARRILES
      : caja.y + heightSeguro;
    const fondoReal = limiteInferiorFlow * zoom + y;
    if (fondoReal > fondoMaximo) {
      y -= Math.ceil(fondoReal - fondoMaximo);
    }
  } else {
    y = Math.round(
      reservas.arriba + (altoUtil - altoContenidoPx) / 2 - caja.y * zoom
    );
  }

  return { x, y, zoom };
}
