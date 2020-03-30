import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  qubitInCircuit: {
    fontSize: 20,
    fontWeight: "bold",
    verticalAlign: "middle",
    paddingTop: "25%",
    padding: 0
  }
}));
export default function CircuitQubit(props) {
  return (
    <code className={useStyles().qubitInCircuit}>|{props.qubitState}></code>
  );
}
