import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { nodosScrum } from '../src/data/scrumData';
import { capitulosHistoria } from '../src/data/datosHistoria';
import { clasificarViewport } from '../src/utils/deteccionViewport';
import { agruparNodosPorCarril } from '../src/utils/agrupacionCarriles';
import { calcularViewportArrastre, esObjetivoBloqueanteDePaneo } from '../src/utils/panContextual';
import { BottomTabBarMovil } from '../src/components/movil/BottomTabBarMovil';
import { HojaInferiorMovil, debeCerrarHojaPorFondo } from '../src/components/movil/HojaInferiorMovil';
import { VistaListaCarriles } from '../src/components/movil/VistaListaCarriles';
import { PanelHistoriaMovil } from '../src/components/movil/PanelHistoriaMovil';

describe('Especificación 04 - Detección de Viewport y Ergonomía Móvil', () => {
  it('clasifica correctamente portrait móvil, landscape compacto y escritorio', () => {
    expect(clasificarViewport(390, 844, true)).toEqual({
      esMovil: true,
      esLandscapeCompacto: false,
      esPantallaPequena: true,
      esTactil: true
    });

    expect(clasificarViewport(844, 390, true)).toEqual({
      esMovil: false,
      esLandscapeCompacto: true,
      esPantallaPequena: true,
      esTactil: true
    });

    expect(clasificarViewport(1280, 800, false)).toEqual({
      esMovil: false,
      esLandscapeCompacto: false,
      esPantallaPequena: false,
      esTactil: false
    });
  });

  it('agrupa nodos en los 3 carriles ordenados respetando filtros activos', () => {
    const gruposCompletos = agruparNodosPorCarril(nodosScrum, false);
    expect(gruposCompletos).toHaveLength(3);
    expect(gruposCompletos[0].id).toBe('lane-roles');
    expect(gruposCompletos[1].id).toBe('lane-events');
    expect(gruposCompletos[2].id).toBe('lane-artifacts');
    expect(gruposCompletos[0].nodos.length).toBeGreaterThanOrEqual(3);

    const soloPo = nodosScrum.map((n) => ({
      ...n,
      data: { ...n.data, opacity: n.id === 'role-product-owner' ? 1 : 0.2 }
    }));
    const gruposFiltrados = agruparNodosPorCarril(soloPo, true);
    expect(gruposFiltrados[0].nodos.map((n) => n.id)).toEqual(['role-product-owner']);
    expect(gruposFiltrados[1].nodos).toHaveLength(0);
    expect(gruposFiltrados[2].nodos).toHaveLength(0);
  });

  it('permite paneo sobre aristas en modo táctil y desbloquea eje Y con altura real landscape', () => {
    expect(esObjetivoBloqueanteDePaneo({ enArista: true, enNodo: false }, false)).toBe(true);
    expect(esObjetivoBloqueanteDePaneo({ enArista: true, enNodo: false }, true)).toBe(false);
    expect(esObjetivoBloqueanteDePaneo({ enArista: false, enNodo: true }, true)).toBe(true);

    const vp = calcularViewportArrastre({ x: 50, y: 40, zoom: 0.5 }, 20, -30, 257);
    expect(vp.x).toBe(70);
    expect(vp.y).toBe(10);
  });

  it('renderiza BottomTabBarMovil con las 4 acciones principales accesibles', () => {
    const html = renderToStaticMarkup(
      React.createElement(BottomTabBarMovil, {
        modoActivo: 'historia',
        leyendaAbierta: false,
        onCambiarModo: () => {},
        onAbrirLaboratorio: () => {},
        onAlternarLeyenda: () => {}
      })
    );
    expect(html).toContain('Historia');
    expect(html).toContain('Mapa');
    expect(html).toContain('Lab');
    expect(html).toContain('Leyenda');
  });

  it('renderiza HojaInferiorMovil como diálogo modal accesible con botón cerrar', () => {
    const html = renderToStaticMarkup(
      React.createElement(HojaInferiorMovil, {
        abierto: true,
        titulo: 'Product Owner',
        alCerrar: () => {},
        children: React.createElement('p', null, 'Contenido')
      })
    );
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain('Cerrar panel');
  });

  it('renderiza VistaListaCarriles y PanelHistoriaMovil con todas las perspectivas', () => {
    const htmlLista = renderToStaticMarkup(
      React.createElement(VistaListaCarriles, {
        nodos: nodosScrum,
        hayFiltroActivo: false,
        onSeleccionarNodo: () => {},
        onUbicarEnMapa: () => {}
      })
    );
    expect(htmlLista).toContain('Personas');
    expect(htmlLista).toContain('Eventos');
    expect(htmlLista).toContain('Documentos');
    expect(htmlLista).toContain('Ubicar en el mapa');

    const htmlHist = renderToStaticMarkup(
      React.createElement(PanelHistoriaMovil, {
        capitulo: capitulosHistoria[0],
        pasoActual: 0,
        totalPasos: capitulosHistoria.length,
        tipoHistoria: 'general',
        esLandscapeCompacto: false,
        onCambiarTipoHistoria: () => {},
        onSiguiente: () => {},
        onAnterior: () => {},
        onIrAPaso: () => {},
        onAlternarModoMapa: () => {}
      })
    );
    expect(htmlHist).toContain('General');
    expect(htmlHist).toContain('Scrum Master');
    expect(htmlHist).toContain('Product Owner');
    expect(htmlHist).toContain('Developers');
    expect(htmlHist).toContain('Etapa 1 de');
  });

  it('evita cierre fantasma de HojaInferiorMovil cuando el tap comenzó fuera del fondo', () => {
    expect(debeCerrarHojaPorFondo(false, true)).toBe(false);
    expect(debeCerrarHojaPorFondo(true, false)).toBe(false);
    expect(debeCerrarHojaPorFondo(false, false)).toBe(false);
    expect(debeCerrarHojaPorFondo(true, true)).toBe(true);
  });
});
