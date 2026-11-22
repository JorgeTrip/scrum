/**
 * Catálogo verificado de Fuentes Oficiales en formato APA 7ª edición.
 */

import type { FuenteOficialAPA } from '../tiposDominio';

export const fuentesOficiales: Record<string, FuenteOficialAPA> = {
  'scrum-guide-2020': {
    id: 'scrum-guide-2020',
    citaApa:
      'Schwaber, K., & Sutherland, J. (2020). The Scrum Guide: The Definitive Guide to Scrum: The Rules of the Game (Ed. noviembre 2020). ScrumGuides.org.',
    seccion: 'Guía Oficial de Scrum 2020 (Versión vigente)',
    urlOficial: 'https://scrumguides.org/scrum-guide.html',
    etiquetaEnlace: 'Leer Guía Oficial 2020 (ScrumGuides.org)'
  },
  'scrum-guide-2020-es': {
    id: 'scrum-guide-2020-es',
    citaApa:
      'Schwaber, K., & Sutherland, J. (2020). La Guía de Scrum: La guía definitiva de Scrum: Las reglas del juego (L. Salazar & M. López, Trads.). ScrumGuides.org.',
    seccion: 'Traducciones Oficiales al Español (Noviembre 2020)',
    urlOficial: 'https://scrumguides.org/download.html',
    etiquetaEnlace: 'Descargar Guía en Español (ScrumGuides.org)'
  },
  'pichler-vision-board': {
    id: 'pichler-vision-board',
    citaApa:
      'Pichler, R. (2011, 10 de mayo). The Product Vision Board. Pichler Consulting.',
    seccion: 'Product Strategy & Vision Canvas',
    urlOficial: 'https://www.romanpichler.com/blog/the-product-vision-board/',
    etiquetaEnlace: 'Artículo original de Roman Pichler'
  },
  'adzic-impact-mapping': {
    id: 'adzic-impact-mapping',
    citaApa:
      'Adzic, G. (2012). Impact Mapping: Making a Big Impact with Software Products and Projects. Provoking Thoughts.',
    seccion: 'Capítulos 1–3: Why, Who, How, What',
    urlOficial: 'https://www.impactmapping.org/',
    etiquetaEnlace: 'Sitio oficial de Impact Mapping'
  },
  'patton-story-mapping': {
    id: 'patton-story-mapping',
    citaApa:
      'Patton, J., & Economy, P. (2014). User Story Mapping: Discover the Whole Story, Build the Right Product. O’Reilly Media.',
    seccion: 'Capítulos 1–4: The Big Picture & Walking Skeleton',
    urlOficial: 'https://www.oreilly.com/library/view/user-story-mapping/9781491904893/',
    etiquetaEnlace: 'Referencia oficial O’Reilly Media'
  }
};

/**
 * Obtiene la fuente APA por identificador con respaldo seguro a la Guía Scrum 2020.
 */
export function obtenerFuentePorId(fuenteId: string): FuenteOficialAPA {
  return fuentesOficiales[fuenteId] ?? fuentesOficiales['scrum-guide-2020'];
}
