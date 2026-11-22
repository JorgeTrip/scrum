import React from 'react';
import type { NodoScrum } from '../../types/scrum';
import { metadatosAristas } from '../../dominio/datos/metadatosAristas';
import { BottomTabBarMovil } from './BottomTabBarMovil';
import { HojaInferiorMovil } from './HojaInferiorMovil';
import { TooltipFichaTecnica } from '../nodes/TooltipFichaTecnica';
import { ContenidoDetalleArista } from '../edges/PopoverDetalleArista';
import { ContenidoLeyendaRelaciones } from '../LeyendaRelaciones';

interface GestorHojasMovilProps {
  esMovil: boolean;
  esPantallaPequena: boolean;
  modoActivo: 'historia' | 'mapa';
  leyendaAbierta: boolean;
  onCambiarModo: (modo: 'historia' | 'mapa') => void;
  onAbrirLaboratorio: () => void;
  onAlternarLeyenda: () => void;
  onCerrarLeyenda: () => void;
  nodoConFicha: NodoScrum | null;
  onCerrarFicha: () => void;
  idAristaInspeccionada: string | null;
  onCerrarArista: () => void;
}

/**
 * Orquestador de navegación inferior (Bottom Tab Bar) y Bottom Sheet unificado en móviles
 * y viewports landscape compactos: muestra fichas técnicas, detalles de relación o leyenda.
 */
export const GestorHojasMovil: React.FC<GestorHojasMovilProps> = ({
  esMovil,
  esPantallaPequena,
  modoActivo,
  leyendaAbierta,
  onCambiarModo,
  onAbrirLaboratorio,
  onAlternarLeyenda,
  onCerrarLeyenda,
  nodoConFicha,
  onCerrarFicha,
  idAristaInspeccionada,
  onCerrarArista
}) => {
  const metaArista = idAristaInspeccionada ? metadatosAristas[idAristaInspeccionada] : undefined;

  let tituloHoja = '';
  let subtituloHoja = '';
  let alCerrarHoja = () => {};
  let contenidoHoja: React.ReactNode = null;

  if (esPantallaPequena && nodoConFicha) {
    tituloHoja = nodoConFicha.data.label;
    subtituloHoja = 'Ficha Metodológica';
    alCerrarHoja = onCerrarFicha;
    contenidoHoja = <TooltipFichaTecnica datos={nodoConFicha.data} sinMarcoExterno />;
  } else if (esPantallaPequena && idAristaInspeccionada && metaArista) {
    tituloHoja = metaArista.tituloRelacion;
    subtituloHoja = 'Relación Metodológica';
    alCerrarHoja = onCerrarArista;
    contenidoHoja = <ContenidoDetalleArista idArista={idAristaInspeccionada} />;
  } else if (esMovil && leyendaAbierta) {
    tituloHoja = 'Simbología de Relaciones';
    subtituloHoja = 'Código visual Scrum';
    alCerrarHoja = onCerrarLeyenda;
    contenidoHoja = <ContenidoLeyendaRelaciones />;
  }

  return (
    <>
      {esMovil && (
        <BottomTabBarMovil
          modoActivo={modoActivo}
          leyendaAbierta={leyendaAbierta}
          onCambiarModo={onCambiarModo}
          onAbrirLaboratorio={onAbrirLaboratorio}
          onAlternarLeyenda={onAlternarLeyenda}
        />
      )}

      <HojaInferiorMovil
        abierto={Boolean(contenidoHoja)}
        titulo={tituloHoja}
        subtitulo={subtituloHoja}
        alCerrar={alCerrarHoja}
      >
        {contenidoHoja}
      </HojaInferiorMovil>
    </>
  );
};
