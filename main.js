// MARK: Viewmodel imports
import { CityViewModel }     from "./viewmodel/cityViewModel.js";
import { WeatherViewModel }  from "./viewmodel/weatherViewModel.js";
import { CurrencyViewModel } from "./viewmodel/currencyViewModel.js";
import { NavViewModel }      from "./viewmodel/navViewModel.js";

// MARK: View imports

import { CityView }     from "./view/cityView.js";
import { WeatherView }  from "./view/weatherView.js";
import { CurrencyView } from "./view/currencyView.js";
import { NavView }      from "./view/navView.js";

// MARK: Bootstrap

// Instantiate ViewModels
const cityVM     = new CityViewModel();
const weatherVM  = new WeatherViewModel();
const navVM      = new NavViewModel();

// Load city data before anything else
await cityVM.init();

// Instantiate CurrencyViewModel after cities are loaded (needs the cities list)
const currencyVM = new CurrencyViewModel(cityVM.cities);

// Instantiate Views
const cityView     = new CityView();
const weatherView  = new WeatherView();
const currencyView = new CurrencyView();
const navView      = new NavView();

// MARK: City Details

cityView.renderCityOptions(cityVM.getCityOptions());

cityView.onCitySelected((cityId) => {
  cityVM.selectCity(cityId);
});

cityVM.onCityChange((city) => {
  cityView.renderCityDetails(city);
  weatherVM.loadWeather(city.latitude, city.longitude);
});

// MARK: Weather

weatherVM.onWeatherLoaded((summary) => {
  weatherView.renderMiniPill(summary);
  weatherView.renderWeatherCard(summary);
});

weatherVM.onWeatherError(() => {
  weatherView.renderMiniPillError();
});

// MARK: Currency

currencyView.renderCurrencyOptions(currencyVM.getCurrencies());

currencyView.onConversionInput(({ fromCode, toCode, amount, direction }) => {
  currencyVM.convert(fromCode, toCode, amount, direction);
});

currencyVM.onConversion(({ result, direction }) => {
  currencyView.renderConversionResult(result, direction);
});

// MARK: Navigation

navView.onTabClick((tab) => navVM.selectTab(tab));

navVM.onTabChange((tab) => navView.showSection(tab));

navVM.selectTab("About");