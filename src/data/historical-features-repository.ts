import {
  isHistoricalFeatureCollection,
  type HistoricalFeatureCollection,
} from '../domain/historical-feature';

export async function loadHistoricalFeatures(
  url: string,
  fetcher: typeof fetch = fetch,
): Promise<HistoricalFeatureCollection> {
  const response = await fetcher(url);

  if (!response.ok) {
    throw new Error(
      `Historical feature request failed: ${response.status} ${response.statusText}`,
    );
  }

  const payload: unknown = await response.json();

  if (!isHistoricalFeatureCollection(payload)) {
    throw new Error('Historical feature data has an unexpected schema.');
  }

  return payload;
}
