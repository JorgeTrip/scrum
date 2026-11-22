/**
 * Servicio puro para calcular la opacidad visual y el foco topológico de las aristas.
 */

export interface EstiloAristaMinimo {
  opacity?: number | string;
}

export interface AristaMinima {
  id: string;
  source: string;
  target: string;
  style?: EstiloAristaMinimo;
}

export interface NodoMinimo {
  id: string;
  data?: {
    opacity?: number;
  };
}

/**
 * Determina la opacidad de cada arista según filtros activos sobre nodos o foco en un nodo específico.
 */
export function calcularEstadoAristas<TArista extends AristaMinima, TNodo extends NodoMinimo>(
  aristas: TArista[],
  nodos: TNodo[],
  idNodoFoco: string | null,
  hayFiltroActivo: boolean
): TArista[] {
  const mapaOpacidadNodos = new Map<string, number>();
  for (const nodo of nodos) {
    mapaOpacidadNodos.set(nodo.id, nodo.data?.opacity ?? 1.0);
  }

  return aristas.map((arista) => {
    let opacidad = 1;

    if (idNodoFoco) {
      const estaConectada = arista.source === idNodoFoco || arista.target === idNodoFoco;
      opacidad = estaConectada ? 1 : 0.18;
    } else if (hayFiltroActivo) {
      const opOrigen = mapaOpacidadNodos.get(arista.source) ?? 1.0;
      const opDestino = mapaOpacidadNodos.get(arista.target) ?? 1.0;
      const coincideExtremo = opOrigen >= 0.9 || opDestino >= 0.9;
      opacidad = coincideExtremo ? 1 : 0.15;
    }

    return {
      ...arista,
      style: {
        ...(arista.style ?? {}),
        opacity: opacidad
      }
    } as TArista;
  });
}
