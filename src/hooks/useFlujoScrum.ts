/**
 * Custom Hook para gestionar el tooltip interactivo emergente de los nodos de Scrum.
 */

import { useState, useCallback, useEffect } from 'react';
import type { DatosNodoScrum } from '../types/scrum';

export function useFlujoScrum() {
  const [idNodoConTooltip, setIdNodoConTooltip] = useState<string | null>(null);

  const alternarTooltipNodo = useCallback((datosNodo: DatosNodoScrum) => {
    setIdNodoConTooltip((prev) => (prev === datosNodo.id ? null : datosNodo.id));
  }, []);

  const abrirTooltipPorId = useCallback((idNodo: string) => {
    setIdNodoConTooltip(idNodo);
  }, []);

  const cerrarTooltip = useCallback(() => {
    setIdNodoConTooltip(null);
  }, []);

  useEffect(() => {
    const manejarTeclaEscape = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape' && idNodoConTooltip !== null) {
        cerrarTooltip();
      }
    };

    const manejarEventoCierre = () => {
      cerrarTooltip();
    };

    const manejarAlternarTeclado = (evento: Event) => {
      const detalle = (evento as CustomEvent<DatosNodoScrum>).detail;
      if (detalle?.id) {
        alternarTooltipNodo(detalle);
      }
    };

    window.addEventListener('keydown', manejarTeclaEscape);
    window.addEventListener('cerrar-tooltip-scrum', manejarEventoCierre);
    window.addEventListener('alternar-tooltip-scrum', manejarAlternarTeclado);

    return () => {
      window.removeEventListener('keydown', manejarTeclaEscape);
      window.removeEventListener('cerrar-tooltip-scrum', manejarEventoCierre);
      window.removeEventListener('alternar-tooltip-scrum', manejarAlternarTeclado);
    };
  }, [idNodoConTooltip, cerrarTooltip, alternarTooltipNodo]);

  return {
    idNodoConTooltip,
    alternarTooltipNodo,
    abrirTooltipPorId,
    cerrarTooltip
  };
}
