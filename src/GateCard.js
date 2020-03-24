import React from "react";
import Button from "@material-ui/core/Button";
function GateCard(props) {
  return (
    <Button variant="contained" className="gate" onClick={props.onClick}>
      <img alt="Gate" src={props.src} />
    </Button>
  );
}
export default GateCard;
