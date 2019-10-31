import React, { Component } from "react";
import PropTypes from "prop-types";
import ForecastItem from "./ForecastItem";
import transformForecast from "./../services/transformForecast";
import "./styles.css";

// const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
// const data = {
//   temperature: 10,
//   humidity: 10,
//   weatherState: "normal",
//   wind: "normal"
// };

const api_key = "f99bbd9e4959b513e9bd0d7f7356b38d";
const url_base_forecast = "http://api.openweathermap.org/data/2.5/forecast";

class ForecastExtended extends Component {
  constructor() {
    super();
    this.state = { forecastData: null };
  }

  componentDidMount() {
    this.updateCity(this.props.city);
  }

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.city !== this.props.city) {
  //     this.setState({ forecastData: null });
  //     this.updateCity(nextProps.city);
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.city !== this.props.city) {
      this.setState({ forecastData: null });
      this.updateCity(this.props.city);
    }
  }

  updateCity = city => {
    const url_forecast = `${url_base_forecast}?q=${city}&appid=${api_key}`;
    fetch(url_forecast)
      .then(data => data.json())
      .then(weather_data => {
        console.log(weather_data);
        const forecastData = transformForecast(weather_data);
        console.log(forecastData);
        this.setState({ forecastData });
      });
  };

  renderForecastItemDays(forecastData) {
    return forecastData.map(forecast => (
      <ForecastItem
        key={`${forecast.weekDay}${forecast.hour}`}
        weekDay={forecast.weekDay}
        hour={forecast.hour + 6}
        data={forecast.data}
      />
    ));
  }

  renderProgress = () => {
    return <h3>Cargando Pronostico extendido</h3>;
  };
  render() {
    const { city } = this.props;
    const { forecastData } = this.state;
    return (
      <div>
        <h2 className="forecast-title"> Pronostico Extendido para {city}</h2>
        {forecastData
          ? this.renderForecastItemDays(forecastData)
          : this.renderProgress()}
      </div>
    );
  }
}

ForecastExtended.propTypes = {
  city: PropTypes.string.isRequired
};
export default ForecastExtended;
