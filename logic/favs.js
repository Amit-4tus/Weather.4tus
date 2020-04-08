"use strict";

function showFavs() {
  const elFavsWraper = document.querySelector(".favs-wraper");
  elFavsWraper.innerHTML = `<div class="favorites-table-header"><span>City Name:</span><span>City Key:</span><span>Remove:</span></div>`;
  const strFavs = localStorage.getItem("favCities");
  let favCities = strFavs !== null ? JSON.parse(strFavs) : [];

  favCities.forEach((city) => {
    let elFavCity = document.createElement("div");
    elFavCity.classList.add("fav-city");
    elFavCity.innerHTML = `<button class="fav-city-name btn" onclick="goToFavCity('${city.name}', ${city.key})">${city.name}</button><span class="fav-city-key">${city.key}</span><button onclick="removeFromFavs(${city.key})" title="remove from favorites" class="remove-from-favs-btn btn"><img class="dis-fav-img" src="images/dis-favorite-icon.png"></button>`;
    elFavsWraper.appendChild(elFavCity);
  });

  const elNoFavs = document.querySelector(".no-favs");
  if (favCities.length === 0) {
    elNoFavs.classList.remove("hide");
  } else {
    elNoFavs.classList.add("hide");
  }

  const elAddFavBtn = document.querySelector(".fav-btn");
  elAddFavBtn.classList.add("hide");
}

function goToFavCity(cityName, cityKey) {
  let city = { name: cityName, key: cityKey };
  getCurrWeather(city);
  getForecast(city);
  navigate("main");
}

function addToFavs() {
  let elCurrCity = document.querySelector(".curr-city-name");
  const currCityKey = +elCurrCity.id;
  const currCityName = elCurrCity.innerText;
  const currCity = { name: currCityName, key: currCityKey };

  let strFavCities = localStorage.getItem("favCities");
  let favCities = strFavCities !== null ? JSON.parse(strFavCities) : [];

  favCities.push(currCity);
  localStorage.setItem("favCities", JSON.stringify(favCities));

  hideFavBtn();
  checkIfFav(currCityKey);
}

function removeFromFavs(cityKey) {
  let oldFavCities = JSON.parse(localStorage.getItem("favCities"));
  let newFavCities = [];

  oldFavCities.forEach((city) => {
    if (city.key !== cityKey) newFavCities.push(city);
  });

  localStorage.setItem("favCities", JSON.stringify(newFavCities));
  showFavs();
}

function hideFavBtn() {
  let elFavBtn = document.querySelector(".fav-btn");
  elFavBtn.classList.add("hide");
}

function checkIfFav(cityKey) {
  let strFavCities = localStorage.getItem("favCities");
  let favCities = strFavCities !== null ? JSON.parse(strFavCities) : [];

  let isFav = false;
  favCities.forEach((city) => {
    if (city.key === +cityKey) isFav = true;
    return;
  });

  let elFavBtn = document.querySelector(".fav-btn");
  let elFavIndicator = document.querySelector(".fav-indicator");

  if (isFav) {
    elFavBtn.classList.add("hide");
    elFavIndicator.classList.remove("hide");
  } else {
    elFavBtn.classList.remove("hide");
    elFavIndicator.classList.add("hide");
  }
}
