import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  qubitInCircuit: {
    fontSize: 15,
    fontWeight: "bold",
    verticalAlign: "middle",

    paddingLeft: "1em",
  },
}));
export default function CircuitQubit(props) {
  return (
    <div>
      <code className={useStyles().qubitInCircuit}>q[{props.qubitIdx}]</code>
      <code
        id={props.qubitIdx}
        className={`${useStyles().qubitInCircuit}`}
      >
        {`|${props.qubitState}>`}
      </code>
    </div>
  );
}
