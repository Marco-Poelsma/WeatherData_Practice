import { fetchWeatherData, parseWeatherData } from "../model/weatherModel.js";

/**
 * Manages weather fetching for a given city and notifies the View.
 */
export class WeatherViewModel {
  constructor() {
    /** @type {Object|null} Parsed weather summary */
    this.weatherSummary = null;
    /** @type {Function[]} */
    this._onWeatherLoadedCallbacks = [];
    /** @type {Function[]} */
    this._onWeatherErrorCallbacks = [];
  }

  /**
   * Fetches and parses weather for the given coordinates,
   * then notifies subscribers.
   * @param {number} lat
   * @param {number} lon
   */
  async loadWeather(lat, lon) {
    try {
      const raw = await fetchWeatherData(lat, lon);
      this.weatherSummary = parseWeatherData(raw);
      this._onWeatherLoadedCallbacks.forEach((cb) => cb(this.weatherSummary));
    } catch (error) {
      console.error("WeatherViewModel:", error);
      this._onWeatherErrorCallbacks.forEach((cb) => cb(error));
    }
  }

  /**
   * @param {Function} cb  Receives the parsed weather summary object.
   */
  onWeatherLoaded(cb) {
    this._onWeatherLoadedCallbacks.push(cb);
  }

  /**
   * @param {Function} cb  Receives the Error object.
   */
  onWeatherError(cb) {
    this._onWeatherErrorCallbacks.push(cb);
  }
}