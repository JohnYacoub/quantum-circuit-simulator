import React from "react";
import { BounceInAnimation } from "./BounceInTopAnimation";
import styled from "styled-components/macro";

const StyledCard = styled.div`
  float: right;
  position: absolute;
  display: inline;
  border-radius: 0.3rem;
  border: 2px solid #c9fb1e80;
  color: #c9fb1e;
  max-width: 15rem;
  ${BounceInAnimation}
  div {
    margin: 0.7rem;
  }
  .header {
    border-bottom: 2px dashed #c9fb1e80;
    font-size: 2rem;
    padding-bottom: 0.3rem;
  }
  div.svg {
    text-align: center;
  }
  div.svg > svg {
    vertical-align: middle;
  }
  div.svg > svg,
  div.svg > span {
    margin-right: 0.5rem;
  }
  div.equation {
    text-align: center;
  }
`;

const QubitInfoCard = () => (
  <StyledCard>
    <div className="header">Qubit</div>
    <div>Basic unit of quantum information and is one of two states:</div>
    <div className="svg">
      <svg width={22} height={22}>
        <circle
          cx={11}
          cy={11}
          r={10}
          stroke={"#3f51b5"}
          strokeWidth={2}
          fill={"transparent"}
        />
      </svg>
      <span>|0⟩</span>
      <svg width={22} height={22}>
        <circle cx={11} cy={11} r={10} fill={"#3f51b5"} />
      </svg>
      <span>|1⟩</span>
    </div>
    <div>
      A single qubit can be described as a superposition of these states:
    </div>
    <div className="equation">|Ψ⟩=α|0⟩+β|1⟩</div>
  </StyledCard>
);
export default QubitInfoCard;
