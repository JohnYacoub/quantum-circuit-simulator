import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components/macro";

const StyledQubit = styled.div`
  width: 4rem;
  color: #b186f7;
  span {
    font-size: 1.2rem;
    line-height: 2rem;
  }
  div {
    height: 2rem;
    border-radius: 0.2rem;
    cursor: pointer;
    border: 1px dashed #b186f7;
  }
  div.not-selected-qubit:hover {
    background: #3f51b5;
    box-shadow: 0px 0px 5px #b186f7;
  }
  div.selected-qubit {
    background: #3f51b5;
    box-shadow: 0 3px 6px 0 #b186f7;
  }
`;

const CircuitQubit = ({ className, onClick, qubitIdx }) => {
  return (
    <Grid item xs={12} key={qubitIdx} style={{ marginBottom: "1rem" }}>
      <StyledQubit>
        <div className={className} onClick={onClick}>
          <span>q[{qubitIdx}]</span>
        </div>
      </StyledQubit>
    </Grid>
  );
};

export default CircuitQubit;
