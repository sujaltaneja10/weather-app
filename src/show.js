import {
  getLeftMainHtml,
  getMiddleMainHtml,
  getBottomMainHtml,
  emptyBottomMain,
  getRightMainHtml,
  emptyRightSection,
} from "./elements.js";

import {
  getTodaysMainData,
  getTodaysData,
  getNextWeekData,
  getHourlyData,
  getImg,
} from "./data.js";

export {
  showTodayMainData,
  showTodayData,
  showNextWeekData,
  showHourlyData,
  addLoadingScreen,
  removeLoadingScreen,
};

const DAYS_IN_WEEK = 7;
const HOURS_IN_DAY = 24;

async function showTodayMainData(weatherData) {
  const htmlElements = getLeftMainHtml();
  const todayData = await getTodaysMainData(weatherData);
  for (let i = 0; i < htmlElements.length; i++) {
    htmlElements[i].innerText = todayData[i];
  }
}

async function showTodayData(weatherData) {
  const htmlElements = getMiddleMainHtml();
  const todayData = await getTodaysData(weatherData);
  for (let i = 0; i < todayData.length; i++) {
    htmlElements[i].innerText = todayData[i];
  }
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
    htmlElements[5].src = await getImg(nextWeekData[5]);
  }
}

async function showHourlyData(weatherData) {
  emptyRightSection();
  for (let i = 0; i < HOURS_IN_DAY; i++) {
    const htmlElements = getRightMainHtml();
    const hourlyData = await getHourlyData(i, weatherData);

    htmlElements[0].innerText = i;
    htmlElements[1].innerText = hourlyData[1] + "%";
    htmlElements[2].innerText = hourlyData[2] + "°";
    htmlElements[3].src = await getImg(hourlyData[3]);
  }
}

const addLoadingScreen = () => {
  const loading = document.querySelector(".loading");
  loading.classList.remove("hidden");
  document.querySelectorAll("main").forEach((e) => {
    e.classList.add("hidden");
  });
};

const removeLoadingScreen = () => {
  const loading = document.querySelector(".loading");
  loading.classList.add("hidden");
  document.querySelectorAll("main").forEach((e) => {
    e.classList.remove("hidden");
  });
};
