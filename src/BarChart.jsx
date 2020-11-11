import React from "react";
import * as d3 from "d3";

function BarChart(props) {
  const keys = Object.keys(props.result);
  const values = Object.values(props.result);
  const chartWidth = keys.length * 75;
  const svgWidth = chartWidth + 40;
  const chartHeight = 260;
  const svgHight = 300;

  const xAxisScale = d3
    .scaleLinear()
    .domain([0, keys.length])
    .range([0, chartWidth]);
  const yAxisScale = d3.scaleLinear().domain([1024, 0]).range([0, chartHeight]);

  return (
    <svg width={svgWidth} height={svgHight} style={{ overflow: "visible" }}>
      <path
        d={["M", 0, chartHeight, "v", 0, "V", -10, "v", 6].join(" ")}
        fill="none"
        stroke="lightgrey"
      />

      {values.map((value, idx) => {
        return (
          <g key={value} transform={`translate(25,0)`}>
            <rect
              key={"res"}
              x={xAxisScale(idx)}
              y={chartHeight - yAxisScale(1024 - value)}
              height={yAxisScale(1024 - value)}
              width={60}
              fill={"lightblue"}
            />
          </g>
        );
      })}

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
            {`${value / 10}%`}
          </text>
        </g>
      ))}
      <path
        d={["M", 0, chartHeight, "h", 0, "H", chartWidth + 30, "v", 0].join(
          " "
        )}
        stroke="#e6e6e9"
        strokeWidth="0.1rem"
      />
      {xAxisScale.ticks(keys.length).map((value, idx) => {
        return (
          <g
            key={value}
            transform={`translate(${xAxisScale(value) + 50}, ${chartHeight})`}
          >
            {idx === keys.length ? "" : <line y2="14" stroke="lightgrey" />}
            <text
              key={value}
              style={{
                fontSize: "1rem",
                textAnchor: "middle",
                transform: "translate(0rem, 2rem)",
                fill: "grey",
              }}
            >
              {keys[idx]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// function permutations(c, r, targetLength, resultArray) {
//   // permutations("", "01", qubitNum, []);
//   if (c.length === targetLength) {
//     resultArray.push(c);
//     return 1;
//   }
//   let sum;
//   for (let i = 0; i < r.length; i++) {
//     sum += permutations(c + r.charAt(i), r, targetLength, resultArray);
//   }
//   return resultArray;
// }

export default BarChart;
