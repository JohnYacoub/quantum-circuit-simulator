import React from "react";
function Circuit(props) {
  return props.gateList ? (
    <svg
      height={40}
      width={3000}
      style={{ overflow: "visible" }}
      xmlns="http://www.w3.org/2000/svg"
      //viewBox="0 0 841.9 595.3"
    >
      <line
        x1={0}
        x2={6000}
        y1={20}
        y2={20}
        fill="none"
        style={{
          stroke: "lightGrey",
          strokeWidth: 1,
          strokeLinecap: "round"
        }}
      ></line>
      {props.gateList.map((gate, idx) => {
        if (gate === "M") {
          return (
            <g key={gate} style={{ maxWidth: "60vw" }}>
              <line
                className="circuitLine"
                x1={0}
                x2={40}
                y1={20}
                y2={20}
                fill="none"
              ></line>
              <rect
                className="gateRect"
                x={40 + 80 * idx}
                y={0}
                ry={20}
                width={40}
                height={40}
                style={{ fill: "rgb(255, 0, 0)" }}
              ></rect>
              <text
                className="gateRect"
                dominantBaseline="alphabetical"
                x={40 + 20 + 80 * idx}
                y={26}
                style={{
                  fontSize: 17,
                  fontStyle: "normal",
                  fill: "white",
                  fontWeight: "bold"
                }}
              >
                <tspan textAnchor="middle">{gate}</tspan>
              </text>
            </g>
          );
        } else if (gate === "I") {
          return (
            <g key={gate} style={{ maxWidth: "60vw" }}>
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
        } else if (gate === "CNOTc") {
          return (
            <g key={gate}>
              <line
                className="firstLine"
                x1={0}
                x2={40}
                y1={20}
                y2={20}
                fill="none"
              ></line>
              <line
                className="fillGapLine"
                x1={80 * idx + 40}
                x2={80 * idx + 40 + 40 - 20}
                y1={20}
                y2={20}
                fill="none"
              ></line>
              <line
                className="circuitLine"
                x1={20 + 80 * idx + 40}
                x2={40 + 80 * idx + 40 + 40}
                y1={20}
                y2={20}
                fill="none"
              ></line>
              <line
                className="cnotGate"
                x1={20 + 40 + 80 * idx}
                x2={20 + 40 + 80 * idx}
                y1={20}
                y2={60}
                fill="none"
                style={{
                  stroke: "grey",
                  strokeWidth: 2,
                  strokeLinecap: "round"
                }}
              ></line>
              <circle cx={20 + 40 + 80 * idx} cy={20} r={10} className="CNOT" />
            </g>
          );
        } else if (gate === "CNOTt") {
          return (
            <g key={gate}>
              <line
                className="firstLine"
                x1={0}
                x2={40}
                y1={20}
                y2={20}
                fill="none"
              ></line>
              <line
                className="circuitLine"
                x1={40 + 80 * idx + 40}
                x2={40 + 80 * idx + 40 + 40}
                y1={20}
                y2={20}
                fill="none"
              ></line>

              <circle cx={20 + 40 + 80 * idx} cy={20} r={15} className="CNOT" />
              <text
                className="gateRect"
                dominantBaseline="alphabetical"
                x={20 + 40 + 80 * idx} //20+80*elemNum
                y={30}
                style={{
                  fontSize: 30,
                  fontStyle: "normal",
                  fill: "white"
                }}
              >
                <tspan textAnchor="middle">{"+"}</tspan>
              </text>
            </g>
          );
        } else {
          return (
            <g key={gate}>
              <line
                className="firstLine"
                x1={0}
                x2={40}
                y1={20}
                y2={20}
                fill="none"
              ></line>
              <line
                className="circuitLine"
                x1={40 + 80 * idx + 40}
                x2={40 + 80 * idx + 40 + 40}
                y1={20}
                y2={20}
                fill="none"
              ></line>
              <rect
                className={`${gate} gateRect`}
                x={40 + 80 * idx} //80*(elemNum-1)
                y={0}
                width={40}
                height={40}
              ></rect>
              <text
                className="gateRect"
                dominantBaseline="alphabetical"
                x={40 + 20 + 80 * idx} //20+80*elemNum
                y={26}
                style={{
                  fontSize: 17,
                  fontStyle: "normal",
                  fill: "white",
                  fontWeight: "bold"
                }}
              >
                <tspan textAnchor="middle">{gate}</tspan>
              </text>
            </g>
          );
        }
      })}
    </svg>
  ) : (
    <div />
  );
}

export default Circuit;
