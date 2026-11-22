import React from 'react';
import { Search, X, Users, Calendar, Layers, Sparkles, Sun, Moon } from 'lucide-react';
import type { CategoriaScrum } from '../types/scrum';
import type { TemaVisual } from '../dominio/tiposDominio';

interface BarraFiltrosTopBarProps {
  busqueda: string;
  onCambioBusqueda: (texto: string) => void;
  categoriaSeleccionada: CategoriaScrum | 'all';
  onSeleccionCategoria: (cat: CategoriaScrum | 'all') => void;
  onResetFiltros: () => void;
  modoActivo: 'historia' | 'mapa';
  tema: TemaVisual;
  onAlternarTema?: () => void;
  esEntornoTactil?: boolean;
}

export const FILTROS_SCRUM: { id: CategoriaScrum | 'all'; label: string; icono: React.ReactNode }[] = [
  { id: 'all', label: 'Todos', icono: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'role', label: 'Roles', icono: <Users className="w-3.5 h-3.5" /> },
  { id: 'event', label: 'Eventos', icono: <Calendar className="w-3.5 h-3.5" /> },
  { id: 'artifact', label: 'Documentos', icono: <Layers className="w-3.5 h-3.5" /> }
];

/**
 * Bloque derecho de TopBar: buscador textual, filtros por categoría y selector Claro/Oscuro.
 */
export const BarraFiltrosTopBar: React.FC<BarraFiltrosTopBarProps> = ({
  busqueda,
  onCambioBusqueda,
  categoriaSeleccionada,
  onSeleccionCategoria,
  onResetFiltros,
  modoActivo,
  tema,
  onAlternarTema,
  esEntornoTactil = false
}) => {
  const claseTactil = esEntornoTactil ? 'min-w-[44px] min-h-[44px]' : '';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative w-32 lg:w-56">
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={busqueda}
          onChange={(e) => onCambioBusqueda(e.target.value)}
          placeholder="Buscar concepto..."
          aria-label="Buscar concepto de Scrum"
          className={`w-full ${esEntornoTactil ? 'h-11 pr-11' : 'h-9 pr-8'} pl-9 bg-zinc-100 dark:bg-zinc-900/90 focus:bg-white dark:focus:bg-zinc-950 text-xs text-zinc-900 dark:text-white rounded-xl border border-zinc-300 dark:border-zinc-700/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-zinc-500`}
        />
        {busqueda && (
          <button
            type="button"
            onClick={() => onCambioBusqueda('')}
            aria-label="Borrar búsqueda"
            className={`absolute right-0 top-1/2 -translate-y-1/2 ${esEntornoTactil ? 'min-w-[44px] min-h-[44px]' : 'right-2.5'} flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {modoActivo === 'mapa' && (
        <div className="hidden md:flex items-center p-1 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800">
          {FILTROS_SCRUM.map((f) => {
            const activo = categoriaSeleccionada === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onSeleccionCategoria(f.id)}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-1 ${claseTactil} rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activo
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-300 dark:border-zinc-700/80'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {f.icono}
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {(busqueda || (modoActivo === 'mapa' && categoriaSeleccionada !== 'all')) && (
        <button
          type="button"
          onClick={onResetFiltros}
          className={`text-xs text-indigo-700 dark:text-indigo-400 hover:underline font-medium px-2 ${claseTactil} cursor-pointer`}
        >
          Limpiar
        </button>
      )}

      {onAlternarTema && (
        <button
          type="button"
          onClick={onAlternarTema}
          aria-label={tema === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          title={tema === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          className={`${esEntornoTactil ? 'w-11 h-11' : 'w-9 h-9'} rounded-xl flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/70 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer`}
        >
          {tema === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>
      )}
    </div>
  );
};
