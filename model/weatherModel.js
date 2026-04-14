import { WMO_CODES } from "../wmo-codes.js";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Builds the Open-Meteo request URL.
 * @param {number} lat
 * @param {number} lon
 * @returns {string}
 */
export function buildWeatherUrl(lat, lon) {
  return `${BASE_URL}?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=precipitation_probability&forecast_days=1&wind_speed_unit=kmh`;
}

/**
 * Fetches raw weather data from Open-Meteo.
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<Object>}
 */
export async function fetchWeatherData(lat, lon) {
  const url = buildWeatherUrl(lat, lon);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

/**
 * Resolves the icon and label for a WMO weather code.
 * @param {number} code
 * @returns {{ label: string, icon: string }}
 */
export function getWeatherIcon(code) {
  return WMO_CODES[code] ?? { label: "Unknown conditions", icon: "\uE355" };
}

/**
 * Extracts a structured weather summary from the raw API response.
 * @param {Object} data  Raw Open-Meteo response
 * @returns {{ temperature, windspeed, winddirection, weathercode, weatherIcon, rainProb }}
 */
export function parseWeatherData(data) {
  const { temperature, windspeed, winddirection, weathercode, time } =
    data.current_weather;

  const weatherIcon = getWeatherIcon(weathercode);

  let rainProb = null;
  if (data.hourly?.time && data.hourly?.precipitation_probability) {
    const currentHour = new Date(time).getHours();
    rainProb =
      data.hourly.precipitation_probability[currentHour] ??
      data.hourly.precipitation_probability[0];
  }

  return { temperature, windspeed, winddirection, weathercode, weatherIcon, rainProb };
}