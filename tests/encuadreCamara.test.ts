import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  calcularReservasViewport,
  calcularViewportEncuadre,
  type ParametrosReservasViewport
} from '../src/utils/encuadreCamara';
import {
  LIMITE_SUPERIOR_CARRILES_FLOW,
  calcularPosicionesEtiquetasCarriles
} from '../src/utils/swimlanesGeometria';
import { calcularTimeboxesSprint } from '../src/dominio/servicios/calculadoraTimebox';
import { calcularResumenQuiz } from '../src/dominio/servicios/evaluadorQuiz';
import { bancoQuizScrum } from '../src/dominio/datos/bancoQuizScrum';
import { TopBarMovil } from '../src/components/movil/TopBarMovil';
import { ModalLaboratorioScrum } from '../src/components/laboratorio/ModalLaboratorioScrum';

const basePortrait: ParametrosReservasViewport = {
  anchoLienzo: 390, altoLienzo: 545, esMovil: true, esLandscapeCompacto: false,
  modoActivo: 'historia', panelHistoriaColapsado: false, hojaInferiorAbierta: false, altoPanelHistoriaMovil: 305
};

describe('Especificación 05 - Encuadre Asimétrico, Carriles Superiores y Ergonomía Táctil', () => {
  it('reserva franja inferior en Modo Historia portrait y amplía lienzo al colapsar', () => {
    const expandido = calcularReservasViewport(basePortrait);
    const colapsado = calcularReservasViewport({ ...basePortrait, panelHistoriaColapsado: true });
    expect(expandido.reservas.abajo).toBeGreaterThanOrEqual(305);
    expect(colapsado.reservas.abajo).toBeLessThan(90);
    expect(colapsado.altoUtil).toBeGreaterThan(expandido.altoUtil + 200);
  });

  it('reserva ancho lateral izquierdo en landscape compacto (844×390) y escritorio', () => {
    const landscape = calcularReservasViewport({
      ...basePortrait, anchoLienzo: 844, altoLienzo: 326, esMovil: false, esLandscapeCompacto: true
    });
    const desktop = calcularReservasViewport({
      ...basePortrait, anchoLienzo: 1280, altoLienzo: 720, esMovil: false
    });
    expect(landscape.reservas.izquierda).toBeGreaterThanOrEqual(320);
    expect(landscape.reservas.arriba).toBeGreaterThanOrEqual(50);
    expect(desktop.reservas.izquierda).toBeGreaterThanOrEqual(440);
  });

  it('encuadra los nodos por encima de PanelHistoriaMovil sin taparlos en Etapa 3', () => {
    const { reservas } = calcularReservasViewport(basePortrait);
    const vp = calcularViewportEncuadre(
      { x: 252, y: 626, width: 690, height: 185 },
      { ancho: 390, alto: 545 },
      { reservas, minZoom: 0.12, maxZoom: 0.95, padding: 0.08 }
    );
    expect(626 * vp.zoom + vp.y).toBeGreaterThanOrEqual(reservas.arriba);
    expect((626 + 185) * vp.zoom + vp.y).toBeLessThanOrEqual(545 - reservas.abajo + 2);
  });

  it('alinea los 3 carriles verticalmente hacia arriba en móvil y desktop', () => {
    const { reservas } = calcularReservasViewport({ ...basePortrait, altoLienzo: 485, modoActivo: 'mapa' });
    const vpMovil = calcularViewportEncuadre(
      { x: -174, y: -53, width: 2660, height: 870 },
      { ancho: 390, alto: 485 },
      { reservas, minZoom: 0.1, maxZoom: 1.0, padding: 0.05, alinearArriba: true, topReferenciaSiAlineado: LIMITE_SUPERIOR_CARRILES_FLOW }
    );
    const inicioMovil = LIMITE_SUPERIOR_CARRILES_FLOW * vpMovil.zoom + vpMovil.y;
    expect(inicioMovil).toBeGreaterThanOrEqual(reservas.arriba);
    expect(inicioMovil).toBeLessThanOrEqual(reservas.arriba + 28);

    const deskt = calcularReservasViewport({ ...basePortrait, anchoLienzo: 1280, altoLienzo: 720, esMovil: false, modoActivo: 'mapa' });
    const vpDesktop = calcularViewportEncuadre(
      { x: -174, y: -53, width: 2660, height: 870 },
      { ancho: 1280, alto: 720 },
      { reservas: deskt.reservas, minZoom: 0.2, maxZoom: 1.0, padding: 0.06, alinearArriba: true, topReferenciaSiAlineado: LIMITE_SUPERIOR_CARRILES_FLOW }
    );
    expect(LIMITE_SUPERIOR_CARRILES_FLOW * vpDesktop.zoom + vpDesktop.y).toBeLessThanOrEqual(deskt.reservas.arriba + 30);
  });

  it('sincroniza verticalmente los rótulos de Swimlanes con cada banda', () => {
    const etiquetas = calcularPosicionesEtiquetasCarriles(0.12, 30, 485, true);
    expect(etiquetas).toHaveLength(3);
    expect(etiquetas[0].topPx).toBeGreaterThanOrEqual(8);
    expect(etiquetas[0].topPx).toBeLessThan(etiquetas[1].topPx);
    expect(etiquetas[1].topPx).toBeLessThan(etiquetas[2].topPx);
    expect(etiquetas[2].topPx).toBeLessThan(180);
  });

  it('garantiza área táctil >= 44px en chip Docs y pestañas del Laboratorio', () => {
    const htmlTopBar = renderToStaticMarkup(
      React.createElement(TopBarMovil, {
        busqueda: '', onCambioBusqueda: () => {}, categoriaSeleccionada: 'all',
        onSeleccionCategoria: () => {}, onResetFiltros: () => {},
        modoActivo: 'mapa', vistaMapaMovil: 'mapa', tema: 'dark', onAbrirAcercaDe: () => {}
      })
    );
    expect(htmlTopBar).toContain('min-w-[44px]');

    const htmlLab = renderToStaticMarkup(
      React.createElement(ModalLaboratorioScrum, {
        abierto: true, pestanaActiva: 'timebox', onCambiarPestana: () => {}, alCerrar: () => {},
        semanasSprint: 2, onCambiarSemanas: () => {}, timeboxes: calcularTimeboxesSprint(2),
        filtroComparativa: 'Todas', onCambiarFiltroComparativa: () => {}, indicePregunta: 0,
        respuestasPorId: {}, resumenQuiz: calcularResumenQuiz(bancoQuizScrum, {}),
        onResponderQuiz: () => {}, onSiguienteQuiz: () => {}, onAnteriorQuiz: () => {},
        onReiniciarQuiz: () => {}, onVerNodoEnMapa: () => {}
      })
    );
    expect(htmlLab).toContain('min-h-[44px]');
    expect(htmlLab).not.toContain('min-h-[40px]');
  });
});
