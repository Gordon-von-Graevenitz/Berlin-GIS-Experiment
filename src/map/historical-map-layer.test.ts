import { describe, expect, it } from 'vitest';
import { buildWmsImageUrl, getImageCoordinates } from './historical-map-layer';

const bounds: [[number, number], [number, number]] = [
  [13.39, 52.5],
  [13.42, 52.53],
];

describe('historical map WMS', () => {
  it('builds a CRS84 GetMap request', () => {
    const url = new URL(
      buildWmsImageUrl({
        endpoint: 'https://example.test/wms',
        layer: 'berlin_1910',
        width: 800,
        height: 900,
        bounds,
      }),
    );

    expect(url.searchParams.get('request')).toBe('GetMap');
    expect(url.searchParams.get('crs')).toBe('CRS:84');
    expect(url.searchParams.get('layers')).toBe('berlin_1910');
    expect(url.searchParams.get('bbox')).toBe('13.39,52.5,13.42,52.53');
    expect(url.searchParams.get('width')).toBe('800');
    expect(url.searchParams.get('height')).toBe('900');
  });

  it('orders image corners clockwise from the northwest', () => {
    expect(getImageCoordinates(bounds)).toEqual([
      [13.39, 52.53],
      [13.42, 52.53],
      [13.42, 52.5],
      [13.39, 52.5],
    ]);
  });
});
