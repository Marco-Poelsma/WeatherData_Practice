 /**
 * Enum that lists all weather codes that can be provided by the Weather API.
 */
export const WMO_CODES = {
  //  WMO   label                    nf-weather glyph      icon name
  0: { label: "Clear sky", icon: "\uE30D" }, // nf-weather-day_sunny
  1: { label: "Mainly clear", icon: "\uE302" }, // nf-weather-day_cloudy
  2: { label: "Partly cloudy", icon: "\uE302" }, // nf-weather-day_cloudy
  3: { label: "Overcast", icon: "\uE313" }, // nf-weather-cloudy
  45: { label: "Foggy", icon: "\uE314" }, // nf-weather-fog
  48: { label: "Icy fog", icon: "\uE314" }, // nf-weather-fog
  51: { label: "Light drizzle", icon: "\uE31C" }, // nf-weather-sprinkle
  53: { label: "Moderate drizzle", icon: "\uE31C" }, // nf-weather-sprinkle
  55: { label: "Dense drizzle", icon: "\uE319" }, // nf-weather-rain
  61: { label: "Slight rain", icon: "\uE30B" }, // nf-weather-day_sprinkle
  63: { label: "Moderate rain", icon: "\uE308" }, // nf-weather-day_rain
  65: { label: "Heavy rain", icon: "\uE319" }, // nf-weather-rain
  71: { label: "Slight snow", icon: "\uE30A" }, // nf-weather-day_snow
  73: { label: "Moderate snow", icon: "\uE31B" }, // nf-weather-snow
  75: { label: "Heavy snow", icon: "\uE31B" }, // nf-weather-snow
  77: { label: "Snow grains", icon: "\uE31B" }, // nf-weather-snow
  80: { label: "Slight showers", icon: "\uE309" }, // nf-weather-day_showers
  81: { label: "Moderate showers", icon: "\uE31A" }, // nf-weather-showers
  82: { label: "Heavy showers", icon: "\uE31A" }, // nf-weather-showers
  85: { label: "Slight snow shower", icon: "\uE30A" }, // nf-weather-day_snow
  86: { label: "Heavy snow shower", icon: "\uE31B" }, // nf-weather-snow
  95: { label: "Thunderstorm", icon: "\uE31E" }, // nf-weather-thunderstorm
  96: { label: "Thunderstorm + hail", icon: "\uE31E" }, // nf-weather-thunderstorm
  99: { label: "Thunderstorm + hail", icon: "\uE31E" }, // nf-weather-thunderstorm
};