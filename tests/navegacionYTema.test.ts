import { describe, it, expect } from 'vitest';
import { aristasScrum, nodosScrum } from '../src/data/scrumData';
import { calcularEstadoAristas } from '../src/dominio/servicios/filtroRelaciones';
import { calcularBandasSwimlanesFlow } from '../src/utils/swimlanesGeometria';
import { calcularViewportArrastre } from '../src/utils/panContextual';
import { construirRutaSmoothStepConDesvio } from '../src/utils/trayectoriaUtilidades';
import { normalizarTemaPreferido } from '../src/dominio/validacion/esquemasDominio';
import { resolverUrlHistorial } from '../src/hooks/useHistorialCambios';

describe('Navegación, Filtrado de Aristas, Swimlanes y Tema', () => {
  it('atenúa aristas desconectadas cuando hay búsqueda o filtro activo en el mapa', () => {
    const nodosFiltrados = nodosScrum.map((n) => ({
      ...n,
      data: {
        ...n.data,
        opacity: n.id === 'event-daily-scrum' ? 1.0 : 0.2
      }
    }));

    const resultado = calcularEstadoAristas(aristasScrum, nodosFiltrados, null, true);
    const conectada = resultado.find((a) => a.id === 'edge-devs-to-daily');
    const desconectada = resultado.find((a) => a.id === 'edge-po-to-vision');

    expect(conectada?.style?.opacity).toBe(1);
    expect(desconectada?.style?.opacity).toBe(0.15);
  });

  it('destaca exclusivamente las aristas conectadas a un nodo seleccionado', () => {
    const resultado = calcularEstadoAristas(aristasScrum, nodosScrum, 'role-scrum-master', false);
    const aristaSM = resultado.find((a) => a.id === 'edge-sm-to-retro');
    const aristaAjena = resultado.find((a) => a.id === 'edge-po-to-vision');

    expect(aristaSM?.style?.opacity).toBe(1);
    expect(aristaAjena?.style?.opacity).toBe(0.18);
  });

  it('posiciona las tres bandas de Swimlanes alrededor de las coordenadas reales de los nodos', () => {
    const bandas = calcularBandasSwimlanesFlow();
    expect(bandas).toHaveLength(3);

    // Roles en y = -53 dentro de banda 0, Eventos en y = 257 en banda 1, Artefactos en y = 626 en banda 2
    expect(-53).toBeGreaterThanOrEqual(bandas[0].top);
    expect(-53).toBeLessThan(bandas[0].top + bandas[0].height);
    expect(257).toBeGreaterThanOrEqual(bandas[1].top);
    expect(257).toBeLessThan(bandas[1].top + bandas[1].height);
    expect(626).toBeGreaterThanOrEqual(bandas[2].top);
    expect(626).toBeLessThan(bandas[2].top + bandas[2].height);
  });

  it('bloquea Y cuando todos los carriles caben en pantalla y habilita paneo Y al hacer zoom', () => {
    const vpInicial = { x: 100, y: 80, zoom: 0.5 };
    const sinDesborde = calcularViewportArrastre(vpInicial, 40, 60, 900);
    expect(sinDesborde.x).toBe(140);
    expect(sinDesborde.y).toBe(80);

    const vpZoomAlto = { x: 100, y: 80, zoom: 1.5 };
    const conDesborde = calcularViewportArrastre(vpZoomAlto, 40, -70, 700);
    expect(conDesborde.x).toBe(140);
    expect(conDesborde.y).toBe(10);
  });

  it('usa offset de corredor como respaldo en curvas cuando no hay desvío personalizado', () => {
    const rutaConOffset = construirRutaSmoothStepConDesvio({
      sourceX: 0,
      sourceY: 100,
      targetX: 200,
      targetY: 100,
      desvio: 0,
      offset: 36
    });
    expect(rutaConOffset).toContain('136');
  });

  it('normaliza tema por defecto a dark y resuelve URL de historial relativa a BASE_URL', () => {
    expect(normalizarTemaPreferido('light')).toBe('light');
    expect(normalizarTemaPreferido('invalido')).toBe('dark');
    expect(resolverUrlHistorial('/scrum/')).toBe('/scrum/historial-cambios.json');
    expect(resolverUrlHistorial('./')).toBe('./historial-cambios.json');
  });
});
