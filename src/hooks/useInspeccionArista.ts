import { useState, useCallback, useEffect } from 'react';

/**
 * Hook para gestionar el popover pedagógico al hacer clic sobre una arista del grafo.
 */
export function useInspeccionArista() {
  const [idAristaInspeccionada, setIdAristaInspeccionada] = useState<string | null>(null);

  const seleccionarArista = useCallback((idArista: string) => {
    setIdAristaInspeccionada((prev) => (prev === idArista ? null : idArista));
  }, []);

  const cerrarInspeccionArista = useCallback(() => {
    setIdAristaInspeccionada(null);
  }, []);

  useEffect(() => {
    const manejarEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && idAristaInspeccionada !== null) {
        cerrarInspeccionArista();
      }
    };
    const manejarInspeccionEvento = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (typeof id === 'string') {
        seleccionarArista(id);
      }
    };

    window.addEventListener('keydown', manejarEscape);
    window.addEventListener('inspeccionar-arista-scrum', manejarInspeccionEvento);
    return () => {
      window.removeEventListener('keydown', manejarEscape);
      window.removeEventListener('inspeccionar-arista-scrum', manejarInspeccionEvento);
    };
  }, [idAristaInspeccionada, cerrarInspeccionArista, seleccionarArista]);

  return {
    idAristaInspeccionada,
    seleccionarArista,
    cerrarInspeccionArista
  };
}
