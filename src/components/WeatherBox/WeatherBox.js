import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';



const WeatherBox = props => {
  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [errorBox, setErrorBox] = useState(false);
  const handleCityChange = useCallback(city => {
    console.log(city);
    setPending(true);
    setErrorBox(false);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2285da7b9cbf8d6de02b2aebdba1affc&units=metric`)
    .then(res => {
      if(res.status === 200) {
        return res.json()
          .then(data => {

      const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        };
        setWeather(weatherData);
        setPending(false);
    });
  } else {
    setErrorBox(true);
      }
    })
  }); 

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weather && !pending && <WeatherSummary {...weather} /> }
      {pending && !errorBox && <Loader /> }
      {errorBox && <ErrorBox /> }
    </section>
  )
};

export default WeatherBox;