const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const weatherCard = document.getElementById("weather-card");

const weatherIcon = document.getElementById("weather-icon");
const cityElement = document.getElementById("city");
const tempElement = document.getElementById("temp");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");
const sunriseElement = document.getElementById("sunrise-time");
const sunsetElement = document.getElementById("sunset-time");

// Function to fetch weather by city search
function fetchWeather(city) {
  fetch(weatherUrl + city + `&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        alert("City not found");
        return;
      }
      updateWeatherUI(data);
    })
    .catch(() => {
      alert("Failed to fetch data. Please check your internet connection.");
    });
}

function updateWeatherUI(data) {
  weatherCard.style.display = "block";
  cityElement.textContent = data.name;
  tempElement.textContent = Math.round(data.main.temp) + "°C";
  humidityElement.textContent = data.main.humidity + "%";
  windElement.textContent = data.wind.speed + " km/h";

  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  sunriseElement.textContent = sunrise;
  sunsetElement.textContent = sunset;

  const weatherCondition = data.weather[0].main;
  updateWeatherIcon(weatherCondition);
}

function updateWeatherIcon(condition) {
  const conditionIcons = {
    Clouds: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    Clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    Rain: "https://cdn-icons-png.flaticon.com/512/4832/4832319.png",
    Drizzle: "https://cdn-icons-png.flaticon.com/512/414/414974.png",
    Mist: "https://cdn-icons-png.flaticon.com/512/414/414992.png"
  };

  weatherIcon.src = conditionIcons[condition] || conditionIcons["Clear"];
}

// Fetch weather based on search
searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

// Fetch and display date and time
setInterval(() => {
  const now = new Date();
  document.getElementById("date-time").textContent = now.toLocaleString();
}, 1000);
