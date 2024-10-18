import clearDay from "../img/clear-day.png";
import clearNight from "../img/clear-night.png";
import cloudy from "../img/cloudy.png";
import fog from "../img/fog.png";
import partlyDay from "../img/partly-cloudy-day.png";
import partlyNight from "../img/partly-cloudy-night.png";
import rain from "../img/rain.png";
import rickroll from "../img/rickroll.jpeg";
import wind from "../img/wind.png";

export {
  getTodaysMainData,
  getTodaysData,
  getNextWeekData,
  getHourlyData,
  getImg,
};

async function getTodaysMainData(weatherData) {
  const todayData = weatherData.days[0];
  const address = weatherData.resolvedAddress;
  let newAddress = "";
  for (let i = 0; i < address.length; i++) {
    if (address[i] === ",") break;
    newAddress += address[i];
  }

  return [
    newAddress,
    todayData.conditions,
    todayData.temp + "°",
    "High: " + todayData.tempmax + "°",
    "Low: " + todayData.tempmin + "°",
  ];
}

async function getTodaysData(weatherData) {
  const todayData = weatherData.days[0];
  return [
    todayData.sunrise,
    todayData.sunset,
    todayData.precipprob + "%",
    todayData.humidity + "%",
    todayData.windspeed + " km/hr",
    todayData.feelslike + "°",
    todayData.precip + " cm",
    todayData.pressure + " hPa",
    todayData.visibility + " km",
    todayData.uvindex,
  ];
}

async function getNextWeekData(index, weatherData) {
  const nextWeekData = weatherData.days[index];
  return [
    nextWeekData.datetime,
    nextWeekData.precipprob,
    nextWeekData.humidity,
    nextWeekData.tempmax,
    nextWeekData.tempmin,
    nextWeekData.icon,
  ];
}

async function getHourlyData(index, weatherData) {
  const hourlyData = weatherData.days[0].hours[index];
  return [
    hourlyData.datetime,
    hourlyData.precipprob,
    hourlyData.temp,
    hourlyData.icon,
  ];
}

async function getImg(data) {
  if (data === "clear-day") return clearDay;
  else if (data === "clear-night") return clearNight;
  else if (data === "cloudy") return cloudy;
  else if (data === "fog") return fog;
  else if (data === "partly-cloudy-day") return partlyDay;
  else if (data === "partly-cloudy-night") return partlyNight;
  else if (data === "rain") return rain;
  else if (data === "wind") return wind;
  else return rickroll;
}
