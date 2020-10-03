import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components/macro";

const StyledQubit = styled.div`
  width: 7rem;
  div {
    border-radius: 3px;
    padding-right: 1rem;
    cursor: pointer;
  }
  div.not-selected-qubit:hover {
    box-shadow: 0px 0px 5px rgb(56, 225, 216);
  }
  div.selected-qubit {
    box-shadow: 0 3px 6px 0 rgb(56, 225, 216);
  }
`;

const useStyles = makeStyles((theme) => ({
  qubitInCircuit: {
    fontSize: 15,
    fontWeight: "bold",
    verticalAlign: "middle",
    paddingLeft: "1em",
  },
}));

const CircuitQubit = ({ ...props }) => {
  const { className, onClick, qubitIdx, qubitState } = props;
  return (
    <Grid item xs={12} key={qubitIdx} style={{ marginBottom: "1.5rem" }}>
      <StyledQubit>
        <div className={className} onClick={onClick}>
          <code className={useStyles().qubitInCircuit}>q[{qubitIdx}]</code>
          <code id={qubitIdx} className={`${useStyles().qubitInCircuit}`}>
            {`|${qubitState}>`}
          </code>
        </div>
      </StyledQubit>
    </Grid>
  );
};

export default CircuitQubit;
