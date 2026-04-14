/**
 * Handles all DOM operations for the Currency Converter section.
 */
export class CurrencyView {
  constructor() {
    this._selectOne = document.querySelector("#from-currency");
    this._selectTwo = document.querySelector("#to-currency");
    this._inputOne  = document.querySelector("#converter-quantity");
    this._inputTwo  = document.querySelector("#converter-quantity-2");
  }

  /**
   * Populates both currency <select> elements.
   * @param {Array<{ currency: string, currency_abb: string }>} currencies
   */
  renderCurrencyOptions(currencies) {
    for (const { currency, currency_abb } of currencies) {
      const label = `${currency} (${currency_abb})`;

      const optOne = document.createElement("option");
      optOne.value    = currency_abb;
      optOne.innerHTML = label;
      this._selectOne.appendChild(optOne);

      const optTwo = document.createElement("option");
      optTwo.value    = currency_abb;
      optTwo.innerHTML = label;
      this._selectTwo.appendChild(optTwo);
    }
  }

  /**
   * Updates the output input that was NOT edited by the user.
   * @param {string} result     Converted amount string.
   * @param {"from"|"to"} direction  Which input triggered the conversion.
   */
  renderConversionResult(result, direction) {
    if (direction === "from") {
      this._inputTwo.value = result;
    } else {
      this._inputOne.value = result;
    }
  }

  /**
   * Registers handlers for when the user types in either input.
   * @param {Function} cb  Receives { fromCode, toCode, amount, direction }.
   */
  onConversionInput(cb) {
    this._inputOne.addEventListener("input", () => {
      cb({
        fromCode:  this._selectOne.value,
        toCode:    this._selectTwo.value,
        amount:    parseFloat(this._inputOne.value) || 0,
        direction: "from",
      });
    });

    this._inputTwo.addEventListener("input", () => {
      cb({
        fromCode:  this._selectTwo.value,
        toCode:    this._selectOne.value,
        amount:    parseFloat(this._inputTwo.value) || 0,
        direction: "to",
      });
    });
  }
}