import type { FeatureClassStyle } from '../domain/feature-classes';

export function renderLegend(
  container: HTMLUListElement,
  featureClasses: readonly FeatureClassStyle[],
): void {
  const fragment = document.createDocumentFragment();

  for (const featureClass of featureClasses) {
    const item = document.createElement('li');
    const swatch = document.createElement('span');

    swatch.className = 'swatch';
    swatch.style.setProperty('--swatch-color', featureClass.color);
    swatch.setAttribute('aria-hidden', 'true');
    item.append(swatch, document.createTextNode(featureClass.label));
    fragment.append(item);
  }

  container.replaceChildren(fragment);
}
