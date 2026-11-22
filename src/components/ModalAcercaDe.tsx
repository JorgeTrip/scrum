import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, History } from 'lucide-react';
import { ModalHistorialCambios } from './ModalHistorialCambios';
import { ContenidoModalAcercaDe } from './ContenidoModalAcercaDe';
import { useAnimacionModalAncla } from '../hooks/useAnimacionModalAncla';

interface PropsModalAcercaDe {
  abierto: boolean;
  esBienvenida?: boolean;
  alCerrar: () => void;
}

/**
 * Modal informativo y pantalla de bienvenida del proyecto,
 * con animación bidireccional GPU hacia y desde el botón «S» de la cabecera.
 */
export const ModalAcercaDe: React.FC<PropsModalAcercaDe> = ({
  abierto,
  esBienvenida = false,
  alCerrar
}) => {
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const {
    renderizar,
    refPanel,
    estiloPanel,
    estiloFondo,
    estaCerrando,
    solicitarCierre
  } = useAnimacionModalAncla({ abierto, esBienvenida, alCerrar });

  const manejarCierre = () => {
    setMostrarHistorial(false);
    solicitarCierre();
  };

  useEffect(() => {
    if (!renderizar) {
      setMostrarHistorial(false);
    }
  }, [renderizar]);

  useEffect(() => {
    if (!abierto || mostrarHistorial) return;
    const manejarTeclaEscape = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        setMostrarHistorial(false);
        solicitarCierre();
      }
    };
    window.addEventListener('keydown', manejarTeclaEscape);
    return () => window.removeEventListener('keydown', manejarTeclaEscape);
  }, [abierto, mostrarHistorial, solicitarCierre]);

  if (!renderizar) return null;

  const contenidoModal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-acerca-de"
      style={estiloFondo}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md ${
        estaCerrando ? 'pointer-events-none' : ''
      }`}
      onClick={manejarCierre}
    >
      <div
        ref={refPanel}
        style={estiloPanel}
        className="w-full max-w-2xl bg-[var(--bg-panel)] border border-zinc-300 dark:border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90dvh] text-zinc-700 dark:text-zinc-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-[#252528]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-500 flex items-center justify-center shadow-md shadow-indigo-500/30">
              <span className="font-black text-white text-lg">S</span>
            </div>
            <div>
              <h2 id="titulo-acerca-de" className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">
                Acerca de Scrum Flow &amp; Guía 2020
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Fundamentación del estándar oficial, bibliografía APA y contexto pedagógico
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={manejarCierre}
            aria-label="Cerrar modal de información"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ContenidoModalAcercaDe />

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-[#252528]/40 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMostrarHistorial(true)}
            className="flex items-center gap-1.5 px-3 min-h-[44px] rounded-xl bg-white dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-indigo-700 dark:text-indigo-300 border border-zinc-300 dark:border-zinc-700/60 transition-all text-xs font-semibold cursor-pointer active:scale-95"
          >
            <History className="w-3.5 h-3.5" />
            <span>Historial de cambios</span>
          </button>
          <button
            type="button"
            onClick={manejarCierre}
            className="px-4 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
          >
            {esBienvenida ? 'Comenzar' : 'Entendido'}
          </button>
        </div>
      </div>

      <ModalHistorialCambios
        abierto={mostrarHistorial}
        alCerrar={() => setMostrarHistorial(false)}
        alVolverAcercaDe={() => setMostrarHistorial(false)}
      />
    </div>
  );

  return typeof document !== 'undefined' && document.body
    ? createPortal(contenidoModal, document.body)
    : contenidoModal;
};
