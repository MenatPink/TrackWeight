import React, { Component } from "react";
import "./../Styles/App.css";
import TitleBar from "./TitleBar";

class App extends Component {
  render() {
    return (
      <div class="container view-wrapper">
        <TitleBar />
      </div>
    );
  }
}

export default App;
