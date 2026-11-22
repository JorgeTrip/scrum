import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import type { ResultadoTimeboxSprint } from '../../dominio/tiposDominio';
import { TarjetaFuenteAPA } from '../common/TarjetaFuenteAPA';

interface CalculadoraTimeboxProps {
  semanas: number;
  onCambiarSemanas: (semanas: number) => void;
  timeboxes: ResultadoTimeboxSprint;
}

/**
 * Calculadora interactiva de Timeboxes oficiales según duración del Sprint (1 a 4 semanas).
 */
export const CalculadoraTimebox: React.FC<CalculadoraTimeboxProps> = ({
  semanas,
  onCambiarSemanas,
  timeboxes
}) => {
  const tarjetas = [
    {
      nombre: 'Sprint Planning',
      valor: `Máx. ${timeboxes.planningHorasMax} h`,
      detalle: '¿Por qué es valioso?, ¿Qué se hace? y ¿Cómo se ejecuta?'
    },
    {
      nombre: 'Daily Scrum',
      valor: `${timeboxes.dailyMinutos} min fijos`,
      detalle: 'Siempre 15 minutos diarios, sin importar la duración del Sprint.'
    },
    {
      nombre: 'Sprint Review',
      valor: `Máx. ${timeboxes.reviewHorasMax} h`,
      detalle: 'Inspección colaborativa del Incremento y adaptación del Backlog.'
    },
    {
      nombre: 'Sprint Retrospective',
      valor: `Máx. ${timeboxes.retrospectiveHorasMax} h`,
      detalle: 'Inspección de personas, interacciones, procesos, herramientas y DoD.'
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              Duración del Contenedor Sprint
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Ajusta las semanas para recalcular los topes máximos oficiales.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-bold text-xs shadow-sm">
            {timeboxes.etiquetaDuracion}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label="Selector de semanas del Sprint">
          {[1, 2, 3, 4].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onCambiarSemanas(s)}
              aria-label={`Duración del Sprint: ${s} ${s === 1 ? 'semana' : 'semanas'}`}
              className={`min-h-[44px] py-2 px-3 rounded-xl font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                semanas === s
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-800 hover:border-indigo-400'
              }`}
            >
              {s} {s === 1 ? 'semana' : 'semanas'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tarjetas.map((t) => (
          <div
            key={t.nombre}
            className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-zinc-900 dark:text-white text-sm">{t.nombre}</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 font-mono font-bold text-xs">
                <Clock className="w-3.5 h-3.5" />
                {t.valor}
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{t.detalle}</p>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-500/30 text-amber-900 dark:text-amber-200">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
        <p className="leading-relaxed">
          {timeboxes.notaOficial} Además, solo el <strong>Product Owner</strong> tiene autoridad para cancelar un Sprint si su objetivo queda obsoleto.
        </p>
      </div>

      <TarjetaFuenteAPA
        fuenteId="scrum-guide-2020"
        seccionEspecifica="Eventos de Scrum (El Sprint, Planning, Daily, Review, Retrospective)"
      />
    </div>
  );
};
