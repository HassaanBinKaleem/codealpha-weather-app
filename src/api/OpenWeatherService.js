const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = "c50fe4f2d41593f4bc7047f05e29f536";

const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export async function fetchWeatherData(lat, lon) {
  try {
    console.log("Fetching weather data...");
    let [weatherPromise, forecastPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
    ]);

    const weatherResponse = await weatherPromise.json();
    const forecastResponse = await forecastPromise.json();
    console.log("Weather data received:", weatherResponse);
    console.log("Forecast data received:", forecastResponse);
    return [weatherResponse, forecastResponse];
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

export async function fetchCities(input) {
  try {
    console.log("Fetching cities data...");
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    console.log("Cities data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching cities data:", error);
    return;
  }
}
