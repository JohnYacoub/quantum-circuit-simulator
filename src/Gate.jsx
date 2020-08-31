import React from "react";
import styled from "styled-components/macro";

const StyledGate = styled.div`
  div.gate {
    width: 4em;
    height: 4em;
  }

  div.gate-text {
    padding-top: 30%;
    font-weight: bold;
    color: white;
  }

  div.gate:hover {
    background: #3f51b5;
    box-shadow: 0 3px 5px 2px rgba(33, 203, 243, 0.3);
  }
`;

const Gate = ({ ...props }) => {
  return (
    <StyledGate>
      <div
        className={`${props.g} gate`}
        onClick={() => props.selectGate(props.g)}
      >
        <div className="gate-text">{props.g}</div>
      </div>
    </StyledGate>
  );
};
export default Gate;
