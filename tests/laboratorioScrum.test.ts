import { describe, it, expect } from 'vitest';
import { nodosScrum } from '../src/data/scrumData';
import { calcularTimeboxesSprint } from '../src/dominio/servicios/calculadoraTimebox';
import { evaluarRespuestaQuiz, calcularResumenQuiz } from '../src/dominio/servicios/evaluadorQuiz';
import { pilaresEmpiricos, valoresScrum, comparativa2017vs2020 } from '../src/dominio/datos/fundamentosScrum';
import { ejemplosEcommercePorNodo } from '../src/dominio/datos/ejemplosEcommerce';
import { bancoQuizScrum } from '../src/dominio/datos/bancoQuizScrum';
import { fuentesOficiales } from '../src/dominio/datos/fuentesOficiales';

describe('Laboratorio Scrum: Timeboxes, Empirismo, E-commerce y Quiz', () => {
  it('calcula los timeboxes proporcionales oficiales para Sprints de 1 a 4 semanas', () => {
    const sprint2Semanas = calcularTimeboxesSprint(2);
    expect(sprint2Semanas.planningHorasMax).toBe(4);
    expect(sprint2Semanas.reviewHorasMax).toBe(2);
    expect(sprint2Semanas.retrospectiveHorasMax).toBe(1.5);
    expect(sprint2Semanas.dailyMinutos).toBe(15);

    const sprint4Semanas = calcularTimeboxesSprint(4);
    expect(sprint4Semanas.planningHorasMax).toBe(8);
    expect(sprint4Semanas.reviewHorasMax).toBe(4);
    expect(sprint4Semanas.retrospectiveHorasMax).toBe(3);
    expect(sprint4Semanas.dailyMinutos).toBe(15);
  });

  it('acota duraciones fuera del rango oficial (1 a 4 semanas) sin fallar', () => {
    const inferior = calcularTimeboxesSprint(0);
    const superior = calcularTimeboxesSprint(8);
    expect(inferior.semanas).toBe(1);
    expect(superior.semanas).toBe(4);
  });

  it('define exactamente 3 pilares empíricos, 5 valores y comparativa 2017 vs 2020 con fuente APA', () => {
    expect(pilaresEmpiricos).toHaveLength(3);
    expect(valoresScrum).toHaveLength(5);
    expect(comparativa2017vs2020.length).toBeGreaterThanOrEqual(5);

    pilaresEmpiricos.forEach((p) => expect(fuentesOficiales[p.fuenteId]).toBeDefined());
    valoresScrum.forEach((v) => expect(fuentesOficiales[v.fuenteId]).toBeDefined());
    comparativa2017vs2020.forEach((c) => expect(fuentesOficiales[c.fuenteId]).toBeDefined());
  });

  it('provee un caso práctico coherente de E-commerce (MercadoÁgil) para cada nodo del grafo', () => {
    nodosScrum.forEach((nodo) => {
      const ejemplo = ejemplosEcommercePorNodo[nodo.id];
      expect(ejemplo).toBeDefined();
      expect(ejemplo.artefactoEjemplo.length).toBeGreaterThan(10);
      expect(ejemplo.elementosClave.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('evalúa respuestas del quiz situacional y calcula puntaje con resiliencia ante índices inválidos', () => {
    expect(bancoQuizScrum.length).toBeGreaterThanOrEqual(8);
    const primera = bancoQuizScrum[0];

    const acierto = evaluarRespuestaQuiz(primera, primera.indiceCorrecto);
    expect(acierto.esCorrecta).toBe(true);

    const indiceIncorrecto = (primera.indiceCorrecto + 1) % primera.opciones.length;
    const fallo = evaluarRespuestaQuiz(primera, indiceIncorrecto);
    expect(fallo.esCorrecta).toBe(false);

    const resumen = calcularResumenQuiz(bancoQuizScrum, {
      [primera.id]: primera.indiceCorrecto,
      'id-inexistente': 99
    });
    expect(resumen.respondidas).toBe(1);
    expect(resumen.correctas).toBe(1);
    expect(resumen.porcentaje).toBe(Math.round((1 / bancoQuizScrum.length) * 100));
  });
});
