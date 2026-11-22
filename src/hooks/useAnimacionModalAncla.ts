import { useState, useRef, useEffect, useLayoutEffect, useCallback, type CSSProperties } from 'react';
import {
  SELECTOR_ANCLA_BOTON_S,
  DURACION_ANIMACION_ANCLA_MS,
  RETRASO_PULSO_ANCLA_MS,
  CURVA_APPLE_ANCLA,
  calcularTransformacionHaciaAncla,
  prefiereMovimientoReducido,
  dispararPulsoRecepcionAncla
} from '../utils/animacionAnclajeModal';

export type FaseAnimacionModal =
  | 'inactivo'
  | 'midiendo-apertura'
  | 'preparando-apertura'
  | 'abierto'
  | 'cerrando';

interface ParametrosAnimacionModalAncla {
  abierto: boolean;
  esBienvenida: boolean;
  alCerrar: () => void;
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Orquesta la animación FLIP GPU bidireccional de un modal hacia/desde el botón ancla «S»,
 * con medición exacta sin transformación previa, pulso de recepción e interrumpibilidad.
 */
export function useAnimacionModalAncla({
  abierto,
  esBienvenida,
  alCerrar
}: ParametrosAnimacionModalAncla) {
  const [renderizar, setRenderizar] = useState(abierto);
  const [fase, setFase] = useState<FaseAnimacionModal>(abierto ? 'abierto' : 'inactivo');
  const [transformAncla, setTransformAncla] = useState('translate3d(0px, -24px, 0) scale(0.92)');

  const refPanel = useRef<HTMLDivElement | null>(null);
  const faseRef = useRef<FaseAnimacionModal>(fase);
  const prevAbiertoRef = useRef(abierto);
  const timerPulsoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerCierreRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  faseRef.current = fase;

  const limpiarTimers = useCallback(() => {
    if (timerPulsoRef.current) clearTimeout(timerPulsoRef.current);
    if (timerCierreRef.current) clearTimeout(timerCierreRef.current);
    if (rafRef.current !== null && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(rafRef.current);
    }
    timerPulsoRef.current = null;
    timerCierreRef.current = null;
    rafRef.current = null;
  }, []);

  useEffect(() => () => limpiarTimers(), [limpiarTimers]);

  useIsomorphicLayoutEffect(() => {
    const previo = prevAbiertoRef.current;
    prevAbiertoRef.current = abierto;

    if (!previo && abierto) {
      limpiarTimers();
      setRenderizar(true);

      if (esBienvenida || prefiereMovimientoReducido()) {
        faseRef.current = 'abierto';
        setFase('abierto');
        return;
      }

      if (faseRef.current === 'cerrando') {
        faseRef.current = 'abierto';
        setFase('abierto');
        return;
      }

      faseRef.current = 'midiendo-apertura';
      setFase('midiendo-apertura');
    } else if (previo && !abierto && faseRef.current !== 'cerrando') {
      limpiarTimers();
      setRenderizar(false);
      faseRef.current = 'inactivo';
      setFase('inactivo');
    }
  }, [abierto, esBienvenida, limpiarTimers]);

  useIsomorphicLayoutEffect(() => {
    if (!renderizar) return;

    if (fase === 'midiendo-apertura') {
      const rectModal = refPanel.current?.getBoundingClientRect() ?? null;
      const rectAncla =
        document.querySelector<HTMLElement>(SELECTOR_ANCLA_BOTON_S)?.getBoundingClientRect() ?? null;
      setTransformAncla(calcularTransformacionHaciaAncla(rectModal, rectAncla).cssTransform);
      faseRef.current = 'preparando-apertura';
      setFase('preparando-apertura');
      return;
    }

    if (fase === 'preparando-apertura') {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => {
          faseRef.current = 'abierto';
          setFase('abierto');
        });
      });
    }
  }, [renderizar, fase]);

  const solicitarCierre = useCallback(() => {
    if (faseRef.current === 'cerrando' || !renderizar) return;
    limpiarTimers();

    if (prefiereMovimientoReducido()) {
      setRenderizar(false);
      faseRef.current = 'inactivo';
      setFase('inactivo');
      alCerrar();
      return;
    }

    const rectModal = refPanel.current?.getBoundingClientRect() ?? null;
    const anclaEl = document.querySelector<HTMLElement>(SELECTOR_ANCLA_BOTON_S);
    const { cssTransform } = calcularTransformacionHaciaAncla(
      rectModal,
      anclaEl?.getBoundingClientRect() ?? null
    );

    setTransformAncla(cssTransform);
    faseRef.current = 'cerrando';
    setFase('cerrando');
    alCerrar();

    timerPulsoRef.current = setTimeout(() => {
      dispararPulsoRecepcionAncla(document.querySelector<HTMLElement>(SELECTOR_ANCLA_BOTON_S));
    }, RETRASO_PULSO_ANCLA_MS);

    timerCierreRef.current = setTimeout(() => {
      setRenderizar(false);
      faseRef.current = 'inactivo';
      setFase('inactivo');
    }, DURACION_ANIMACION_ANCLA_MS);
  }, [renderizar, alCerrar, limpiarTimers]);

  const movReducido = prefiereMovimientoReducido();
  const estiloPanel: CSSProperties =
    fase === 'midiendo-apertura'
      ? { transform: 'none', opacity: 0, transition: 'none' }
      : fase === 'preparando-apertura'
        ? {
            transform: transformAncla,
            opacity: 0.25,
            transition: 'none',
            willChange: 'transform, opacity'
          }
        : fase === 'cerrando'
          ? {
              transform: transformAncla,
              opacity: 0,
              transition: `transform ${DURACION_ANIMACION_ANCLA_MS}ms ${CURVA_APPLE_ANCLA}, opacity 300ms ease-out 80ms`,
              willChange: 'transform, opacity'
            }
          : {
              transform: 'translate3d(0px, 0px, 0) scale(1)',
              opacity: 1,
              transition: movReducido
                ? undefined
                : `transform ${DURACION_ANIMACION_ANCLA_MS}ms ${CURVA_APPLE_ANCLA}, opacity 240ms ease-out`
            };

  const estiloFondo: CSSProperties =
    fase === 'midiendo-apertura' || fase === 'preparando-apertura' || fase === 'cerrando'
      ? { opacity: 0, transition: movReducido ? undefined : 'opacity 280ms ease-out' }
      : { opacity: 1, transition: movReducido ? undefined : 'opacity 240ms ease-out' };

  return {
    renderizar,
    fase,
    refPanel,
    estiloPanel,
    estiloFondo,
    estaCerrando: fase === 'cerrando',
    solicitarCierre
  };
}
