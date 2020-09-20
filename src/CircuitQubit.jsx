import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components/macro";

const StyledQubit = styled.div`
  width:7rem;
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
  return (
    <StyledQubit>
      <div className={props.className} onClick={props.onClick}>
        <code className={useStyles().qubitInCircuit}>q[{props.qubitIdx}]</code>
        <code id={props.qubitIdx} className={`${useStyles().qubitInCircuit}`}>
          {`|${props.qubitState}>`}
        </code>
      </div>
    </StyledQubit>
  );
};

export default CircuitQubit;