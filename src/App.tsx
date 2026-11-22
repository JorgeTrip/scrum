import React from 'react';
import { TopBar } from './components/TopBar';
import { FlowCanvas } from './components/FlowCanvas';
import { PanelHistoria } from './components/PanelHistoria';
import { PanelHistoriaMovil } from './components/movil/PanelHistoriaMovil';
import { VistaListaCarriles } from './components/movil/VistaListaCarriles';
import { GestorHojasMovil } from './components/movil/GestorHojasMovil';
import { LeyendaRelaciones } from './components/LeyendaRelaciones';
import { Footer } from './components/Footer';
import { ModalAcercaDe } from './components/ModalAcercaDe';
import { ModalLaboratorioScrum } from './components/laboratorio/ModalLaboratorioScrum';
import { useControladorScrum } from './hooks/useControladorScrum';

/**
 * Componente raíz de la aplicación Scrum Interactivo.
 * Compone cabecera, lienzo o lista móvil, historia guiada, hojas inferiores y laboratorio.
 */
export const App: React.FC = () => {
  const c = useControladorScrum();
  const { esMovil, esLandscapeCompacto, esPantallaPequena, esTactil } = c.dispositivo;

  return (
    <div className="w-screen h-dvh flex flex-col bg-[var(--bg-lienzo)] text-[var(--texto-primario)] overflow-hidden select-none font-sans">
      <TopBar
        busqueda={c.filtro.busqueda}
        onCambioBusqueda={c.filtro.setBusqueda}
        categoriaSeleccionada={c.filtro.categoriaSeleccionada}
        onSeleccionCategoria={c.filtro.setCategoriaSeleccionada}
        onResetFiltros={c.filtro.limpiarFiltros}
        modoActivo={c.historia.modoActivo}
        onCambiarModo={c.cambiarModo}
        onAbrirLaboratorio={() => c.lab.abrirEnPestana('timebox')}
        onAbrirAcercaDe={c.bienvenida.abrirManual}
        tema={c.tema}
        onAlternarTema={c.alternarTema}
        esMovil={esMovil}
        esEntornoTactil={esTactil || esLandscapeCompacto}
        vistaMapaMovil={c.vistaMapaMovil}
        onCambiarVistaMapaMovil={c.setVistaMapaMovil}
      />

      <main className="flex-1 relative min-h-0">
        {esMovil && c.historia.modoActivo === 'mapa' && c.vistaMapaMovil === 'lista' ? (
          <VistaListaCarriles
            nodos={c.nodosFinales}
            hayFiltroActivo={c.hayFiltroActivo}
            onSeleccionarNodo={c.flujo.alternarTooltipNodo}
            onUbicarEnMapa={c.ubicarNodoDesdeLista}
            onLimpiarFiltros={c.filtro.limpiarFiltros}
          />
        ) : (
          <FlowCanvas
            nodos={c.nodosFinales}
            aristas={c.aristasFinales}
            onSeleccionarNodo={c.flujo.alternarTooltipNodo}
            onCerrarTooltip={c.flujo.cerrarTooltip}
            idsNodosFoco={c.historia.modoActivo === 'historia' ? c.historia.capituloActual.idsDestacados : []}
            idsNodosNuevos={c.historia.modoActivo === 'historia' ? c.historia.capituloActual.idsNodosNuevos : []}
            modoActivo={c.historia.modoActivo}
            idAristaInspeccionada={c.idAristaInspeccionada}
            onCerrarArista={c.cerrarInspeccionArista}
            tema={c.tema}
            nodoEnfocadoExterno={c.nodoEnfocadoExterno}
            panelHistoriaColapsado={c.panelHistoriaColapsado}
            hojaInferiorAbierta={c.hojaInferiorAbierta}
          />
        )}

        {c.historia.modoActivo === 'historia' &&
          (esPantallaPequena ? (
            <PanelHistoriaMovil
              capitulo={c.historia.capituloActual}
              pasoActual={c.historia.pasoActual}
              totalPasos={c.historia.totalPasos}
              tipoHistoria={c.historia.tipoHistoria}
              esLandscapeCompacto={esLandscapeCompacto}
              colapsado={c.panelHistoriaColapsado}
              onAlternarColapso={c.setPanelHistoriaColapsado}
              onCambiarTipoHistoria={c.historia.cambiarTipoHistoria}
              onSiguiente={c.historia.siguientePaso}
              onAnterior={c.historia.anteriorPaso}
              onIrAPaso={c.historia.irAPaso}
              onAlternarModoMapa={() => c.cambiarModo('mapa')}
            />
          ) : (
            <PanelHistoria
              capitulo={c.historia.capituloActual}
              pasoActual={c.historia.pasoActual}
              totalPasos={c.historia.totalPasos}
              tipoHistoria={c.historia.tipoHistoria}
              onCambiarTipoHistoria={c.historia.cambiarTipoHistoria}
              onSiguiente={c.historia.siguientePaso}
              onAnterior={c.historia.anteriorPaso}
              onIrAPaso={c.historia.irAPaso}
              onAlternarModoMapa={() => c.cambiarModo('mapa')}
            />
          ))}

        {!esMovil && !(esLandscapeCompacto && c.historia.modoActivo === 'historia') && <LeyendaRelaciones />}
      </main>

      <GestorHojasMovil
        esMovil={esMovil}
        esPantallaPequena={esPantallaPequena}
        modoActivo={c.historia.modoActivo}
        leyendaAbierta={c.leyendaMovilAbierta}
        onCambiarModo={c.cambiarModo}
        onAbrirLaboratorio={() => c.lab.abrirEnPestana('timebox')}
        onAlternarLeyenda={c.alternarLeyendaMovil}
        onCerrarLeyenda={() => c.setLeyendaMovilAbierta(false)}
        nodoConFicha={c.nodoConFichaMovil}
        onCerrarFicha={c.flujo.cerrarTooltip}
        idAristaInspeccionada={c.idAristaInspeccionada}
        onCerrarArista={c.cerrarInspeccionArista}
      />

      <Footer />

      <ModalLaboratorioScrum
        abierto={c.lab.abierto}
        pestanaActiva={c.lab.pestanaActiva}
        onCambiarPestana={c.lab.setPestanaActiva}
        alCerrar={c.lab.cerrarLaboratorio}
        semanasSprint={c.lab.semanasSprint}
        onCambiarSemanas={c.lab.setSemanasSprint}
        timeboxes={c.lab.timeboxes}
        filtroComparativa={c.lab.filtroComparativa}
        onCambiarFiltroComparativa={c.lab.setFiltroComparativa}
        indicePregunta={c.lab.indicePregunta}
        respuestasPorId={c.lab.respuestasPorId}
        resumenQuiz={c.lab.resumenQuiz}
        onResponderQuiz={c.lab.responderPregunta}
        onSiguienteQuiz={c.lab.siguientePregunta}
        onAnteriorQuiz={c.lab.anteriorPregunta}
        onReiniciarQuiz={c.lab.reiniciarQuiz}
        onVerNodoEnMapa={c.saltarANodoDesdeQuiz}
      />

      <ModalAcercaDe
        abierto={c.bienvenida.abierto}
        esBienvenida={c.bienvenida.esBienvenida}
        alCerrar={c.bienvenida.cerrarModal}
      />
    </div>
  );
};

export default App;
