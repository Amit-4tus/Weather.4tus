"use strict";

function init() {
  // Rendering
  let elMainPage = document.querySelector(".main-page");
  let elFavsPage = document.querySelector(".favs-page");

  let elFavoritesHeader = document.createElement("h3");
  elFavoritesHeader.classList.add("favs-header");
  elFavoritesHeader.innerText = "Favorites";
  elFavsPage.appendChild(elFavoritesHeader);

  const elNoFavs = document.createElement("h3");
  elNoFavs.classList.add("no-favs", "hide");
  elNoFavs.innerText = "You Have No Favorite Cities...";
  elFavsPage.appendChild(elNoFavs);

  let elFavsWraper = document.createElement("div");
  elFavsWraper.classList.add("favs-wraper");
  elFavsPage.appendChild(elFavsWraper);

  let elSearchSection = document.createElement("section");
  elSearchSection.classList.add("search-sect");
  elMainPage.appendChild(elSearchSection);

  let elSearchHeader = document.createElement("h3");
  elSearchHeader.classList.add("search-header");
  elSearchHeader.innerText = "Search for a city:";
  elSearchSection.appendChild(elSearchHeader);

  let elCitySearch = document.createElement("div");
  elCitySearch.classList.add("city-search", "bg-muted");
  elSearchSection.appendChild(elCitySearch);

  let strSearchInput = `<input type='text' placeholder='e.g. Tel Aviv' oninput="getAutoComplete(this.value)" class='city-search-input'>`;
  elCitySearch.innerHTML += strSearchInput;

  let elAutoCompleteWraper = document.createElement("div");
  elAutoCompleteWraper.classList.add(
    "auto-complete-wraper",
    "bg-muted",
    "hide"
  );
  elCitySearch.appendChild(elAutoCompleteWraper);

  let elCloseSearchBtn = document.createElement("button");
  elCloseSearchBtn.classList.add("close-search-btn", "btn", "bg-muted", "hide");
  elCloseSearchBtn.innerText = "X";
  elCloseSearchBtn.onclick = (elAutoCompleteWraper) => closeAutoComplete();
  elCitySearch.appendChild(elCloseSearchBtn);

  let elResultsWraper = document.createElement("div");
  elResultsWraper.classList.add("results-wraper");
  elMainPage.appendChild(elResultsWraper);

  let elCurrWeatherSection = document.createElement("section");
  elCurrWeatherSection.classList.add("curr-weather-sect", "bg-muted");
  elResultsWraper.appendChild(elCurrWeatherSection);

  let elWeatherForecastSection = document.createElement("section");
  elWeatherForecastSection.classList.add("forecast-sect", "bg-muted");
  elResultsWraper.appendChild(elWeatherForecastSection);

  let elMap = document.createElement("div");
  elMap.classList.add("my-map");
  elResultsWraper.appendChild(elMap);

  let elFavIndicator = document.createElement("div");
  elFavIndicator.classList.add("fav-indicator", "hide");
  elCurrWeatherSection.appendChild(elFavIndicator);

  let elfavIndcImg = document.createElement("img");
  elfavIndcImg.classList.add("fav-indicator-img");
  elfavIndcImg.src = "images/favorite-icon.png";
  elFavIndicator.appendChild(elfavIndcImg);
  elFavIndicator.innerHTML += "<span>Favorite</span>";

  initMap();
  getCurrWeather({ name: "Tel Aviv", key: "215854" });
  getForecast({ name: "Tel Aviv", key: "215854" });
}

function navigate(destination) {
  let elMainPage = document.querySelector(".main-page");
  let elFavsPage = document.querySelector(".favs-page");

  if (destination === "favorites") {
    elMainPage.classList.add("hide");
    elFavsPage.classList.remove("hide");
    showFavs();
  } else if (destination === "main") {
    let currCityKey = +document.querySelector(".curr-city-name").id;
    elMainPage.classList.remove("hide");
    elFavsPage.classList.add("hide");
    checkIfFav(currCityKey);
  }
}

function toggleLighting() {
  const elBody = document.querySelector("body");
  elBody.classList.toggle("dark");
  const elHeader = document.querySelector("header");
  elHeader.classList.toggle("dark");
}
