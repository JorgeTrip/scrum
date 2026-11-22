import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, BookOpen, CheckCircle2, GraduationCap, ShieldCheck, History, BookMarked, ExternalLink } from 'lucide-react';
import { ModalHistorialCambios } from './ModalHistorialCambios';
import { VERSION_APP } from '../version';
import { fuentesOficiales } from '../dominio/datos/fuentesOficiales';

interface PropsModalAcercaDe {
  abierto: boolean;
  esBienvenida?: boolean;
  alCerrar: () => void;
}

/**
 * Modal informativo del proyecto con fundamentación de la Guía 2020,
 * bibliografía oficial consolidada en formato APA 7ª edición y autoría.
 */
export const ModalAcercaDe: React.FC<PropsModalAcercaDe> = ({
  abierto,
  esBienvenida = false,
  alCerrar
}) => {
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const manejarCierre = () => {
    setMostrarHistorial(false);
    alCerrar();
  };

  useEffect(() => {
    if (!abierto || mostrarHistorial) return;
    const manejarTeclaEscape = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        setMostrarHistorial(false);
        alCerrar();
      }
    };
    window.addEventListener('keydown', manejarTeclaEscape);
    return () => window.removeEventListener('keydown', manejarTeclaEscape);
  }, [abierto, mostrarHistorial, alCerrar]);

  if (!abierto) return null;

  const listaFuentes = Object.values(fuentesOficiales);

  const contenidoModal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-acerca-de"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={manejarCierre}
    >
      <div
        className="w-full max-w-2xl bg-[var(--bg-panel)] border border-zinc-300 dark:border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90dvh] text-zinc-700 dark:text-zinc-300 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-[#252528]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-500 flex items-center justify-center shadow-md shadow-indigo-500/30">
              <span className="font-black text-white text-lg">S</span>
            </div>
            <div>
              <h2 id="titulo-acerca-de" className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">
                Acerca de Scrum Flow & Guía 2020
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

        <div className="p-5 flex-1 min-h-0 overflow-y-auto space-y-4 text-xs leading-relaxed">
          <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-400 font-semibold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>¿Por qué se indica «Guía 2020»?</span>
            </div>
            <p className="mb-3">
              La plataforma distingue estrictamente los elementos oficiales de la <strong>Guía Oficial de Scrum 2020</strong> (Ken Schwaber &amp; Jeff Sutherland) respecto de prácticas complementarias de <em>Product Discovery</em>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {[
                { titulo: 'Product Goal', desc: 'Compromiso del Product Backlog para dar dirección a largo plazo.' },
                { titulo: 'Un solo Scrum Team', desc: 'Elimina jerarquías y el antiguo Development Team: PO, SM y Developers.' },
                { titulo: '3 Compromisos Oficiales', desc: 'Product Goal, Sprint Goal y Definition of Done.' },
                { titulo: 'Empirismo + Valores', desc: 'Transparencia, Inspección y Adaptación junto a los 5 Valores.' }
              ].map((item) => (
                <div key={item.titulo} className="flex items-start gap-2 p-2 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 dark:text-white block">{item.titulo}</strong>
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bibliografía Oficial APA 7ª ed. */}
          <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-semibold text-sm">
              <BookMarked className="w-4 h-4" />
              <span>Fuentes Oficiales y Referencias (APA 7ª ed.)</span>
            </div>
            <ul className="space-y-2 text-[11px]">
              {listaFuentes.map((f) => (
                <li key={f.id} className="p-2.5 rounded-lg bg-white dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <p className="text-zinc-800 dark:text-zinc-200 select-text">{f.citaApa}</p>
                  <a
                    href={f.urlOficial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-indigo-700 dark:text-indigo-400 hover:underline"
                  >
                    <span>{f.etiquetaEnlace}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/80 space-y-1">
            <div className="flex items-center gap-2 mb-2 text-amber-700 dark:text-amber-400 font-semibold text-sm">
              <GraduationCap className="w-4 h-4" />
              <span>Autoría y Propósito Educativo</span>
            </div>
            <p><strong>Autor:</strong> Jorge O. Tripodi &bull; Analista Desarrollador Universitario de Sistemas</p>
            <p><strong>Formación en curso:</strong> Estudiante de Ingeniería en Sistemas de Información | UTN FRBA</p>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 pt-1">
              Proyecto personal en constante mejora, desarrollado con fines formativos y de estudio; no constituye material oficial ni avalado formalmente por la universidad.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>&copy; 2026 Jorge O. Tripodi. Todos los derechos reservados.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-medium">
                En mejora continua
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700/60 font-mono">
                Versión {VERSION_APP}
              </span>
            </div>
          </div>
        </div>

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
