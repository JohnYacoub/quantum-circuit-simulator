function H(qubit) {
  return (
    Math.floor(Math.random() * (Math.floor(1) - Math.ceil(0) + 1)) +
    Math.ceil(0)
  );
}
function X(qubit) {
  return qubit === 0 ? 1 : 0;
}
function Y(qubit) {
  return qubit === 0 ? 1 : 0;
}
function Z(qubit) {
  return qubit;
}
function S(qubit) {
  return qubit;
}
function T(qubit) {
  return qubit;
}
function Rx(qubit) {
  return qubit;
}
function Ry(qubit) {
  return qubit;
}
function Rz(qubit) {
  return qubit;
}
function CNOT(qubit1, qubit2) {
  if (qubit1 === 1) {
    return [qubit1, qubit2 === 0 ? 1 : 0];
  } else {
    return [qubit1, qubit2];
  }
}

function ApplyGate(q, gate) {
  if (gate === "X") {
    return X(q);
  } else if (gate === "Y") {
    return Y(q);
  } else if (gate === "Z") {
    return Z(q);
  } else if (gate === "H") {
    return H(q);
  } else if (gate === "S") {
    return S(q);
  } else if (gate === "Rx") {
    return Rx(q);
  } else if (gate === "Ry") {
    return Ry(q);
  } else if (gate === "Rz") {
    return Rz(q);
  } else if (gate === "T") {
    return T(q);
  } else if (gate === "S") {
    return S(q);
  } else if (gate === "I") {
    return q;
  }
}

export default function CalculateCircuit(qubitNum, gatesMatrix) {
  let qs = new Array(qubitNum).fill(0);
  for (let i = 0; i <= gatesMatrix[0].length - 1; i++) {
    for (let j = 0; j <= gatesMatrix.length - 1; j++) {
      if (gatesMatrix[j][i] === "CNOTc") {
        qs[j] = CNOT(qs[j], qs[j + 1])[0];
        qs[j + 1] = CNOT(qs[j], qs[j + 1])[1];
      } else if (gatesMatrix[j][i] === "CNOTt") {
        //
      } else {
        qs.splice(j, 1, ApplyGate(qs[j], gatesMatrix[j][i]));
      }
    }
  }
  return qs;
}
