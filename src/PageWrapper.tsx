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
  #bloch {
    @-webkit-keyframes scale-in-center {
      0% {
        -webkit-transform: scale(0);
        transform: scale(0);
        opacity: 1;
      }
      100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
      }
    }
    @keyframes scale-in-center {
      0% {
        -webkit-transform: scale(0);
        transform: scale(0);
        opacity: 1;
      }
      100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
      }
    }
    -webkit-animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
    animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  .menu,
  .circuit,
  .qubit,
  .btn {
    @-webkit-keyframes scale-in-hor-left {
      0% {
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transform-origin: 0% 0%;
        transform-origin: 0% 0%;
        opacity: 1;
      }
      100% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
        -webkit-transform-origin: 0% 0%;
        transform-origin: 0% 0%;
        opacity: 1;
      }
    }
    @keyframes scale-in-hor-left {
      0% {
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transform-origin: 0% 0%;
        transform-origin: 0% 0%;
        opacity: 1;
      }
      100% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
        -webkit-transform-origin: 0% 0%;
        transform-origin: 0% 0%;
        opacity: 1;
      }
    }
    -webkit-animation: scale-in-hor-left 0.5s
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: scale-in-hor-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  .default-chart,
  .barchart {
    @-webkit-keyframes flip-in-hor-bottom {
      0% {
        -webkit-transform: rotateX(80deg);
        transform: rotateX(80deg);
        opacity: 0;
      }
      100% {
        -webkit-transform: rotateX(0);
        transform: rotateX(0);
        opacity: 1;
      }
    }
    @keyframes flip-in-hor-bottom {
      0% {
        -webkit-transform: rotateX(80deg);
        transform: rotateX(80deg);
        opacity: 0;
      }
      100% {
        -webkit-transform: rotateX(0);
        transform: rotateX(0);
        opacity: 1;
      }
    }
    -webkit-animation: flip-in-hor-bottom 0.5s
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: flip-in-hor-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
`;

const PageWrapper: FC = ({ children }) => {
  return <StyledPageWrapper>{children}</StyledPageWrapper>;
};

export default PageWrapper;
