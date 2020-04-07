import React, { useState } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  Hint,
  VerticalBarSeries,
  GradientDefs,
  MarkSeries
} from "react-vis";

function BarChart(props) {
  const [value, setValue] = useState(false);
  const BarSeries = VerticalBarSeries;
  /*conditional gradient depending on whether we have a mineral chosen or not */
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
        width={230}
        height={200}
        xDistance={100}
        color={"url(#myGradient)"}
      >
        {gradient}
        <XAxis />
        <YAxis />
        <BarSeries
          data={barData}
          onValueMouseOver={v => setValue(v)}
          onSeriesMouseOut={() => setValue(false)}
        />
       
       
      </XYPlot>
    </div>
  );
}


const barData = [
  { x: "00", y: 0 },
  { x: "01", y: 1 },
  { x: "10", y: 0 },
  { x: "11", y: 0 }
];
export default BarChart;
