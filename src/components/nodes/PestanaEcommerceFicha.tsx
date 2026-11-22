import React from 'react';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react';
import type { ContenidoEnriquecidoNodo, EjemploEcommerceNodo } from '../../dominio/tiposDominio';
import { TarjetaFuenteAPA } from '../common/TarjetaFuenteAPA';

interface PestanaEcommerceFichaProps {
  ejemplo?: EjemploEcommerceNodo;
  extra?: ContenidoEnriquecidoNodo;
}

/**
 * Pestaña del caso práctico vivo "MercadoÁgil" (Tienda Digital E-commerce) de punta a punta.
 */
export const PestanaEcommerceFicha: React.FC<PestanaEcommerceFichaProps> = ({ ejemplo, extra }) => {
  if (!ejemplo) return null;

  return (
    <div className="space-y-3 text-xs">
      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-500/30 space-y-1.5">
        <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold">
          <ShoppingBag className="w-4 h-4 shrink-0" />
          <span>Caso E-commerce «MercadoÁgil» — {ejemplo.tituloPaso}</span>
        </div>
        <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed">{ejemplo.artefactoEjemplo}</p>
      </div>

      <div className="space-y-1.5">
        <span className="font-extrabold text-[10px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block">
          Elementos Concretos en este Paso
        </span>
        {ejemplo.elementosClave.map((el, i) => (
          <div
            key={i}
            className="flex items-start gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
          >
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>{el}</span>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/30 text-indigo-900 dark:text-indigo-200">
        <ArrowRight className="w-4 h-4 shrink-0 mt-0.5 text-indigo-600 dark:text-indigo-400" />
        <span>{ejemplo.conexionSiguiente}</span>
      </div>

      {extra && (
        <TarjetaFuenteAPA fuenteId={extra.fuenteId} seccionEspecifica={extra.seccionFuente} />
      )}
    </div>
  );
};
