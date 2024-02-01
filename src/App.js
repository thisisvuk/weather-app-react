import './assets/css/App.css';
import bg_image from './assets/images/cloudy.jpg';
import 'weather-icons/css/weather-icons.css';
import WeatherCard from './Components/WeatherCard';
import React, {useState, useEffect} from 'react';
import CurrentWeatherCard from './Components/Current-Weather-card';

const API_Key = 'c11de0400e58297214115aa89b7def9f';
const weatherBitApiKey = '4a641056775e4522b3f54b822a1601ce';

function App() {

  const [state, setState] = useState({
    city: undefined,
    country: undefined,
    icon: undefined,
    id: undefined,
    temp: undefined,
    temp_max: undefined,
    temp_min: undefined,
    description: undefined,
    s_des: undefined,
    daily: []
  });

  // const weatherCardDisplay = (dailyData) => {
  //   dailyData.forEach(el => {
  //     //  lowerPart.app
  //   });
  // }

  const kelvinToFar = kel => {
    let far = Math.floor(kel * 1.8 - 459.67);
    return far;
  };

  const weatherIcon = (code) => {
    switch (code) {
      case code >= 200 && code <= 232:
        return 'thunderstorm';
      case code >= 300 && code <= 321:
        return 'drizzle';
      case code >= 500 && code <= 531:
        return 'Rain';
      case code >= 600 && code <= 622:
        return 'Snow';
      case code > 700 && code <= 781:
        return 'Atmosphere';
      case code > 800 && code <= 804:
        return 'clouds';

      default:
        return 'clear';
    }
  }

  useEffect(() => {
    // Define an async function
    const fetchData = async () => {
      try {
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=${API_Key}`);
        const response = await api_call.json();
  
        const api_call_daily = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=Mumbai&days=7&key=${weatherBitApiKey}`);
        const responseTest = await api_call_daily.json();
  
        setState({
          country: response.sys.country,
          city: response.name,
          description: response.weather[0].description,
          temp: kelvinToFar(response.main.temp),
          icon: weatherIcon(response.weather[0].id),
          id: response.weather[0].id,
          daily: responseTest.data
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Call the async function
    fetchData();
  }, []);

  
  return (
    <div
        className='container'
        style={{
          backgroundImage: 'url(' + bg_image + ')',
          backgroundSize: 'cover',
          height: '100vh'
        }}>
        <div className='search-bar'></div>
        <div className='upper-part'>
          <div className='left'>
            <CurrentWeatherCard
              country={state.country}
              city={state.city}
              description={state.description}
              temp={state.temp}
              icon={state.icon}
              id={state.id}
            />
          </div>
          <div className='right'>
            <div className='otherDetails'></div>
          </div>
        </div>
        <div className='lower-part'>
          {state.daily.map(date => (
            <WeatherCard
              key={date.moonrise_ts}
              datetime={date.datetime}
              temp={date.high_temp}
              description={date.weather.description}
            />
          ))}{' '}
        </div>
      </div>
  );
}

export default App;
