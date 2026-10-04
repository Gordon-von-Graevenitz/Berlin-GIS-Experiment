export interface AppElements {
  readonly historicalMapOpacity: HTMLInputElement;
  readonly historicalMapOpacityValue: HTMLOutputElement;
  readonly historicalMapToggle: HTMLInputElement;
  readonly historicalVectorsToggle: HTMLInputElement;
  readonly legend: HTMLUListElement;
  readonly status: HTMLDivElement;
}

export function getAppElements(): AppElements {
  return {
    historicalMapOpacity: getRequiredElement<HTMLInputElement>('#map-opacity'),
    historicalMapOpacityValue:
      getRequiredElement<HTMLOutputElement>('#opacity-value'),
    historicalMapToggle: getRequiredElement<HTMLInputElement>('#map-toggle'),
    historicalVectorsToggle:
      getRequiredElement<HTMLInputElement>('#vectors-toggle'),
    legend: getRequiredElement<HTMLUListElement>('#legend-items'),
    status: getRequiredElement<HTMLDivElement>('#status'),
  };
}

function getRequiredElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Required UI element is missing: ${selector}`);
  return element;
}
