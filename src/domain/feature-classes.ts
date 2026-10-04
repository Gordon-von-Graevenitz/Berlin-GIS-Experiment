import type { ExpressionSpecification } from 'maplibre-gl';

export interface FeatureClassStyle {
  readonly color: string;
  readonly label: string;
  readonly value: string;
}

export const featureClasses: readonly FeatureClassStyle[] = [
  {
    label: 'Streets and squares',
    value: 'Straßen und Plätze',
    color: '#c99f68',
  },
  {
    label: 'Commercial and residential buildings',
    value: 'gewerbliche und private Gebäude, Wohnbebauung',
    color: '#9f4f3f',
  },
  {
    label: 'Public buildings',
    value: 'öffentliche Gebäude',
    color: '#703f72',
  },
  {
    label: 'Railway facilities',
    value: 'Bahnanlagen',
    color: '#3f4852',
  },
  { label: 'Green spaces', value: 'Grünanlagen', color: '#56865a' },
  { label: 'Water', value: 'Gewässer', color: '#4b87a6' },
] as const;

const fallbackColor = '#8b8178';

export function createFeatureClassColorExpression(): ExpressionSpecification {
  return [
    'match',
    ['get', 'klassenname'],
    ...featureClasses.flatMap(({ value, color }) => [value, color]),
    fallbackColor,
  ] as unknown as ExpressionSpecification;
}
