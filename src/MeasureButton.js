import React from "react";
import Button from "@material-ui/core/Button";
import SpeedIcon from '@material-ui/icons/Speed';
function MeasureButton(props) {
  return (
    <Button
      variant="contained"
      className="button-measure"
      onClick={props.onClick}
    >
      <SpeedIcon style={{fontSize:35}}/>
    </Button>
  );
}
export default MeasureButton;