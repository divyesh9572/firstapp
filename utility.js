const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector("#search-btn");
const WeatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".tempeture");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const windspeed = document.querySelector("#wind");
const location_not_found = document.querySelector(".location-not-found");
const WeatherBody = document.querySelector(".weather-body");

async function checkWeather(city) {
  const api_key = "a3722ade5915486baab42314230406";
  const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=yes`;
  const Weather_data = await fetch(url)
    .then((responce) => responce.json())
    .catch((error) => {
       return new Error(error);
    });

  if (Weather_data.error) {
    location_not_found.style.display = "flex";
    WeatherBody.style.display = "none";
  } else {
    location_not_found.style.display = "none";
    WeatherBody.style.display = "flex";
    temperature.innerHTML = `${Weather_data.current["temp_c"]}` + "°C";
    description.innerHTML = `${Weather_data.current.condition.text}`;
    humidity.innerHTML = `${Weather_data.current.humidity}` + "%";
    windspeed.innerHTML = `${Weather_data.current["wind_kph"]}` + "Km/h";

    switch (Weather_data.current.condition.text) {
      case "Sunny":
        WeatherImg.src = "./clear (1).png";
        break;
      case "Partly cloudy":
        WeatherImg.src = "./cloud (1).png";
        break;
      case "Mist":
        WeatherImg.src = "./mist (1).png";
        break;
      case "Light drizzle":
        WeatherImg.src = "./rain (1).png";
        break;
      case "Overcast":
        WeatherImg.src = "./snow (1).png";
    }
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
