import { normaliseString } from "./cityModel.js";

const BASE_CURRENCY_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

/**
 * Builds the currency API URL for a given currency code.
 * @param {string} currencyCode  e.g. "EUR"
 * @returns {string}
 */
export function buildCurrencyUrl(currencyCode) {
  return `${BASE_CURRENCY_URL}${normaliseString(currencyCode)}.json`;
}

/**
 * Fetches conversion rates for a given base currency.
 * @param {string} currencyCode
 * @returns {Promise<Object>}
 */
export async function fetchConversionRates(currencyCode) {
  const url = buildCurrencyUrl(currencyCode);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Currency API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

/**
 * Extracts the unique currency entries from the cities dataset.
 * @param {Array} cities
 * @returns {Array<{ currency: string, currency_abb: string }>}
 */
export function getUniqueCurrencies(cities) {
  const seen = new Set();
  return cities.reduce((acc, c) => {
    if (!seen.has(c.currency_abb)) {
      seen.add(c.currency_abb);
      acc.push({ currency: c.currency, currency_abb: c.currency_abb });
    }
    return acc;
  }, []);
}

/**
 * Converts an amount between two currencies using pre-fetched rates.
 * @param {Object} rates  The full rates object from fetchConversionRates
 * @param {string} from   Base currency code (lowercase key in rates)
 * @param {string} to     Target currency code
 * @param {number} amount
 * @returns {string}  Formatted to 2 decimal places
 */
export function convertAmount(rates, from, to, amount) {
  const rate = rates[from][to];
  return (Math.round(amount * rate * 100) / 100).toFixed(2);
}