/**
 * Custom Hook reactivo que detecta si la aplicación se ejecuta en pantalla móvil,
 * orientación horizontal compacta o dispositivo con puntero táctil.
 */

import { useState, useEffect } from 'react';
import { clasificarViewport, type EstadoViewport } from '../utils/deteccionViewport';

function leerEstadoActual(): EstadoViewport {
  if (typeof window === 'undefined') {
    return {
      esMovil: false,
      esLandscapeCompacto: false,
      esPantallaPequena: false,
      esTactil: false
    };
  }
  const esPunteroGrueso =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(pointer: coarse)').matches
      : false;

  return clasificarViewport(window.innerWidth, window.innerHeight, esPunteroGrueso);
}

export function useDispositivoMovil(): EstadoViewport {
  const [estado, setEstado] = useState<EstadoViewport>(leerEstadoActual);

  useEffect(() => {
    const actualizar = () => setEstado(leerEstadoActual());
    window.addEventListener('resize', actualizar);
    const mq =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(pointer: coarse)')
        : null;
    mq?.addEventListener?.('change', actualizar);

    return () => {
      window.removeEventListener('resize', actualizar);
      mq?.removeEventListener?.('change', actualizar);
    };
  }, []);

  return estado;
}
