import { useState, useEffect } from 'react';
import type { EntradaHistorial } from '../types/historial';
import { historialCambiosFallback } from '../data/historialCambiosFallback';

/**
 * Resuelve la ruta del JSON estático respetando despliegues bajo subrutas (ej. GitHub Pages).
 */
export function resolverUrlHistorial(baseUrl = './'): string {
  const baseLimpia = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${baseLimpia}historial-cambios.json`;
}

/**
 * Determina el tipo de cambio a partir del prefijo semántico del commit.
 */
function clasificarTipoCommit(mensaje: string): EntradaHistorial['tipo'] {
  const limpio = mensaje.trim().toLowerCase();
  if (limpio.startsWith('feat:') || limpio.includes('🚀')) return 'feat';
  if (limpio.startsWith('fix:') || limpio.includes('🔧')) return 'fix';
  if (limpio.startsWith('breaking:')) return 'breaking';
  return 'otro';
}

/**
 * Hook para obtener el registro histórico de cambios del repositorio.
 * Carga relativa a BASE_URL con respaldo compilado ante fallos de red.
 */
export function useHistorialCambios() {
  const [historial, setHistorial] = useState<EntradaHistorial[]>(historialCambiosFallback);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function cargarHistorial() {
      setCargando(true);
      setError(null);
      try {
        const url = resolverUrlHistorial(import.meta.env.BASE_URL ?? './');
        const respuesta = await fetch(url, {
          cache: 'no-cache',
          headers: { Accept: 'application/json' }
        });

        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos: EntradaHistorial[] = await respuesta.json();
        if (!cancelado && Array.isArray(datos) && datos.length > 0) {
          const normalizados = datos.map((d) => ({
            ...d,
            tipo: d.tipo ?? clasificarTipoCommit(d.mensaje)
          }));
          setHistorial(normalizados);
        }
      } catch (err) {
        if (!cancelado) {
          setError(err instanceof Error ? err.message : 'Error desconocido al cargar historial');
          setHistorial(historialCambiosFallback);
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargarHistorial();

    return () => {
      cancelado = true;
    };
  }, []);

  return { historial, cargando, error };
}
