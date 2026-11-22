import React from 'react';
import { BookOpen, Compass, FlaskConical } from 'lucide-react';
import type { CategoriaScrum } from '../types/scrum';
import type { TemaVisual } from '../dominio/tiposDominio';
import { BarraFiltrosTopBar } from './BarraFiltrosTopBar';
import { TopBarMovil } from './movil/TopBarMovil';

interface TopBarProps {
  busqueda: string;
  onCambioBusqueda: (texto: string) => void;
  categoriaSeleccionada: CategoriaScrum | 'all';
  onSeleccionCategoria: (cat: CategoriaScrum | 'all') => void;
  onResetFiltros: () => void;
  modoActivo: 'historia' | 'mapa';
  onCambiarModo: (modo: 'historia' | 'mapa') => void;
  onAbrirLaboratorio?: () => void;
  onAbrirAcercaDe: () => void;
  tema?: TemaVisual;
  onAlternarTema?: () => void;
  esMovil?: boolean;
  esEntornoTactil?: boolean;
  vistaMapaMovil?: 'mapa' | 'lista';
  onCambiarVistaMapaMovil?: (vista: 'mapa' | 'lista') => void;
}

/**
 * Barra superior adaptativa con marca, selector de modo, Laboratorio Scrum y controles de filtrado.
 */
export const TopBar: React.FC<TopBarProps> = ({
  busqueda,
  onCambioBusqueda,
  categoriaSeleccionada,
  onSeleccionCategoria,
  onResetFiltros,
  modoActivo,
  onCambiarModo,
  onAbrirLaboratorio,
  onAbrirAcercaDe,
  tema = 'dark',
  onAlternarTema,
  esMovil = false,
  esEntornoTactil = false,
  vistaMapaMovil = 'mapa',
  onCambiarVistaMapaMovil
}) => {
  const claseTactil = esEntornoTactil ? 'min-w-[44px] min-h-[44px]' : '';

  if (esMovil) {
    return (
      <header className="px-3 py-2 bg-[var(--bg-panel)]/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800/80 z-20 shadow-md shrink-0">
        <TopBarMovil
          busqueda={busqueda}
          onCambioBusqueda={onCambioBusqueda}
          categoriaSeleccionada={categoriaSeleccionada}
          onSeleccionCategoria={onSeleccionCategoria}
          onResetFiltros={onResetFiltros}
          modoActivo={modoActivo}
          vistaMapaMovil={vistaMapaMovil}
          onCambiarVistaMapaMovil={onCambiarVistaMapaMovil}
          tema={tema}
          onAlternarTema={onAlternarTema}
          onAbrirAcercaDe={onAbrirAcercaDe}
        />
      </header>
    );
  }

  return (
    <header className="min-h-16 px-3 md:px-6 py-2 bg-[var(--bg-panel)]/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-2.5 z-20 shadow-md">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onAbrirAcercaDe}
          title="Acerca del proyecto y la Guía Oficial 2020"
          aria-label="Abrir información del proyecto y Guía Oficial de Scrum 2020"
          className={`${esEntornoTactil ? 'w-11 h-11' : 'w-9 h-9'} rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer group shrink-0`}
        >
          <span className="font-black text-white text-base group-hover:rotate-6 transition-transform">S</span>
        </button>
        <div>
          <h1 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>
              <span className="hidden lg:inline">Flujo Metodológico </span>Scrum
            </span>
            <button
              type="button"
              onClick={onAbrirAcercaDe}
              title="¿Por qué Guía 2020? Clic para ver fuentes oficiales"
              aria-label="Ver fuentes oficiales Guía 2020"
              className={`${esEntornoTactil ? 'min-h-[44px] inline-flex items-center px-1' : ''} cursor-pointer`}
            >
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700/60 transition-colors">
                Guía 2020
              </span>
            </button>
          </h1>
          <p className="text-[11px] text-zinc-600 dark:text-zinc-400 hidden lg:block">
            Estructura tridimensional: Personas, Eventos y Documentos
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-900/90 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-inner">
          <button
            type="button"
            onClick={() => onCambiarModo('historia')}
            aria-label="Cambiar a Modo Historia"
            className={`flex items-center gap-1.5 px-2.5 md:px-3.5 py-1.5 ${claseTactil} rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              modoActivo === 'historia'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Modo Historia</span>
          </button>
          <button
            type="button"
            onClick={() => onCambiarModo('mapa')}
            aria-label="Cambiar a Mapa Libre"
            className={`flex items-center gap-1.5 px-2.5 md:px-3.5 py-1.5 ${claseTactil} rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              modoActivo === 'mapa'
                ? 'bg-zinc-800 text-white shadow-md border border-zinc-700'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mapa Libre</span>
          </button>
        </div>

        {onAbrirLaboratorio && (
          <button
            type="button"
            onClick={onAbrirLaboratorio}
            title="Abrir Calculadora Timebox, Pilares, Comparativa y Quiz"
            className={`flex items-center gap-1.5 px-3 py-1.5 ${claseTactil} rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-500/35 text-xs font-bold transition-all cursor-pointer active:scale-95`}
          >
            <FlaskConical className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden lg:inline">Laboratorio Scrum</span>
            <span className="lg:hidden">Lab</span>
          </button>
        )}
      </div>

      <BarraFiltrosTopBar
        busqueda={busqueda}
        onCambioBusqueda={onCambioBusqueda}
        categoriaSeleccionada={categoriaSeleccionada}
        onSeleccionCategoria={onSeleccionCategoria}
        onResetFiltros={onResetFiltros}
        modoActivo={modoActivo}
        tema={tema}
        onAlternarTema={onAlternarTema}
        esEntornoTactil={esEntornoTactil}
      />
    </header>
  );
};
