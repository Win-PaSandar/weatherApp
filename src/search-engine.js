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

/*function retrievePosition(position) {
  let lat = position.coordinates.latitude;
  let lon = position.coordinates.longitude;
  let apiKey = "1acbot392864443e815e617a5f81390f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}*/

function showWeather(response) {
  let cityName = document.querySelector("#current-city");
  cityName = response.data.city;
  document.querySelector("#current-city").innerHTML = cityName;
  fahrenheitTemperature = response.data.temperature.current;
  document.querySelector("#temperature").innerHTML = Math.round(
    fahrenheitTemperature
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

  getForecast(response.data.coordinates);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="forecast-box">
          <div class="forecast-day">${formatDay(forecastDay.time)}</div>
            <img
              src= "https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png" 
              alt=""              
              class="forecast-icon"
            />
          <div>
          <span class="forecast-max">${Math.round(
            forecastDay.temperature.maximum
          )}&deg</span>
          <span class="forecast-min">${Math.round(
            forecastDay.temperature.minimum
          )}&deg</span>
          </div>
        </div>
      </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1acbot392864443e815e617a5f81390f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  document.querySelector("#current-city").innerHTML = cityInput;
  searchCity(cityInput);
}

function searchCity(city) {
  let apiKey = "1acbot392864443e815e617a5f81390f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

/*function returnCity(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}*/

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let fahrenheitTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCity("Yangon");
