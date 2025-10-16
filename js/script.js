document.addEventListener("DOMContentLoaded", () => {
  const apiKey = CONFIG.WEATHER_API_KEY;

  async function getWeather(city) {
    try {
      const apiUrl =
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error("Failed to fetch weather: ", error);
    }
  }

  getWeather("Bjelovar");
});
