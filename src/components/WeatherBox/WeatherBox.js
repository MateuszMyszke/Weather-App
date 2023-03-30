import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';



const WeatherBox = props => {
  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false)
  const handleCityChange = useCallback(city => {
    console.log(city);
    setPending(true);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2285da7b9cbf8d6de02b2aebdba1affc&units=metric`)
    .then(res => res.json())
    .then(data => {
    const weatherData = {
      city: data.name,
      temp: data.main.temp,
      icon: data.weather[0].icon,
      description: data.weather[0].main
      };
      setWeather(weatherData);
      setPending(false);
    })
    .catch(err => {alert(`Error: ${err}`);});
    }
  ); 

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weather && !pending && <WeatherSummary {...weather} /> }
      {pending && <Loader /> }
    </section>
  )
};

export default WeatherBox;