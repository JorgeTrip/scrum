import React, { useState } from 'react';
import { Info, X, GitCommit, RefreshCw, Zap } from 'lucide-react';

const COLORES_LEYENDA = [
  { nombre: 'Product Owner', muestra: 'bg-amber-500' },
  { nombre: 'Developers', muestra: 'bg-blue-500' },
  { nombre: 'Scrum Master', muestra: 'bg-purple-500' },
  { nombre: 'Eventos', muestra: 'bg-indigo-500' },
  { nombre: 'Artefactos / Discovery', muestra: 'bg-emerald-500' },
  { nombre: 'Bucle Empírico', muestra: 'bg-pink-500' }
];

/**
 * Contenido reutilizable de simbología de trazos y código cromático.
 */
export const ContenidoLeyendaRelaciones: React.FC = () => (
  <div className="space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300">
    <div className="flex items-start gap-2.5 p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
      <div className="w-7 h-5 flex items-center justify-center shrink-0">
        <div className="w-6 h-0.5 bg-indigo-500 rounded-full" />
      </div>
      <div>
        <span className="font-semibold text-zinc-900 dark:text-white block text-[11px]">
          Línea Continua (Flujo Directo)
        </span>
        <p className="text-[10px] text-zinc-600 dark:text-zinc-400 leading-relaxed mt-0.5">
          Avance secuencial y responsabilidades directas dentro del Sprint actual.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-2.5 p-2 rounded-xl bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-500/20">
      <div className="w-7 h-5 flex items-center justify-center shrink-0">
        <div className="w-6 border-t-2 border-dashed border-pink-500" />
      </div>
      <div>
        <span className="font-semibold text-pink-700 dark:text-pink-300 text-[11px] flex items-center gap-1">
          <RefreshCw className="w-3 h-3" />
          Línea Punteada (Bucle Empírico)
        </span>
        <p className="text-[10px] text-zinc-600 dark:text-zinc-400 leading-relaxed mt-0.5">
          Retroalimentación de Review y Retrospectiva que adapta el siguiente ciclo.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-2.5 p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
      <div className="w-7 h-5 flex items-center justify-center shrink-0">
        <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
      </div>
      <div>
        <span className="font-semibold text-zinc-900 dark:text-white block text-[11px]">
          Línea Animada (Clic para detalle)
        </span>
        <p className="text-[10px] text-zinc-600 dark:text-zinc-400 leading-relaxed mt-0.5">
          Flujos activos de transformación continua. Haz clic sobre cualquier relación para leer su sentido.
        </p>
      </div>
    </div>

    <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1.5">
        Código de Colores
      </span>
      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
        {COLORES_LEYENDA.map((c) => (
          <div key={c.nombre} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${c.muestra}`} />
            <span className="truncate">{c.nombre}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * Leyenda interactiva que explica trazos (continua, punteada, animada)
 * y codificación de colores por actor/dimensión del flujo Scrum.
 */
export const LeyendaRelaciones: React.FC = () => {
  const [abierta, setAbierta] = useState(false);

  return (
    <div className="hidden md:block absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 pointer-events-auto select-none">
      {abierta ? (
        <div className="w-80 max-w-[90vw] bg-[var(--bg-panel)]/95 backdrop-blur-2xl border border-zinc-300 dark:border-zinc-700/80 rounded-2xl p-4 shadow-2xl shadow-black/25 dark:shadow-black/80 text-xs text-zinc-700 dark:text-zinc-300 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white text-xs">
              <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Simbología de Relaciones</span>
            </div>
            <button
              type="button"
              onClick={() => setAbierta(false)}
              aria-label="Cerrar leyenda"
              className="p-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <ContenidoLeyendaRelaciones />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAbierta(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-panel)]/95 hover:bg-zinc-100 dark:hover:bg-[#252528] text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-300 dark:border-zinc-700/80 shadow-xl backdrop-blur-xl text-xs font-semibold transition-all group cursor-pointer"
        >
          <GitCommit className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
          <span>Leyenda</span>
        </button>
      )}
    </div>
  );
};
