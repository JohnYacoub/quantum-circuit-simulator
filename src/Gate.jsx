import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components/macro";

const StyledGate = styled.div`
  div.gate {
    width: 4em;
    height: 4em;
  }

  div.gate-text {
    padding-top: 30%;
    font-weight: bold;
    color: white;
  }

  div.gate:hover {
    background: #3f51b5;
    box-shadow: 0 3px 5px 2px rgba(33, 203, 243, 0.3);
  }
  .H,
  .S,
  .CNOT {
    background-color: #7c4dff;
    fill: #7c4dff;
  }

  .T {
    background-color: #e040fb;
    fill: #e040fb;
  }

  .X,
  .Y,
  .Z {
    background-color: rgb(253, 184, 19);
    fill: rgb(253, 184, 19);
  }

  .Rx,
  .Ry,
  .Rz {
    background-color: #40c4ff;
    fill: #40c4ff;
  }
`;

const Gate = ({ ...props }) => {
  const { g, selectGate } = props;
  return (
    <Grid
      key={g}
      className="gate-wrapper"
      item
      md={1}
      lg={1}
      style={{
        marginRight: "1em",
        textAlign: "-webkit-center",
      }}
    >
      <StyledGate>
        <div className={`${g} gate`} onClick={() => selectGate(g)}>
          <div className="gate-text">{g}</div>
        </div>
      </StyledGate>
    </Grid>
  );
};
export default Gate;
