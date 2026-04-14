import {
  fetchConversionRates,
  getUniqueCurrencies,
  convertAmount,
} from "../model/currencyModel.js";
import { normaliseString } from "../model/cityModel.js";

/**
 * Manages currency conversion state and notifies the View of results.
 */
export class CurrencyViewModel {
  /**
   * @param {Array} cities  The full cities array from CityViewModel.
   */
  constructor(cities) {
    this.currencies = getUniqueCurrencies(cities);
    /** @type {Function[]} */
    this._onConversionCallbacks = [];
  }

  /**
   * Returns the unique currencies for populating selects.
   * @returns {Array<{ currency: string, currency_abb: string }>}
   */
  getCurrencies() {
    return this.currencies;
  }

  /**
   * Converts fromAmount from fromCode to toCode and notifies subscribers.
   * @param {string} fromCode   e.g. "EUR"
   * @param {string} toCode     e.g. "USD"
   * @param {number} fromAmount
   * @param {"from"|"to"} direction  Which input was edited.
   */
  async convert(fromCode, toCode, fromAmount, direction) {
    const normFrom = normaliseString(fromCode);
    const normTo = normaliseString(toCode);
    const rates = await fetchConversionRates(normFrom);
    const result = convertAmount(rates, normFrom, normTo, fromAmount);
    this._onConversionCallbacks.forEach((cb) => cb({ result, direction }));
  }

  /**
   * @param {Function} cb  Receives { result: string, direction: "from"|"to" }.
   */
  onConversion(cb) {
    this._onConversionCallbacks.push(cb);
  }
}