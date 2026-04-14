/**
 * Returns a compass direction label from degrees.
 * @param {number} deg Wind direction in degrees.
 * @returns {string}
 */
export function windDegToCompass(deg) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

/**
 * Returns a Nerd Font arrow glyph for a wind direction in degrees.
 * @param {number} deg
 * @returns {string}
 */
export function windDegToArrow(deg) {
  // nf-weather-direction_* glyphs, 8 compass points
  // These are the directional arrow glyphs from nf-weather set
  const arrows = {
    N:  "\ue35a",
    NE: "\ue359",
    E:  "\ue35b",
    SE: "\ue356",
    S:  "\ue357",
    SW: "\ue355",
    W:  "\ue354",
    NW: "\ue358",
  };
  const dir = windDegToCompass(deg);
  return arrows[dir] ?? "\uE35C";
}

/**
 * Renders the full weather card into #weather section.
 */
export function renderWeatherCard({ temperature, windspeed, winddirection, weathercode, weatherIcon, rainProb }) {
  const section = document.querySelector("#weather");
  

  const h2 = document.createElement("h2");
  h2.id = "selected-city-weather";
  section.appendChild(h2);

  const weatherCard = document.createElement("div");
  weatherCard.classList.add("weather-card");
  section.appendChild(weatherCard);

  const weatherMain = document.createElement("div");
  weatherMain.classList.add("weather-main");
  weatherCard.appendChild(weatherMain);

  const bigWeatherIcon = document.createElement("span");
  bigWeatherIcon.classList.add("weather-big-icon", "maple-icon");
  bigWeatherIcon.innerHTML = weatherIcon.icon;
  weatherMain.appendChild(bigWeatherIcon);

  const weatherTempBlock = document.createElement("div");
  weatherTempBlock.classList.add("weather-temp-block");
  weatherMain.appendChild(weatherTempBlock);

  const weatherTemp = document.createElement("span");
  weatherTemp.classList.add("weather-temp");
  weatherTemp.innerHTML = temperature;
  weatherTempBlock.appendChild(weatherTemp);

  const tempUnit = document.createElement("span");
  tempUnit.classList.add("weather-unit");
  tempUnit.innerHTML = "°C";
  weatherTemp.appendChild(tempUnit);

  const weatherCondition = document.createElement("span");
  weatherCondition.classList.add("weather-condition");
  weatherCondition.innerHTML = weatherIcon.label;
  weatherTempBlock.appendChild(weatherCondition);

  const weatherStats = document.createElement("div");
  weatherStats.classList.add("weather-stats");
  weatherCard.appendChild(weatherStats);

  // Rain stat
  const rainStat = document.createElement("div");
  rainStat.classList.add("weather-stat");
  weatherStats.appendChild(rainStat);

  const rainIcon = document.createElement("span");
  rainIcon.classList.add("weather-stat-icon", "maple-icon");
  rainIcon.innerHTML = "\ue318";
  rainStat.appendChild(rainIcon);

  const rainDetail = document.createElement("div");
  rainDetail.classList.add("weather-stat-detail");
  rainStat.appendChild(rainDetail);

  const rainLabel = document.createElement("span");
  rainLabel.classList.add("weather-stat-label");
  rainLabel.innerHTML = "Rain Probability";
  rainDetail.appendChild(rainLabel);

  const rainValue = document.createElement("span");
  rainValue.classList.add("weather-stat-value");
  rainValue.innerHTML = rainProb !== null ? rainProb + "%" : "N/A";
  rainDetail.appendChild(rainValue);

  // Wind stat
  const windStat = document.createElement("div");
  windStat.classList.add("weather-stat");
  weatherStats.appendChild(windStat);

  const windIcon = document.createElement("span");
  windIcon.classList.add("weather-stat-icon", "maple-icon");
  windIcon.innerHTML = windDegToArrow(winddirection);
  windStat.appendChild(windIcon);

  const windDetail = document.createElement("div");
  windDetail.classList.add("weather-stat-detail");
  windStat.appendChild(windDetail);

  const windLabel = document.createElement("span");
  windLabel.classList.add("weather-stat-label");
  windLabel.innerHTML = "Wind";
  windDetail.appendChild(windLabel);

  const windValue = document.createElement("span");
  windValue.classList.add("weather-stat-value");
  windValue.innerHTML = `${windspeed} km/h ${windDegToCompass(winddirection)}`;
  windDetail.appendChild(windValue);

}