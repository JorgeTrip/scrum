import { useState, useCallback } from 'react';
import {
  debeMostrarBienvenidaInicial,
  marcarBienvenidaVista
} from '../utils/persistenciaBienvenida';

interface EstadoModalBienvenida {
  abierto: boolean;
  esBienvenida: boolean;
}

/**
 * Hook de aplicación que coordina la apertura automática del modal «Acerca de»
 * en la primera visita del navegador y su apertura manual desde la cabecera.
 */
export function useModalBienvenida() {
  const [estado, setEstado] = useState<EstadoModalBienvenida>(() => {
    const mostrar = debeMostrarBienvenidaInicial();
    return { abierto: mostrar, esBienvenida: mostrar };
  });

  const abrirManual = useCallback(() => {
    setEstado({ abierto: true, esBienvenida: false });
  }, []);

  const cerrarModal = useCallback(() => {
    marcarBienvenidaVista();
    setEstado({ abierto: false, esBienvenida: false });
  }, []);

  return {
    abierto: estado.abierto,
    esBienvenida: estado.esBienvenida,
    abrirManual,
    cerrarModal
  };
}
