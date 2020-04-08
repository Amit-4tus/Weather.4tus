"use strict";

let map;

// These coordinates point to central Tel Aviv
function initMap(lat = 32.09, lng = 34.78) {
  return _connectGoogleApi().then(() => {
    map = new google.maps.Map(document.querySelector(".my-map"), {
      center: { lat, lng },
      zoom: 15,
    });
  });
}

function panTo(lat, lng) {
  let laLatLng = new google.maps.LatLng(lat, lng);
  map.panTo(laLatLng);
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = "AIzaSyBdEkNKWT49kGiJWK_jI5dBcnU__vXostg";
  let elGoogleApi = document.createElement("script");
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject("Google script failed to load");
  });
}

function getLocByName(name) {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    let res;

    request.open(
      "GET",
      `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyCw8djD1Hif_FagSIHuaLdcPXB-KgWGiiw`,
      true
    );

    request.onreadystatechange = () => {
      res = JSON.parse(request.response);
      if (res.status === "OK") resolve(res.results[0].geometry.location);
    };
    request.send();
  });
}
