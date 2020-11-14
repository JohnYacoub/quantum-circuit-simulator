import React, { FC } from "react";
import { scaleLinear } from "d3";
import styled from "styled-components/macro";

type ChartProps = {
  result: object;
};
const ChartWrapper = styled.div`
  margin-top: -1rem;
  margin-bottom: -2rem;
  maxwidth: 100%;
  overflow: auto;
  svg {
    overflow: visible;
  }
`;

const colours = ["#c9fb1e", "#fdb813", "#ff26a8", "#1efbfb", "#b186f7"];

const BarChart: FC<ChartProps> = ({ result }) => {
  const keys = Object.keys(result);
  const values = Object.values(result);
  const chartWidth = keys.length * 75;
  const svgWidth = chartWidth + 40;
  const chartHeight = 120;
  const svgHight = 170;

  const xAxisScale = scaleLinear()
    .domain([0, keys.length])
    .range([0, chartWidth]);
  const yAxisScale = scaleLinear().domain([1024, 0]).range([0, chartHeight]);

  return Object.keys(result).length > 0 ? (
    <ChartWrapper className="barchart">
      <svg width={svgWidth} height={svgHight} style={{ overflow: "visibile" }}>
        <g transform={`translate(0,20)`}>
          {/* <path
              d={["M", 0, chartHeight, "v", 0, "V", 0, "v", 6].join(" ")}
              stroke="#1efbfb"
              strokeWidth="0.1rem"
              stroke-dasharray="5,5"
            /> */}

          {values.map((value, idx) => {
            return (
              <g key={value} transform={`translate(25,0)`}>
                <rect
                  key={"res"}
                  x={xAxisScale(idx)}
                  y={chartHeight - yAxisScale(1024 - value)}
                  height={yAxisScale(1024 - value)}
                  width={30}
                  fill={"transparent"}
                  rx={3}
                  strokeWidth={2}
                  stroke={colours[idx % 4]}
                />
                <g
                  key={value}
                  transform={`translate(${xAxisScale(idx)},${
                    chartHeight - yAxisScale(1024 - value)
                  })`}
                >
                  <text
                    key={value}
                    style={{
                      fontSize: "1rem",
                      textAnchor: "middle",
                      transform: "translate(1rem, -0.5rem)",
                      fill: colours[idx % 4],
                    }}
                  >
                    {((values[idx] / 1024) * 100).toFixed(2)}%
                  </text>
                </g>
              </g>
            );
          })}

          <circle
            cx={-5}
            cy={chartHeight + 2}
            r={5}
            fill={"#2d3553"}
            stroke={"#1efbfb"}
            strokeWidth={2}
          />
          <path
            d={["M", 0, chartHeight + 2, "h", 0, "H", chartWidth, "v", 0].join(
              " "
            )}
            stroke="#1efbfb"
            strokeWidth="0.1rem"
            strokeDasharray="5,5"
          />
          {xAxisScale.ticks(keys.length).map((value, idx) => {
            return (
              <g
                key={value}
                transform={`translate(${
                  xAxisScale(value) + 40
                }, ${chartHeight})`}
              >
                <text
                  key={value}
                  style={{
                    fontSize: "0.9rem",
                    textAnchor: "middle",
                    transform: "translate(0rem, 1.5rem)",
                    fill: colours[idx % 4],
                  }}
                >
                  {keys[idx]}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </ChartWrapper>
  ) : (
    <div />
  );
};

export default BarChart;
