import React from "react";
import Button from "@material-ui/core/Button";
import SpeedIcon from "@material-ui/icons/Speed";
import styled from "styled-components/macro";

const StyledMeasureButton = styled.div`
  display: inline;
  button.button-measure {
    background: #07dacf;
    border-radius: 100%;
    border: 0px;
    color: white;
    width: 4em;
    height: 4.5em;
    box-shadow: 0 3px 5px 2px rgba(33, 203, 243, 0.3);
    transition: all 0.3s ease 0s;
    font-weight: bold;
    margin: 1em;
  }
  button.button-measure:hover {
    background: #07dacf;
    transform: translateY(-7px);
    box-shadow: 0 3px 5px 2px rgba(33, 203, 243, 0.3);
  }
`;
function MeasureButton(props) {
  return (
    <StyledMeasureButton>
      <Button
        variant="contained"
        className="button-measure"
        onClick={props.onClick}
      >
        <SpeedIcon style={{ fontSize: 35 }} />
      </Button>
    </StyledMeasureButton>
  );
}
export default MeasureButton;
