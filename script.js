const cityInput = document.querySelector("#cityInput");
const submitBtn = document.querySelector("#submitBtn");
const city = document.querySelector("#city");
const desc = document.querySelector("#desc");
const temp = document.querySelector("#temp");
const wind = document.querySelector("#wind");
let lat, lon;

const API_KEY = "30ea1430f9530845f4ff44a7d1420907";

function convertToCelsius(val) {
  return (val - 273).toFixed(2);
}

submitBtn.addEventListener("click", function () {
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      cityInput.value +
      "&limit=1&appid=" +
      API_KEY
  )
    .then((data) => {
      lat = data["lat"];
      lon = data["lon"];
    })
    .catch((err) => console.log(err));

  fetch(
    "https://api.openweathermap.org/data/3.0/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      API_KEY
  )
    .then((data) => {
      var cityName = data["name"];
      var cityDesc = data["weather"]["0"]["description"];
      var cityTemp = data["main"]["temp"];
      var cityWind = data["wind"]["speed"];

      city.innerHTML = `Weather in <span>${cityName}</span>`;
      temp.innerHTML = `Temperature: <span>${convertToCelsius(
        cityTemp
      )} C</span>`;
      desc.innerHTML = `Condition: <span>${cityDesc}</span>`;
      wind.innerHTML = `Wind Speed: <span>${cityWind} km/h</span>`;
    })
    .catch((err) => console.log(err));
});
