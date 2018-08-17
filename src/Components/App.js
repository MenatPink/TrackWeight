import React, { Component } from "react";
import "./../Styles/App.css";
import TitleBar from "./TitleBar";
import WeightTile from "./WeightTile";

class App extends Component {
  render() {
    return (
      <div class="container view-wrapper">
        <TitleBar />
        <WeightTile />
      </div>
    );
  }
}

export default App;
