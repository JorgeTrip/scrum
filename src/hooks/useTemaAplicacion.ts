import { useState, useEffect, useCallback } from 'react';
import type { TemaVisual } from '../dominio/tiposDominio';
import { normalizarTemaPreferido } from '../dominio/validacion/esquemasDominio';

const CLAVE_TEMA_STORAGE = 'scrum_tema_preferido_v1';

function leerTemaInicial(): TemaVisual {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return normalizarTemaPreferido(window.localStorage.getItem(CLAVE_TEMA_STORAGE));
    }
  } catch {
    // Tolerancia si localStorage está restringido
  }
  return 'dark';
}

/**
 * Hook para gestionar el tema Claro/Oscuro (oscuro por defecto) con paleta Grises Pro.
 */
export function useTemaAplicacion() {
  const [tema, setTema] = useState<TemaVisual>(leerTemaInicial);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const raiz = document.documentElement;
      raiz.classList.remove('dark', 'light');
      raiz.classList.add(tema);
      raiz.dataset.tema = tema;
    }
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(CLAVE_TEMA_STORAGE, tema);
      }
    } catch {
      // Sin acción requerida
    }
  }, [tema]);

  const alternarTema = useCallback(() => {
    setTema((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { tema, setTema, alternarTema };
}
