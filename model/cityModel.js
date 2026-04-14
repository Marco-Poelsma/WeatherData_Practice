const CITIES_URL = "http://127.0.0.1:5500/api/data/cities.json";

/**
 * Fetches the full list of cities from the local API.
 * @returns {Promise<Array>}
 */
export async function fetchCities() {
  const response = await fetch(CITIES_URL);
  if (!response.ok) {
    throw new Error(`Cities API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

/**
 * Finds a city object by its normalised name id.
 * @param {Array} cities
 * @param {string} cityId  e.g. "new-york"
 * @returns {Object|undefined}
 */
export function findCityById(cities, cityId) {
  return cities.find((c) => normaliseString(c.name) === cityId);
}

/**
 * Converts a display string to a URL-safe id.
 * @param {string} s
 * @returns {string}
 */
export function normaliseString(s) {
  return s.toLowerCase().replaceAll(" ", "-");
}