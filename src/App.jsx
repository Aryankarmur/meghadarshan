import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Todayweather from "./Todayweather";
import OneDayForecast from "./OneDayForecast";
import FivedayData from "./FivedayData";

function App() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [fivedayWeatherData, setFiveDayWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading on mount
  const [error, setError] = useState(null);

  // geocoding api for search by city name
  const getCityLocation = async (city) => {
    if (!city) return;
    setIsLoading(true);
    setError(null);
    try {
      const api = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`;
      const response = await fetch(api);
      
      if (!response.ok) {
        throw new Error("Unable to connect to the location service. Please try again.");
      } 
      
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        throw new Error("Location not found. Please check the city name and try again.");
      }
      
      // Explicitly construct new object to always trigger useEffect
      setLocation({
        longitude: data.results[0].longitude,
        latitude: data.results[0].latitude,
        name: data.results[0].name,
        country: data.results[0].country || "",
      });
    } catch (err) {
      setError(err.message);
      setIsLoading(false); // only stop loading here if it failed. if successful, the weather fetch will handle stopping it.
    }
  };

  // Fetch initial default city
  useEffect(() => {
    getCityLocation("Delhi");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // search for weather by coordinates
  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const currentApi = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,relativehumidity_2m&hourly=temperature_2m,relativehumidity_2m,wind_speed_10m,wind_direction_10m,weather_code&forecast_days=1`;
        const fivedayApi = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=5`;

        const [currentRes, fivedayRes] = await Promise.all([
          fetch(currentApi),
          fetch(fivedayApi)
        ]);

        if (!currentRes.ok || !fivedayRes.ok) {
          throw new Error("Unable to fetch weather data. Please try again.");
        }

        const currentData = await currentRes.json();
        const fivedayData = await fivedayRes.json();

        setWeatherData(currentData);
        setFiveDayWeatherData(fivedayData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <>
      <section className="main-section">
        <Navbar getCityLocation={getCityLocation} isLoading={isLoading} />
        
        {error && (
          <div className="error-state-container">
            <h2>Oops!</h2>
            <p>{error}</p>
            <button className="retry-btn" onClick={() => getCityLocation(location?.name || "Delhi")}>Try Again</button>
          </div>
        )}

        {isLoading && !error && (
          <div className="skeleton-container">
            <div className="skeleton skeleton-hero"></div>
            <div className="skeleton skeleton-hourly"></div>
            <div className="skeleton skeleton-fiveday"></div>
          </div>
        )}
        
        {!isLoading && !error && weatherData && fivedayWeatherData && (
          <>
            <Todayweather weatherData={weatherData} locationData={location} />
            <OneDayForecast weatherData={weatherData} />
            <FivedayData fivedayWeatherData={fivedayWeatherData} />
          </>
        )}
      </section>
    </>
  );
}

export default App;
