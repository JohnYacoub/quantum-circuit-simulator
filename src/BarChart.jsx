import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  makeWidthFlexible,
  HorizontalGridLines,
} from "react-vis";

function BarChart(props) {
  const BarSeries = VerticalBarSeries;
  const possibleStates = permutations("", "01", props.qubitNum, []);

  const barData = possibleStates.map((state) => {
    return { x: state, y: state === props.result.toString() ? 1 : 0 };
  });

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

  const FlexibleXYPlot = makeWidthFlexible(XYPlot);
  return (
    <div>
      <FlexibleXYPlot
        xType="ordinal"
        height={200}
        xDistance={100}
        color={"lightblue"}
      >
        <HorizontalGridLines />
        <XAxis
          tickLabelAngle={-45}
          style={{ line: { stroke: "#b5b5b5", strokeWidth: 1 } }}
        />
        <YAxis style={{ line: { stroke: "#b5b5b5", strokeWidth: 1 } }} />
        <BarSeries data={barData} />
      </FlexibleXYPlot>
    </div>
  );
}

export default BarChart;
