import { describe, expect, it } from 'vitest';
import { isHistoricalFeatureCollection } from './historical-feature';

describe('historical feature schema', () => {
  it('accepts the expected polygon feature collection', () => {
    expect(
      isHistoricalFeatureCollection({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { klassenname: 'Gewässer' },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [13.4, 52.5],
                  [13.41, 52.5],
                  [13.4, 52.5],
                ],
              ],
            },
          },
        ],
      }),
    ).toBe(true);
  });

  it('rejects features without a class name', () => {
    expect(
      isHistoricalFeatureCollection({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: { type: 'Polygon', coordinates: [] },
          },
        ],
      }),
    ).toBe(false);
  });
});
