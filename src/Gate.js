import React from "react";

export default function Gate(props) {
  return (
    <div
      className={`${props.g} gate`}
      onClick={() => props.selectGate(props.g)}
    >
      <div className="gate-text">{props.g}</div>
    </div>
  );
}
