import React from "react";
import * as d3 from "d3";

function permutations(c, r, targetLength, resultArray) {
  if (c.length === targetLength) {
    resultArray.push(c);
    return 1;
  }
  let sum;
  for (let i = 0; i < r.length; i++) {
    sum += permutations(c + r.charAt(i), r, targetLength, resultArray);
  }
  return resultArray;
}

function BarChart(props) {
  const possibleStates = permutations("", "01", props.qubitNum, []);
  possibleStates.unshift("");
  const chartWidth = (possibleStates.length - 1) * 75;
  const svgWidth = chartWidth + 40;
  const chartHight = 260;
  const svgHight = 300;

  
  const xAxisScale = d3
    .scaleLinear()
    .domain([0, possibleStates.length - 1])
    .range([0, chartWidth]);
  const yAxisScale = d3.scaleLinear().domain([0, 1]).range([chartHight, 0]);

  return (
    <svg width={svgWidth} height={svgHight} style={{ overflow: "visible" }}>
      <path
        d={["M", 0, chartHight, "v", 0, "V", -10, "v", 6].join(" ")}
        fill="none"
        stroke="lightgrey"
      />
      <rect
        key={"res"}
        x={xAxisScale(possibleStates.indexOf(props.result.toString())) - 30}
        y={0}
        height={yAxisScale(0)}
        width={60}
        fill={"lightblue"}
      />
      {yAxisScale.ticks(5).map((value) => (
        <g key={value} transform={`translate(-10,${yAxisScale(value)})`}>
          <line x1="6" x2="14" stroke="lightgrey" />
          <text
            key={value}
            style={{
              fontSize: "0.7rem",
              textAnchor: "end",
              transform: "translateY(3px)",
              fill: "grey",
            }}
          >
            {value}
          </text>
        </g>
      ))}
      <path
        d={["M", 0, chartHight, "h", 0, "H", chartWidth + 30, "v", 0].join(" ")}
        stroke="#e6e6e9"
        strokeWidth="0.1rem"
      />
      {xAxisScale.ticks(possibleStates.length - 1).map((value) => {
        if (value !== 0) {
          return (
            <g
              key={value}
              transform={`translate(${xAxisScale(value)}, ${chartHight})`}
            >
              <line y2="14" stroke="lightgrey" />
              <text
                key={value}
                style={{
                  fontSize: "1rem",
                  textAnchor: "end",
                  transform: "translate(0.6rem, 2rem)",
                  fill: "grey",
                }}
              >
                {possibleStates[value]}
              </text>
            </g>
          );
        }
      })}
    </svg>
  );
}

export default BarChart;
