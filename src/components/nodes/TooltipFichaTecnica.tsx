import React, { useState } from 'react';
import { X, Users, Calendar, Layers, Compass } from 'lucide-react';
import type { DatosNodoScrum, CategoriaScrum } from '../../types/scrum';
import { contenidoEnriquecidoNodos } from '../../dominio/datos/contenidoEnriquecidoNodos';
import { ejemplosEcommercePorNodo } from '../../dominio/datos/ejemplosEcommerce';
import { PestanaTeoriaFicha } from './PestanaTeoriaFicha';
import { PestanaMitosFicha } from './PestanaMitosFicha';
import { PestanaEcommerceFicha } from './PestanaEcommerceFicha';

interface TooltipFichaTecnicaProps {
  datos: DatosNodoScrum;
  onCerrar?: (e: React.MouseEvent) => void;
  /** Cuando true, omite el marco exterior y cabecera para embeberse dentro de HojaInferiorMovil */
  sinMarcoExterno?: boolean;
}

type PestanaFicha = 'teoria' | 'mitos' | 'ecommerce';

/**
 * Tooltip enriquecido por pestañas (Teoría/APA, Mitos vs Realidad y Caso E-commerce).
 * Aísla el scroll interno para no interferir con el zoom del lienzo.
 */
export const TooltipFichaTecnica: React.FC<TooltipFichaTecnicaProps> = ({
  datos,
  onCerrar,
  sinMarcoExterno = false
}) => {
  const [pestana, setPestana] = useState<PestanaFicha>('teoria');
  const { id, label, category } = datos;
  const extra = contenidoEnriquecidoNodos[id];
  const ejemplo = ejemplosEcommercePorNodo[id];
  const esDiscovery = extra?.origenMarco === 'discovery-complementario';

  const obtenerInfoCategoria = (cat: CategoriaScrum) => {
    if (esDiscovery) {
      return {
        texto: 'Práctica Discovery',
        icono: <Compass className="w-4 h-4 text-teal-600 dark:text-teal-400" />,
        badge: 'bg-teal-500/15 text-teal-800 dark:text-teal-300 border-teal-500/40'
      };
    }
    switch (cat) {
      case 'role':
        return {
          texto: 'Accountability / Rol',
          icono: <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
          badge: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/40'
        };
      case 'event':
        return {
          texto: 'Evento Scrum',
          icono: <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          badge: 'bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border-indigo-500/40'
        };
      case 'artifact':
        return {
          texto: 'Artefacto Oficial',
          icono: <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
          badge: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/40'
        };
    }
  };

  const infoCat = obtenerInfoCategoria(category);

  const selectorPestanas = (
    <div
      role="tablist"
      className="flex items-center gap-1 p-1 mb-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
    >
      {[
        { id: 'teoria', etiqueta: 'Teoría y APA' },
        { id: 'mitos', etiqueta: 'Mitos vs Realidad' },
        { id: 'ecommerce', etiqueta: 'Caso E-commerce' }
      ].map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={pestana === tab.id}
          onClick={() => setPestana(tab.id as PestanaFicha)}
          className={`flex-1 px-2 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
            sinMarcoExterno ? 'min-h-[44px] py-2' : 'py-1'
          } ${
            pestana === tab.id
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          {tab.etiqueta}
        </button>
      ))}
    </div>
  );

  const cuerpoPestana = (
    <div
      onWheel={(e) => e.stopPropagation()}
      className={sinMarcoExterno ? 'pr-0.5' : 'nowheel max-h-[min(280px,38vh)] overflow-y-auto pr-1.5'}
    >
      {pestana === 'teoria' && <PestanaTeoriaFicha datos={datos} extra={extra} />}
      {pestana === 'mitos' && <PestanaMitosFicha extra={extra} />}
      {pestana === 'ecommerce' && <PestanaEcommerceFicha ejemplo={ejemplo} extra={extra} />}
    </div>
  );

  if (sinMarcoExterno) {
    return (
      <div className="select-text text-zinc-900 dark:text-zinc-200">
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${infoCat.badge} mb-2.5`}
        >
          {infoCat.icono}
          <span>{infoCat.texto}</span>
        </div>
        {selectorPestanas}
        {cuerpoPestana}
      </div>
    );
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      className="nowheel nopan nodrag w-96 md:w-[440px] max-w-[92vw] bg-[var(--bg-panel)]/98 backdrop-blur-2xl border border-zinc-300 dark:border-zinc-700 rounded-2xl p-4 shadow-2xl shadow-black/40 dark:shadow-black/90 text-zinc-900 dark:text-zinc-200 select-text cursor-default animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="flex items-start justify-between pb-2.5 mb-2.5 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${infoCat.badge} mb-1`}>
            {infoCat.icono}
            <span>{infoCat.texto}</span>
          </div>
          <h4 className="text-base font-extrabold text-zinc-900 dark:text-white tracking-tight">{label}</h4>
        </div>
        {onCerrar && (
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar ficha técnica"
            className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {selectorPestanas}
      {cuerpoPestana}
    </div>
  );
};
