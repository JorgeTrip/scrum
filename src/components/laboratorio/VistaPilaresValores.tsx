import React from 'react';
import { Eye, HeartHandshake, ShoppingBag } from 'lucide-react';
import { pilaresEmpiricos, valoresScrum } from '../../dominio/datos/fundamentosScrum';
import { TarjetaFuenteAPA } from '../common/TarjetaFuenteAPA';

/**
 * Vista interactiva de los 3 Pilares Empíricos y los 5 Valores de Scrum 2020.
 */
export const VistaPilaresValores: React.FC = () => {
  return (
    <div className="space-y-5 text-xs">
      <section aria-labelledby="titulo-pilares" className="space-y-2.5">
        <h3 id="titulo-pilares" className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Los 3 Pilares del Empirismo</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {pilaresEmpiricos.map((pilar) => (
            <div
              key={pilar.id}
              className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2"
            >
              <span className="font-extrabold text-sm text-indigo-700 dark:text-indigo-300 block">
                {pilar.nombre}
              </span>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{pilar.definicion}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {pilar.dondeSeMaterializa.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border border-indigo-500/20 text-[10px] font-semibold"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/25 p-2 rounded-lg border border-amber-200 dark:border-amber-500/20 flex items-start gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{pilar.ejemploEcommerce}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="titulo-valores" className="space-y-2.5">
        <h3 id="titulo-valores" className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Los 5 Valores de Scrum (dan vida a los pilares)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {valoresScrum.map((val) => (
            <div
              key={val.id}
              className="p-3 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-1"
            >
              <strong className="text-zinc-900 dark:text-white block">{val.nombre}</strong>
              <p className="text-zinc-600 dark:text-zinc-400">{val.descripcion}</p>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-300 pt-1">
                <strong>MercadoÁgil:</strong> {val.ejemploPractico}
              </p>
            </div>
          ))}
        </div>
      </section>

      <TarjetaFuenteAPA
        fuenteId="scrum-guide-2020"
        seccionEspecifica="Teoría de Scrum (Empirismo) & Valores de Scrum"
      />
    </div>
  );
};
