import React from 'react';
import { MapPin, ChevronRight, Users, Calendar, Layers, Compass } from 'lucide-react';
import type { NodoScrum, DatosNodoScrum } from '../../types/scrum';
import { agruparNodosPorCarril, esNodoDiscovery } from '../../utils/agrupacionCarriles';

interface VistaListaCarrilesProps {
  nodos: NodoScrum[];
  hayFiltroActivo: boolean;
  onSeleccionarNodo: (datos: DatosNodoScrum) => void;
  onUbicarEnMapa: (idNodo: string) => void;
  onLimpiarFiltros?: () => void;
}

/**
 * Vista alternativa optimizada para pantallas pequeñas que organiza los conceptos
 * por carril (Personas, Eventos y Documentos) evitando lecturas a zoom reducido.
 */
export const VistaListaCarriles: React.FC<VistaListaCarrilesProps> = ({
  nodos,
  hayFiltroActivo,
  onSeleccionarNodo,
  onUbicarEnMapa,
  onLimpiarFiltros
}) => {
  const grupos = agruparNodosPorCarril(nodos, hayFiltroActivo);
  const totalVisibles = grupos.reduce((acc, g) => acc + g.nodos.length, 0);

  const obtenerEstiloCarril = (id: string) => {
    if (id === 'lane-roles') {
      return {
        icono: <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
        acento: 'text-amber-700 dark:text-amber-300 border-amber-500/30 bg-amber-500/10'
      };
    }
    if (id === 'lane-events') {
      return {
        icono: <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        acento: 'text-indigo-700 dark:text-indigo-300 border-indigo-500/30 bg-indigo-500/10'
      };
    }
    return {
      icono: <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      acento: 'text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/10'
    };
  };

  if (totalVisibles === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center gap-3">
        <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          No hay conceptos que coincidan con tu filtro actual.
        </p>
        {onLimpiarFiltros && (
          <button
            type="button"
            onClick={onLimpiarFiltros}
            className="min-h-[44px] px-4 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-3 py-4 space-y-5 bg-[var(--bg-lienzo)]">
      {grupos.map((grupo) => {
        if (grupo.nodos.length === 0) return null;
        const estilo = obtenerEstiloCarril(grupo.id);
        return (
          <section key={grupo.id} aria-label={grupo.titulo} className="space-y-2.5">
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <span className={`p-1.5 rounded-xl border ${estilo.acento}`}>{estilo.icono}</span>
                <div>
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white">
                    {grupo.titulo}
                  </h2>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{grupo.subtitulo}</p>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                {grupo.nodos.length}
              </span>
            </div>

            <div className="space-y-2">
              {grupo.nodos.map((nodo) => {
                const discovery = esNodoDiscovery(nodo.id);
                return (
                  <article
                    key={nodo.id}
                    className="p-3.5 rounded-2xl bg-[var(--bg-panel)] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2"
                  >
                    <button
                      type="button"
                      onClick={() => onSeleccionarNodo(nodo.data)}
                      className="w-full text-left flex items-start justify-between gap-2 cursor-pointer"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                            {nodo.data.label}
                          </h3>
                          {discovery && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-teal-500/15 text-teal-800 dark:text-teal-300">
                              <Compass className="w-3 h-3" />
                              Discovery
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                          {nodo.data.summary}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0 mt-1" />
                    </button>

                    <div className="flex items-center justify-between pt-1.5 border-t border-zinc-200/80 dark:border-zinc-800/80">
                      <button
                        type="button"
                        onClick={() => onSeleccionarNodo(nodo.data)}
                        className="min-h-[44px] px-2.5 rounded-xl text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/10 cursor-pointer"
                      >
                        Ver ficha completa
                      </button>
                      <button
                        type="button"
                        onClick={() => onUbicarEnMapa(nodo.id)}
                        className="inline-flex items-center gap-1 min-h-[44px] px-3 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>Ubicar en el mapa</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
