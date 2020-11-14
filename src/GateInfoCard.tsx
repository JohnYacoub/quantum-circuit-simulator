import React, { FC } from "react";
import { BounceInAnimation } from "./BounceInTopAnimation";
import styled from "styled-components/macro";

type GateCardProps = {
  gateName:
     any;
};

const StyledCard = styled.div`
  float: right;
  position: absolute;
  display: inline;
  border-radius: 0.3rem;
  border: 2px solid #1efbfb;
  max-width: 10rem;
  div {
    margin: 0.7rem;
  }
  .header {
    border-bottom: 2px dashed #1efbfb;
    font-size: 1.5rem;
    padding-bottom: 0.3rem;
  }
  .content {
  }
  div.equation {
    text-align: center;
  }
  ${BounceInAnimation}
`;

const gateInfoContent = {
  H:
    "The H, or Hadamard, gate rotates the states |0⟩ and |1⟩ to |+⟩ and |-⟩, respectively. It is useed for making superpositions.",
  CNOT:
    "The controlled-X gate performs an X on the target qubit whenever the control qubit is in state |1⟩.",
  T: "The T gate is equivalent to Rz for the angle π/4",
  S:
    "The S gate is applies a phase of i to the |1⟩ state. It is equivalent to Rz for the angle π/2.",
  X:
    "The Pauli X gate, also known as the NOT gate, flips the |0⟩ state |1⟩ and vica versa.",
  Y: "The Pauli Y gate is equivalent to Ry for the angle π.",
  Z:
    "The Pauli Z gate acts as identity on the |0⟩ state and multiplies the sign of the |1⟩ state by -1.",
  Rx:
    "On the Bloch sphere, this gate corresponds to rotating the qubit state around the x axis by the given angle.",
  Ry:
    "On the Bloch sphere, this gate corresponds to rotating the qubit state around the y axis by the given angle.",
  Rz:
    "On the Bloch sphere, this gate corresponds to rotating the qubit state around the z axis by the given angle.",
  "Quantum": "Hover over a gate to see more information!",
};
const getColor = (gateName: string) => {
  switch (gateName) {
    case "H":
      return "#b186f7";
    case "T":
    case "S":
      return "#ff26a8";
    case "X":
    case "Y":
    case "Z":
      return "#fdb813";
    case "Rx":
    case "Ry":
    case "Rz":
      return "#c9fb1e";
    case "CNOT":
    default:
      return "#1efbfb";
  }
};

const GateInfoCard: FC<GateCardProps> = ({ gateName }) => (
  <StyledCard>
    <div className="header" style={{ color: getColor(gateName) }}>
      {gateName} gate
    </div>

    <div className="content" style={{ color: getColor(gateName) }}>
      {(gateInfoContent as any)[gateName]}
    </div>
  </StyledCard>
);
export default GateInfoCard;
