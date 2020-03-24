import React, { useState } from "react";
import MeasureButton from "./MeasureButton";
import GateCard from "./GateCard";
import QbitCard from "./QbitCard";
import BinButton from "./BinButton";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
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
  const [gates, setGate] = useState("");

  const getResult = () => {
    if (!oneSelected && !zeroSelected) {
      setResult("Choose a start state!");
    } else if (gates.length === 0) {
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
      <div style={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper style={{ textAlign: "center" }}>
              <Grid style={{textAlign: "center"}} container spacing={2}>
                <Grid item xs={12}>Choose a state</Grid>
                <Grid item xs={6}>
                  <Paper
                    key={0}
                    className={zeroSelected ? "selected-state" : "not-selected-state"}
                    state={0}
                    onClick={() => handleQubitClick(0)}
                  ><div style={{paddingTop:'30%'}}>|0></div></Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper
                    key={1}
                    className={oneSelected ? "selected-state" : "not-selected-state"}
                    state={1}
                    onClick={() => handleQubitClick(1)}
                  >
                    <div style={{paddingTop:'30%'}}>|1></div>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper spacing={2} style={{ textAlign: "center" }}>
              <GateCard src={h} onClick={() => selectGate("H")} />
              <GateCard src={x} onClick={() => selectGate("X")} />
              <GateCard src={y} onClick={() => selectGate("Y")} />
              <GateCard src={z} onClick={() => selectGate("Z")} />
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper spacing={2} style={{ textAlign: "center" }}>
              <MeasureButton onClick={getResult} />
              <BinButton onClick={resetAll} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper spacing={2} style={{ textAlign: "center" }}>
              <p style={{ fontSize: 50 }}>
                <code>Result: {result}</code>
              </p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
