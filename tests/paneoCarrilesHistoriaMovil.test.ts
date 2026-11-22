import { describe, it, expect } from 'vitest';
import {
  calcularReservasViewport,
  calcularViewportEncuadre,
  type ParametrosReservasViewport
} from '../src/utils/encuadreCamara';
import {
  ALTURA_TOTAL_FLUJO_CARRILES,
  LIMITE_SUPERIOR_CARRILES_FLOW
} from '../src/utils/swimlanesGeometria';
import {
  esModoZoomFijoTresCarriles,
  resolverIdsObjetivoHistoria,
  resolverViewportContextual
} from '../src/utils/lectorMedidasLienzo';

const basePortrait: ParametrosReservasViewport = {
  anchoLienzo: 390,
  altoLienzo: 543,
  esMovil: true,
  esLandscapeCompacto: false,
  modoActivo: 'historia',
  panelHistoriaColapsado: false,
  hojaInferiorAbierta: false,
  altoPanelHistoriaMovil: 305
};

describe('Especificación 06 - Zoom Constante de 3 Carriles y Paneo Horizontal en Móvil Vertical', () => {
  it('mantiene zoom y coordenada Y idénticos entre etapas sin importar ancho o altura de nodos', () => {
    const { reservas } = calcularReservasViewport(basePortrait);

    const vpEtapa1 = calcularViewportEncuadre(
      { x: -174, y: -53, width: 320, height: 870 },
      { ancho: 390, alto: 543 },
      { reservas, minZoom: 0.1, maxZoom: 0.95, padding: 0.08, fijarZoomAlturaTresCarriles: true }
    );
    const vpEtapa3 = calcularViewportEncuadre(
      { x: 676, y: 626, width: 266, height: 185 },
      { ancho: 390, alto: 543 },
      { reservas, minZoom: 0.1, maxZoom: 0.95, padding: 0.08, fijarZoomAlturaTresCarriles: true }
    );
    const vpEtapa5Ancha = calcularViewportEncuadre(
      { x: 350, y: -53, width: 920, height: 550 },
      { ancho: 390, alto: 543 },
      { reservas, minZoom: 0.1, maxZoom: 0.95, padding: 0.08, fijarZoomAlturaTresCarriles: true }
    );

    expect(vpEtapa1.zoom).toBe(vpEtapa3.zoom);
    expect(vpEtapa3.zoom).toBe(vpEtapa5Ancha.zoom);
    expect(vpEtapa1.y).toBe(vpEtapa3.y);
    expect(vpEtapa3.y).toBe(vpEtapa5Ancha.y);

    const bordeSuperior = LIMITE_SUPERIOR_CARRILES_FLOW * vpEtapa3.zoom + vpEtapa3.y;
    const bordeInferior =
      (LIMITE_SUPERIOR_CARRILES_FLOW + ALTURA_TOTAL_FLUJO_CARRILES) * vpEtapa3.zoom + vpEtapa3.y;
    expect(bordeSuperior).toBeGreaterThanOrEqual(reservas.arriba);
    expect(bordeInferior).toBeLessThanOrEqual(543 - reservas.abajo + 1);
  });

  it('centra el eje X en la caja de idsNodosNuevos al avanzar hacia la derecha', () => {
    const { reservas, anchoUtil } = calcularReservasViewport(basePortrait);
    const centroUtilX = reservas.izquierda + anchoUtil / 2;

    const vpEtapa1 = calcularViewportEncuadre(
      { x: -174, y: -53, width: 320, height: 870 },
      { ancho: 390, alto: 543 },
      { reservas, minZoom: 0.1, maxZoom: 0.95, padding: 0.08, fijarZoomAlturaTresCarriles: true }
    );
    const cajaEtapa3 = { x: 676, y: 626, width: 266, height: 185 };
    const vpEtapa3 = calcularViewportEncuadre(
      cajaEtapa3,
      { ancho: 390, alto: 543 },
      { reservas, minZoom: 0.1, maxZoom: 0.95, padding: 0.08, fijarZoomAlturaTresCarriles: true }
    );

    const centroEtapa3Px = (cajaEtapa3.x + cajaEtapa3.width / 2) * vpEtapa3.zoom + vpEtapa3.x;
    expect(Math.abs(centroEtapa3Px - centroUtilX)).toBeLessThanOrEqual(2);
    expect(vpEtapa3.x).toBeLessThan(vpEtapa1.x);
  });

  it('prioriza idsNodosNuevos con fallback seguro y restringe zoom fijo solo a historia portrait', () => {
    expect(
      resolverIdsObjetivoHistoria(['artifact-product-backlog'], ['artifact-product-backlog', 'role-product-owner'])
    ).toEqual(['artifact-product-backlog']);
    expect(resolverIdsObjetivoHistoria([], ['role-product-owner'])).toEqual(['role-product-owner']);
    expect(resolverIdsObjetivoHistoria(undefined, ['event-sprint'])).toEqual(['event-sprint']);

    expect(esModoZoomFijoTresCarriles(true, false, 'historia')).toBe(true);
    expect(esModoZoomFijoTresCarriles(false, true, 'historia')).toBe(false);
    expect(esModoZoomFijoTresCarriles(false, false, 'historia')).toBe(false);
    expect(esModoZoomFijoTresCarriles(true, false, 'mapa')).toBe(false);
  });

  it('recalcula zoom de 3 carriles al colapsar PanelHistoriaMovil y mantiene estabilidad por texto', () => {
    const vpExpandido = resolverViewportContextual({
      caja: { x: 676, y: 626, width: 266, height: 185 },
      lienzo: { ancho: 390, alto: 543 },
      esMovil: true,
      esLandscapeCompacto: false,
      esPantallaPequena: true,
      modoActivo: 'historia',
      panelHistoriaColapsado: false,
      hojaInferiorAbierta: false,
      fijarZoomAlturaTresCarriles: true
    });

    const vpColapsado = resolverViewportContextual({
      caja: { x: 676, y: 626, width: 266, height: 185 },
      lienzo: { ancho: 390, alto: 543 },
      esMovil: true,
      esLandscapeCompacto: false,
      esPantallaPequena: true,
      modoActivo: 'historia',
      panelHistoriaColapsado: true,
      hojaInferiorAbierta: false,
      fijarZoomAlturaTresCarriles: true
    });

    expect(vpColapsado.zoom).toBeGreaterThan(vpExpandido.zoom * 1.5);
    expect((LIMITE_SUPERIOR_CARRILES_FLOW + ALTURA_TOTAL_FLUJO_CARRILES) * vpColapsado.zoom + vpColapsado.y).toBeLessThanOrEqual(543 - 72 + 1);
  });
});
