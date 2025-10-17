document.addEventListener("DOMContentLoaded", () => {
  const apiKey = CONFIG.WEATHER_API_KEY;
  const textInput = document.getElementById("citySearch");
  const temperature = document.getElementById("tempMain");
  const humidityPerc = document.getElementById("humidity");
  const windSpeed = document.getElementById("windSpeed");
  const cityName = document.getElementById("cityName");
  const weatherIcon = document.getElementById("svgWeather");

  textInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const city = getInput();
      if (city.trim() !== "") {
        getWeather(city);
      }
    }
  });

  function getWeather(city) {
    //fetching api url and getting promise obj
    const fetchPromise = fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
    );

    fetchPromise
      .then((Response) => {
        //when we get a response object back from the server, run the arrow function
        if (!Response.ok) {
          throw new Error(`Http error: ${Response.status}`);
        }
        return Response.json(); //returns a new promise obj
      })
      .then((Data) => {
        //starts when the promise is resolved
        console.log(Data);

        //update all data
        updateTemp(Data.current.temp_c);
        updateCity(Data.location.name);
        updateHumidity(Data.current.humidity);
        updateWind(Data.current.wind_kph);
        updateWeatherSvg(Data.current.condition.text);
      })
      .catch((error) => {
        //starts when an error occurs in any part of the .then chain
        console.error(`Fetch failed, ${error.message} occurred!`);
      });
  }

  function updateTemp(temp) {
    temperature.innerHTML = `${temp}°c`;
  }

  function updateHumidity(humidity) {
    humidityPerc.innerHTML = `${humidity}%`;
  }

  function updateWind(wind) {
    windSpeed.innerHTML = `${wind} km/h`;
  }

  function updateCity(city) {
    cityName.innerHTML = city;
  }

  function getInput() {
    return textInput.value;
  }

  function updateWeatherSvg() {}
});
