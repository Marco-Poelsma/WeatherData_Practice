import { fetchCities, findCityById, normaliseString } from "../model/cityModel.js";

/**
 * Holds city data and the currently selected city.
 * Exposes methods the View and other ViewModels can call.
 */
export class CityViewModel {
  constructor() {
    /** @type {Array} */
    this.cities = [];
    /** @type {Object|null} */
    this.selectedCity = null;
    /** @type {Function[]} */
    this._onCityChangeCallbacks = [];
  }

  /**
   * Loads cities from the API. Must be called before anything else.
   */
  async init() {
    this.cities = await fetchCities();
  }

  /**
   * Selects a city by its normalised id and notifies subscribers.
   * @param {string} cityId
   */
  selectCity(cityId) {
    this.selectedCity = findCityById(this.cities, cityId);
    if (this.selectedCity) {
      this._onCityChangeCallbacks.forEach((cb) => cb(this.selectedCity));
    }
  }

  /**
   * Registers a callback to run whenever the selected city changes.
   * @param {Function} cb  Receives the city object.
   */
  onCityChange(cb) {
    this._onCityChangeCallbacks.push(cb);
  }

  /**
   * Returns options data for populating a <select>.
   * @returns {Array<{ value: string, label: string }>}
   */
  getCityOptions() {
    return this.cities.map((c) => ({
      value: normaliseString(c.name),
      label: c.name,
    }));
  }
}