function formatDate(date) {
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

  let currentMonth = months[date.getMonth()];
  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();

  let todayDate = `${currentDay}, ${currentMonth} ${currentDate} `;
  return todayDate;
}

function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let todayTime = `${hours}:${minutes}`;
  return todayTime;
}

let dateElement = document.querySelector("#current-date");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);

let timeElement = document.querySelector("#current-time");
let currentTime = new Date();
timeElement.innerHTML = formatTime(currentTime);

function showWeather(response) {
  let cityName = document.querySelector("h1");
  cityName = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#precipitation").innerHTML = Math.round(
    response.data.precipitation
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  document.querySelector("#current-city").innerHTML = cityInput;
  searchCity(cityInput);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
}
navigator.geolocation.getCurrentPosition(retrievePosition);

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
