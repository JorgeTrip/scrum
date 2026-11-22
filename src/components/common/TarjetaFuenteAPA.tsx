import React from 'react';
import { BookMarked, ExternalLink } from 'lucide-react';
import { obtenerFuentePorId } from '../../dominio/datos/fuentesOficiales';

interface TarjetaFuenteAPAProps {
  fuenteId: string;
  seccionEspecifica?: string;
}

/**
 * Bloque reutilizable que renderiza una referencia oficial en formato APA 7ª edición
 * con enlace externo seguro y sección exacta citada.
 */
export const TarjetaFuenteAPA: React.FC<TarjetaFuenteAPAProps> = ({
  fuenteId,
  seccionEspecifica
}) => {
  const fuente = obtenerFuentePorId(fuenteId);
  const seccionMostrada = seccionEspecifica ?? fuente.seccion;

  return (
    <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-950/90 border border-zinc-300 dark:border-zinc-800 text-[11px] leading-relaxed">
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-indigo-700 dark:text-indigo-400">
          <BookMarked className="w-3.5 h-3.5 shrink-0" />
          <span>Fuente Oficial (APA 7ª ed.)</span>
        </span>
        <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-medium truncate">
          {seccionMostrada}
        </span>
      </div>

      <p className="text-zinc-700 dark:text-zinc-300 mb-1.5 select-text">
        {fuente.citaApa}
      </p>

      <a
        href={fuente.urlOficial}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 dark:text-indigo-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
      >
        <span>{fuente.etiquetaEnlace}</span>
        <ExternalLink className="w-3 h-3 shrink-0" />
      </a>
    </div>
  );
};
