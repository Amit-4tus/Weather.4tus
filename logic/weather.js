"use strict";

let tempUnitType = "Metric";
let tempUnitSign = "C";
let isMetric = true;
let strVIcon = '<img src="./images/v-icon.png" class="icon">';
let strXIcon = '<img src="./images/x-icon.png" class="icon">';
let strSunIcon = '<img src="./images/sun-icon.png" class="icon">';
let strMoonIcon = '<img src="./images/moon-icon.png" class="icon">';

function getCurrWeather(city) {
  let request = new XMLHttpRequest();

  request.open(
    "GET",
    `http://dataservice.accuweather.com/currentconditions/v1/${city.key}?apikey=${APIKey}`,
    true
  );

  request.onreadystatechange = () => {
    let data = JSON.parse(request.response)[0];
    showCurrWeather(city.name, city.key, data);
  };
  request.send();
}

function getForecast(city) {
  let request = new XMLHttpRequest();

  request.open(
    "GET",
    `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.key}?apikey=${APIKey}&metric=${isMetric}`,
    true
  );

  request.onreadystatechange = () => {
    let data = JSON.parse(request.response);
    showForecast(data);
  };
  request.send();
}

function showCurrWeather(cityName, cityKey, currWeatherData) {
  let elCurrWeatherSection = document.querySelector(".curr-weather-sect");
  elCurrWeatherSection.innerHTML = "<h3>Current Weather:</h3>";

  let strCurrWeatherTable = `<div class="curr-weather-details">
                                <span>City Name:</span>
                                <span class="curr-city-name" id="${cityKey}">${cityName}</span>
                                <span>Temperature:</span>
                                <span>${
                                  currWeatherData.Temperature[tempUnitType]
                                    .Value
                                }${tempUnitSign}</span>
                                <span>Weather:</span>
                                <span>${currWeatherData.WeatherText}</span>
                                <span>Precipitation:</span>
                                <span>${
                                  currWeatherData.HasPrecipitation
                                    ? strVIcon
                                    : strXIcon
                                }</span>
                                <span>Day-Time:</span>
                                <span>${
                                  currWeatherData.IsDayTime
                                    ? strSunIcon
                                    : strMoonIcon
                                }</span>
                             </div>`;

  elCurrWeatherSection.innerHTML += strCurrWeatherTable;
  elCurrWeatherSection.innerHTML += `<div class="fav-indicator hide"><img src="images/favorite-icon.png" class="fav-indicator-img"><span>Favorite</span></div>`;
  checkIfFav(cityKey);
}

function showForecast(forecastData) {
  let elForecastSect = document.querySelector(".forecast-sect");
  elForecastSect.innerHTML = `<h3>5 Day Forecast:</h3>
                              <h4>${forecastData.Headline.Text}</h4>`;

  let strForecastTable = `<div class="forecast-details">
                                <span class="today">Today:</span>
                                <span class="today">
                                ${strSunIcon}: ${forecastData.DailyForecasts[0].Day.IconPhrase} - ${forecastData.DailyForecasts[0].Temperature.Maximum.Value}${tempUnitSign}
                                <br>
                                ${strMoonIcon}: ${forecastData.DailyForecasts[0].Night.IconPhrase} - ${forecastData.DailyForecasts[0].Temperature.Minimum.Value}${tempUnitSign}
                                </span>
                                <span class="tomorrow">Tomorrow:</span>
                                <span class="tomorrow">
                                ${strSunIcon}: ${forecastData.DailyForecasts[1].Day.IconPhrase} - ${forecastData.DailyForecasts[1].Temperature.Maximum.Value}${tempUnitSign}
                                <br>
                                ${strMoonIcon}: ${forecastData.DailyForecasts[1].Night.IconPhrase} - ${forecastData.DailyForecasts[1].Temperature.Minimum.Value}${tempUnitSign}
                                </span>
                                <span class="2-days-from-today">2 Days From Today:</span>
                                <span class="2-days-from-today">
                                ${strSunIcon}: ${forecastData.DailyForecasts[2].Day.IconPhrase} - ${forecastData.DailyForecasts[2].Temperature.Maximum.Value}${tempUnitSign}
                                <br>
                                ${strMoonIcon}: ${forecastData.DailyForecasts[2].Night.IconPhrase} - ${forecastData.DailyForecasts[2].Temperature.Minimum.Value}${tempUnitSign}
                                </span>
                                <span class="3-days-from-today">3 Days From Today:</span>
                                <span class="3-days-from-today">
                                ${strSunIcon}: ${forecastData.DailyForecasts[3].Day.IconPhrase} - ${forecastData.DailyForecasts[3].Temperature.Maximum.Value}${tempUnitSign}
                                <br>
                                ${strMoonIcon}: ${forecastData.DailyForecasts[3].Night.IconPhrase} - ${forecastData.DailyForecasts[3].Temperature.Minimum.Value}${tempUnitSign}
                                </span>
                                <span class="4-days-from-today">4 Days From Today:</span>
                                <span class="4-days-from-today">
                                  ${strSunIcon}: ${forecastData.DailyForecasts[4].Day.IconPhrase} - ${forecastData.DailyForecasts[4].Temperature.Maximum.Value}${tempUnitSign}
                                  <br>
                                  ${strMoonIcon}: ${forecastData.DailyForecasts[4].Night.IconPhrase} - ${forecastData.DailyForecasts[4].Temperature.Minimum.Value}${tempUnitSign}
                                </span>
                          </div>`;

  elForecastSect.innerHTML += strForecastTable;
}

let APIKey = "0okQ0Dbs0lzojM6DfLacA3XbZ8aHRGWk";
