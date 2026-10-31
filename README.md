# Berlin, Then & Now

An intentionally small experiment in geospatial software engineering.
The prototype compares modern central Berlin with an official historical map
from 1910 and vectorized features from approximately 1900.

## Run locally

```powershell
npm install
npm run dev
```

Open <http://127.0.0.1:5173/>.

Create a production build with:

```powershell
npm run build
```

Run all local quality checks with:

```powershell
npm run check
```

## Architecture

The application uses small modules with explicit responsibilities:

- `src/main.ts` is the composition entry point.
- `src/app/` coordinates startup and error handling.
- `src/config/` contains external endpoints, initial view settings, and stable
  source/layer identifiers.
- `src/domain/` defines the historical feature schema and presentation classes.
- `src/data/` owns loading and runtime validation of external data.
- `src/map/` owns MapLibre creation, layer composition, interactions, and layer
  state changes.
- `src/ui/` owns DOM lookup, legend rendering, and control bindings.

Map modules do not query the DOM, and UI modules do not know MapLibre layer
identifiers. The application module composes those boundaries.

## Data

- `data/berlin-1900-features.geojson`: 9,522 polygons exported from the Berlin
  Open Data WFS `berlin1900:b_berlin1900_flaechen`, transformed to CRS84.
- The 1910 map is requested at runtime from the official Berlin
  `staedtebauliche_entwicklung` WMS as a bounded CRS84 image.
- The present-day basemap is the official basemap.de gray vector style.

Historical datasets use the German Data Licence Zero 2.0. Source attribution
is shown in the map.

## Current scope

- Toggle the circa-1900 vector features.
- Toggle the 1910 historical map and change its opacity.
- Click a vector polygon to inspect its feature class.
- Compare the historical layers with the modern basemap.

The experiment deliberately covers only the approximately 2 × 2 km extent of
the vector dataset. Authentication, 3D, a backend, PostGIS, and a continuous
timeline are out of scope for this first version.
