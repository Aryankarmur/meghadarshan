import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Todayweather from "./Todayweather";
import OneDayForcast from "./OneDayForcast";
import FivedayData from "./FivedayData";

function App() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [fivedayWeatherData, setFiveDayWeatherData] = useState(null);

  // geocoding api for search by city name
  const getCityLocation = async (city) => {
    const api = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
    const response = await fetch(api);

    if (!response.ok) {
      throw new Error("Failed to fetch city location");
    } else {
      const data = await response.json();
      setLocation({
        longitude: data.results[0].longitude,
        latitude: data.results[0].latitude,
      });
    }
  };

  // search for weather by coordinates
  useEffect(() => {
    const getWeatherByCoordinates = async () => {
      const api = `https://api.open-meteo.com/v1/forecast?latitude=${
        location.latitude || "28.625"
      }&longitude=${
        location.longitude || "77.25"
      }&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,relativehumidity_2m&hourly=temperature_2m,relativehumidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code&forecast_days=1`;
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      } else {
        const data = await response.json();
        setWeatherData(data);
      }
    };
    getWeatherByCoordinates();
  }, [location]);

  // search for weather by coordinates for 5 day
  useEffect(() => {
    const getWeatherByCoordinates5day = async () => {
      const api = `https://api.open-meteo.com/v1/forecast?latitude=${
        location.latitude || "28.625"
      }&longitude=${
        location.longitude || "77.25"
      }&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=5`;
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      } else {
        const data = await response.json();
        setFiveDayWeatherData(data);
      }
    };
    getWeatherByCoordinates5day();
  }, [location]);


  return (
    <>
      <section className="main-section">
        <Navbar getCityLocation={getCityLocation} />
        <Todayweather weatherData={weatherData} />
        <OneDayForcast weatherData={weatherData} />
        <FivedayData fivedayWeatherData={fivedayWeatherData} />
      </section>
    </>
  );
}

export default App;
