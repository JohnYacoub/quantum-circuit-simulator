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
        <line
          x1={0}
          x2={props.gateList.length * 2 * 40} //listLength*2*40
          y1={20}
          y2={20}
          fill="none"
          stroke="black"
          style={{ strokeWidth: 2, strokeLinecap: "round" }}
        ></line>
        {props.gateList.map((gate, idx) => (
          <g key={gate}>
            <rect
              x={80 * idx} //80*(elemNum-1)
              y={0}
              width={40}
              height={40}
              style={{ fill: "rgb(253, 184, 19)" }}
            ></rect>
            <text
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
        ))}
      </svg>
    </div>
  ) : (
    <div />
  );
}
export default Circuit;
