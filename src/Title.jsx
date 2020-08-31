import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import Typography from "@material-ui/core/Typography";

const StyledTitle = styled.div`
h2{
  font-family: "Source Code Pro", monospace;
  font-weight: bold;
  letter-spacing: -0.03em;}
`;
export default function Title(props) {
  return (
    <StyledTitle>
      <Typography component="h2" variant="h6" color="secondary" gutterBottom>
        {props.children}
      </Typography>
    </StyledTitle>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
