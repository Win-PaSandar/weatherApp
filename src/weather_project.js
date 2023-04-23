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

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#current-city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 27;
}

function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 82;
}

let dateElement = document.querySelector("#current-date");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);

let timeElement = document.querySelector("#current-time");
let currentTime = new Date();
timeElement.innerHTML = formatTime(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);
