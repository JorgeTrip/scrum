/**
 * Cálculo puro del desplazamiento contextual del lienzo:
 * restringe el eje Y cuando todos los carriles caben en el viewport,
 * y habilita paneo 2D cuando el zoom supera la altura visible.
 */

import { ALTURA_TOTAL_FLUJO_CARRILES } from './swimlanesGeometria';

export interface ViewportBasico {
  x: number;
  y: number;
  zoom: number;
}

export interface ContextoObjetivoPaneo {
  enNodo: boolean;
  enArista: boolean;
  enControlOInput?: boolean;
}

/**
 * Determina si un evento sobre el lienzo debe bloquear el inicio del paneo.
 * En modo táctil se permite arrastrar incluso sobre aristas para evitar bloqueos al desplazar con el dedo.
 */
export function esObjetivoBloqueanteDePaneo(
  ctx: ContextoObjetivoPaneo,
  permitirSobreArista: boolean
): boolean {
  if (ctx.enControlOInput || ctx.enNodo) return true;
  if (ctx.enArista && !permitirSobreArista) return true;
  return false;
}

/**
 * Determina si el usuario requiere paneo vertical para inspeccionar carriles fuera de pantalla.
 */
export function requierePaneoVertical(zoom: number, altoViewport: number): boolean {
  return ALTURA_TOTAL_FLUJO_CARRILES * zoom > altoViewport;
}

/**
 * Calcula las nuevas coordenadas del viewport durante un arrastre de fondo.
 */
export function calcularViewportArrastre(
  viewportInicial: ViewportBasico,
  deltaX: number,
  deltaY: number,
  altoViewport: number
): ViewportBasico {
  const permitirY = requierePaneoVertical(viewportInicial.zoom, altoViewport);

  return {
    x: Math.round(viewportInicial.x + deltaX),
    y: permitirY ? Math.round(viewportInicial.y + deltaY) : viewportInicial.y,
    zoom: viewportInicial.zoom
  };
}
