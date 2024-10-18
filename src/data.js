export { getTodaysMainData, getTodaysData, getNextWeekData, getHourlyData };

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
