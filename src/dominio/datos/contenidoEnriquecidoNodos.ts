/**
 * Índice unificado de contenido enriquecido por identificador de nodo.
 */

import type { ContenidoEnriquecidoNodo } from '../tiposDominio';
import { contenidoEnriquecidoRolesEventos } from './contenidoEnriquecidoRolesEventos';
import { contenidoEnriquecidoArtefactos } from './contenidoEnriquecidoArtefactos';

export const contenidoEnriquecidoNodos: Record<string, ContenidoEnriquecidoNodo> = {
  ...contenidoEnriquecidoRolesEventos,
  ...contenidoEnriquecidoArtefactos
};
