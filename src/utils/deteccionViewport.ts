/**
 * Utilidad pura para clasificar el viewport y las capacidades táctiles del dispositivo.
 */

export interface EstadoViewport {
  esMovil: boolean;
  esLandscapeCompacto: boolean;
  esPantallaPequena: boolean;
  esTactil: boolean;
}

const ANCHO_CORTE_MOVIL = 768;
const ALTO_CORTE_LANDSCAPE_COMPACTO = 500;

/**
 * Clasifica el entorno visual según dimensiones del viewport y tipo de puntero.
 */
export function clasificarViewport(
  ancho: number,
  alto: number,
  esPunteroGrueso: boolean
): EstadoViewport {
  const esMovil = ancho < ANCHO_CORTE_MOVIL;
  const esLandscapeCompacto = alto <= ALTO_CORTE_LANDSCAPE_COMPACTO && ancho > alto;
  const esPantallaPequena = esMovil || esLandscapeCompacto;

  return {
    esMovil,
    esLandscapeCompacto,
    esPantallaPequena,
    esTactil: esPunteroGrueso
  };
}
