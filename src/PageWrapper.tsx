import React, { FC } from "react";
import styled from "styled-components/macro";

const StyledPageWrapper = styled.div`
  display: flex;
  main {
    flex-grow: 1;
    height: 100%;
    overflow: auto;
    padding-bottom: 2rem;
  }
  main > div.appBarSpacer {
    min-height: 6rem;
  }
  .muigrid .container: {
    justify-content: center;
  }
`;

const PageWrapper: FC = ({ children }) => {
  return <StyledPageWrapper>{children}</StyledPageWrapper>;
};

export default PageWrapper;
