import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  GradientDefs,
  makeWidthFlexible,
  HorizontalGridLines,
} from "react-vis";
import * as d3 from "d3";

function BarChart(props) {
  const BarSeries = VerticalBarSeries;
  const possibleStates = permutations("", "01", props.qubitNum, []);

  const barData = possibleStates.map((state) => {
    return { x: state, y: state === props.result.toString() ? 1 : 0 };
  });

  const gradient =
    props.point == null ? (
      <GradientDefs>
        <linearGradient
          id="myGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="200"
          y2="200"
        >
          <stop offset="10%" stopColor="orange" />
          <stop offset="50%" stopColor="pink" />
          <stop offset="90%" stopColor="lightBlue" />
        </linearGradient>
      </GradientDefs>
    ) : (
      <GradientDefs>
        <linearGradient
          id="myGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="200"
          y2="200"
        >
          <stop offset="100%" stopColor="lightGrey" />
        </linearGradient>
      </GradientDefs>
    );

  const FlexibleXYPlot = makeWidthFlexible(XYPlot);
  return (
    <div>
      <FlexibleXYPlot
        xType="ordinal"
        height={200}
        xDistance={100}
        color={"url(#myGradient)"}
      >
        <HorizontalGridLines />
        {gradient}
        <XAxis
          tickLabelAngle={-45}
          style={{ line: { stroke: "#b5b5b5", strokeWidth: 2 } }}
        />
        <YAxis style={{ line: { stroke: "#b5b5b5", strokeWidth: 2 } }} />
        <BarSeries data={barData} />
      </FlexibleXYPlot>
    </div>
  );
}

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

export default BarChart;
