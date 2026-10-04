import { mapConfig } from '../config/map-config';
import { loadHistoricalFeatures } from '../data/historical-features-repository';
import { featureClasses } from '../domain/feature-classes';
import { createMap, waitForMapStyle } from '../map/create-map';
import {
  addHistoricalFeatureLayers,
  registerHistoricalFeatureInteractions,
} from '../map/historical-feature-layers';
import { addHistoricalMapLayer } from '../map/historical-map-layer';
import { bindLayerControls } from '../ui/bind-layer-controls';
import { getAppElements } from '../ui/elements';
import { renderLegend } from '../ui/render-legend';

export async function startApplication(): Promise<void> {
  const elements = getAppElements();
  renderLegend(elements.legend, featureClasses);

  try {
    const map = createMap();
    map.on('error', ({ error }) => console.error(error));

    const [features] = await Promise.all([
      loadHistoricalFeatures(mapConfig.historicalFeaturesUrl),
      waitForMapStyle(map),
    ]);

    addHistoricalMapLayer(map);
    addHistoricalFeatureLayers(map, features);
    registerHistoricalFeatureInteractions(map);
    bindLayerControls(map, elements);

    map.fitBounds(mapConfig.dataBounds, {
      padding: mapConfig.fitBoundsPadding,
      duration: 0,
    });

    elements.status.hidden = true;
  } catch (error) {
    console.error('Unable to start the map application.', error);
    elements.status.textContent =
      'The historical map could not be loaded. Check the browser console for details.';
    elements.status.classList.add('status--error');
    elements.status.hidden = false;
  }
}
