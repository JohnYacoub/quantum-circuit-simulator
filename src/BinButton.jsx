import React from "react";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components/macro";

const StyledBin = styled.div`
  display: inline;
  button.bin {
    background-color: #38e1d8;

    transition: all 0.3s ease 0s;
    box-shadow: 0 3px 5px 2px rgba(33, 203, 243, 0.3);
  }
  button.bin:hover {
    transform: translateY(-7px);
    background: #38e1d8;
    box-shadow: 0 3px 5px 2px rgba(33, 203, 243, 0.3);
  }
  button > span > svg {
    color: white;
  }
`;

function BinButton(props) {
  return (
    <StyledBin>
      <IconButton className="bin" onClick={props.onClick}>
        <DeleteOutlinedIcon />
      </IconButton>
    </StyledBin>
  );
}
export default BinButton;
