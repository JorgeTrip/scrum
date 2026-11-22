/**
 * Índice unificado de metadatos pedagógicos para todas las aristas del grafo.
 */

import type { MetadatoAristaScrum } from '../tiposDominio';
import { metadatosAristasRoles } from './metadatosAristasRoles';
import { metadatosAristasFlujo } from './metadatosAristasFlujo';

export const metadatosAristas: Record<string, MetadatoAristaScrum> = {
  ...metadatosAristasRoles,
  ...metadatosAristasFlujo
};
