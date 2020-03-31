import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  qubitInCircuit: {
    fontSize: 15,
    fontWeight: "bold",
    verticalAlign: "middle",
    paddingTop: "25%",
    paddingLeft: "1em"
  }
}));
export default function CircuitQubit(props) {
  return (
    <code className={useStyles().qubitInCircuit}>|{props.qubitState}></code>
  );
}

export function CircuitQubitLabel(props){
  return (
    <code className={useStyles().qubitInCircuit}>q[{props.qubitIdx}]</code>
  );
}
