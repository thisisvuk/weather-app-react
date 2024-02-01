import '../assets/css/App.css';
import 'weather-icons/css/weather-icons.css';

function CurrentWeatherCard({ id, city, temp, description }) {
  return (
    <div className='currentWeatherCard'>
      <div className='currentWeather-img'>
        <i className={`wi wi-owm-${id} icon`}></i>
        <p>{description}</p>
      </div>
      <div className='currentWeather-location'>{city}</div>
      <div className='currentWeather-temperature'>
        {temp} <p>F</p>
      </div>
    </div>
  );
}

export default CurrentWeatherCard;
