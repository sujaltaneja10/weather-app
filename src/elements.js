export {
  getLeftMainHtml,
  getMiddleMainHtml,
  getBottomMainHtml,
  emptyBottomMain,
  getRightMainHtml,
  emptyRightSection,
};

function getLeftMainHtml() {
  const cityName = document.querySelector(".city-name");
  const weatherDesc = document.querySelector(".weather-desc");
  const tempValue = document.querySelector(".temp-value");
  const highTemp = document.querySelector(".high-temp");
  const lowTemp = document.querySelector(".low-temp");
  return [cityName, weatherDesc, tempValue, highTemp, lowTemp];
}

function getRightMainHtml() {
  const rightMainDiv = document.createElement("div");
  rightMainDiv.classList.add("right-main-div");
  rightMainDiv.classList.add("dynamically-made-right-sections");
  document.querySelector(".right-side").appendChild(rightMainDiv);

  const hourlyHead = document.createElement("h2");
  hourlyHead.classList.add("hourly-head");
  rightMainDiv.appendChild(hourlyHead);

  const hourlyRain = document.createElement("p");
  hourlyRain.classList.add("hourly-rain");
  rightMainDiv.appendChild(hourlyRain);

  const hourlyImg = document.createElement("img");
  hourlyImg.classList.add("hourly-img");
  rightMainDiv.appendChild(hourlyImg);

  const hourlyTemp = document.createElement("h5");
  hourlyTemp.classList.add("hourly-temp");
  rightMainDiv.appendChild(hourlyTemp);

  return [hourlyHead, hourlyRain, hourlyTemp, hourlyImg];
}

function getMiddleMainHtml() {
  return document.querySelectorAll(".item-value");
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

  const iconDiv = document.createElement("div");
  iconDiv.classList.add("icon");
  iconDiv.classList.add("weekly-item");
  dayWiseTemp.appendChild(iconDiv);

  const icon = document.createElement("img");
  icon.classList.add("icon-img");
  iconDiv.appendChild(icon);

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

  return [day, chanceOfRain, humidity, tempHighWeekly, tempLowWeekly, icon];
}

function emptyBottomMain() {
  document
    .querySelectorAll(".dynamically-made-sections")
    .forEach((element) => element.remove());
}

function emptyRightSection() {
  document
    .querySelectorAll(".dynamically-made-right-sections")
    .forEach((element) => element.remove());
}
