import React from "react";
import ReactDOM from "react-dom";

class WeightTile extends React.Component {
  render() {
    return (
      <div className="weight-tile">
        <h1>{this.props.date}</h1>
        <h1 className="units">lbs</h1>
      </div>
    );
  }
}

export default WeightTile;
