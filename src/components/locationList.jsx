import React from "react";
import WeatherLocation from "./WeatherLocation";
import PropTypes from "prop-types";
import "./styles.css";

const LocationList = ({ cities, onSelecectedLocation }) => {
  const handleWeatherLocationClick = city => {
    console.log("clicky");
    onSelecectedLocation(city);
  };
  const strToComponents = cities => {
    return cities.map(city => (
      <WeatherLocation
        key={city}
        city={city}
        onWeatherLocationClick={() => handleWeatherLocationClick(city)}
      />
    ));
  };
  return <div className="locationList">{strToComponents(cities)}</div>;
};

LocationList.propTypes = {
  cities: PropTypes.array.isRequired,
  onSelecectedLocation: PropTypes.func
};

export default LocationList;
