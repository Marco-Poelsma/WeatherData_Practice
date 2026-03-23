const citiesResponse = await fetch("http://127.0.0.1:5500/api/data/cities.json");
const citiesData = await citiesResponse.json();
const citySelect = document.querySelector("#destination-dropdown");

/**
 * Enum that lists all weather codes that can be provided by the Weather API.
 */
const WMO_CODES = {
    //  WMO   label                    nf-weather glyph      icon name
    0:  { label: "Clear sky",          icon: "\uE30D" }, // nf-weather-day_sunny
    1:  { label: "Mainly clear",       icon: "\uE302" }, // nf-weather-day_cloudy
    2:  { label: "Partly cloudy",      icon: "\uE302" }, // nf-weather-day_cloudy
    3:  { label: "Overcast",           icon: "\uE313" }, // nf-weather-cloudy
    45: { label: "Foggy",              icon: "\uE314" }, // nf-weather-fog
    48: { label: "Icy fog",            icon: "\uE314" }, // nf-weather-fog
    51: { label: "Light drizzle",      icon: "\uE31C" }, // nf-weather-sprinkle
    53: { label: "Moderate drizzle",   icon: "\uE31C" }, // nf-weather-sprinkle
    55: { label: "Dense drizzle",      icon: "\uE319" }, // nf-weather-rain
    61: { label: "Slight rain",        icon: "\uE30B" }, // nf-weather-day_sprinkle
    63: { label: "Moderate rain",      icon: "\uE308" }, // nf-weather-day_rain
    65: { label: "Heavy rain",         icon: "\uE319" }, // nf-weather-rain
    71: { label: "Slight snow",        icon: "\uE30A" }, // nf-weather-day_snow
    73: { label: "Moderate snow",      icon: "\uE31B" }, // nf-weather-snow
    75: { label: "Heavy snow",         icon: "\uE31B" }, // nf-weather-snow
    77: { label: "Snow grains",        icon: "\uE31B" }, // nf-weather-snow
    80: { label: "Slight showers",     icon: "\uE309" }, // nf-weather-day_showers
    81: { label: "Moderate showers",   icon: "\uE31A" }, // nf-weather-showers
    82: { label: "Heavy showers",      icon: "\uE31A" }, // nf-weather-showers
    85: { label: "Slight snow shower", icon: "\uE30A" }, // nf-weather-day_snow
    86: { label: "Heavy snow shower",  icon: "\uE31B" }, // nf-weather-snow
    95: { label: "Thunderstorm",       icon: "\uE31E" }, // nf-weather-thunderstorm
    96: { label: "Thunderstorm + hail",icon: "\uE31E" }, // nf-weather-thunderstorm
    99: { label: "Thunderstorm + hail",icon: "\uE31E" }, // nf-weather-thunderstorm
};

/**
 * Function to load all city names on the JSON for the select.
 */
function loadCitiesForSelect() {
    let null_opt = document.createElement('option'); // Default null option
    null_opt.value = "";
    null_opt.innerHTML = "Choose a Destination";
    citySelect.appendChild(null_opt);
    for (const c of citiesData) { //Iterate over cities in dataset.
        let opt = document.createElement('option');
        opt.value = stringNormaliser(c.name);
        opt.innerHTML = c.name;
        citySelect.appendChild(opt);
    }
}

/**
 * Function to normalise a string.
 * @param {String} s The string to normalise.
 * @returns {String} The normalised string.
 */
function stringNormaliser (s) {
    s = s.toLowerCase();
    s = s.replace('/ /g', '-');
    return s;
}

/**
 * Returns the details of a city.
 * @param {String} cityId The city's id.
 * @returns The selected city.
 */
function fetchCityDetails(cityId) {
    const selectedCity = citiesData.find((element) => stringNormaliser(element.name) == cityId); //Find which element in our JSON matches the requested city's ID.
    console.log(selectedCity);
    return selectedCity;
}

console.log("cities data: " , citiesData);
loadCitiesForSelect();

citySelect.addEventListener("change", function(e) { //Update selected city on change to the value of the select.
    const c = fetchCityDetails(this.value);
    const detailsHeader = document.querySelector("#selected-city");
    detailsHeader.innerHTML = c.name;
    const selectedCountry = document.querySelector(".selected-country");
    const selectedCountryId = document.querySelector(".selected-country-id");
    selectedCountry.innerHTML = c.country;
    selectedCountryId.innerHTML = c.country_abb;
});

function getWeatherIcon(code) {
    return WMO_CODES[code] ?? { label: "Uknown conditions", icon: "\uE355" };
}

/**
 * Builds the Open-Meteo API URL from latitude and longitude.
 * @param {number} lat
 * @param {number} lon
 * @returns {string}
 */
function buildUrl(lat, lon) {
    const BASE_URL = "https://api.open-meteo.com/v1/forecast";
    return `${BASE_URL}?latitude=${lat}&longitude=${lon}&current_weather=true`;
}

/**
 * Fetches weather data from Open-Meteo for given coordinates.
 * @param {Number} lat The target latitude.
 * @param {Number} lon The target longitude.
 */
async function fetchWeather(lat, lon) {
    const url = buildUrl(lat, lon);
    const response = await fetch(url);
    const data = response.json();

    if (!response.ok) {
        throw new Error(`API error: ${response.status}: ${response.statusText}`);
    }

    const { temp, windspeed, weathercode, time, is_day } = data;
    console.log(data)

}

fetchWeather(40, 40);
