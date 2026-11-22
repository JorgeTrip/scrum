/**
 * Geometría pura en coordenadas del flujo para alinear las bandas de Swimlanes
 * y sus etiquetas laterales exactamente con las posiciones reales de Roles, Eventos y Artefactos.
 */

export interface BandaSwimlaneFlow {
  id: 'lane-roles' | 'lane-events' | 'lane-artifacts';
  top: number;
  height: number;
  claseFondoOscuro: string;
  claseFondoClaro: string;
  claseBorde: string;
}

export interface PosicionEtiquetaCarril {
  id: BandaSwimlaneFlow['id'];
  topPx: number;
}

export const LIMITE_SUPERIOR_CARRILES_FLOW = -120;
export const ALTURA_TOTAL_FLUJO_CARRILES = 1030;

/**
 * Retorna las tres bandas tricolor en coordenadas reales del lienzo React Flow.
 */
export function calcularBandasSwimlanesFlow(): BandaSwimlaneFlow[] {
  return [
    {
      id: 'lane-roles',
      top: -120,
      height: 310,
      claseFondoOscuro: 'bg-amber-950/15',
      claseFondoClaro: 'bg-amber-500/8',
      claseBorde: 'border-b border-amber-500/25'
    },
    {
      id: 'lane-events',
      top: 190,
      height: 350,
      claseFondoOscuro: 'bg-indigo-950/15',
      claseFondoClaro: 'bg-indigo-500/8',
      claseBorde: 'border-b border-indigo-500/25'
    },
    {
      id: 'lane-artifacts',
      top: 540,
      height: 370,
      claseFondoOscuro: 'bg-emerald-950/15',
      claseFondoClaro: 'bg-emerald-500/8',
      claseBorde: 'border-b border-emerald-500/25'
    }
  ];
}

/**
 * Calcula las posiciones verticales `topPx` de las etiquetas de carril ancladas a la izquierda,
 * acompañando la altura real en pantalla de cada franja tricolor tras aplicar zoom y paneo.
 */
export function calcularPosicionesEtiquetasCarriles(
  zoom: number,
  yViewport: number,
  altoLienzo: number,
  compactoMovil = false
): PosicionEtiquetaCarril[] {
  const bandas = calcularBandasSwimlanesFlow();
  const escala = zoom > 0 ? zoom : 1;
  const altoEtiqueta = compactoMovil ? 28 : 42;
  const pasoMinimo = compactoMovil ? 30 : 48;
  const margenMin = compactoMovil ? 8 : 16;
  const altoDisponible = Math.max(altoLienzo, margenMin + pasoMinimo * 3);

  const posiciones: PosicionEtiquetaCarril[] = [];

  for (let i = 0; i < bandas.length; i += 1) {
    const banda = bandas[i];
    const topBandaPx = banda.top * escala + yViewport;
    const altoBandaPx = banda.height * escala;
    const offsetInterno = Math.min(compactoMovil ? 6 : 14, Math.max(3, altoBandaPx * 0.1));

    const maxDentroDeBanda = topBandaPx + Math.max(0, altoBandaPx - altoEtiqueta - 4);
    let topPx = Math.max(margenMin, Math.min(topBandaPx + offsetInterno, maxDentroDeBanda));

    if (i === 0 && topBandaPx > margenMin) {
      topPx = topBandaPx + offsetInterno;
    }

    if (i > 0) {
      topPx = Math.max(topPx, posiciones[i - 1].topPx + pasoMinimo);
    }

    const limiteInferior = altoDisponible - margenMin - altoEtiqueta * (bandas.length - i);
    topPx = Math.min(topPx, Math.max(margenMin + i * pasoMinimo, limiteInferior));

    posiciones.push({ id: banda.id, topPx: Math.round(topPx) });
  }

  return posiciones;
}
