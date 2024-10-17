import "./style.css";

const DAYS_IN_WEEK = 7;

async function getWeatherData(cityName) {
  const weather = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=BX74LWS46UCXGZPDS733SPTVD`,
    { mode: "cors" },
  );
  const weatherData = await weather.json();
  return weatherData;
}

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

function getLeftMainHtml() {
  const cityName = document.querySelector(".city-name");
  const weatherDesc = document.querySelector(".weather-desc");
  const tempValue = document.querySelector(".temp-value");
  const highTemp = document.querySelector(".high-temp");
  const lowTemp = document.querySelector(".low-temp");
  return [cityName, weatherDesc, tempValue, highTemp, lowTemp];
}

async function showTodayMainData(weatherData) {
  const htmlElements = getLeftMainHtml();
  const todayData = await getTodaysMainData(weatherData);
  for (let i = 0; i < htmlElements.length; i++) {
    htmlElements[i].innerText = todayData[i];
  }
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

function getMiddleMainHtml() {
  return document.querySelectorAll(".item-value");
}

async function showTodayData(weatherData) {
  const htmlElements = getMiddleMainHtml();
  const todayData = await getTodaysData(weatherData);
  for (let i = 0; i < todayData.length; i++) {
    htmlElements[i].innerText = todayData[i];
  }
}

function getBottomMainHtml() {
  const section = document.createElement("section");
  section.classList.add("bottom-main-item");
  section.classList.add("dynamically-made-sections");
  document.querySelector(".bottom-main").appendChild(section);

  const dayWiseTemp = document.createElement("div");
  dayWiseTemp.classList.add("day-wise-temp");
  section.appendChild(dayWiseTemp);

  const day = document.createElement("div");
  day.classList.add("day");
  day.classList.add("weekly-item");
  dayWiseTemp.appendChild(day);

  const icon = document.createElement("div");
  icon.classList.add("icon");
  icon.classList.add("weekly-item");
  dayWiseTemp.appendChild(icon);

  const chanceOfRain = document.createElement("div");
  chanceOfRain.classList.add("chance-of-rain");
  chanceOfRain.classList.add("weekly-item");
  dayWiseTemp.appendChild(chanceOfRain);

  const humidity = document.createElement("div");
  humidity.classList.add("humidity");
  humidity.classList.add("weekly-item");
  dayWiseTemp.appendChild(humidity);

  const temperature = document.createElement("div");
  temperature.classList.add("temperature");
  temperature.classList.add("weekly-item");
  dayWiseTemp.appendChild(temperature);

  const tempHighWeekly = document.createElement("div");
  tempHighWeekly.classList.add("temp-high-weekly");
  tempHighWeekly.classList.add("weekly-item");
  temperature.appendChild(tempHighWeekly);

  const tempLowWeekly = document.createElement("div");
  tempLowWeekly.classList.add("temp-low-weekly");
  tempLowWeekly.classList.add("weekly-item");
  temperature.appendChild(tempLowWeekly);

  const hr = document.createElement("hr");
  section.appendChild(hr);

  return [day, chanceOfRain, humidity, tempHighWeekly, tempLowWeekly];
}

async function getNextWeekData(index, weatherData) {
  const nextWeekData = weatherData.days[index];
  return [
    nextWeekData.datetime,
    nextWeekData.precipprob,
    nextWeekData.humidity,
    nextWeekData.tempmax,
    nextWeekData.tempmin,
  ];
}

function emptyBottomMain() {
  document
    .querySelectorAll(".dynamically-made-sections")
    .forEach((element) => element.remove());
}

async function showNextWeekData(weatherData) {
  emptyBottomMain();
  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    const htmlElements = getBottomMainHtml();
    const nextWeekData = await getNextWeekData(i + 1, weatherData);

    htmlElements[0].innerText = nextWeekData[0];
    htmlElements[1].innerText = nextWeekData[1] + "%";
    htmlElements[2].innerText = nextWeekData[2] + "%";
    htmlElements[3].innerText = nextWeekData[3] + "°";
    htmlElements[4].innerText = nextWeekData[4] + "°";
  }
}

async function loadWeather(cityName) {
  try {
    const weatherData = await getWeatherData(cityName);
    showTodayMainData(weatherData);
    showTodayData(weatherData);
    showNextWeekData(weatherData);
  } catch (error) {
    alert("An error has occured. Please try again.");
  }
}

document.querySelector(".search").addEventListener("click", () => {
  loadWeather(document.querySelector("input").value);
});

document.querySelector("input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    loadWeather(document.querySelector("input").value);
  }
});

loadWeather("London");
