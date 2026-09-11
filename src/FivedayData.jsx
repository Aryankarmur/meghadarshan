import "./assets/css/FivedayData.css";
import { getWeatherData } from "./utils/weatherUtils";

const FivedayData = ({ fivedayWeatherData }) => {
      
  const renderFivedayData = () => {
      if (!fivedayWeatherData || !fivedayWeatherData.daily) {
          return null;
        } else {
            
            return fivedayWeatherData.daily.time.map((time, index) => {
                const weather = getWeatherData(fivedayWeatherData.daily.weather_code[index]);
                
                const dateObj = new Date(time);
                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                const dayNum = dateObj.getDate();
                const formattedDate = `${dayName}, ${monthName} ${dayNum}`;

                return (
                <div key={index} className="fiveday-data__item">
                    <div className="fiveday-data__date">
                        <h3>{formattedDate}</h3>
                    </div>
                    
                    <div className="fiveday-data__condition">
                        <img src={weather.imgpath} alt={weather.imgalt} />
                        <p>{weather.weather}</p>
                    </div>
                    
                    <div className="fiveday-data__temp">
                        <span className="temp-max">{Math.round(fivedayWeatherData.daily.temperature_2m_max[index])}°</span>
                        <span className="temp-separator">/</span>
                        <span className="temp-min">{Math.round(fivedayWeatherData.daily.temperature_2m_min[index])}°</span>
                    </div>
                </div>
            );
        });
    }
    }
  return (
    <div className="fiveday-data">
      <h2>5-Day Weather Forecast</h2>
      <div className="fiveday-data__container">
          {renderFivedayData()}
      </div>
    </div>
  )
}

export default FivedayData
