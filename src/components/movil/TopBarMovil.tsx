import React, { useState } from 'react';
import { Search, X, Sun, Moon, Map as MapIcon, List } from 'lucide-react';
import type { CategoriaScrum } from '../../types/scrum';
import type { TemaVisual } from '../../dominio/tiposDominio';
import { FILTROS_SCRUM } from '../BarraFiltrosTopBar';

interface TopBarMovilProps {
  busqueda: string;
  onCambioBusqueda: (texto: string) => void;
  categoriaSeleccionada: CategoriaScrum | 'all';
  onSeleccionCategoria: (cat: CategoriaScrum | 'all') => void;
  onResetFiltros: () => void;
  modoActivo: 'historia' | 'mapa';
  vistaMapaMovil: 'mapa' | 'lista';
  onCambiarVistaMapaMovil?: (vista: 'mapa' | 'lista') => void;
  tema: TemaVisual;
  onAlternarTema?: () => void;
  onAbrirAcercaDe: () => void;
}

/**
 * Barra superior móvil de 1 fila compacta: marca, buscador expandible, tema,
 * chips de categoría y alternador Mapa/Lista en Mapa Libre, con targets >= 44px.
 */
export const TopBarMovil: React.FC<TopBarMovilProps> = ({
  busqueda,
  onCambioBusqueda,
  categoriaSeleccionada,
  onSeleccionCategoria,
  onResetFiltros,
  modoActivo,
  vistaMapaMovil,
  onCambiarVistaMapaMovil,
  tema,
  onAlternarTema,
  onAbrirAcercaDe
}) => {
  const [buscadorAbierto, setBuscadorAbierto] = useState(false);
  const mostrarBuscador = buscadorAbierto || busqueda.trim().length > 0;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={onAbrirAcercaDe}
            data-ancla-acerca-de="boton-s"
            aria-label="Abrir información del proyecto y Guía Oficial de Scrum 2020"
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform cursor-pointer shrink-0"
          >
            <span className="font-black text-white text-base">S</span>
          </button>
          <div className="flex items-center gap-1 min-w-0">
            <h1 className="text-sm font-extrabold text-zinc-900 dark:text-white tracking-tight truncate">
              Scrum
            </h1>
            <button
              type="button"
              onClick={onAbrirAcercaDe}
              aria-label="Ver fuentes oficiales Guía 2020"
              className="min-h-[44px] px-1 inline-flex items-center cursor-pointer shrink-0"
            >
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700/60">
                Guía 2020
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setBuscadorAbierto((prev) => !prev)}
            aria-label={mostrarBuscador ? 'Cerrar buscador' : 'Buscar concepto de Scrum'}
            aria-expanded={mostrarBuscador}
            className={`relative min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center border transition-colors cursor-pointer ${
              mostrarBuscador
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700/70 text-zinc-700 dark:text-zinc-200'
            }`}
          >
            {mostrarBuscador ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            {busqueda.trim().length > 0 && !mostrarBuscador && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>

          {onAlternarTema && (
            <button
              type="button"
              onClick={onAlternarTema}
              aria-label={tema === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
              className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/70 text-zinc-700 dark:text-zinc-200 cursor-pointer"
            >
              {tema === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>
          )}
        </div>
      </div>

      {mostrarBuscador && (
        <div className="relative flex items-center gap-1.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => onCambioBusqueda(e.target.value)}
              placeholder="Buscar rol, evento o artefacto..."
              aria-label="Buscar concepto de Scrum"
              className="w-full h-11 pl-9 pr-11 bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white rounded-xl border border-zinc-300 dark:border-zinc-700/80 focus:border-indigo-500 focus:outline-none"
            />
            {busqueda && (
              <button type="button" onClick={() => onCambioBusqueda('')} aria-label="Borrar búsqueda" className="absolute right-0 top-0 min-w-[44px] min-h-[44px] flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {(busqueda || (modoActivo === 'mapa' && categoriaSeleccionada !== 'all')) && (
            <button type="button" onClick={onResetFiltros} className="min-h-[44px] px-3 rounded-xl text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 whitespace-nowrap cursor-pointer">
              Limpiar
            </button>
          )}
        </div>
      )}

      {modoActivo === 'mapa' && (
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 flex-1 min-w-0">
            {FILTROS_SCRUM.map((f) => {
              const activo = categoriaSeleccionada === f.id;
              const etiquetaCorta = f.id === 'artifact' ? 'Docs' : f.label;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onSeleccionCategoria(f.id)}
                  aria-label={f.label}
                  className={`inline-flex items-center justify-center gap-1 px-2.5 min-w-[44px] min-h-[44px] rounded-xl text-[11px] font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                    activo
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <span className="hidden min-[400px]:inline-flex">{f.icono}</span>
                  <span>{etiquetaCorta}</span>
                </button>
              );
            })}
          </div>

          {onCambiarVistaMapaMovil && (
            <div role="group" aria-label="Alternar vista de mapa o lista" className="flex items-center p-0.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0">
              <button
                type="button"
                onClick={() => onCambiarVistaMapaMovil('mapa')}
                aria-label="Ver grafo interactivo"
                title="Grafo"
                aria-pressed={vistaMapaMovil === 'mapa'}
                className={`min-w-[44px] min-h-[44px] rounded-lg flex items-center justify-center cursor-pointer ${vistaMapaMovil === 'mapa' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-600 dark:text-zinc-400'}`}
              >
                <MapIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onCambiarVistaMapaMovil('lista')}
                aria-label="Ver lista por carriles"
                title="Lista por carriles"
                aria-pressed={vistaMapaMovil === 'lista'}
                className={`min-w-[44px] min-h-[44px] rounded-lg flex items-center justify-center cursor-pointer ${vistaMapaMovil === 'lista' ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-600 dark:text-zinc-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
