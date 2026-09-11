import "./assets/css/OneDayForecast.css";
import { getWeatherData } from "./utils/weatherUtils";
import { useEffect, useRef } from "react";

const OneDayForecast = ({ weatherData }) => {
  const scrollRef = useRef(null);

  // Auto-scroll to the current hour on mount/update
  useEffect(() => {
    if (scrollRef.current) {
      const currentElement = scrollRef.current.querySelector('.current-hour');
      if (currentElement) {
        // Scroll so the current hour is visible (slightly offset to the left)
        const scrollPosition = currentElement.offsetLeft - 20;
        scrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  }, [weatherData]);

  const HourlyData = () => {
    if (!weatherData || !weatherData.hourly) return null;

    const hour = weatherData.hourly.time;
    const currentLocalHour = new Date().getHours();

    return hour.map((time, index) => {
      const weather = getWeatherData(weatherData.hourly.weather_code[index]);

      // Adjust the time to UTC+5 (as per original logic)
      const adjustedTime = new Date(time);
      adjustedTime.setHours(adjustedTime.getHours() + 5);
      
      const itemHour = adjustedTime.getHours();
      
      // We consider it the current hour if the hour matches.
      const isCurrentHour = itemHour === currentLocalHour;

      let timeString = "";
      if (itemHour === 0) timeString = "12 AM";
      else if (itemHour === 12) timeString = "12 PM";
      else if (itemHour > 12) timeString = `${itemHour - 12} PM`;
      else timeString = `${itemHour} AM`;

      return (
        <div className={`hourly-forecast ${isCurrentHour ? "current-hour" : ""}`} key={index}>
          <h3 className="hourly-time">{isCurrentHour ? "Now" : timeString}</h3>
          <img
            src={weather.imgpath}
            title={weather.weather}
            alt={weather.imgalt}
            className="hourly-icon"
          />
          <p className="hourly-temp">{Math.round(weatherData.hourly.temperature_2m[index])}°</p>
          <p className="hourly-condition">{weather.weather}</p>
          <div className="hourly-secondary">
            <span>💧 {weatherData.hourly.relativehumidity_2m[index]}%</span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="one-day-forecast">
      <h2>24-Hour Forecast</h2>
      <div className="horizontal-scroll-wrapper">
        <div className="horizontal-scroll-container" ref={scrollRef}>
          {HourlyData()}
        </div>
      </div>
    </div>
  );
};

export default OneDayForecast;
