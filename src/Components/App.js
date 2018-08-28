import React, { Component } from "react";
import reactDOM from "react-dom";
import "./../Styles/App.css";
import "rc-calendar/assets/index.css";
import TitleBar from "./TitleBar";
import WeightTile from "./WeightTile";
import Calendar from "rc-calendar";
import Menu from "./Menu";
import Graph from "./Graph";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weightEntry: {
        date: ""
      }
    };
  }

  entryData;
  checkState(e) {
    const submitData = document.getElementById("submitData");
    const charCode = e.keyCode;
    this.entryData = e.target.value;
    if (e.target.value === "" || charCode < 48 || charCode > 57) {
      submitData.style.opacity = 0;
    } else {
      submitData.style.opacity = 1;
    }
  }

  submitData() {
    const invalidInputText = document.querySelector(".invalid-input");
    let dataGood = true;
    let res = this.entryData;
    let resArr = res.split("");
    console.log(resArr);
    resArr.forEach(i => {
      if (
        i === "1" ||
        i === "2" ||
        i === "3" ||
        i === "4" ||
        i === "5" ||
        i === "6" ||
        i === "7" ||
        i === "8" ||
        i === "9" ||
        i === "0"
      ) {
        parseInt(i);
        console.log(i);
      } else {
        console.log(`the ${i} should not be here`);
        dataGood = false;
        invalidInputText.style.width = "300px";
      }
    });
    if (dataGood) {
      this.setState({
        weightEntry: {
          date: this.entryData
        }
      });
      //close the button and input
      const dataEntry = document.querySelector(".data-entry");
      const submitDataButton = document.getElementById("submitData");
      invalidInputText.style.width = "0px";
      dataEntry.style.width = "0px";
      dataEntry.style.paddingLeft = "0px";
      submitDataButton.style.opacity = 0;
      setTimeout(() => {
        dataEntry.value = "";
      }, 1000);
    }
  }

  render() {
    return (
      <div className="container view-wrapper">
        <TitleBar />
        <WeightTile date={this.state.weightEntry.date} />
        <div className="calendar-wrapper">
          <Calendar showWeekNumber={false} />
        </div>
        <Menu
          checkState={e => {
            this.checkState(e);
          }}
          submitData={() => {
            this.submitData();
          }}
        />
        <Graph />
      </div>
    );
  }
}

export default App;
