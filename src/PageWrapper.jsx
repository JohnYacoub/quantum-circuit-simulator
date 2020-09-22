import React from "react";
import styled from "styled-components/macro";

const StyledPageWrapper = styled.div`
  display: flex;
  main {
    flex-grow: 1;
    height: 100vh;
    overflow: auto;
    padding-bottom: 2rem;
  }
  main > div.appBarSpacer {
    min-height: 6rem;
  }
`;

const PageWrapper = ({ children }) => {
  return <StyledPageWrapper children={children} />;
};

export default PageWrapper;
