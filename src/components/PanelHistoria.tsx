import { ArrowLeft, ArrowRight, BookOpen, Compass, RotateCcw, GripHorizontal, ShieldCheck, Crown, Code2 } from 'lucide-react';
import type { CapituloHistoria } from '../data/datosHistoria';
import type { TipoHistoria } from '../hooks/useHistoriaScrum';
import { useArrastrable } from '../hooks/useArrastrable';

interface PanelHistoriaProps {
  capitulo: CapituloHistoria;
  pasoActual: number;
  totalPasos: number;
  tipoHistoria: TipoHistoria;
  onCambiarTipoHistoria: (tipo: TipoHistoria) => void;
  onSiguiente: () => void;
  onAnterior: () => void;
  onIrAPaso: (paso: number) => void;
  onAlternarModoMapa: () => void;
}

/**
 * Tarjeta interactiva arrastrable que guía paso a paso por 4 perspectivas de Scrum.
 */
export const PanelHistoria: React.FC<PanelHistoriaProps> = ({
  capitulo,
  pasoActual,
  totalPasos,
  tipoHistoria,
  onCambiarTipoHistoria,
  onSiguiente,
  onAnterior,
  onIrAPaso,
  onAlternarModoMapa
}) => {
  const esUltimoPaso = pasoActual === totalPasos - 1;
  const { posicion, estaArrastrando, refElemento, iniciarArrastre } = useArrastrable({ x: 24, y: 84 });

  const modos: { id: TipoHistoria; etiqueta: string; icono: React.ReactNode; claseActiva: string }[] = [
    { id: 'general', etiqueta: 'General', icono: <BookOpen className="w-3 h-3 shrink-0" />, claseActiva: 'bg-indigo-600 text-white shadow-sm' },
    { id: 'scrum-master', etiqueta: 'Scrum Master', icono: <ShieldCheck className="w-3 h-3 shrink-0" />, claseActiva: 'bg-purple-600 text-white shadow-sm' },
    { id: 'product-owner', etiqueta: 'Product Owner', icono: <Crown className="w-3 h-3 shrink-0" />, claseActiva: 'bg-amber-600 text-white shadow-sm' },
    { id: 'developers', etiqueta: 'Developers', icono: <Code2 className="w-3 h-3 shrink-0" />, claseActiva: 'bg-sky-600 text-white shadow-sm' }
  ];

  return (
    <div
      ref={refElemento}
      style={{ left: `${posicion.x}px`, top: `${posicion.y}px` }}
      className={`fixed z-30 w-[430px] max-w-[92vw] select-none pointer-events-auto transition-shadow duration-200 ${
        estaArrastrando ? 'cursor-grabbing shadow-2xl shadow-indigo-500/20 scale-[1.01]' : 'shadow-2xl shadow-black/25 dark:shadow-black/80'
      }`}
    >
      <div className="bg-[var(--bg-panel)]/95 backdrop-blur-2xl border border-zinc-300 dark:border-zinc-700/80 rounded-3xl p-4 md:p-5 overflow-hidden">
        <div
          onPointerDown={iniciarArrastre}
          title="Mantén presionado para arrastrar este panel"
          className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-zinc-200 dark:border-zinc-800/80 cursor-grab active:cursor-grabbing group"
        >
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 text-[11px] font-bold tracking-wide">
              Etapa {capitulo.pasoNumero} de {totalPasos}
            </span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium truncate max-w-[170px]">
              {capitulo.subtitulo}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">
            <span className="text-[10px] font-medium hidden sm:inline">Mover</span>
            <GripHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Selector de perspectiva (4 historias) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-zinc-100 dark:bg-zinc-900/90 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 mb-3 shadow-inner">
          {modos.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onCambiarTipoHistoria(m.id)}
              className={`flex items-center justify-center gap-1 py-1 px-1.5 rounded-xl text-[10.5px] font-bold transition-all cursor-pointer ${
                tipoHistoria === m.id
                  ? m.claseActiva
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/70 dark:hover:bg-zinc-800/50'
              }`}
            >
              {m.icono}
              <span className="truncate">{m.etiqueta}</span>
            </button>
          ))}
        </div>

        {/* Segmentos de progreso */}
        <div className="flex items-center justify-between gap-1 mb-3.5">
          {Array.from({ length: totalPasos }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onIrAPaso(idx)}
              aria-label={`Ir al paso ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === pasoActual
                  ? 'flex-1 bg-indigo-500 dark:bg-indigo-400 shadow-md shadow-indigo-500/30'
                  : idx < pasoActual
                  ? 'w-4 bg-indigo-600/70 hover:bg-indigo-500'
                  : 'w-3 bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400 dark:hover:bg-zinc-700'
              }`}
            />
          ))}
        </div>

        <div className="mb-3.5">
          <h2 className="text-sm font-extrabold text-zinc-900 dark:text-white tracking-tight mb-1.5 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>{capitulo.titulo}</span>
          </h2>
          <p
            onWheel={(e) => e.stopPropagation()}
            className="nowheel text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed max-h-36 overflow-y-auto pr-1"
          >
            {capitulo.narrativa}
          </p>
        </div>

        <div className="text-[11px] text-zinc-600 dark:text-zinc-400 flex items-center justify-between gap-2 pb-2.5 border-b border-zinc-200 dark:border-zinc-800/80 mb-2.5">
          <span className="flex items-center gap-1.5 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">Clic en nodos o líneas para abrir detalles.</span>
          </span>
          <span className="hidden sm:inline font-mono text-[10px] text-zinc-500 shrink-0">&larr; / &rarr;</span>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onAlternarModoMapa}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-xl border border-zinc-300 dark:border-zinc-800 transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Ver Mapa</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onAnterior}
              disabled={pasoActual === 0}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                pasoActual === 0
                  ? 'opacity-30 cursor-not-allowed bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 border border-zinc-200 dark:border-zinc-800'
                  : 'bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700/80 cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            {esUltimoPaso ? (
              <button
                type="button"
                onClick={() => onIrAPaso(0)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onSiguiente}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 transition-all hover:translate-x-0.5 cursor-pointer"
              >
                <span>Continuar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
