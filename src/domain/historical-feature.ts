export interface HistoricalFeatureProperties {
  readonly klassenname: string;
}

export interface HistoricalPolygonGeometry {
  readonly type: 'Polygon';
  readonly coordinates: readonly (readonly (readonly number[])[])[];
}

export interface HistoricalFeature {
  readonly type: 'Feature';
  readonly geometry: HistoricalPolygonGeometry;
  readonly properties: HistoricalFeatureProperties;
}

export interface HistoricalFeatureCollection {
  readonly type: 'FeatureCollection';
  readonly features: readonly HistoricalFeature[];
}

export function isHistoricalFeatureCollection(
  value: unknown,
): value is HistoricalFeatureCollection {
  if (!isRecord(value) || value.type !== 'FeatureCollection') return false;
  if (!Array.isArray(value.features)) return false;

  return value.features.every(
    (feature) =>
      isRecord(feature) &&
      feature.type === 'Feature' &&
      isRecord(feature.geometry) &&
      feature.geometry.type === 'Polygon' &&
      Array.isArray(feature.geometry.coordinates) &&
      isRecord(feature.properties) &&
      typeof feature.properties.klassenname === 'string',
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
