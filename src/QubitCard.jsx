import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  qubitState: {
    fontSize: 15,
    fontWeight: "bold",
    verticalAlign: "middle",
    paddingTop: "25%",
    padding: 0
  }
}));
export default function QubitCard(props) {
  return (
      <div
        className={`${useStyles().qubitState} ${
          props.selectedState === props.q ? "selected-state" : "not-selected-state"
        }`}
        onClick={() => props.handleQubitClick(props.q)}
      >
        <code className={useStyles().qubitState}>|{props.q}></code>
      </div>
  );
}
