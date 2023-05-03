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
  cityName = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.temperature.minimum
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.temperature.maximum
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
}

function searchCity(city) {
  let apiKey = "1acbot392864443e815e617a5f81390f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
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
  let lat = position.coordinates.latitude;
  let lon = position.coordinates.longitude;
}
navigator.geolocation.getCurrentPosition(retrievePosition);

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1acbot392864443e815e617a5f81390f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
