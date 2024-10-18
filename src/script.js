import "./style.css";
import {
  showTodayMainData,
  showTodayData,
  showNextWeekData,
  showHourlyData,
  addLoadingScreen,
  removeLoadingScreen,
} from "./show.js";

async function getWeatherData(cityName) {
  const weather = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=${unitGroup}&key=BX74LWS46UCXGZPDS733SPTVD`,
    { mode: "cors" },
  );
  const weatherData = await weather.json();
  return weatherData;
}

async function loadWeather(cityName) {
  try {
    addLoadingScreen();
    const weatherData = await getWeatherData(cityName);
    removeLoadingScreen();

    showTodayMainData(weatherData);
    showTodayData(weatherData);
    showNextWeekData(weatherData);
    showHourlyData(weatherData);
  } catch (error) {
    alert("An error has occured. Please try again.");
  }
}

const getCityName = (event) => {
  if (event.key === "Enter") loadWeather(input.value);
};

let unitGroup = "us";
const changeDegreeUnit = () => {
  if (unitGroup === "us") unitGroup = "metric";
  else unitGroup = "us";
  loadWeather("London");
};

const input = document.querySelector("input");
const searchButton = document.querySelector(".search");
const changeBtn = document.querySelector(".change");
searchButton.addEventListener("click", () => loadWeather(input.value));
input.addEventListener("keypress", getCityName);
changeBtn.addEventListener("click", changeDegreeUnit);

loadWeather("London");
