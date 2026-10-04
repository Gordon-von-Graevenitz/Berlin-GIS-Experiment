import type { Map } from 'maplibre-gl';
import { mapIds } from '../config/map-config';

export function setHistoricalFeaturesVisible(map: Map, visible: boolean): void {
  const visibility = visible ? 'visible' : 'none';
  map.setLayoutProperty(
    mapIds.layers.historicalFeaturesFill,
    'visibility',
    visibility,
  );
  map.setLayoutProperty(
    mapIds.layers.historicalFeaturesOutline,
    'visibility',
    visibility,
  );
}

export function setHistoricalMapVisible(map: Map, visible: boolean): void {
  map.setLayoutProperty(
    mapIds.layers.historicalMap,
    'visibility',
    visible ? 'visible' : 'none',
  );
}

export function setHistoricalMapOpacity(map: Map, opacity: number): void {
  map.setPaintProperty(mapIds.layers.historicalMap, 'raster-opacity', opacity);
}
