import React, { useEffect, useRef, useState } from 'react';
import { useViewport } from '@xyflow/react';
import { Users, Calendar, Layers } from 'lucide-react';
import {
  calcularBandasSwimlanesFlow,
  calcularPosicionesEtiquetasCarriles
} from '../utils/swimlanesGeometria';
import { useDispositivoMovil } from '../hooks/useDispositivoMovil';
import type { TemaVisual } from '../dominio/tiposDominio';

interface SwimlanesProps {
  tema?: TemaVisual;
}

/**
 * Componente de Swimlanes en coordenadas reales del flujo.
 * Las bandas tricolor acompañan el zoom y paneo, y sus rótulos laterales
 * siguen dinámicamente la posición Y real de cada carril sin desfasarse.
 */
export const Swimlanes: React.FC<SwimlanesProps> = ({ tema = 'dark' }) => {
  const viewport = useViewport();
  const { esMovil } = useDispositivoMovil();
  const refContenedor = useRef<HTMLDivElement | null>(null);
  const [altoLienzo, setAltoLienzo] = useState(720);

  const x = viewport?.x ?? 0;
  const y = viewport?.y ?? 0;
  const zoom = viewport?.zoom || 1;
  const bandas = calcularBandasSwimlanesFlow();

  useEffect(() => {
    const el = refContenedor.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const actualizar = () => {
      const h = el.getBoundingClientRect().height;
      if (h > 0) setAltoLienzo(Math.round(h));
    };
    actualizar();
    const obs = new ResizeObserver(actualizar);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const posiciones = calcularPosicionesEtiquetasCarriles(zoom, y, altoLienzo, esMovil);
  const topPorId = Object.fromEntries(posiciones.map((p) => [p.id, p.topPx])) as Record<
    string,
    number
  >;

  const titulos = [
    {
      id: 'lane-roles',
      icono: <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-600 dark:text-amber-400" />,
      borde: 'border-amber-500/35',
      titulo: 'Personas (Accountabilities)',
      tituloCorto: 'Personas',
      colorTitulo: 'text-amber-700 dark:text-amber-400',
      subtitulo: 'Integrantes del Scrum Team y responsabilidades'
    },
    {
      id: 'lane-events',
      icono: <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-indigo-600 dark:text-indigo-400" />,
      borde: 'border-indigo-500/35',
      titulo: 'Eventos del Ciclo',
      tituloCorto: 'Eventos',
      colorTitulo: 'text-indigo-700 dark:text-indigo-400',
      subtitulo: 'Ocasiones formales de inspección y adaptación'
    },
    {
      id: 'lane-artifacts',
      icono: <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400" />,
      borde: 'border-emerald-500/35',
      titulo: 'Documentos (Artefactos y Discovery)',
      tituloCorto: 'Documentos',
      colorTitulo: 'text-emerald-700 dark:text-emerald-400',
      subtitulo: 'Transparencia oficial 2020 y prácticas previas'
    }
  ];

  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-visible"
        style={{
          transform: `translate(${x}px, ${y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        {bandas.map((banda) => (
          <div
            key={banda.id}
            style={{
              top: `${banda.top}px`,
              height: `${banda.height}px`,
              left: '-4000px',
              width: '10000px'
            }}
            className={`absolute transition-colors ${banda.claseBorde} ${
              tema === 'dark' ? banda.claseFondoOscuro : banda.claseFondoClaro
            }`}
          />
        ))}
      </div>

      <div ref={refContenedor} className="absolute inset-0 pointer-events-none select-none z-[2] overflow-hidden">
        {titulos.map((t) => (
          <div
            key={t.id}
            style={{ top: `${topPorId[t.id] ?? 16}px` }}
            className="absolute left-2 sm:left-4 md:left-6 flex items-center gap-1.5 sm:gap-2.5 transition-[top] duration-150 ease-out"
          >
            <div className={`p-1 sm:p-1.5 md:p-2 rounded-lg sm:rounded-xl bg-[var(--bg-panel)]/95 border ${t.borde} shadow-md backdrop-blur-md`}>
              {t.icono}
            </div>
            <span
              className={`sm:hidden text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[var(--bg-panel)]/90 border ${t.borde} ${t.colorTitulo} shadow-sm backdrop-blur-md`}
            >
              {t.tituloCorto}
            </span>
            <div className="hidden sm:block">
              <h2 className={`text-xs md:text-sm font-bold uppercase tracking-wider ${t.colorTitulo}`}>
                {t.titulo}
              </h2>
              <p className="text-[10px] md:text-[11px] text-zinc-600 dark:text-zinc-400 max-w-xs mt-0.5">
                {t.subtitulo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
