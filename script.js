const inputWeather = document.getElementById("inputWeather");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const result = document.querySelector(".result");
const weter = document.querySelector(".weter");
const icons = document.querySelector(".icons");
const date = document.getElementById(".date");
const apiKey = "6556d87759426d24eaadfdf29f7b2b40";

async function getCoordinates(city){
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&lang=ru&appid=${apiKey}`);
    let answer = await response.json();
    let lat = answer[0].lat;
    let lon = answer[0].lon;
    return [lat, lon];
}

function kelvinsToCelsius(k){
    return k - 273.15;
}

async function getWeather(city){
    let coordinates = await getCoordinates(city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${apiKey}&lang=ru`);
    const answer = await response.json();
    console.log(answer);
    result.textContent = `Температура:   ${Math.round(kelvinsToCelsius(answer.main.temp))} C˚`;
    weter.textContent = `Состояние:   ${answer.weather[0].description} `;
    icons.innerHTML = `<img src="https://openweathermap.org/img/wn/${answer.weather[0]['icon']}@2x.png">`;
}

getWeatherBtn.addEventListener("click", function(){
    let value = inputWeather.value;
    getWeather(value);
});

var timeElement = document.getElementById('currentTime');
var DateElement = document.getElementById("currentDate");
  setInterval(function () {
    var currentTime = new Date();
    var currentDate = new Date();
    timeElement.textContent = currentTime.toLocaleTimeString();
    DateElement.textContent = currentDate.toLocaleDateString();
  }, 10);
