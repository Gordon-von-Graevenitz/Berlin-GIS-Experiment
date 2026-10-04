import * as maplibregl from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { mapConfig } from '../config/map-config';

maplibregl.setWorkerUrl(workerUrl);

export function createMap(): maplibregl.Map {
  const map = new maplibregl.Map({
    container: mapConfig.containerId,
    style: mapConfig.basemapStyleUrl,
    center: mapConfig.initialCenter,
    zoom: mapConfig.initialZoom,
    attributionControl: false,
  });

  map.addControl(new maplibregl.NavigationControl(), 'bottom-right');
  map.addControl(
    new maplibregl.AttributionControl({ compact: true }),
    'bottom-right',
  );

  return map;
}

export function waitForMapStyle(map: maplibregl.Map): Promise<void> {
  if (map.isStyleLoaded()) return Promise.resolve();

  return new Promise((resolve) => {
    map.once('load', () => resolve());
  });
}
