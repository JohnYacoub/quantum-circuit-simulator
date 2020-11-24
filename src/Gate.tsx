import React, { FC } from "react";
import styled from "styled-components/macro";
import { BounceInAnimation } from "./BounceInTopAnimation";
type GateProps = {
  gateName: string;
  selectGate: any;
};
const StyledGate = styled.div`
  div.gate {
    width: 3.2rem;
    height: 3.2rem;

    border-radius: 0.2rem;
    text-align: center;
    transition: all 0.2s ease-in-out;
    :hover {
      z-index: 5;
      cursor: pointer;
      transform: scale(1.3);
    }
  }

  div.gate-text {
    padding-top: 35%;
    font-weight: bold;
    font-size: 1rem;
  }

  div.gate:hover {
    background: #3f51b5;
    box-shadow: 0 3px 5px 2px rgba(33, 203, 243, 0.3);
  }
  .H {
    border: 2px solid #b186f7;
    color: #b186f7;
  }

  .CNOT {
    border: 2px solid #1efbfb;
    color: #1efbfb;
  }

  .T,
  .S {
    border: 2px solid #ff26a8;
    color: #ff26a8;
  }

  .X,
  .Y,
  .Z {
    border: 2px solid #fdb813;
    color: #fdb813;
  }

  .Rx,
  .Ry,
  .Rz {
    border: 2px solid #c9fb1e;
    color: #c9fb1e;
  }
  ${BounceInAnimation}
  
`;

const Gate: FC<GateProps> = ({ gateName, selectGate }) => {
  return (
    <StyledGate>
      <div className={`${gateName} gate`} onClick={() => selectGate(gateName)}>
        <div className="gate-text">{gateName}</div>
      </div>
    </StyledGate>
  );
};
export default Gate;
