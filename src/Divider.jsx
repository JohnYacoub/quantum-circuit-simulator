import React from "react";

const Divider = () => {
  return (
    <div
      style={{
        display: "flex",
        color: "white",
        position: "absolut",
        fontSize: "1.3rem",
        height: "6rem",
        backgroundColor: "#2d3553",
        zIndex: 1701,
        fontWeight: "bold",
        boxShadow: "none",
        overflow: "visible",
        marginBottom: "1rem",
        marginTop: "-2rem",
      }}
    >
      <svg
        id={`appbar`}
        height={"6rem"}
        width={"150%"}
        style={{ overflow: "visible" }}
      >
        {/* yellow straight starting on the left */}
        <line
          x1={0}
          x2={150}
          y1={"50%"}
          y2={"50%"}
          fill="none"
          style={{
            stroke: "#fdb813",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />

        {/* yellow line down */}
        <line
          x1={150}
          x2={170}
          y1={"50%"}
          y2={"80%"}
          fill="none"
          style={{
            stroke: "#fdb813",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        {/* yellow bottom straight */}
        <line
          x1={170}
          x2={300}
          y1={"80%"}
          y2={"80%"}
          fill="none"
          style={{
            stroke: "#fdb813",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        <text
          style={{
            fontSize: 20,
            fontStyle: "normal",
            fill: "white",
          }}
          transform={"translate(210,60)"}
        >
          Circuit
        </text>
        <line
          x1={300}
          x2={320}
          y1={"80%"}
          y2={"50%"}
          fill="none"
          style={{
            stroke: "#1efbfb",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />

        {/* bottom yellow circle */}
        <circle
          cx={300}
          cy={"80%"}
          r={5}
          fill={"#2d3553"}
          stroke={"#fdb813"}
          strokeWidth={2}
        />
        {/* infinite blue line */}
        <line
          x1={320}
          x2={"150%"}
          y1={"50%"}
          y2={"50%"}
          fill="none"
          style={{
            stroke: "#1efbfb",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        {/* blue circle midway */}
        <circle
          cx={"50%"}
          cy={"50%"}
          r={5}
          fill={"#2d3553"}
          stroke={"#1efbfb"}
          strokeWidth={2}
        />
      </svg>
    </div>
  );
};
export default Divider;
