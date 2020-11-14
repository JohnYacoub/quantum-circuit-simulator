import React from "react";
import { scaleLinear } from "d3";

import SpeedIcon from "@material-ui/icons/Speed";
import styled from "styled-components/macro";

const ChartWrapper = styled.div`
  margin-top: -1rem;
  margin-bottom: -2rem;
  maxwidth: 100%;
  overflow: auto;
  div {
    color: #5869c5;
    font-weight: bold;
  }
`;

const DefaultGraph = () => {
  const chartWidth = 5 * 40;
  const svgWidth = chartWidth + 40;
  const chartHeight = 120;
  const svgHight = 150;

  const xAxisScale = scaleLinear().domain([0, 5]).range([0, chartWidth]);
  const yAxisScale = scaleLinear().domain([1024, 0]).range([0, chartHeight]);

  return (
    <ChartWrapper className="default-chart">
      <div>
        Grab some gates and click <SpeedIcon style={{verticalAlign: "bottom"}} />
      </div>
      <svg width={svgWidth} height={svgHight} style={{ overflow: "visibile" }}>
        <g transform={`translate(0,20)`}>
          <rect
            key={"res"}
            x={xAxisScale(0)}
            y={chartHeight - yAxisScale(1024 - 700)}
            height={yAxisScale(1024 - 700)}
            width={30}
            fill={"transparent"}
            rx={3}
            strokeWidth={2}
            stroke={"#3f51b5"}
            transform={`translate(25,0)`}
          />
          <rect
            key={"res"}
            x={xAxisScale(0)}
            y={chartHeight - yAxisScale(1024 - 400)}
            height={yAxisScale(1024 - 400)}
            width={30}
            fill={"transparent"}
            rx={3}
            strokeWidth={2}
            stroke={"#3f51b5"}
            transform={`translate(65,0)`}
          />
          <rect
            key={"res"}
            x={xAxisScale(0)}
            y={chartHeight - yAxisScale(1024 - 500)}
            height={yAxisScale(1024 - 500)}
            width={30}
            fill={"transparent"}
            rx={3}
            strokeWidth={2}
            stroke={"#3f51b5"}
            transform={`translate(105,0)`}
          />
          <rect
            key={"res"}
            x={xAxisScale(0)}
            y={chartHeight - yAxisScale(1024 - 700)}
            height={yAxisScale(1024 - 700)}
            width={30}
            fill={"transparent"}
            rx={3}
            strokeWidth={2}
            stroke={"#3f51b5"}
            transform={`translate(145,0)`}
          />
          <rect
            key={"res"}
            x={xAxisScale(0)}
            y={chartHeight - yAxisScale(1024 - 600)}
            height={yAxisScale(1024 - 600)}
            width={30}
            fill={"transparent"}
            rx={3}
            strokeWidth={2}
            stroke={"#3f51b5"}
            transform={`translate(185,0)`}
          />
        </g>
      </svg>
    </ChartWrapper>
  );
};

export default DefaultGraph;
