import React, { useState } from "react";
import MeasureButton from "./MeasureButton";
import GateCard from "./GateCard";
import BinButton from "./BinButton";
import h from "./images/h.jpg";
import x from "./images/x.jpg";
import y from "./images/y.jpg";
import z from "./images/z.jpg";
import "./App.css";
//comment
function App() {
  const [result, setResult] = useState("");
  const [oneSelected, setOneSelected] = useState(false);
  const [zeroSelected, setZeroSelected] = useState(false);
  const [gates, setGate] = useState('');

  const getResult = () => {
    if (!oneSelected && !zeroSelected) {
      setResult("Choose a start state!");
    } else if(gates.length == 0){
      setResult("Select at least 1 gate!");
    } else {
      let startState;
      if (oneSelected) startState = 1;
      if (zeroSelected) startState = 0;
      let res = "";
      fetch(`http://localhost:5000/result/${startState}/${gates}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          charset: "UTF-8"
        }
      })
        .then(response =>
          response.json().then(data => {
            res = `${data.probability}`;
            setResult(res);
          })
        )
        .catch(err => {
          // Do something for an error here
          console.log("Error Reading data " + err);
        });
    }
  };

  const resetAll = () => {
    setZeroSelected(false);
    setOneSelected(false);
    setGate("");
    setResult("");
  };
  const selectGate = gateName => {
    setGate(gates.concat(gateName));
  };

  function handleQubitClick(qubitState) {
    if (qubitState === 0) {
      setZeroSelected(!zeroSelected);
    } else {
      setOneSelected(!oneSelected);
    }
  }
  console.log(gates);
  return (
    <div className="App">
      <div>
        <QbitCard
          key={0}
          clicked={zeroSelected}
          state={0}
          onClick={() => handleQubitClick(0)}
        />
        <QbitCard
          key={1}
          clicked={oneSelected}
          state={1}
          onClick={() => handleQubitClick(1)}
        />
        <GateCard
          src={h}
          onClick={() => selectGate("H")}
        />
        <GateCard
          src={x}
          onClick={() => selectGate("X")}
        />
        <GateCard
          src={y}
          onClick={() => selectGate("Y")}
        />
        <GateCard
          src={z}
          onClick={() => selectGate("Z")}
        />
        <MeasureButton onClick={getResult} />
        <BinButton onClick={resetAll} />
      </div>
      <p style={{ fontSize: 50 }}>
        <code>Result: {result}</code>
      </p>
    </div>
  );
}

function QbitCard(props) {
  return (
    <div
      id={props.state}
      className={props.clicked ? "selected-state" : "not-selected-state"}
      onClick={props.onClick}
    >
      <div className="ket">
        <code>|{props.state}></code>
      </div>
    </div>
  );
}

export default App;
