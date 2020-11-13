import React from "react";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components/macro";

const StyledBtn = styled.div`
  display: inline;
  margin-right: 1rem;
  button.btn {
    transition: all 0.3s ease 0s;
    box-shadow: 0 3px 5px 2px #b186f7;
  }
  button.btn:hover {
    transform: translateY(-7px);
    background-color: #3f51b5;
    box-shadow: 0 3px 5px 2px #b186f7;
  }
  button > span > svg {
    color: #b186f7;
  }
`;

const StyledButton = ({ onClick, children }) => {
  return (
    <StyledBtn>
      <IconButton className="btn" onClick={onClick}>
        {children}
      </IconButton>
    </StyledBtn>
  );
};
export default StyledButton;
