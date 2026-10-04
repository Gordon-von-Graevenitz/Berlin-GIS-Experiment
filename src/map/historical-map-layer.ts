import type { LngLatBoundsLike, Map } from 'maplibre-gl';
import { mapConfig, mapIds } from '../config/map-config';

type Coordinate = [longitude: number, latitude: number];

interface WmsImageOptions {
  readonly endpoint: string;
  readonly layer: string;
  readonly width: number;
  readonly height: number;
  readonly bounds: LngLatBoundsLike;
}

export function addHistoricalMapLayer(map: Map): void {
  const imageUrl = buildWmsImageUrl({
    endpoint: mapConfig.historicalMap.endpoint,
    layer: mapConfig.historicalMap.layer,
    width: mapConfig.historicalMap.imageWidth,
    height: mapConfig.historicalMap.imageHeight,
    bounds: mapConfig.dataBounds,
  });

  map.addSource(mapIds.sources.historicalMap, {
    type: 'image',
    url: imageUrl,
    coordinates: getImageCoordinates(mapConfig.dataBounds),
  });

  map.addLayer({
    id: mapIds.layers.historicalMap,
    type: 'raster',
    source: mapIds.sources.historicalMap,
    paint: {
      'raster-opacity': mapConfig.historicalMapOpacity,
      'raster-fade-duration': 0,
    },
  });
}

export function buildWmsImageUrl(options: WmsImageOptions): string {
  const [southWest, northEast] = normalizeBounds(options.bounds);
  const url = new URL(options.endpoint);

  url.search = new URLSearchParams({
    service: 'WMS',
    request: 'GetMap',
    version: '1.3.0',
    layers: options.layer,
    styles: '',
    format: 'image/png',
    transparent: 'true',
    crs: 'CRS:84',
    bbox: `${southWest[0]},${southWest[1]},${northEast[0]},${northEast[1]}`,
    width: String(options.width),
    height: String(options.height),
  }).toString();

  return url.toString();
}

export function getImageCoordinates(
  bounds: LngLatBoundsLike,
): [Coordinate, Coordinate, Coordinate, Coordinate] {
  const [southWest, northEast] = normalizeBounds(bounds);

  return [
    [southWest[0], northEast[1]],
    [northEast[0], northEast[1]],
    [northEast[0], southWest[1]],
    [southWest[0], southWest[1]],
  ];
}

function normalizeBounds(bounds: LngLatBoundsLike): [Coordinate, Coordinate] {
  if (!Array.isArray(bounds) || bounds.length !== 2) {
    throw new Error('Expected southwest and northeast map bounds.');
  }

  const [southWest, northEast] = bounds;
  if (!Array.isArray(southWest) || !Array.isArray(northEast)) {
    throw new Error('Expected coordinate arrays for map bounds.');
  }

  return [southWest as Coordinate, northEast as Coordinate];
}
