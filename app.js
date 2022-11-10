let searchval = document.querySelector("#search-value");
let searchbtn = document.querySelector("#search-button");
let timeel = document.querySelector(".timeel");
let dateel = document.querySelector(".dateel");
let mainday = document.querySelector(".display_main_day");
let otherday = document.querySelector(".displayforecast7");
let main1 = document.querySelector(".display_main_day");
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const months = [
  "January",
  "Feburary",
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
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();

  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  // console.log(date);
  const ampm = hour >= 12 ? "PM" : "AM";
  timeel.innerHTML =
    hoursIn12HrFormat + ":" + minutes + " " + `<span id="ampm">${ampm}</span>`;
  dateel.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);
const API_KEY = "bc01722bf0252f19e97faf6059dd8e91";
getWeatherData();
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}
function getCityWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q= +
     ${searchval.value} +
     &appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let coord = data.coord;
      console.log(coord);
      let latitude = coord.lat;
      let longitude = coord.lon;
      console.log(latitude, longitude);
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          showWeatherData(data);
        });
    });
}
searchbtn.addEventListener("click", function () {
  getCityWeather();
});
function showCityWeatherData(data) {
  let { weather, main, sys } = data;

  mainday.innerHTML = `
  <h3 class='cur_weat'>Current Weather<img src="http://openweathermap.org/img/wn/${
    weather[0].icon
  }@2x.png" alt='weathericon'/></h3>
    <div class="maindiv">
      
      <p class="humidity">Humidity: ${main.humidity}%</p>
      <p class="temp">Temp: ${main.temp}°C</p>
      
      <p class="Sunrise"><div>Sunrise: ${window
        .moment(sys.sunrise * 1000)
        .format("HH:mm a")}</div></p>
        
      <p class="Sunset"><div>Sunset: ${window
        .moment(sys.sunset * 1000)
        .format("HH:mm a")}</div></p>
    </div>
  `;
  let otherdayForecast = "";
  console.log(data.daily);
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
    } else {
      otherdayForecast += `<div class="card cc">
        <div class="card-body">
          <h4 class="card-title day">${window
            .moment(day.dt * 1000)
            .format("ddd")}</h4>
          <img src="http://openweathermap.org/img/wn/${
            day.weather[0].icon
          }@2x.png" alt='weathericon'/>
          <p class="card-text Night">Night: ${day.temp.night}°C</p>
          <p class="card-text Day">Day: ${day.temp.day}°C</p>
         </div> 
        </div>`;
    }
  });
  otherday.innerHTML = otherdayForecast;
}
// console.log(data);
function showWeatherData(data) {
  let { humidity, temp, pressure, sunrise, sunset, wind_speed } = data.current;

  mainday.innerHTML = `
  <h3 class='cur_weat'>Current Weather<img src="http://openweathermap.org/img/wn/${
    data.current.weather[0].icon
  }@2x.png" alt='weathericon'/></h3>
    <div class="maindiv">
      
      <p class="humidity">Humidity: ${humidity}%</p>
      <p class="temp">Temp: ${temp}°C</p>
      
      <p class="Sunrise"><div>Sunrise: ${window
        .moment(sunrise * 1000)
        .format("HH:mm a")}</div></p>
        
      <p class="Sunset"><div>Sunset: ${window
        .moment(sunset * 1000)
        .format("HH:mm a")}</div></p>
    </div>
  `;
  let otherdayForecast = "";
  console.log(data.daily);
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
    } else {
      otherdayForecast += `<div class="card cc">
        <div class="card-body">
          <h4 class="card-title day">${window
            .moment(day.dt * 1000)
            .format("ddd")}</h4>
          <img src="http://openweathermap.org/img/wn/${
            day.weather[0].icon
          }@2x.png" alt='weathericon'/>
          <p class="card-text Night">Night: ${day.temp.night}°C</p>
          <p class="card-text Day">Day: ${day.temp.day}°C</p>
         </div> 
        </div>`;
    }
  });
  otherday.innerHTML = otherdayForecast;
}
document.addEventListener("DOMContentLoaded", () => {
  const selectDrop = document.querySelector("#search-value");
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let output = "";
      data.forEach((country) => {
        output += `<option>${country.name.common}</option>`;
        console.log(country.callingCodes);
      });
      selectDrop.innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
});
