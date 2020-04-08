function getAutoComplete(searchFor) {
  if (searchFor === "") {
    closeAutoComplete();
    return;
  }
  let cities = [];
  let request = new XMLHttpRequest();

  request.open(
    "GET",
    `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${APIKey}&q=${searchFor}`,
    true
  );

  request.onreadystatechange = () => {
    let data = JSON.parse(request.response);
    data.forEach((elCity) => {
      cities.push({ name: elCity.LocalizedName, key: elCity.Key });
    });

    showAutoComplete(cities, searchFor);
  };

  request.send();
}

function showAutoComplete(cities, searchFor) {
  let elAutoCompleteWraper = document.querySelector(".auto-complete-wraper");
  let elCloseSearchBtn = document.querySelector(".close-search-btn");

  elAutoCompleteWraper.classList.remove("hide");
  elCloseSearchBtn.classList.remove("hide");
  elAutoCompleteWraper.innerHTML = "";
  cities.forEach((city) => {
    let elAutoCompleteOption = document.createElement("h4");
    elAutoCompleteOption.classList.add("auto-complete-option", "bg-muted");
    elAutoCompleteOption.innerText = city.name;
    elAutoCompleteOption.onclick = () => selectCity(city);
    elAutoCompleteWraper.appendChild(elAutoCompleteOption);
  });
}

function closeAutoComplete() {
  let elAutoCompleteWraper = document.querySelector(".auto-complete-wraper");
  let elCloseSearchBtn = document.querySelector(".close-search-btn");

  elAutoCompleteWraper.classList.add("hide");
  elCloseSearchBtn.classList.add("hide");
}

async function selectCity(city) {
  let elAutoCompleteWraper = document.querySelector(".auto-complete-wraper");
  elAutoCompleteWraper.classList.add("hide");

  let coords = await getLocByName(city.name);
  panTo(coords.lat, coords.lng);
  getCurrWeather(city);
  getForecast(city);
}
