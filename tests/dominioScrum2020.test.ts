import { describe, it, expect } from 'vitest';
import { nodosScrum, aristasScrum } from '../src/data/scrumData';
import { capitulosHistoriaDevelopers } from '../src/data/datosHistoriaDevelopers';
import { capitulosHistoriaProductOwner } from '../src/data/datosHistoriaProductOwner';
import { fuentesOficiales } from '../src/dominio/datos/fuentesOficiales';
import { contenidoEnriquecidoNodos } from '../src/dominio/datos/contenidoEnriquecidoNodos';
import { metadatosAristas } from '../src/dominio/datos/metadatosAristas';
import { validarFuenteApa, validarNodoEnriquecido } from '../src/dominio/validacion/esquemasDominio';

describe('Rigor Teórico Guía Scrum 2020 y Fuentes APA 7ª ed.', () => {
  it('todas las fuentes oficiales cumplen el esquema APA con URL https:// verificada', () => {
    const listaFuentes = Object.values(fuentesOficiales);
    expect(listaFuentes.length).toBeGreaterThanOrEqual(4);

    listaFuentes.forEach((fuente) => {
      const resultado = validarFuenteApa(fuente);
      expect(resultado.valido).toBe(true);
      expect(fuente.urlOficial.startsWith('https://')).toBe(true);
      expect(fuente.citaApa.length).toBeGreaterThan(20);
    });
  });

  it('separa estrictamente los 3 artefactos oficiales de las 3 prácticas de Discovery', () => {
    const idsDiscovery = ['artifact-vision-board', 'artifact-impact-mapping', 'artifact-user-story-mapping'];
    const idsOficiales = ['artifact-product-backlog', 'artifact-sprint-backlog', 'artifact-increment'];

    idsDiscovery.forEach((id) => {
      const nodo = nodosScrum.find((n) => n.id === id);
      const extra = contenidoEnriquecidoNodos[id];
      expect(extra?.origenMarco).toBe('discovery-complementario');
      expect(nodo?.data.details.outputs?.some((o) => o.startsWith('Compromiso:'))).toBe(false);
    });

    idsOficiales.forEach((id) => {
      const nodo = nodosScrum.find((n) => n.id === id);
      const extra = contenidoEnriquecidoNodos[id];
      expect(extra?.origenMarco).toBe('scrum-oficial');
      expect(nodo?.data.details.outputs?.some((o) => o.startsWith('Compromiso:'))).toBe(true);
    });
  });

  it('todo nodo posee contenido enriquecido válido con fuente APA y antipatrones', () => {
    nodosScrum.forEach((nodo) => {
      const extra = contenidoEnriquecidoNodos[nodo.id];
      expect(extra).toBeDefined();
      const validacion = validarNodoEnriquecido(extra);
      expect(validacion.valido).toBe(true);
      expect(fuentesOficiales[extra.fuenteId]).toBeDefined();
      expect(extra.antipatrones.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('alinea la coordenada Y base de todos los eventos a 257px', () => {
    const eventos = nodosScrum.filter((n) => n.data.category === 'event');
    eventos.forEach((ev) => {
      expect(ev.position.y).toBe(257);
    });
  });

  it('incluye las aristas metodológicas corregidas y metadatos APA para cada arista', () => {
    const idsAristas = aristasScrum.map((a) => a.id);
    expect(idsAristas).toContain('edge-devs-to-increment');
    expect(idsAristas).toContain('edge-review-to-pb');
    expect(idsAristas).toContain('edge-po-to-retro');
    expect(idsAristas).toContain('edge-devs-to-planning');
    expect(idsAristas).toContain('edge-devs-to-review');

    aristasScrum.forEach((arista) => {
      const meta = metadatosAristas[arista.id];
      expect(meta).toBeDefined();
      expect(fuentesOficiales[meta.fuenteId]).toBeDefined();
      expect(meta.impactoSiSeRompe.length).toBeGreaterThan(10);
    });
  });

  it('incluye historia temática de Developers (5 etapas) y Discovery en historia de PO', () => {
    expect(capitulosHistoriaDevelopers).toHaveLength(5);
    expect(capitulosHistoriaDevelopers[0].idsNodosNuevos).toContain('role-developers');
    expect(capitulosHistoriaDevelopers[3].idsNodosNuevos).toContain('artifact-increment');

    const nodosPO = capitulosHistoriaProductOwner.flatMap((c) => c.idsNodosNuevos);
    expect(nodosPO).toContain('artifact-impact-mapping');
    expect(nodosPO).toContain('artifact-user-story-mapping');
  });
});
