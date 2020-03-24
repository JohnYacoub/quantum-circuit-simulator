import React from "react";
import Button from "@material-ui/core/Button";
function MeasureButton(props) {
  return (
    <Button
      variant="contained"
      className="button-measure"
      onClick={props.onClick}
    >
      Measure
    </Button>
  );
}
export default MeasureButton;