import React from "react";
import * as d3 from "d3";

const variance = 20;
let data = [];
let testDataCircles = [];
const dataMax = Math.max(...data);
let graphHeight = 500;
let graphWidth = 900;
const graphOffset = 5;
var selectedDate;
let newDate;
let testRadius = 10;

Math.getDistance = function(x1, y1, x2, y2) {
  var xs = x2 - x1,
    ys = y2 - y1;
  xs *= xs;
  ys *= ys;
  return Math.sqrt(xs + ys);
};

function map(num, in_min, in_max, out_min, out_max) {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

const randomColorGenerator = () => {
  const num = Math.floor(Math.random() * 255);
  const num2 = Math.floor(Math.random() * 255);
  const num3 = Math.floor(Math.random() * 255);
  return `rgba(${num},${num2}, ${num3})`;
};

class Graph extends React.Component {
  drawSvg(state) {
    newDate = state;
    data = [];
    let circleData = [];
    for (var key in newDate) {
      data.push(newDate[key]);
    }
    for (i = 0; i < data.length; i++) {
      var circle = {
        data: data[i],
        fill: randomColorGenerator(),
        r: 10
      };
      circleData.push(circle);
    }

    const x = d3
      .scaleBand()
      .rangeRound([0, 740])
      .padding(0.1);
    const y = d3.scaleLinear().rangeRound([430, 0]);

    d3.select(".graph")
      .append("svg")
      .attr("width", graphWidth)
      .attr("height", graphHeight);

    d3.select("svg")
      .append("g")
      .attr("transform", "translate(60, 0)")
      .attr("class", "circles-group");

    d3.select("g")
      .append("rect")
      .attr("width", () => {
        return graphWidth - 60;
      })
      .attr("height", () => {
        return graphHeight - 60;
      })
      .attr("class", "inner-svg")
      .attr("fill", "darkgrey");

    d3.select(".inner-svg")
      .selectAll("circle")
      .data(circleData)
      .enter()
      .append("circle")
      .attr("class", "svg-circles")
      .attr("cx", (d, i) => {
        var mappedi = map(i, 0, data.length, graphOffset, graphWidth - 20);
        var x = i * 10;
        var prevx = (i - 1) * 10;
        return i * 30;
      })
      .attr("cy", 0)
      .attr("fill", randomColorGenerator)
      .transition()
      .duration(3000)
      .delay((d, i) => {
        return i * variance;
      })
      .ease(d3.easePolyOut)
      .attr("num", (d, i) => {
        return i;
      })
      .attr("cy", (d, i) => {
        let mapD = map(d, 0, dataMax, graphOffset, graphHeight - 20);
        return d.data;
        // return mapD;
      })
      .attr("r", d => {
        return d.data;
      });

    const svgCircles = document.querySelectorAll(".svg-circles");
    for (var i = 0; i < svgCircles.length; i++) {
      svgCircles[i].addEventListener("click", e => {
        svgCircles.forEach(function(i) {
          i.style.fill = "rgba(249, 104, 111, 1)";
        });
        let svg = e.target;
        svg.style.fill = "#3fc7fa";
        selectedDate = e.target.getAttribute("num");
      });
    }
  }
  redrawSvg() {
    const context = d3.select("svg");
    context.remove();
    newDate = [];
    this.drawSvg(this.props.data);
  }

  componentDidMount() {
    this.drawSvg(this.props.data);
  }

  componentDidUpdate() {
    this.redrawSvg();
  }

  render() {
    return <div className="graph" />;
  }
}

export default Graph;
