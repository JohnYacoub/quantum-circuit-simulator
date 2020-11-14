import React, { FC } from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components/macro";

type QubitProps = {
  className: string;
  onClick: any;
  qubitIdx: number;
};
const StyledQubit = styled.div`
  width: 4rem;
  color: #b186f7;
  text-align: center;
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

const CircuitQubit: FC<QubitProps> = ({ className, onClick, qubitIdx }) => {
  return (
    <Grid className="qubit" item xs={12} key={qubitIdx} style={{ paddingBottom: "1.4rem" }}>
      <StyledQubit>
        <div className={className} onClick={onClick}>
          <span>q[{qubitIdx}]</span>
        </div>
      </StyledQubit>
    </Grid>
  );
};

export default CircuitQubit;
