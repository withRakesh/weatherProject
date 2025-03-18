
const apiKey = "fe26b3a8798e9f03614e456da4cd5f6d";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }
    await fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

async function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        }, () => alert("Unable to retrieve your location."));
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found!");
            return;
        }

        document.getElementById("weatherInfo").classList.remove("hidden");
        document.getElementById("cityName").innerText = `Weather in ${data.name}`;
        document.getElementById("temperature").innerText = `Temperature : ${data.main.temp} °C`;
        document.getElementById("humidity").innerText = `Humidity : ${data.main.humidity}%`;
        document.getElementById("weatherDescription").innerText = `Condition : ${data.weather[0].description}`;
        document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data. Please try again.");
    }
}

 
