import React from 'react';
import { GitCompare } from 'lucide-react';
import { comparativa2017vs2020 } from '../../dominio/datos/fundamentosScrum';
import type { ComparativaGuia2020 } from '../../dominio/tiposDominio';
import { TarjetaFuenteAPA } from '../common/TarjetaFuenteAPA';

interface TablaComparativaGuiasProps {
  categoriaFiltro: 'Todas' | ComparativaGuia2020['categoria'];
  onCambiarFiltro: (cat: 'Todas' | ComparativaGuia2020['categoria']) => void;
}

/**
 * Comparador filtrable entre la Guía Scrum 2017 y la Guía vigente 2020.
 */
export const TablaComparativaGuias: React.FC<TablaComparativaGuiasProps> = ({
  categoriaFiltro,
  onCambiarFiltro
}) => {
  const categorias: ('Todas' | ComparativaGuia2020['categoria'])[] = [
    'Todas',
    'Equipo',
    'Compromisos',
    'Eventos',
    'Lenguaje'
  ];

  const filas =
    categoriaFiltro === 'Todas'
      ? comparativa2017vs2020
      : comparativa2017vs2020.filter((c) => c.categoria === categoriaFiltro);

  return (
    <div className="space-y-4 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-white">
          <GitCompare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Evolución Oficial: Guía 2017 ➔ Guía 2020</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCambiarFiltro(cat)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                categoriaFiltro === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        {filas.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2"
          >
            <div className="flex items-center justify-between">
              <strong className="text-sm text-zinc-900 dark:text-white">{item.aspecto}</strong>
              <span className="px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-[10px] font-bold text-zinc-700 dark:text-zinc-300">
                {item.categoria}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/20 text-rose-900 dark:text-rose-200">
                <span className="font-bold block text-[10px] uppercase mb-0.5">Guía 2017 (Anterior)</span>
                {item.guia2017}
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-200">
                <span className="font-bold block text-[10px] uppercase mb-0.5">Guía 2020 (Vigente)</span>
                {item.guia2020}
              </div>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
              <strong>Por qué cambió:</strong> {item.razonCambio}
            </p>
          </div>
        ))}
      </div>

      <TarjetaFuenteAPA
        fuenteId="scrum-guide-2020"
        seccionEspecifica="Cambios principales entre las ediciones 2017 y noviembre de 2020"
      />
    </div>
  );
};
