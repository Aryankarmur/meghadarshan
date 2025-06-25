import "./assets/css/Todayweather.css";
import Clearsky from "./assets/weather icons/clear-sky.png";
import Mainlyclear from "./assets/weather icons/cloudy.png";
import Partlycloudy from "./assets/weather icons/partly-cloudy.png";
import Fog from "./assets/weather icons/fog.png";
import Depositingrimefog from "./assets/weather icons/rimefog.png";
import Snow from "./assets/weather icons/snow.png";
import Litedrizzle from "./assets/weather icons/litedrizzle.png";
import Drizzle from "./assets/weather icons/drizzle.png";
import Rain from "./assets/weather icons/rain.png";
import Snowshowers from "./assets/weather icons/snowshowers.png";
import Freezingdrizzle from "./assets/weather icons/freezingdrizzle.png";
import Freezingrain from "./assets/weather icons/freezing-rain.png";
import Lightrain from "./assets/weather icons/lightrain.png";
import Lightsnow from "./assets/weather icons/lightsnow.png";
import Thundershowers from "./assets/weather icons/thunderstorm.png";
import Thundershowershail from "./assets/weather icons/thunderstorm&hail.png";
import Thundershowersheavyhail from "./assets/weather icons/thunderstorm&heavy hail.png";
import Rainshowers from "./assets/weather icons/rainshowers.png";

const Todayweather = ({ weatherData }) => {
  const weatherCode = weatherData?.current?.weather_code;
  function getWeatherData(code) {
    switch (code) {
      case 0:
        return {
          imgpath: Clearsky,
          imgalt: "Clear sky",
          weather: "Clear sky",
        };
      case 1:
        return {
          imgpath: Mainlyclear,
          imgalt: "Mainly clear",
          weather: "Mainly clear",
        };
      case 2:
        return {
          imgpath: Partlycloudy,
          imgalt: "Partly cloudy",
          weather: "Partly cloudy",
        };
      case 3:
        return {
          imgpath: Mainlyclear,
          imgalt: "Overcast",
          weather: "Overcast",
        };
      case 45:
        return {
          imgpath: Fog,
          imgalt: "fog",
          weather: "fog",
        };
      case 48:
        return {
          imgpath: Depositingrimefog,
          imgalt: "Depositing rime fog",
          weather: "Depositing rime fog",
        };
      case 51:
        return {
          imgpath: Litedrizzle,
          imgalt: "Light drizzle",
          weather: "Light drizzle",
        };
      case 53:
        return {
          imgpath: Drizzle,
          imgalt: "Moderate drizzle",
          weather: "Moderate drizzle",
        };
      case 55:
        return {
          imgpath: Drizzle,
          imgalt: "Dense drizzle",
          weather: "Dense drizzle",
        };
      case 56:
        return {
          imgpath: Freezingdrizzle,
          imgalt: "Light freezing drizzle",
          weather: "Light freezing drizzle",
        };
      case 57:
        return {
          imgpath: Freezingdrizzle,
          imgalt: "Dense freezing drizzle",
          weather: "Dense freezing drizzle",
        };
      case 61:
        return {
          imgpath: Lightrain,
          imgalt: "Light rain",
          weather: "Light rain",
        };
      case 63:
        return {
          imgpath: Rain,
          imgalt: "Moderate rain",
          weather: "Moderate rain",
        };
      case 65:
        return {
          imgpath: Rain,
          imgalt: "Heavy rain",
          weather: "Heavy rain",
        };
      case 66:
        return {
          imgpath: Freezingrain,
          imgalt: "Light freezing rain",
          weather: "Light freezing rain",
        };
      case 67:
        return {
          imgpath: Freezingrain,
          imgalt: "Heavy freezing rain",
          weather: "Heavy freezing rain",
        };
      case 71:
        return {
          imgpath: Lightsnow,
          imgalt: "Light snow",
          weather: "Light snow",
        };
      case 73:
        return {
          imgpath: Snow,
          imgalt: "Moderate snow",
          weather: "Moderate snow",
        };
      case 75:
        return {
          imgpath: Snow,
          imgalt: "Heavy snow",
          weather: "Heavy snow",
        };
      case 77:
        return {
          imgpath: Snow,
          imgalt: "Snow grains",
          weather: "Snow grains",
        };
      case 80:
        return {
          imgpath: Rainshowers,
          imgalt: "Light rain showers",
          weather: "Light rain showers",
        };
      case 81:
        return {
          imgpath: Rainshowers,
          imgalt: "Moderate rain showers",
          weather: "Moderate rain showers",
        };
      case 82:
        return {
          imgpath: Rainshowers,
          imgalt: "Violent rain showers",
          weather: "Violent rain showers",
        };
      case 85:
        return {
          imgpath: Snowshowers,
          imgalt: "Light snow showers",
          weather: "Light snow showers",
        };
      case 86:
        return {
          imgpath: Snowshowers,
          imgalt: "Heavy snow showers",
          weather: "Heavy snow showers",
        };
      case 95:
        return {
          imgpath: Thundershowers,
          imgalt: "Thunderstorm, slight or moderate",
          weather: "Thunderstorm, slight or moderate",
        };
      case 96:
        return {
          imgpath: Thundershowershail,
          imgalt: "Thunderstorm with slight hail",
          weather: "Thunderstorm with slight hail",
        };
      case 99:
        return {
          imgpath: Thundershowersheavyhail,
          imgalt: "Thunderstorm with heavy hail",
          weather: "Thunderstorm with heavy hail",
        };
      default:
        return {
          imgpath: Clearsky,
          imgalt: "Unknown weather",
          weather: "Unknown weather",
        };
    }
  };
  const weather = getWeatherData(weatherCode);


  // get wind direction from degree
  const getWindDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((deg / 45) % 8);
    return directions[index];
  };
  const windDirection = getWindDirection(
    weatherData?.current?.wind_direction_10m
  );
  // date format
  const date = new Date(weatherData?.current?.time);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  
  return (
    <section className="today-weather">
      <div className="today-weather__temperature">
        <p>
          {weatherData?.current?.temperature_2m}
          {weatherData?.current_units?.temperature_2m}
        </p>
        <p className="date">{formattedDate} </p>
      </div>
      <div className="today-weather__details">
        <div className="today-weather__weather">
          <img
            src={weather.imgpath}
            alt={weather.imgalt}
          />
          <p>{weather.weather}</p>
        </div>
        <div className="today-weather__info">
          <div className="weather-wind">
            <div>
              <img
                src={"/src/assets/weather icons/wind.png"}
                alt="wind image"
                title="wind flow"
              />
              <p>Wind Info:</p>
            </div>
            <div>
              <p>
                <span> Wind Speed: </span>
                {weatherData?.current?.wind_speed_10m} <span>km/h</span>
              </p>
              <p>
                <span>Wind Gust: </span>
                {weatherData?.current?.wind_gusts_10m} <span>km/h</span>
              </p>
              <p>
                <span>Wind Direction: </span>
                {windDirection}
              </p>
            </div>
          </div>
          <div className="weather-humidity">
            <p>humidity index: {weatherData?.current?.relativehumidity_2m}%</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Todayweather;
