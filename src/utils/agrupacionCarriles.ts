/**
 * Agrupa los nodos del grafo en los 3 carriles metodológicos para su exploración
 * ordenada en pantallas móviles (Vista Lista por Carriles).
 */

import type { NodoScrum } from '../types/scrum';
import { contenidoEnriquecidoNodos } from '../dominio/datos/contenidoEnriquecidoNodos';

export interface GrupoCarrilMovil {
  id: 'lane-roles' | 'lane-events' | 'lane-artifacts';
  titulo: string;
  subtitulo: string;
  nodos: NodoScrum[];
}

/**
 * Determina si un nodo corresponde a una práctica complementaria de Product Discovery.
 */
export function esNodoDiscovery(idNodo: string): boolean {
  return contenidoEnriquecidoNodos[idNodo]?.origenMarco === 'discovery-complementario';
}

/**
 * Agrupa la lista de nodos en los tres carriles estándar respetando el orden horizontal del flujo.
 */
export function agruparNodosPorCarril(
  nodos: NodoScrum[],
  ocultarAtenuados = true
): GrupoCarrilMovil[] {
  const visibles = ocultarAtenuados
    ? nodos.filter((n) => (n.data.opacity ?? 1) >= 0.5)
    : nodos;

  const ordenarPorX = (lista: NodoScrum[]) =>
    [...lista].sort((a, b) => a.position.x - b.position.x);

  return [
    {
      id: 'lane-roles',
      titulo: 'Personas (Accountabilities)',
      subtitulo: 'Integrantes del Scrum Team',
      nodos: ordenarPorX(visibles.filter((n) => n.data.category === 'role'))
    },
    {
      id: 'lane-events',
      titulo: 'Eventos del Ciclo',
      subtitulo: 'Inspección y adaptación formal',
      nodos: ordenarPorX(visibles.filter((n) => n.data.category === 'event'))
    },
    {
      id: 'lane-artifacts',
      titulo: 'Documentos (Artefactos y Discovery)',
      subtitulo: 'Transparencia oficial 2020 y prácticas previas',
      nodos: ordenarPorX(visibles.filter((n) => n.data.category === 'artifact'))
    }
  ];
}
