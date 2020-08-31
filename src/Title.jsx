import React from "react";
import styled from "styled-components/macro";
import Typography from "@material-ui/core/Typography";

const StyledTitle = styled.div`
  h2 {
    font-family: "Source Code Pro", monospace;
    font-weight: bold;
    letter-spacing: -0.03em;
  }
`;
const Title = ({ children }) => {
  return (
    <StyledTitle>
      <Typography component="h2" variant="h6" color="secondary" gutterBottom>
        {children}
      </Typography>
    </StyledTitle>
  );
};

export default Title;
