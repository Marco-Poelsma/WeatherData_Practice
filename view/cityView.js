/**
 * Handles all DOM operations related to city selection and the Details card.
 */
export class CityView {
  constructor() {
    this._citySelect    = document.querySelector("#destination-dropdown");
    this._detailsHeader = document.querySelector("#selected-city");
    this._countrySpan   = document.querySelector(".selected-country");
    this._countryIdSpan = document.querySelector(".selected-country-id");
    this._cityDesc      = document.querySelector("#city-description");
    this._dataPills     = document.querySelector(".data-pills");
  }

  /**
   * Populates the city <select> with options.
   * @param {Array<{ value: string, label: string }>} options
   */
  renderCityOptions(options) {
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.innerHTML = "Choose a Destination";
    this._citySelect.appendChild(placeholder);

    for (const { value, label } of options) {
      const opt = document.createElement("option");
      opt.value = value;
      opt.innerHTML = label;
      this._citySelect.appendChild(opt);
    }
  }

  /**
   * Updates the Details card with the selected city's data.
   * @param {Object} city
   */
  renderCityDetails(city) {
    this._detailsHeader.innerHTML = city.name;
    this._countrySpan.innerHTML   = city.country;
    this._countryIdSpan.innerHTML = city.country_abb;
    this._cityDesc.innerHTML      = city.description;

    this._upsertCurrencyPill(city);
  }

  /**
   * Adds or replaces the currency data-pill.
   * @param {Object} city
   */
  _upsertCurrencyPill(city) {
    const existing = this._dataPills.querySelector("#selected-currency");
    if (existing) existing.remove();

    const pill = document.createElement("div");
    pill.className = "data-pill";
    pill.id        = "selected-currency";

    const symbol = document.createElement("span");
    symbol.className = "selected-currency-symbol";
    symbol.innerHTML = city.currency_symbol;

    const name = document.createElement("span");
    name.className = "selected-currency-name";
    name.innerHTML = city.currency;

    pill.appendChild(symbol);
    pill.appendChild(name);
    this._dataPills.appendChild(pill);
  }

  /**
   * Registers a handler for when the user picks a city.
   * @param {Function} cb  Receives the selected option value (normalised city id).
   */
  onCitySelected(cb) {
    this._citySelect.addEventListener("change", function () {
      cb(this.value);
    });
  }
}