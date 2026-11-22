import React from 'react';
import { Clock, ArrowRightCircle, CheckCircle, BookOpen, Tag } from 'lucide-react';
import type { DatosNodoScrum } from '../../types/scrum';
import type { ContenidoEnriquecidoNodo } from '../../dominio/tiposDominio';
import { TarjetaFuenteAPA } from '../common/TarjetaFuenteAPA';

interface PestanaTeoriaFichaProps {
  datos: DatosNodoScrum;
  extra?: ContenidoEnriquecidoNodo;
}

/**
 * Pestaña principal de ficha técnica: resumen, AKAs, timebox, responsabilidades,
 * entradas/salidas, glosario de siglas, fundamento y cita oficial APA 7ª ed.
 */
export const PestanaTeoriaFicha: React.FC<PestanaTeoriaFichaProps> = ({ datos, extra }) => {
  const { summary, details } = datos;

  return (
    <div className="space-y-3.5 text-xs">
      <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed bg-zinc-100 dark:bg-zinc-900/70 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800/80">
        {summary}
      </p>

      {datos.akas && datos.akas.length > 0 && (
        <div className="p-2.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
          <span className="font-extrabold text-[10px] uppercase text-zinc-600 dark:text-zinc-400 tracking-wider block mb-1.5">
            También conocido como (AKA)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {datos.akas.map((aka, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-[11px] text-zinc-800 dark:text-zinc-200 font-medium"
              >
                {aka}
              </span>
            ))}
          </div>
        </div>
      )}

      {details.timebox && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/30 text-indigo-800 dark:text-indigo-300 font-mono text-xs font-semibold">
          <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>{details.timebox}</span>
        </div>
      )}

      {details.responsibilities && details.responsibilities.length > 0 && (
        <div>
          <span className="font-extrabold text-[11px] uppercase text-zinc-700 dark:text-zinc-300 tracking-wider block mb-1.5">
            Responsabilidades Principales
          </span>
          <ul className="space-y-1.5">
            {details.responsibilities.map((r, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-zinc-800 dark:text-zinc-200 leading-relaxed bg-zinc-50 dark:bg-zinc-900/40 p-2 rounded-lg border border-zinc-200 dark:border-zinc-800/60"
              >
                <CheckCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {details.inputs && details.inputs.length > 0 && (
        <div>
          <span className="font-extrabold text-[11px] uppercase text-zinc-700 dark:text-zinc-300 tracking-wider block mb-1.5">
            Entradas e Insumos
          </span>
          <div className="space-y-1.5">
            {details.inputs.map((inp, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 text-zinc-700 dark:text-zinc-300"
              >
                <ArrowRightCircle className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
                <span>{inp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {details.outputs && details.outputs.length > 0 && (
        <div>
          <span className="font-extrabold text-[11px] uppercase text-zinc-700 dark:text-zinc-300 tracking-wider block mb-1.5">
            {extra?.origenMarco === 'discovery-complementario'
              ? 'Salidas Clave (Discovery)'
              : 'Compromisos y Entregables'}
          </span>
          <div className="space-y-1.5">
            {details.outputs.map((out, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-300 dark:border-emerald-500/35 text-emerald-900 dark:text-emerald-300 font-medium flex items-start gap-2"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{out}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {extra?.glosarioSiglas && extra.glosarioSiglas.length > 0 && (
        <div className="p-2.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <span className="font-extrabold text-[10px] uppercase text-zinc-600 dark:text-zinc-400 tracking-wider flex items-center gap-1">
            <Tag className="w-3 h-3" />
            Glosario de Siglas
          </span>
          {extra.glosarioSiglas.map((item, idx) => (
            <p key={idx} className="text-[11px] text-zinc-700 dark:text-zinc-300">
              <strong className="text-zinc-900 dark:text-white">{item.sigla}:</strong> {item.significado}
            </p>
          ))}
        </div>
      )}

      <div>
        <span className="font-extrabold text-[11px] uppercase text-zinc-700 dark:text-zinc-300 tracking-wider flex items-center gap-1.5 mb-1.5">
          <BookOpen className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
          Fundamentación Teórica
        </span>
        <blockquote className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-950/90 border-l-4 border-indigo-500 dark:border-zinc-500 italic text-zinc-700 dark:text-zinc-300 leading-relaxed">
          «{details.theoreticalBasis}»
        </blockquote>
      </div>

      {extra && (
        <TarjetaFuenteAPA fuenteId={extra.fuenteId} seccionEspecifica={extra.seccionFuente} />
      )}
    </div>
  );
};
