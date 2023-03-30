import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';



const WeatherBox = props => {

  const handleCityChange = useCallback(city => {
    console.log(city);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2285da7b9cbf8d6de02b2aebdba1affc&units=metric`)
   .then(res => res.json())
   .then(data => {
     console.log(data);
   })
   .catch(err => {alert(`Error: ${err}`);});
  }
  ); 

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary />
      <Loader />
    </section>
  )
};

export default WeatherBox;