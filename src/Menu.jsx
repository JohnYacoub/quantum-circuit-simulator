import React from "react";
import AppBar from "@material-ui/core/AppBar";

const Menu = () => {
  return (
    <AppBar
      position="absolute"
      style={{
        color: "white",
        fontSize: "1.3rem",
        height: "6rem",
        backgroundColor: "#2d3553",
        zIndex: 1201,
        fontWeight: "bold",
        boxShadow: "none",
      }}
    >
      <svg
        id={`appbar`}
        height={"6rem"}
        width={"100%"}
        style={{ overflow: "visible" }}
      >
        {/* pink straight starting on the left */}
        <line
          x1={0}
          x2={100}
          y1={"50%"}
          y2={"50%"}
          fill="none"
          style={{
            stroke: "#ff26a8",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        {/* pink second line up */}
        <line
          x1={100}
          x2={120}
          y1={"50%"}
          y2={"20%"}
          fill="none"
          style={{
            stroke: "#ff26a8",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        {/* pink line down */}
        <line
          x1={100}
          x2={120}
          y1={"50%"}
          y2={"80%"}
          fill="none"
          style={{
            stroke: "#ff26a8",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        {/* pink bottom straight */}
        <line
          x1={120}
          x2={350}
          y1={"80%"}
          y2={"80%"}
          fill="none"
          style={{
            stroke: "#ff26a8",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        {/* pink top straight */}
        <line
          x1={120}
          x2={150}
          y1={"20%"}
          y2={"20%"}
          fill="none"
          style={{
            stroke: "#ff26a8",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />

        {/* green top straight */}
        <line
          x1={150}
          x2={350}
          y1={"20%"}
          y2={"20%"}
          fill="none"
          style={{
            stroke: "#c9fb1e",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        {/* green line down */}
        <line
          x1={350}
          x2={370}
          y1={"20%"}
          y2={"50%"}
          fill="none"
          style={{
            stroke: "#c9fb1e",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        <line
          x1={350}
          x2={370}
          y1={"80%"}
          y2={"50%"}
          fill="none"
          style={{
            stroke: "#c9fb1e",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />

        {/* top green circle */}
        <circle
          cx={150}
          cy={"20%"}
          r={5}
          fill={"#2d3553"}
          stroke={"#c9fb1e"}
          strokeWidth={2}
        />
        {/* bottom pink circle */}
        <circle
          cx={350}
          cy={"80%"}
          r={5}
          fill={"#2d3553"}
          stroke={"#ff26a8"}
          strokeWidth={2}
        />
        {/* infinite green line */}
        <line
          x1={370}
          x2={"100%"}
          y1={"50%"}
          y2={"50%"}
          fill="none"
          style={{
            stroke: "#c9fb1e",
            strokeWidth: 2,
            strokeLinecap: "round",
          }}
        />
        {/* green circle midway */}
        <circle
          cx={"50%"}
          cy={"50%"}
          r={5}
          fill={"#2d3553"}
          stroke={"#c9fb1e"}
          strokeWidth={2}
        />
        <text
          style={{
            fontSize: 20,
            fontStyle: "normal",
            fill: "white",
          }}
          transform={"translate(130,55)"}
        >
          Quantum Circuit Simulator
        </text>
      </svg>
    </AppBar>
  );
};
export default Menu;
