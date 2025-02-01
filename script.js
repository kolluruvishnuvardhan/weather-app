const apiKey = "78861d8435e5eb3ff9f765fb431fdb8d"; // Replace with your OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather() {
    const city = document.getElementById("cityInput").value || "Mumbai";
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        if (!response.ok) {
            if (response.status === 404) {
                updateWeatherUI("City not found", "--°C", "--%", "-- KMPH", "", "");
                return;
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }

        const data = await response.json();
        updateWeatherUI(
            data.name,
            `${Math.round(data.main.temp)}°C`,
            `${data.main.humidity}%`,
            `${data.wind.speed} KMPH`,
            `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
            data.weather[0].description
        );

    } catch (error) {
        console.error("Error fetching weather data:", error);
        updateWeatherUI("Error fetching weather data", "--°C", "--%", "-- KMPH", "", "");
    }
}

function updateWeatherUI(cityName, temperature, humidity, windSpeed, iconSrc, iconAlt) {
    document.getElementById("cityName").innerHTML = cityName;
    document.getElementById("temperature").innerHTML = temperature;
    document.getElementById("humidity").innerHTML = humidity;
    document.getElementById("windSpeed").innerHTML = windSpeed;

    const weatherIcon = document.getElementById("weatherIcon");
    weatherIcon.src = iconSrc;
    weatherIcon.alt = iconAlt;
}

// Optional: Call checkWeather() on page load to display default city weather
checkWeather();