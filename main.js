const citiesResponse = await fetch(
  "http://127.0.0.1:5500/api/data/cities.json",
);
const citiesData = await citiesResponse.json();
const citySelect = document.querySelector("#destination-dropdown");
const currencySelect1 = document.querySelector("#from-currency");
const currencySelect2 = document.querySelector("#to-currency");
import { WMO_CODES } from "./wmo-codes.js";

/**
 * Function to load all city names on the JSON for the select.
 */
function loadCitiesForSelect() {
  let null_opt = document.createElement("option"); // Default null option
  null_opt.value = "";
  null_opt.innerHTML = "Choose a Destination";
  citySelect.appendChild(null_opt);
  for (const c of citiesData) {
    //Iterate over cities in dataset.
    const opt = document.createElement("option");
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
function stringNormaliser(s) {
  s = s.toLowerCase().replaceAll(" ", "-");
  return s;
}

/**
 * Returns the details of a city.
 * @param {String} cityId The city's id.
 * @returns The selected city.
 */
function fetchCityDetails(cityId) {
  const selectedCity = citiesData.find(
    (element) => stringNormaliser(element.name) == cityId,
  ); //Find which element in our JSON matches the requested city's ID.
  console.table(selectedCity);
  return selectedCity;
}

console.log("cities data: ", citiesData);
loadCitiesForSelect();

citySelect.addEventListener("change", async function (e) {
  //Update selected city on change to the value of the select.
  const c = fetchCityDetails(this.value);

  const detailsHeader = document.querySelector("#selected-city");
  detailsHeader.innerHTML = c.name;

  const selectedCountry = document.querySelector(".selected-country");
  const selectedCountryId = document.querySelector(".selected-country-id");
  selectedCountry.innerHTML = c.country;
  selectedCountryId.innerHTML = c.country_abb;

  const selectedCityDesc = document.querySelector("#city-description");
  const selectedCityDescText = document.createElement("p");
  selectedCityDesc.innerHTML = c.description;
  selectedCityDesc.appendChild(selectedCityDescText);
  
  const dataPills = document.querySelector(".data-pills");

  const selectedCurrency = dataPills.querySelector("#selected-currency");

  if (selectedCurrency){
    selectedCurrency.remove();
  }
    const currencyData = document.createElement("div");
    currencyData.className="data-pill"
    currencyData.id="selected-currency"
    
    const currencySymbol = document.createElement("span");
    currencySymbol.className="selected-currency-symbol";
    
    const currency = document.createElement("span");
    currency.className="selected-currency-name";
    currencySymbol.innerHTML = c.currency_symbol;
    currency.innerHTML = c.currency;
    currencyData.appendChild(currencySymbol);
    currencyData.appendChild(currency);
    dataPills.appendChild(currencyData);
    
    console.log(dataPills);
    console.log(currencyData);
    console.log(currencySymbol);
    console.log(currency);


  try {
    const weatherData = await fetchWeather(c.latitude, c.longitude);
    await processWeatherData(weatherData, false);
  } catch (error) {
    console.error("Error fetching weather:", error);
    const weatherPill = document.querySelector("#selected-temp");
    weatherPill.innerHTML = "<span>Weather data unavailable</span>";
  }

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
function buildWeatherUrl(lat, lon) {
  const BASE_URL = "https://api.open-meteo.com/v1/forecast";
  return `${BASE_URL}?latitude=${lat}&longitude=${lon}&current_weather=true`;
}

/**
 * Fetches weather data from Open-Meteo for given coordinates.
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<Object>}
 */
async function fetchWeather(lat, lon) {
  const url = buildWeatherUrl(lat, lon);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function processWeatherData(data, extendedSize) {
  const { temperature, wind, weathercode, time, is_day } = data.current_weather;
  console.table(data.current_weather);
  const weatherIcon = getWeatherIcon(weathercode);

  if (!extendedSize) {
    const pill = document.querySelector("#selected-temp");
    pill.innerHTML = `
        <span class="selected-weather-icon">${weatherIcon.icon}</span>
        <span class="selected-temp-value">${temperature}°C</span>
        `;
  }
}

const navBar = document.querySelector("nav");

navBar.addEventListener("click", (event) => {
    const focusedElement = event.target.closest("span");
    if (!focusedElement) return;
    for (const el of navBar.querySelectorAll("span")) {
        el.setAttribute('data-active', false);
    }
    focusedElement.setAttribute('data-active', true);
});


/**
 * Function to load all currency codes on the JSON for the select.
 */
function loadCurrenciesForSelect() {
  const loadedCurrencies = [];

  for (const c of citiesData) {
    if (!loadedCurrencies.includes(c.currency_abb)) {
      const opt = document.createElement("option");
      opt.value = c.currency_abb;
      console.log(opt.value)
      opt.innerHTML = `${c.currency} (${c.currency_abb})`;
      
      currencySelect1.appendChild(opt);

      // Re-using the other variable doesn't work, so I will just make another opt for the other select
      // This is not optimised for memory usage, but it'll work for now.
      // MARK: TODO: Optimise memory usage if you have time later on.
      const optTwo = document.createElement("option");
      optTwo.value = c.currency_abb;
      console.log(optTwo.value);
      optTwo.innerHTML = `${c.currency} (${c.currency_abb})`;

      currencySelect2.appendChild(optTwo);

      loadedCurrencies.push(c.currency_abb);
    }
  }
}

loadCurrenciesForSelect();


/**
 * 
 * @param {String} currencyCode Value of the first select on the currency converter.
 * @returns URL to appropiate endpoint for the selected currency's conversion rates.
 */
function buildCurrencyUrl(currencyCode) {
  const BASE_CURRENCY_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
  const normalisedCurrencyCode = stringNormaliser(currencyCode);
  return `${BASE_CURRENCY_URL}${normalisedCurrencyCode}.json`;
}

async function fetchCurrencyConversionRates(currencyCode) {
  const url = buildCurrencyUrl(currencyCode);
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Currency API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

const currencyInputOne = document.querySelector("#converter-quantity");
const currencyInputTwo = document.querySelector("#converter-quantity-2")

const currencySelectOne = document.querySelector("#from-currency");
const currencySelectTwo = document.querySelector("#to-currency");
let fromCurrency;
let toCurrency;

currencyInputOne.addEventListener("input", async function() {
  fromCurrency = stringNormaliser(currencySelectOne.value);
  toCurrency = stringNormaliser(currencySelectTwo.value);

  const conversionRates = await fetchCurrencyConversionRates(fromCurrency);

  const targetRate = conversionRates[fromCurrency][toCurrency];
  console.log(targetRate);


  currencyInputTwo.value = (Math.round(this.value * targetRate * 100) / 100).toFixed(2);
});

currencyInputTwo.addEventListener("input", async function() {
  fromCurrency = stringNormaliser(currencySelectTwo.value);
  toCurrency = stringNormaliser(currencySelectOne.value);

  const conversionRates = await fetchCurrencyConversionRates(fromCurrency);

  const targetRate = conversionRates[fromCurrency][toCurrency];
  console.log(targetRate);


  currencyInputOne.value = (Math.round(this.value * targetRate * 100) / 100).toFixed(2)
})