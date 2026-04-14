import { windDegToCompass, windDegToArrow } from "../weatherCardUtilFunctions.js";

/**
 * Handles all DOM operations for the Weather section.
 */
export class WeatherView {
  constructor() {
    this._section    = document.querySelector("#weather");
    this._miniPill   = document.querySelector("#selected-temp");
  }

  /**
   * Updates the mini weather pill inside the Details card.
   * @param {{ weatherIcon: Object, temperature: number }} summary
   */
  renderMiniPill({ weatherIcon, temperature }) {
    this._miniPill.innerHTML = `
      <span class="selected-weather-icon">${weatherIcon.icon}</span>
      <span class="selected-temp-value">${temperature}°C</span>
    `;
  }

  /**
   * Shows an error state in the mini pill.
   */
  renderMiniPillError() {
    this._miniPill.innerHTML = "<span>Weather data unavailable</span>";
  }

  /**
   * Renders the full weather card, replacing any previously rendered one.
   * @param {{ temperature, windspeed, winddirection, weatherIcon, rainProb }} summary
   */
  renderWeatherCard({ temperature, windspeed, winddirection, weatherIcon, rainProb }) {
    // Clear previous card content, keeping the section element itself
    this._section.innerHTML = "";

    const h2 = document.createElement("h2");
    h2.id = "selected-city-weather";
    this._section.appendChild(h2);

    const card = document.createElement("div");
    card.classList.add("weather-card");
    this._section.appendChild(card);

    // --- Main row: icon + temp + condition ---
    const main = document.createElement("div");
    main.classList.add("weather-main");
    card.appendChild(main);

    const bigIcon = document.createElement("span");
    bigIcon.classList.add("weather-big-icon", "maple-icon");
    bigIcon.innerHTML = weatherIcon.icon;
    main.appendChild(bigIcon);

    const tempBlock = document.createElement("div");
    tempBlock.classList.add("weather-temp-block");
    main.appendChild(tempBlock);

    const tempSpan = document.createElement("span");
    tempSpan.classList.add("weather-temp");
    tempSpan.innerHTML = temperature;
    tempBlock.appendChild(tempSpan);

    const unitSpan = document.createElement("span");
    unitSpan.classList.add("weather-unit");
    unitSpan.innerHTML = "°C";
    tempSpan.appendChild(unitSpan);

    const condition = document.createElement("span");
    condition.classList.add("weather-condition");
    condition.innerHTML = weatherIcon.label;
    tempBlock.appendChild(condition);

    // --- Stats row ---
    const stats = document.createElement("div");
    stats.classList.add("weather-stats");
    card.appendChild(stats);

    stats.appendChild(this._buildStat("\ue318", "Rain Probability", rainProb !== null ? `${rainProb}%` : "N/A"));
    stats.appendChild(this._buildStat(windDegToArrow(winddirection), "Wind", `${windspeed} km/h ${windDegToCompass(winddirection)}`));
  }

  /**
   * Builds a single stat tile element.
   * @param {string} iconGlyph
   * @param {string} label
   * @param {string} value
   * @returns {HTMLElement}
   */
  _buildStat(iconGlyph, label, value) {
    const stat = document.createElement("div");
    stat.classList.add("weather-stat");

    const icon = document.createElement("span");
    icon.classList.add("weather-stat-icon", "maple-icon");
    icon.innerHTML = iconGlyph;
    stat.appendChild(icon);

    const detail = document.createElement("div");
    detail.classList.add("weather-stat-detail");
    stat.appendChild(detail);

    const labelEl = document.createElement("span");
    labelEl.classList.add("weather-stat-label");
    labelEl.innerHTML = label;
    detail.appendChild(labelEl);

    const valueEl = document.createElement("span");
    valueEl.classList.add("weather-stat-value");
    valueEl.innerHTML = value;
    detail.appendChild(valueEl);

    return stat;
  }
}