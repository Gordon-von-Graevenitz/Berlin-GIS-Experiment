import type { Map } from 'maplibre-gl';
import {
  setHistoricalFeaturesVisible,
  setHistoricalMapOpacity,
  setHistoricalMapVisible,
} from '../map/layer-state';
import type { AppElements } from './elements';

export function bindLayerControls(map: Map, elements: AppElements): void {
  elements.historicalVectorsToggle.addEventListener('change', () => {
    setHistoricalFeaturesVisible(map, elements.historicalVectorsToggle.checked);
  });

  elements.historicalMapToggle.addEventListener('change', () => {
    setHistoricalMapVisible(map, elements.historicalMapToggle.checked);
  });

  elements.historicalMapOpacity.addEventListener('input', () => {
    const percentage = Number(elements.historicalMapOpacity.value);
    elements.historicalMapOpacityValue.value = `${percentage}%`;
    setHistoricalMapOpacity(map, percentage / 100);
  });
}
