import type { LngLatBoundsLike, LngLatLike } from 'maplibre-gl';

export const mapIds = {
  sources: {
    historicalFeatures: 'berlin-1900',
    historicalMap: 'berlin-1910',
  },
  layers: {
    historicalFeaturesFill: 'berlin-1900-fill',
    historicalFeaturesOutline: 'berlin-1900-outline',
    historicalMap: 'berlin-1910-raster',
  },
} as const;

export const mapConfig = {
  containerId: 'map',
  basemapStyleUrl:
    'https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_gry.json',
  initialCenter: [13.4051, 52.5165] as LngLatLike,
  initialZoom: 14,
  dataBounds: [
    [13.3916548186, 52.5077109807],
    [13.4185805928, 52.5251941575],
  ] as LngLatBoundsLike,
  fitBoundsPadding: 72,
  historicalFeaturesUrl: '/berlin-1900-features.geojson',
  historicalMapOpacity: 0.55,
  historicalMap: {
    endpoint: 'https://gdi.berlin.de/services/wms/staedtebauliche_entwicklung',
    layer: 'berlin_1910',
    imageWidth: 1600,
    imageHeight: 1696,
  },
} as const;
