/**
 * Custom hook y lógica pura para gestionar la navegación guiada de la historia de Scrum.
 * Soporta cuatro modos temáticos: 'general', 'scrum-master', 'product-owner' y 'developers'.
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import type { NodoScrum, AristaScrum } from '../types/scrum';
import { capitulosHistoria, type CapituloHistoria } from '../data/datosHistoria';
import { capitulosHistoriaScrumMaster } from '../data/datosHistoriaScrumMaster';
import { capitulosHistoriaProductOwner } from '../data/datosHistoriaProductOwner';
import { capitulosHistoriaDevelopers } from '../data/datosHistoriaDevelopers';

export type TipoHistoria = 'general' | 'scrum-master' | 'product-owner' | 'developers';

/**
 * Filtra los nodos y aristas que deben ser visibles hasta el paso actual según la historia elegida.
 */
export function calcularElementosVisiblesHistoria(
  todosLosNodos: NodoScrum[],
  todasLasAristas: AristaScrum[],
  indicePaso: number,
  capitulos: CapituloHistoria[] = capitulosHistoria
) {
  const idsVisibles = new Set<string>();
  for (let i = 0; i <= indicePaso && i < capitulos.length; i++) {
    capitulos[i].idsNodosNuevos.forEach((id) => idsVisibles.add(id));
  }

  const capituloActual = capitulos[indicePaso] || capitulos[0];
  const idsFoco = new Set(capituloActual.idsDestacados);

  const nodosVisibles = todosLosNodos
    .filter((nodo) => idsVisibles.has(nodo.id))
    .map((nodo) => ({
      ...nodo,
      data: {
        ...nodo.data,
        opacity: idsFoco.has(nodo.id) ? 1.0 : 0.45,
        isSelected: idsFoco.has(nodo.id)
      }
    }));

  const aristasVisibles = todasLasAristas.filter(
    (arista) => idsVisibles.has(arista.source) && idsVisibles.has(arista.target)
  );

  return { nodosVisibles, aristasVisibles };
}

export function useHistoriaScrum(todosLosNodos: NodoScrum[], todasLasAristas: AristaScrum[]) {
  const [pasoActual, setPasoActual] = useState(0);
  const [modoActivo, setModoActivo] = useState<'historia' | 'mapa'>('historia');
  const [tipoHistoria, setTipoHistoria] = useState<TipoHistoria>('general');

  const capitulosActivos = useMemo(() => {
    if (tipoHistoria === 'scrum-master') return capitulosHistoriaScrumMaster;
    if (tipoHistoria === 'product-owner') return capitulosHistoriaProductOwner;
    if (tipoHistoria === 'developers') return capitulosHistoriaDevelopers;
    return capitulosHistoria;
  }, [tipoHistoria]);

  const capituloActual: CapituloHistoria = useMemo(() => {
    return capitulosActivos[pasoActual] || capitulosActivos[0];
  }, [capitulosActivos, pasoActual]);

  const { nodosVisibles, aristasVisibles } = useMemo(() => {
    if (modoActivo === 'mapa') {
      return { nodosVisibles: todosLosNodos, aristasVisibles: todasLasAristas };
    }
    return calcularElementosVisiblesHistoria(todosLosNodos, todasLasAristas, pasoActual, capitulosActivos);
  }, [todosLosNodos, todasLasAristas, pasoActual, modoActivo, capitulosActivos]);

  const cambiarTipoHistoria = useCallback((nuevoTipo: TipoHistoria) => {
    setTipoHistoria(nuevoTipo);
    setPasoActual(0);
  }, []);

  const siguientePaso = useCallback(() => {
    setPasoActual((prev) => Math.min(prev + 1, capitulosActivos.length - 1));
  }, [capitulosActivos.length]);

  const anteriorPaso = useCallback(() => {
    setPasoActual((prev) => Math.max(prev - 1, 0));
  }, []);

  const irAPaso = useCallback(
    (paso: number) => {
      if (paso >= 0 && paso < capitulosActivos.length) {
        setPasoActual(paso);
      }
    },
    [capitulosActivos.length]
  );

  // Atajos de teclado accesibles (ArrowLeft / ArrowRight) en Modo Historia
  useEffect(() => {
    if (modoActivo !== 'historia') return;
    const manejarTecla = (e: KeyboardEvent) => {
      const etiqueta = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (etiqueta === 'input' || etiqueta === 'textarea' || etiqueta === 'select') return;
      if (e.key === 'ArrowRight') siguientePaso();
      if (e.key === 'ArrowLeft') anteriorPaso();
    };
    window.addEventListener('keydown', manejarTecla);
    return () => window.removeEventListener('keydown', manejarTecla);
  }, [modoActivo, siguientePaso, anteriorPaso]);

  return {
    pasoActual,
    capituloActual,
    totalPasos: capitulosActivos.length,
    modoActivo,
    setModoActivo,
    tipoHistoria,
    cambiarTipoHistoria,
    siguientePaso,
    anteriorPaso,
    irAPaso,
    nodosVisibles,
    aristasVisibles
  };
}
