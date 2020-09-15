import React, { useState } from "react";
import { QuantumContext } from "./QuantumContext";

// Create a provider for components to consume and subscribe to changes
export const QuantumContextContainer = (props) => {
  const [activeQubit, setActiveQubit] = useState(0);
  const [result, setResult] = useState("");

  return (
    <QuantumContext.Provider
      value={{
        activeQubit: [activeQubit, setActiveQubit],
        result: [result, setResult],
      }}
    >
      {props.children}
    </QuantumContext.Provider>
  );
};
