/**
 * Cálculos vectoriales puros FLIP y utilidades de accesibilidad
 * para animar modales hacia y desde el botón ancla «S».
 */

export const SELECTOR_ANCLA_BOTON_S = '[data-ancla-acerca-de="boton-s"]';
export const DURACION_ANIMACION_ANCLA_MS = 380;
export const RETRASO_PULSO_ANCLA_MS = 320;
export const CURVA_APPLE_ANCLA = 'cubic-bezier(0.32, 0.72, 0, 1)';
export const CLASE_PULSO_ANCLA_S = 'pulso-recepcion-ancla-s';

export interface RectanguloBasico {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface TransformacionAncla {
  dx: number;
  dy: number;
  escala: number;
  cssTransform: string;
}

const RESPALDO_ANCLA: TransformacionAncla = {
  dx: 0,
  dy: -24,
  escala: 0.92,
  cssTransform: 'translate3d(0px, -24px, 0) scale(0.92)'
};

/**
 * Calcula desplazamiento vectorial y escala acotada `[0.05..0.25]` desde el centro del modal
 * hacia el centro del botón ancla, o un respaldo sutil cuando no existe ancla válida.
 */
export function calcularTransformacionHaciaAncla(
  rectModal: RectanguloBasico | null | undefined,
  rectAncla: RectanguloBasico | null | undefined
): TransformacionAncla {
  if (
    !rectModal ||
    !rectAncla ||
    rectModal.width <= 0 ||
    rectModal.height <= 0 ||
    rectAncla.width <= 0 ||
    rectAncla.height <= 0
  ) {
    return RESPALDO_ANCLA;
  }

  const centroModalX = rectModal.left + rectModal.width / 2;
  const centroModalY = rectModal.top + rectModal.height / 2;
  const centroAnclaX = rectAncla.left + rectAncla.width / 2;
  const centroAnclaY = rectAncla.top + rectAncla.height / 2;

  const dx = Math.round(centroAnclaX - centroModalX);
  const dy = Math.round(centroAnclaY - centroModalY);
  const escalaBruta = Math.min(rectAncla.width / rectModal.width, rectAncla.height / rectModal.height);
  const escala = Number(Math.min(0.25, Math.max(0.05, escalaBruta)).toFixed(3));

  return {
    dx,
    dy,
    escala,
    cssTransform: `translate3d(${dx}px, ${dy}px, 0) scale(${escala})`
  };
}

export type ConsultaMatchMedia = (consulta: string) => { matches: boolean };

/**
 * Indica de forma segura (incluyendo SSR) si el usuario prefiere movimiento reducido.
 */
export function prefiereMovimientoReducido(
  matcher: ConsultaMatchMedia | null | undefined = undefined
): boolean {
  if (matcher === null) return false;
  try {
    if (typeof matcher === 'function') {
      return Boolean(matcher('(prefers-reduced-motion: reduce)').matches);
    }
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      return Boolean(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * Ejecuta un pulso breve de recepción sobre el elemento ancla al aterrizar el modal.
 */
export function dispararPulsoRecepcionAncla(elemento: HTMLElement | null | undefined): void {
  if (!elemento || prefiereMovimientoReducido()) return;

  elemento.classList.remove(CLASE_PULSO_ANCLA_S);
  void elemento.offsetWidth;
  elemento.classList.add(CLASE_PULSO_ANCLA_S);

  const limpiar = () => elemento.classList.remove(CLASE_PULSO_ANCLA_S);
  elemento.addEventListener('animationend', limpiar, { once: true });
  setTimeout(limpiar, 480);
}
