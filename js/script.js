document.addEventListener("DOMContentLoaded", () => {
  const apiKey = CONFIG.WEATHER_API_KEY;

  function getWeather(city) {
    //fetching api url and getting promise obj
    const fetchPromise = fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
    );

    fetchPromise
    //when we get a response object back from the server, run the arrow function
      .then((Response) => {
        if (!Response.ok) {
          throw new Error(`Http error: ${Response.status}`);
        }
        return Response.json(); //returns a new promise obj

      })
      .then((Data) => { //starts when the promise is resolved 
        console.log(Data); 
      })
      .catch((error) => { //starts when an error occurs in any part of the .then chain
        console.error(`Fetch failed, ${error.message} occurred!`)
      })
  }

  getWeather("Zagreb");
});
