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
  
  const header = document.createElement("h2");
  section.appendChild(header);
  
  const weatherCard = document.createElement("div");
  weatherCard.classList.add("weather-card");
  header.append(weatherCard);

  const weatherMain = document.createElement("div");
  weatherMain.classList.add("weather-main");
  weatherCard.appendChild(weatherMain);

  const bigWeatherIcon = document.createELement("span");
  bigWeatherIcon.classList.add("weather-big-icon");
  bigWeatherIcon.classList.add("maple-icon");
  bigWeatherIcon.innerHTML = weatherIcon.icon;
  weatherMain.appendChild(bigWeatherIcon);

  const weatherTempBlock = document.createElement("div");
  weatherTempBlock.classList.add("weather-temp-block");
  bigWeatherIcon.append(weatherTempBlock);

  const weatherTemp = document.createElement("span");
  weatherTemp.classList.add("weather-temp");
  weatherTemp.innerHTML = temperature;
  weatherTempBlock.appendChild(weatherTemp);

  const tempUnit = document.createElement("span");
  tempUnit.classList.add("weather-unit");
  tempUnit.innerHTML = "ºC";
  weatherTemp.appendChild(tempUnit);

  const weatherCondition = document.createElement("span");
  weatherCondition.classList.add("weather-condition");
  weatherCondition.innerHTML = weatherIcon.icon;
  weatherTemp.append(weatherCondition);

  const weatherStats = document.createElement("div");
  weatherStats.classList.add("weather-stats");
  weatherMain.append(weatherStats);

  const rainProbability = document.createElement("div");
  rainProbability.classList.add("eather-stat");
  weatherStats.appendChild(rainProbability);

  const rainProbabilityIcon = document.createElement("span");
  rainProbabilityIcon.classList.add("eather-stat-icon");
  rainProbabilityIcon.classList.add("maple-icon");
  rainProbabilityIcon.innerHTML = rainProb !== null ? rainProb + "%" : "N/A"; // lambda function. Displays rain probability if it exists within the response JSON.
  rainProbabilityIcon

  section.innerHTML = `
    <h2 id="selected-city-weather">Weather</h2>
    <div class="weather-card">
      <div class="weather-main">
        <span class="weather-big-icon maple-icon">${weatherIcon.icon}</span>
        <div class="weather-temp-block">
          <span class="weather-temp">${temperature}<span class="weather-unit">°C</span></span>
          <span class="weather-condition">${weatherIcon.label}</span>
        </div>
      </div>
      <div class="weather-stats">
        <div class="weather-stat">
          <span class="weather-stat-icon maple-icon">\ue318</span>
          <div class="weather-stat-detail">
            <span class="weather-stat-label">Rain Probabilty</span>
            <span class="weather-stat-value">${rainProb !== null ? rainProb + "%" : "N/A"}</span>
          </div>
        </div>
        <div class="weather-stat">
          <span class="weather-stat-icon maple-icon">${windDegToArrow(winddirection)}</span>
          <div class="weather-stat-detail">
            <span class="weather-stat-label">Wind</span>
            <span class="weather-stat-value">${windspeed} km/h ${windDegToCompass(winddirection)}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}