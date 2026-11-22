import React from 'react';
import { X, GitCommit, AlertCircle } from 'lucide-react';
import { metadatosAristas } from '../../dominio/datos/metadatosAristas';
import { TarjetaFuenteAPA } from '../common/TarjetaFuenteAPA';

interface PopoverDetalleAristaProps {
  idArista: string | null;
  alCerrar: () => void;
}

/**
 * Cuerpo compartido con la explicación metodológica, el impacto de omitir la relación y su cita APA.
 */
export const ContenidoDetalleArista: React.FC<{ idArista: string }> = ({ idArista }) => {
  const meta = metadatosAristas[idArista];
  if (!meta) return null;

  return (
    <div className="space-y-2.5 text-xs">
      <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">{meta.explicacion}</p>

      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/25 border border-rose-200 dark:border-rose-500/30 text-rose-900 dark:text-rose-200">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
        <div>
          <span className="font-bold block text-[10px] uppercase tracking-wider mb-0.5">
            ¿Qué falla si se rompe?
          </span>
          <p className="text-[11px] leading-relaxed">{meta.impactoSiSeRompe}</p>
        </div>
      </div>

      <TarjetaFuenteAPA fuenteId={meta.fuenteId} seccionEspecifica={meta.seccionFuente} />
    </div>
  );
};

/**
 * Tarjeta flotante explicativa que detalla el sentido metodológico de una relación
 * al hacer clic sobre su línea o etiqueta, junto con el impacto de omitirla y su cita APA.
 */
export const PopoverDetalleArista: React.FC<PopoverDetalleAristaProps> = ({
  idArista,
  alCerrar
}) => {
  if (!idArista) return null;
  const meta = metadatosAristas[idArista];
  if (!meta) return null;

  return (
    <aside
      aria-label={`Detalle de relación: ${meta.tituloRelacion}`}
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-12 right-6 z-40 w-96 max-w-[92vw] bg-[var(--bg-panel)]/95 backdrop-blur-2xl border border-zinc-300 dark:border-zinc-700 rounded-2xl p-4 shadow-2xl shadow-black/30 dark:shadow-black/80 text-zinc-800 dark:text-zinc-200 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto"
    >
      <div className="flex items-start justify-between gap-2 pb-2.5 mb-2.5 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-700 dark:text-indigo-400">
            <GitCommit className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Relación Metodológica
            </span>
            <h3 className="text-xs font-extrabold text-zinc-900 dark:text-white leading-snug">
              {meta.tituloRelacion}
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={alCerrar}
          aria-label="Cerrar detalle de relación"
          className="p-1 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <ContenidoDetalleArista idArista={idArista} />
    </aside>
  );
};
