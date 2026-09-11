import { getWeatherData, getWindDirection } from "./utils/weatherUtils";
import { IoWaterOutline } from "react-icons/io5";
import { WiStrongWind } from "react-icons/wi";
import "./assets/css/Todayweather.css";

const Todayweather = ({ weatherData, locationData }) => {
  const weatherCode = weatherData?.current?.weather_code;
  const weather = getWeatherData(weatherCode);

  const date = new Date(weatherData?.current?.time);
  const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  
  // Format time (e.g., 6:42 PM)
  const timeOptions = { hour: 'numeric', minute: '2-digit' };
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  const windDeg = weatherData?.current?.wind_direction_10m;
  const windDirText = getWindDirection(windDeg || 0);

  // Parse location name
  const locationDisplay = locationData?.name 
    ? `${locationData.name}${locationData.country ? `, ${locationData.country}` : ''}`
    : "Unknown Location";

  return (
    <section className="hero-weather">
      <div className="hero-weather__header">
        <h2 className="hero-location">{locationDisplay}</h2>
        <p className="hero-date">{formattedDate} • {formattedTime}</p>
      </div>
      
      <div className="hero-weather__main">
        <div className="hero-temp-group">
          <p className="hero-temperature">
            {Math.round(weatherData?.current?.temperature_2m || 0)}°
          </p>
          <img
            className="hero-icon"
            src={weather.imgpath}
            alt={weather.imgalt}
          />
        </div>
        
        <div className="hero-condition-group">
          <p className="hero-condition">{weather.weather}</p>
          <p className="hero-feels-like">
            Feels like {Math.round(weatherData?.current?.apparent_temperature || 0)}°
          </p>
        </div>
      </div>
      
      <div className="hero-weather__metrics">
        <div className="metric-card">
          <IoWaterOutline className="metric-icon" aria-hidden="true" />
          <div className="metric-data">
            <p className="metric-value">{weatherData?.current?.relativehumidity_2m}%</p>
            <p className="metric-label">Humidity</p>
          </div>
        </div>
        
        <div className="metric-card">
          <WiStrongWind className="metric-icon" aria-hidden="true" />
          <div className="metric-data">
            <p className="metric-value">{Math.round(weatherData?.current?.wind_speed_10m || 0)} km/h</p>
            <p className="metric-label">Wind ({windDirText} • {windDeg}°)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Todayweather;
