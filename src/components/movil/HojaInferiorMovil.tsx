import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface HojaInferiorMovilProps {
  abierto: boolean;
  titulo: string;
  subtitulo?: string;
  alCerrar: () => void;
  children: React.ReactNode;
}

/**
 * Determina si un clic en el diálogo debe cerrar la hoja:
 * exige que el gesto haya iniciado explícitamente sobre el fondo semitransparente
 * para evitar cierres fantasma tras un tap táctil en `onPointerUp`.
 */
export function debeCerrarHojaPorFondo(inicioEnFondo: boolean, objetivoEsFondo: boolean): boolean {
  return inicioEnFondo && objetivoEsFondo;
}

/**
 * Bottom Sheet táctil unificado para pantallas pequeñas (< 768px / landscape compacto).
 * Soporta cierre por tecla Escape, toque en el fondo, botón >= 44px y gesto de deslizar hacia abajo.
 */
export const HojaInferiorMovil: React.FC<HojaInferiorMovilProps> = ({
  abierto,
  titulo,
  subtitulo,
  alCerrar,
  children
}) => {
  const inicioTouchYRef = useRef<number | null>(null);
  const cerrarDesdeFondoRef = useRef(false);

  useEffect(() => {
    if (!abierto) {
      cerrarDesdeFondoRef.current = false;
      return;
    }
    const alPresionarEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') alCerrar();
    };
    window.addEventListener('keydown', alPresionarEscape);
    return () => window.removeEventListener('keydown', alPresionarEscape);
  }, [abierto, alCerrar]);

  if (!abierto) return null;

  const alIniciarDesliz = (e: React.TouchEvent) => {
    inicioTouchYRef.current = e.touches[0]?.clientY ?? null;
  };

  const alFinalizarDesliz = (e: React.TouchEvent) => {
    if (inicioTouchYRef.current === null) return;
    const finY = e.changedTouches[0]?.clientY ?? inicioTouchYRef.current;
    if (finY - inicioTouchYRef.current > 65) {
      alCerrar();
    }
    inicioTouchYRef.current = null;
  };

  const manejarPointerDownFondo = (e: React.PointerEvent<HTMLDivElement>) => {
    cerrarDesdeFondoRef.current = e.target === e.currentTarget;
  };

  const manejarClickFondo = (e: React.MouseEvent<HTMLDivElement>) => {
    const debeCerrar = debeCerrarHojaPorFondo(
      cerrarDesdeFondoRef.current,
      e.target === e.currentTarget
    );
    cerrarDesdeFondoRef.current = false;
    if (debeCerrar) alCerrar();
  };

  const contenido = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={titulo}
      onPointerDown={manejarPointerDownFondo}
      onClick={manejarClickFondo}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[var(--bg-panel)] border-t border-x border-zinc-300 dark:border-zinc-700/80 rounded-t-3xl shadow-2xl flex flex-col max-h-[82dvh] text-zinc-900 dark:text-zinc-200 pb-[env(safe-area-inset-bottom)]"
      >
        <div
          onTouchStart={alIniciarDesliz}
          onTouchEnd={alFinalizarDesliz}
          className="px-4 pt-2.5 pb-2.5 border-b border-zinc-200 dark:border-zinc-800 shrink-0"
        >
          <div className="w-10 h-1.5 rounded-full bg-zinc-400/50 dark:bg-zinc-600/70 mx-auto mb-2" />
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              {subtitulo && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block truncate">
                  {subtitulo}
                </span>
              )}
              <h2 className="text-sm font-extrabold text-zinc-900 dark:text-white truncate">
                {titulo}
              </h2>
            </div>
            <button
              type="button"
              onClick={alCerrar}
              aria-label="Cerrar panel"
              className="min-w-[44px] min-h-[44px] -mr-1.5 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto flex-1 overscroll-contain">{children}</div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' && document.body
    ? createPortal(contenido, document.body)
    : contenido;
};
