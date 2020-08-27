import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  GradientDefs,
} from "react-vis";

function BarChart(props) {
  const BarSeries = VerticalBarSeries;
  const possibleStates = permutations("", "01", props.qubitNum, []);
  console.log(`Result is: ${props.result}`);
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
  return (
    <div>
      <XYPlot
        xType="ordinal"
        width={300}
        height={200}
        xDistance={100}
        color={"url(#myGradient)"}
      >
        {gradient}
        <XAxis tickLabelAngle={-45} />
        <YAxis />
        <BarSeries data={barData} />
      </XYPlot>
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
