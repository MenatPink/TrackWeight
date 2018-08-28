import React from "react";
import * as d3 from "d3";

const variance = 20;
const data = [];
(function dataPush() {
  for (let i = 0; i < 250; i++) {
    data.push(Math.floor(Math.random() * variance));
  }
})();
const dataMax = Math.max(...data);
let graphHeight = 1000;
let graphWidth = 900;
const graphOffset = 5;
var selectedDate;

function map(num, in_min, in_max, out_min, out_max) {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

class Graph extends React.Component {
  componentDidMount() {
    d3.select(".graph")
      .append("svg")
      .attr("width", graphWidth)
      .attr("height", graphHeight);

    let circle = d3
      .select("svg")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "svg-circles")
      .attr("cx", (d, i) => {
        var mappedi = map(i, 0, data.length, graphOffset, graphWidth - 20);
        return mappedi;
      })
      .attr("cy", 0)
      .transition()
      .duration(3000)
      .delay((d, i) => {
        return i * variance;
      })
      .ease(d3.easePolyOut)
      .attr("num", (d, i) => {
        return i
      })
      .attr("cy", (d, i) => {
        let mapD = map(d, 0, dataMax, graphOffset, graphHeight - 20);
        return mapD;
      })
      .attr("r", d => {
        return d;
      });

    const svgCircles = document.querySelectorAll(".svg-circles");
    for (var i = 0; i < svgCircles.length; i++) {
      svgCircles[i].addEventListener("click", (e) => {
        svgCircles.forEach(function (i) {
          i.style.fill = "rgba(249, 104, 111, 1)"
        });
        let svg = e.target;
        svg.style.fill = '#3fc7fa';
        selectedDate = e.target.getAttribute('num');
      })
    }


  }

  render() {
    return <div className = "graph" / > ;
  }
}

export default Graph;