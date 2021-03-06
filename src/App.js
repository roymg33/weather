import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import LocationList from "./components/locationList";
import ForecastExtended from "./components/forecastExtended";
import { Grid, Col, Row } from "react-flexbox-grid";
import "./App.css";

const cities = [
  "Mexico City,mx",
  "Puebla,mx",
  "Nuevo Leon,mx",
  "Guadalajara,mx",
  "Washington,us",
  "Denver,us"
];

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = { city: "Nueva Ciudad" };
  // }
  state = {
    city: null
  };
  handleSelectionLocation = city => {
    this.setState({ city: city });
    console.log(city);
  };
  render() {
    const { city } = this.state;
    return (
      <Grid>
        <Row>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h4" color="inherit">
                Weather App
              </Typography>
            </Toolbar>
          </AppBar>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <LocationList
              cities={cities}
              onSelecectedLocation={this.handleSelectionLocation}
            />
          </Col>
          <Col xs={12} md={6}>
            <Paper elevation={4}>
              <div className="details">
                {city === null ? null : <ForecastExtended city={city} />}
              </div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
