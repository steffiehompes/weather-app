// Date and time input
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let currentMonth = months[now.getMonth()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let displayDay = document.querySelector(".display-day");
displayDay.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}`;
let displayTime = document.querySelector(".display-time");
displayTime.innerHTML = `${currentHour}:${currentMinutes}`;

//°C and °F conversion
function unitConversion(event) {
  event.preventDefault();
  let tempToday = document.querySelector(".temp-today");
  if (tempF.innerHTML === "°F") {
    tempToday.innerHTML = Math.round((tempToday.innerHTML * 9) / 5 + 32);
    tempF.innerHTML = "°C";
    tempC.innerHTML = "°F";
  } else {
    tempToday.innerHTML = Math.round(((tempToday.innerHTML - 32) * 5) / 9);
    tempF.innerHTML = "°F";
    tempC.innerHTML = "°C";
  }
}
let tempC = document.querySelector(".temp-C a");
tempC.addEventListener("click", unitConversion);
let tempF = document.querySelector(".temp-F a");
tempF.addEventListener("click", unitConversion);

function showPlaceInput(event) {
  event.preventDefault();
  let placeInput = document.querySelector(".place-input");
  let cityHeader = document.querySelector("#input-city-header");
  cityHeader.innerHTML = `${placeInput.value}`;
  searchCity(placeInput.value);
}
function searchCity(city) {
  let apiKey = "f27803b22003bacb0df7459dd6dc6bd9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showConditions);
}
let placeForm = document.querySelector("#place-form");
placeForm.addEventListener("submit", showPlaceInput);

//Display weather conditions
function showConditions(response) {
  let cityHeader = document.querySelector("#input-city-header");
  cityHeader.innerHTML = response.data.name;
  let temperatureElement = document.querySelector(".temp-today");
  let currentTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${currentTemperature}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

//Geolocation
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f27803b22003bacb0df7459dd6dc6bd9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showConditions);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector(".location-button");
locationButton.addEventListener("click", getCurrentPosition);
