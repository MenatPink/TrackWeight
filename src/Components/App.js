import React, { Component } from "react";
import "./../Styles/App.css";
import "rc-calendar/assets/index.css";
import TitleBar from "./TitleBar";
import WeightTile from "./WeightTile";
import Calendar from "rc-calendar";

class App extends Component {
  render() {
    return (
      <div className="container view-wrapper">
        <TitleBar />
        <WeightTile />
        <div className="calendar-wrapper">
          <Calendar showWeekNumber={false} />
        </div>
      </div>
    );
  }
}

export default App;
