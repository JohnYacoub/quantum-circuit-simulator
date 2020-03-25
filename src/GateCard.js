import React from "react";
import Grid from "@material-ui/core/Grid";
function GateCard(props) {
  return (
    <Grid className="gate-wrapper" item xs={18} md={2} lg={2}>
      <div className={`${props.gateName} gate`} onClick={() => props.onClick}>
        <div className="gate-text">{props.gateName}</div>
      </div>
    </Grid>
  );
}
export default GateCard;
