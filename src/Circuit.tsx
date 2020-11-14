import React, { FC } from "react";
import styled from "styled-components/macro";
type CircuitProps = {
  data: Array<{ gates: Array<{ name: string; param: string }>; idx: number }>;
};
const StyledCircuitWrapper = styled.div`
  overflow: auto;
  padding-bottom: 2rem;
  svg {
    padding-bottom: 0.8rem;
  }
  svg > g > rect.gateRect {
    @keyframes gatesFadeIn {
      0% {
        fill: transparent;
      }
    }
    animation: 2s ease-out 0s 1 gatesFadeIn;
    }    
  }

`;

const getColor = (gateName: string) => {
  switch (gateName) {
    case "H":
      return "#b186f7";
    case "T":
    case "S":
      return "#ff26a8";
    case "X":
    case "Y":
    case "Z":
      return "#fdb813";
    case "Rx":
    case "Ry":
    case "Rz":
      return "#c9fb1e";
  }
};

const Circuit: FC<CircuitProps> = ({ data }) => {
  return data ? (
    <StyledCircuitWrapper className="circuit">
      {data.map((qubit, i) => (
        <svg
          id={`svg-${i}`}
          key={i}
          height={40}
          width={3000}
          style={{ overflow: "visible" }}
        >
          <line
            x1={0}
            x2={6000}
            y1={20}
            y2={20}
            fill="none"
            style={{
              stroke: "#d3d3d38c",
              strokeWidth: 1,
              strokeLinecap: "round",
            }}
          ></line>
          {qubit.gates.map((gate, idx) => {
            if (gate.name === "I") {
              return (
                <g key={gate.name + idx} style={{ maxWidth: "60vw" }}>
                  <line
                    className="fillerLine"
                    x1={40 + 80 * idx}
                    x2={40 + 80 * idx + 80}
                    y1={20}
                    y2={20}
                    fill="none"
                  ></line>
                </g>
              );
            } else if (gate.name === "CNOT") {
              return (
                <g key={gate.name + idx}>
                  <line
                    className="cnotGate"
                    x1={20 + 40 + 80 * idx}
                    x2={20 + 40 + 80 * idx}
                    y1={20}
                    y2={60}
                    fill="none"
                    style={{
                      stroke: "#1efbfb",
                      strokeWidth: 2,
                      strokeLinecap: "round",
                    }}
                  ></line>
                  <circle
                    cx={20 + 40 + 80 * idx}
                    cy={20}
                    r={10}
                    fill={"#3f51b5"}
                    strokeWidth={"2px"}
                    stroke={"#1efbfb"}
                  />
                </g>
              );
            } else if (gate.name === "CNOTtarget") {
              return (
                <g key={gate.name + idx}>
                  <circle
                    cx={20 + 40 + 80 * idx}
                    cy={20}
                    r={15}
                    fill={"#3f51b5"}
                    strokeWidth={"2px"}
                    stroke={"#1efbfb"}
                  />
                  <text
                    className="gateRect"
                    dominantBaseline="alphabetical"
                    x={20 + 40 + 80 * idx} //20+80*elemNum
                    y={25}
                    style={{
                      fontSize: 30,
                      fontStyle: "normal",
                      fill: "#1efbfb",
                    }}
                  >
                    <tspan textAnchor="middle">{"+"}</tspan>
                  </text>
                </g>
              );
            } else {
              return (
                <g key={gate.name + idx}>
                  <rect
                    className={`${gate.name} gateRect`}
                    x={40 + 80 * idx} //80*(elemNum-1)
                    y={0}
                    rx={3}
                    ry={3}
                    width={40}
                    height={40}
                    fill={"#3f51b5"}
                    strokeWidth={"2px"}
                    stroke={getColor(gate.name)}
                  ></rect>
                  <text
                    className={`${gate.name} text`}
                    dominantBaseline="alphabetical"
                    x={40 + 20 + 80 * idx} //20+80*elemNum
                    y={26}
                    style={{
                      fontSize: 17,
                      fontStyle: "normal",
                      strokeWidth: 0,
                      fill: getColor(gate.name),
                    }}
                  >
                    <tspan textAnchor="middle">{gate.name}</tspan>
                  </text>
                </g>
              );
            }
          })}
        </svg>
      ))}
    </StyledCircuitWrapper>
  ) : (
    <div />
  );
};

export default Circuit;
