import React, { useEffect, useState } from "react";
import MeasureButton from "./MeasureButton";
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
  const [gate, setGate] = useState('');

   const getResult = () => {
    let startState;
    oneSelected ?  startState = 1 :  startState = 0
    let res = "";
    fetch(`http://localhost:5000/result/${startState}/${gate}`, {
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

  const resetAll = () => {
    setZeroSelected(false);
    setOneSelected(false);
    setGate('PauliX')
    setResult("")
  }
  const imageClick = gateName => {
    setGate(gateName);
  }

  function handleQubitClick(qubitState) {
    if (qubitState === 0) {
      setZeroSelected(!zeroSelected);
    } else {
      setOneSelected(!oneSelected);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
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
          <GateCard src={h} selected={gate === "h" ? true : false} onClick={() => imageClick("Hadamard")}/>
          <GateCard src={x} selected={gate === "x" ? true : false} onClick={() => imageClick("PauliX")}/>
          <GateCard src={y} selected={gate === "y" ? true : false} onClick={() => imageClick("PauliY")}/>
          <GateCard src={z} selected={gate === "z" ? true : false} onClick={() => imageClick("PauliZ")}/>
          <MeasureButton onClick={getResult}/>
          <BinButton onClick={resetAll}/>
        </div>
        <p style={{ fontSize: 50 }}>
          <code>Result: {result}</code>
        </p>
      </header>
    </div>
  );
}

function GateCard(props){
  return (
    <div
      className={props.selected ? "selected-gate" : "not-selected-gate"}
      onClick={props.onClick}
    >
      <img src={props.src} />
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
        <code>|{props.state}></code></div>
    </div>
  );
}



export default App;
