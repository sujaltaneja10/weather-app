import "./style.css";
import {
  showTodayMainData,
  showTodayData,
  showNextWeekData,
  showHourlyData,
} from "./show.js";

async function getWeatherData(cityName) {
  const weather = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=BX74LWS46UCXGZPDS733SPTVD`,
    { mode: "cors" },
  );
  const weatherData = await weather.json();
  return weatherData;
}

async function loadWeather(cityName) {
  try {
    const weatherData = await getWeatherData(cityName);
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

const input = document.querySelector("input");
const searchButton = document.querySelector(".search");
searchButton.addEventListener("click", () => loadWeather(input.value));
input.addEventListener("keypress", getCityName);

loadWeather("London");
