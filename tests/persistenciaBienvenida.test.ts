import { describe, it, expect, beforeEach } from 'vitest';
import {
  CLAVE_BIENVENIDA_VISTA,
  debeMostrarBienvenidaInicial,
  marcarBienvenidaVista,
  reiniciarEstadoBienvenidaMemoria,
  type StorageBienvenida
} from '../src/utils/persistenciaBienvenida';

function crearStorageMemoria(inicial: Record<string, string> = {}): StorageBienvenida {
  const datos: Record<string, string> = { ...inicial };
  return {
    getItem: (clave: string) => (clave in datos ? datos[clave] : null),
    setItem: (clave: string, valor: string) => {
      datos[clave] = valor;
    }
  };
}

describe('Persistencia de pantalla de bienvenida (RF-24 y RF-26)', () => {
  beforeEach(() => {
    reiniciarEstadoBienvenidaMemoria();
  });

  it('muestra la bienvenida en primera visita cuando no hay marca guardada', () => {
    const storage = crearStorageMemoria();
    expect(debeMostrarBienvenidaInicial(storage)).toBe(true);
  });

  it('persiste la marca bajo clave dedicada y evita reabrir tras recargar', () => {
    const storage = crearStorageMemoria();
    marcarBienvenidaVista(storage);
    expect(storage.getItem(CLAVE_BIENVENIDA_VISTA)).toBe('1');
    expect(debeMostrarBienvenidaInicial(storage)).toBe(false);
  });

  it('no muestra bienvenida cuando el navegador ya tiene registro previo', () => {
    const storage = crearStorageMemoria({ [CLAVE_BIENVENIDA_VISTA]: '1' });
    expect(debeMostrarBienvenidaInicial(storage)).toBe(false);
  });

  it('resiste storage nulo o con errores de seguridad sosteniendo el cierre en memoria', () => {
    const storageRoto: StorageBienvenida = {
      getItem: () => {
        throw new Error('SecurityError');
      },
      setItem: () => {
        throw new Error('QuotaExceededError');
      }
    };

    expect(debeMostrarBienvenidaInicial(storageRoto)).toBe(true);
    expect(() => marcarBienvenidaVista(storageRoto)).not.toThrow();
    expect(debeMostrarBienvenidaInicial(storageRoto)).toBe(false);

    reiniciarEstadoBienvenidaMemoria();
    expect(debeMostrarBienvenidaInicial(null)).toBe(true);
    marcarBienvenidaVista(null);
    expect(debeMostrarBienvenidaInicial(null)).toBe(false);
  });
});
