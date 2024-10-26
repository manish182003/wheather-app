const axios = require("axios");

const getHome = (req, res) => {
  res.render("index", {
    city: undefined,
    temperature: undefined,
    description: undefined,
    humidity: undefined,
    windSpeed: undefined,
    icon: undefined,
  });
};

const getWeather = async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.render("error", { message: "City name is required!" });
  }

  const apiKey = process.env.API_KEY;
  const weatherUrl = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${apiKey}`;

  try {
    const response = await axios.get(weatherUrl);
    const weatherData = response.data;

    res.render("index", {
      city: weatherData.location.name,
      temperature: weatherData.current.temp_c,
      description: weatherData.location.tz_id,
      humidity: weatherData.current.humidity,
      // windSpeed: windS,
      windSpeed: weatherData.current.wind_kph,
      icon: `https://${weatherData.current.condition.icon}`,
    });
  } catch (error) {
    // console.log(error);
    res.render("error", { message: "City not found or API request failed." });
  }
};

module.exports = {
  getHome,
  getWeather,
};
