import React from "react";
import styled from "styled-components/macro";

const StyledPageWrapper = styled.div`
  display: flex;
  main {
    flex-grow: 1;
    height: 100vh;
    overflow: auto;
  }
  main > div.appBarSpacer {
    min-height: 64px;
  }
  main > div.container {
    padding-top: 32px;
    padding-bottom: 32px;
    justify-content: center;
    text-align: -webkit-center;
  }
`;

const PageWrapper = ({ children }) => {
  return <StyledPageWrapper children={children} />;
};

export default PageWrapper;
