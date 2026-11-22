import { useRef, useCallback, useState, useEffect } from 'react';
import { useReactFlow, type Viewport } from '@xyflow/react';
import { calcularViewportArrastre, esObjetivoBloqueanteDePaneo } from '../utils/panContextual';

const UMBRAL_INICIO_PAN_PX = 5;

/**
 * Hook que gestiona el desplazamiento del fondo del lienzo:
 * mide la altura real del contenedor para desbloquear paneo 2D cuando corresponde
 * y permite desplazar con un dedo sobre aristas en pantallas táctiles sin perder el tap corto.
 */
export function useArrastreLienzoHorizontal(permitirSobreArista = false) {
  const { getViewport, setViewport } = useReactFlow();
  const refContenedor = useRef<HTMLDivElement | null>(null);
  const altoContenedorRef = useRef<number>(700);
  const pointerActivoRef = useRef(false);
  const superoUmbralRef = useRef(false);
  const inicioPointerRef = useRef({ x: 0, y: 0 });
  const inicioViewportRef = useRef<Viewport>({ x: 0, y: 0, zoom: 1 });
  const [estaArrastrandoFondo, setEstaArrastrandoFondo] = useState(false);

  useEffect(() => {
    const el = refContenedor.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const actualizar = () => {
      const h = el.getBoundingClientRect().height;
      if (h > 0) altoContenedorRef.current = Math.round(h);
    };
    actualizar();
    const obs = new ResizeObserver(actualizar);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const alIniciarArrastre = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement;
      const bloqueado = esObjetivoBloqueanteDePaneo(
        {
          enNodo: Boolean(target.closest('.react-flow__node')),
          enArista: Boolean(target.closest('.react-flow__edge')),
          enControlOInput: Boolean(
            target.closest('.react-flow__controls') ||
              target.closest('.nodrag') ||
              target.closest('button') ||
              target.closest('input')
          )
        },
        permitirSobreArista || e.pointerType === 'touch'
      );
      if (bloqueado) return;

      pointerActivoRef.current = true;
      superoUmbralRef.current = false;
      inicioPointerRef.current = { x: e.clientX, y: e.clientY };
      inicioViewportRef.current = getViewport();
    },
    [getViewport, permitirSobreArista]
  );

  const alMoverLienzo = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!pointerActivoRef.current) return;
      const deltaX = e.clientX - inicioPointerRef.current.x;
      const deltaY = e.clientY - inicioPointerRef.current.y;

      if (!superoUmbralRef.current) {
        if (Math.hypot(deltaX, deltaY) < UMBRAL_INICIO_PAN_PX) return;
        superoUmbralRef.current = true;
        setEstaArrastrandoFondo(true);
        try {
          (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        } catch {
          // Ignorar si no admite captura
        }
      }

      const altoViewport =
        altoContenedorRef.current || (typeof window !== 'undefined' ? window.innerHeight - 96 : 700);

      setViewport(calcularViewportArrastre(inicioViewportRef.current, deltaX, deltaY, altoViewport));
    },
    [setViewport]
  );

  const alFinalizarArrastre = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerActivoRef.current) return;
    pointerActivoRef.current = false;
    setEstaArrastrandoFondo(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignorar si el pointer ya no está capturado
    }
  }, []);

  return {
    refContenedor,
    estaArrastrandoFondo,
    alIniciarArrastre,
    alMoverLienzo,
    alFinalizarArrastre
  };
}
