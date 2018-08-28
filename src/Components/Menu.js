import React, { Component } from "react";
import ReactDOM from "react-dom";

class Menu extends Component {
  componentDidMount() {
    const dataEntry = document.querySelector(".data-entry");
    const addEntryButton = document.querySelector(".add-entry-button");
    addEntryButton.addEventListener("click", e => {
      dataEntry.style.paddingLeft = "10px";
      dataEntry.style.width = "350px";
    });
  }

  render() {
    return (
      <div className="add-weight-button">
        <h2 className="add-entry-button">Add New Entry</h2>
        <input
          className="data-entry"
          placeholder="Enter Weight Here"
          type="text"
          defaultValue=""
          onChange={e => {
            this.props.checkState(e);
          }}
        />
        <div className="invalid-input">
          <p>Your input is invalid</p>
        </div>
        <button
          id="submitData"
          onClick={() => {
            this.props.submitData();
          }}
        >
          <i className="fas fa-plus" />
        </button>
      </div>
    );
  }
}

export default Menu;
