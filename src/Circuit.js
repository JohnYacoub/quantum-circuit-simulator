import React from "react";
function Circuit(props) {
  return props.gateList ? (
    <div style={{ overflow: "auto" }}>
      <svg
        height={100}
        width={3000}
        xmlns="http://www.w3.org/2000/svg"
        //viewBox="0 0 841.9 595.3"
      >
        {props.gateList.map((gate, idx) =>
          gate === "M" ? (
            <g key={gate}>
              <rect
                className="gateRect"
                x={80 * idx} //80*(elemNum-1)
                y={0}
                width={40}
                height={40}
                style={{ fill: "rgb(255, 0, 0)" }}
              ></rect>
              <text
                className="gateRect"
                dominantBaseline="alphabetical"
                x={20 + 80 * idx} //20+80*elemNum
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
          ) : (
            <g key={gate}>
              <line
                className="circuitLine"
                x1={80 * idx + 40}
                x2={80 * idx + 40 + 40}
                y1={20}
                y2={20}
                fill="none"
                style={{
                  stroke: "grey",
                  strokeWidth: 2,
                  strokeLinecap: "round"
                }}
              ></line>
              <rect
                className={`${gate} gateRect`}
                x={80 * idx} //80*(elemNum-1)
                y={0}
                width={40}
                height={40}
              ></rect>
              <text
                className="gateRect"
                dominantBaseline="alphabetical"
                x={20 + 80 * idx} //20+80*elemNum
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
          )
        )}
      </svg>
    </div>
  ) : (
    <div />
  );
}
export default Circuit;
