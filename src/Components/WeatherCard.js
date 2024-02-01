import '../assets/css/App.css';
import 'weather-icons/css/weather-icons.css';

function WeatherCard(props) {
  return (
    <div className='weather-card'>
      <div className='weather-card-date'> {props.datetime} </div>
      <div className='weather-card-weather'>
        <i className='wi wi-cloud weather-card-icon'></i>
      </div>
      <div className='weather-card-temperature'>
        {props.temp} <p>C</p>
      </div>
      <div className='weather-card-weather-description'>
        {props.description}
      </div>
    </div>
  );
}

export default WeatherCard;
