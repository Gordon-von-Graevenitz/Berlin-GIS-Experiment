import * as maplibregl from 'maplibre-gl';
import { mapIds } from '../config/map-config';
import { createFeatureClassColorExpression } from '../domain/feature-classes';
import type { HistoricalFeatureCollection } from '../domain/historical-feature';

export function addHistoricalFeatureLayers(
  map: maplibregl.Map,
  features: HistoricalFeatureCollection,
): void {
  map.addSource(mapIds.sources.historicalFeatures, {
    type: 'geojson',
    data: features,
    attribution: 'Landesdenkmalamt Berlin / Berlin um 1900 (dl-de/zero-2-0)',
  });

  map.addLayer({
    id: mapIds.layers.historicalFeaturesFill,
    type: 'fill',
    source: mapIds.sources.historicalFeatures,
    paint: {
      'fill-color': createFeatureClassColorExpression(),
      'fill-opacity': 0.58,
    },
  });

  map.addLayer({
    id: mapIds.layers.historicalFeaturesOutline,
    type: 'line',
    source: mapIds.sources.historicalFeatures,
    paint: {
      'line-color': '#332d29',
      'line-width': ['interpolate', ['linear'], ['zoom'], 13, 0.15, 17, 1],
      'line-opacity': 0.55,
    },
  });
}

export function registerHistoricalFeatureInteractions(
  map: maplibregl.Map,
): void {
  map.on('click', mapIds.layers.historicalFeaturesFill, (event) => {
    const className = event.features?.[0]?.properties?.klassenname;
    if (typeof className !== 'string') return;

    new maplibregl.Popup({ closeButton: false, offset: 8 })
      .setLngLat(event.lngLat)
      .setDOMContent(createPopupContent(className))
      .addTo(map);
  });

  map.on('mouseenter', mapIds.layers.historicalFeaturesFill, () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', mapIds.layers.historicalFeaturesFill, () => {
    map.getCanvas().style.cursor = '';
  });
}

function createPopupContent(className: string): HTMLDivElement {
  const container = document.createElement('div');
  const heading = document.createElement('strong');
  const value = document.createElement('div');

  heading.textContent = 'Feature class';
  value.textContent = className;
  container.append(heading, value);

  return container;
}
