import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { ContenidoEnriquecidoNodo } from '../../dominio/tiposDominio';
import { TarjetaFuenteAPA } from '../common/TarjetaFuenteAPA';

interface PestanaMitosFichaProps {
  extra?: ContenidoEnriquecidoNodo;
}

/**
 * Pestaña de antipatrones comunes ("Mito vs. Realidad") fundamentada en la Guía 2020.
 */
export const PestanaMitosFicha: React.FC<PestanaMitosFichaProps> = ({ extra }) => {
  if (!extra) return null;

  return (
    <div className="space-y-3 text-xs">
      {extra.antipatrones.map((item, idx) => (
        <div
          key={idx}
          className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2"
        >
          <div className="flex items-start gap-2 text-rose-700 dark:text-rose-300">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase text-[10px] tracking-wider block">Mito / Antipatrón</span>
              <p className="font-medium leading-relaxed">{item.mito}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-emerald-800 dark:text-emerald-300 pt-1.5 border-t border-zinc-200 dark:border-zinc-800">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase text-[10px] tracking-wider block">Realidad Oficial</span>
              <p className="leading-relaxed">{item.realidad}</p>
            </div>
          </div>

          <p className="text-[11px] text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-950/70 px-2.5 py-1.5 rounded-lg">
            <strong>Impacto si ocurre:</strong> {item.consecuencia}
          </p>
        </div>
      ))}

      <TarjetaFuenteAPA fuenteId={extra.fuenteId} seccionEspecifica={extra.seccionFuente} />
    </div>
  );
};
