import React from "react";
import Paper from "@material-ui/core/Paper";
function QbitCard(props) {
  return (
    <Paper
      id={props.state}
      className={props.clicked ? "selected-state" : "not-selected-state"}
      onClick={props.onClick}
      style={{ textAlign: "center" }}
    >
      
      lol
    </Paper>
  );
}
export default QbitCard;
