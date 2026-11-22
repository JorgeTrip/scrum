import { describe, it, expect } from 'vitest';
import {
  calcularTransformacionHaciaAncla,
  prefiereMovimientoReducido
} from '../src/utils/animacionAnclajeModal';

describe('Cálculo vectorial y accesibilidad para animación anclada al botón S (RF-27 y RF-29)', () => {
  it('calcula desplazamiento dx/dy y escala acotada en escritorio hacia la esquina superior izquierda', () => {
    const rectModal = { left: 340, top: 60, width: 600, height: 600 };
    const rectAncla = { left: 24, top: 14, width: 36, height: 36 };

    const res = calcularTransformacionHaciaAncla(rectModal, rectAncla);

    expect(res.dx).toBe(-598);
    expect(res.dy).toBe(-328);
    expect(res.escala).toBeGreaterThanOrEqual(0.05);
    expect(res.escala).toBeLessThanOrEqual(0.25);
    expect(res.cssTransform).toBe(`translate3d(-598px, -328px, 0) scale(${res.escala})`);
  });

  it('calcula vector y escala válidos en móvil vertical (390×664)', () => {
    const rectModal = { left: 16, top: 34, width: 358, height: 596 };
    const rectAncla = { left: 12, top: 8, width: 44, height: 44 };

    const res = calcularTransformacionHaciaAncla(rectModal, rectAncla);

    expect(res.dx).toBeLessThan(0);
    expect(res.dy).toBeLessThan(0);
    expect(res.escala).toBeGreaterThanOrEqual(0.05);
    expect(res.escala).toBeLessThanOrEqual(0.25);
    expect(res.cssTransform).toContain('translate3d(');
    expect(res.cssTransform).toContain('scale(');
  });

  it('aplica respaldo seguro sin errores cuando falta el ancla o sus dimensiones son cero', () => {
    const resNulo = calcularTransformacionHaciaAncla(
      { left: 100, top: 50, width: 400, height: 500 },
      null
    );
    expect(resNulo.escala).toBe(0.92);
    expect(resNulo.cssTransform).toContain('scale(0.92)');

    const resCero = calcularTransformacionHaciaAncla(
      { left: 100, top: 50, width: 0, height: 0 },
      { left: 12, top: 8, width: 44, height: 44 }
    );
    expect(resCero.escala).toBe(0.92);
    expect(resCero.cssTransform).toContain('scale(0.92)');
  });

  it('detecta prefers-reduced-motion con seguridad ante entornos sin matchMedia', () => {
    expect(prefiereMovimientoReducido(() => ({ matches: true }))).toBe(true);
    expect(prefiereMovimientoReducido(() => ({ matches: false }))).toBe(false);
    expect(prefiereMovimientoReducido(null)).toBe(false);
    expect(() => prefiereMovimientoReducido()).not.toThrow();
  });
});
