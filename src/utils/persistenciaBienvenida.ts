/**
 * Persistencia local para controlar si la pantalla de bienvenida ya fue vista.
 * Incluye manejo seguro ante entornos sin `localStorage` o con políticas restrictivas.
 */

export const CLAVE_BIENVENIDA_VISTA = 'scrum_bienvenida_vista_v1';

export interface StorageBienvenida {
  getItem: (clave: string) => string | null;
  setItem: (clave: string, valor: string) => void;
}

let bienvenidaVistaMemoria = false;

function resolverStoragePorDefecto(): StorageBienvenida | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
    if (typeof globalThis !== 'undefined' && 'localStorage' in globalThis && globalThis.localStorage) {
      return globalThis.localStorage;
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Indica si debe abrirse automáticamente el modal de bienvenida en la carga inicial.
 */
export function debeMostrarBienvenidaInicial(
  storage: StorageBienvenida | null | undefined = undefined
): boolean {
  if (bienvenidaVistaMemoria) return false;
  const destino = storage === undefined ? resolverStoragePorDefecto() : storage;
  if (!destino) return true;

  try {
    return destino.getItem(CLAVE_BIENVENIDA_VISTA) !== '1';
  } catch {
    return true;
  }
}

/**
 * Registra en almacenamiento local (y respaldo en memoria) que el usuario ya vio la bienvenida.
 */
export function marcarBienvenidaVista(
  storage: StorageBienvenida | null | undefined = undefined
): void {
  bienvenidaVistaMemoria = true;
  const destino = storage === undefined ? resolverStoragePorDefecto() : storage;
  if (!destino) return;

  try {
    destino.setItem(CLAVE_BIENVENIDA_VISTA, '1');
  } catch {
    // Mantiene el estado cerrado en memoria durante la sesión ante errores de cuota o privacidad
  }
}

/**
 * Restablece el estado en memoria de bienvenida (útil para aislamiento entre pruebas unitarias).
 */
export function reiniciarEstadoBienvenidaMemoria(): void {
  bienvenidaVistaMemoria = false;
}
