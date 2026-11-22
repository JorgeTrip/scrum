import React from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';

/**
 * Pie de página informativo y educativo adaptado a tema Claro/Oscuro.
 */
export const Footer: React.FC = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="hidden md:flex h-8 bg-[var(--bg-panel)]/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800/80 px-4 items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400 select-none z-10 shrink-0">
      <div className="flex items-center gap-2">
        <span className="text-zinc-800 dark:text-zinc-300 font-medium">
          &copy; {anioActual} Jorge O. Tripodi
        </span>
        <span className="text-zinc-400 dark:text-zinc-600 hidden sm:inline">&bull;</span>
        <span className="hidden sm:inline">Todos los derechos reservados</span>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-1"
          title="Fines formativos y educativos • Proyecto en constante mejora"
        >
          <BookOpen className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          <span className="sm:hidden">Fines educativos &bull; En mejora</span>
          <span className="hidden sm:inline">Fines educativos &bull; En mejora continua</span>
        </div>
        <span className="text-zinc-400 dark:text-zinc-600 hidden md:inline">&bull;</span>
        <div
          className="items-center gap-1 text-indigo-700 dark:text-indigo-400 font-medium hidden md:flex"
          title="Estudiante de Ingeniería en Sistemas de Información | UTN FRBA"
        >
          <GraduationCap className="w-3.5 h-3.5 shrink-0" />
          <span className="lg:hidden">Estudiante UTN FRBA</span>
          <span className="hidden lg:inline">
            Estudiante de Ingeniería en Sistemas de Información | UTN FRBA
          </span>
        </div>
      </div>
    </footer>
  );
};
