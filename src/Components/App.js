import React, {
  Component
} from "react";
import "./../Styles/App.css";
import "rc-calendar/assets/index.css";
import TitleBar from "./TitleBar";
import WeightTile from "./WeightTile";
import Calendar from "rc-calendar";
import Menu from "./Menu";
import Graph from "./Graph";
import update from "immutability-helper";
import {
  brush
} from "../../node_modules/d3-brush";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // "0182018": "23",
      // "0282018": "24",
      // "0382018": "25",
      // "0482018": "26",
      // "0582018": "27"
    };
    this.findDate = this.findDate.bind(this);
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

  currentDate;
  formatDate;
  findDate = value => {
    const format = "DD-M-YYYY";
    let date = value.format(format);
    this.formatDate = date.replace(/-/gi, "");
    let newDateEntry = {};
    newDateEntry[this.formatDate] = "-";
    return newDateEntry;
  };

  addDateToState = value => {
    var date = this.findDate(value);
    if (
      this.state[this.formatDate] === "-" ||
      this.state[this.formatDate] === undefined
    ) {
      var newState = update(this.state, {
        $merge: date
      });
      this.setState(newState, () => {
        this.currentDate = date;
      });
    } else {
      this.setState(this.state);
    }
  };

  submitData() {
    const invalidInputText = document.querySelector(".invalid-input");
    let dataGood = true;
    let res = this.entryData;
    let resArr = res.split("");
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
        i === "0" ||
        i === "."
      ) {
        parseInt(i);
      } else {
        dataGood = false;
        invalidInputText.style.width = "300px";
      }
    });
    if (dataGood) {
      let obj = {};
      obj[this.formatDate] = res;
      this.setState(obj, () => {});

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
    return ( <
      div className = "container view-wrapper" >
      <
      TitleBar / >
      <
      WeightTile date = {
        this.state[this.formatDate]
      }
      /> <
      div className = "calendar-wrapper" >
      <
      Calendar onSelect = {
        this.addDateToState
      }
      showWeekNumber = {
        false
      }
      /> <
      /div> <
      Menu checkState = {
        e => {
          this.checkState(e);
        }
      }
      submitData = {
        () => {
          this.submitData();
        }
      }
      /> <
      Graph data = {
        this.state
      }
      /> <
      /div>
    );
  }
}

export default App;