import React, { useContext, useState } from "react";
import AddButton from "./AddButton";
import BinButton from "./BinButton";
import Circuit from "./Circuit";
import CircuitQubit from "./CircuitQubit";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Gate from "./Gate";
import Grid from "@material-ui/core/Grid";
import MeasureButton from "./MeasureButton";
import Menu from "./Menu";
import PageWrapper from "./PageWrapper";
import Paper from "@material-ui/core/Paper";
import ResultsBox from "./ResultsBox";
import { QuantumContext } from "./QuantumContext";

const availableGatesList = [
  "H",
  "S",
  "CNOT",
  "X",
  "Y",
  "Z",
  "Rx",
  "Ry",
  "Rz",
  "T",
];

function CircuitPage() {
  const { activeQubit, result } = useContext(QuantumContext);
  const [activeQubitIdx, setActiveQubitIdx] = activeQubit;
  const [newResult, setNewResult] = result;
  const [data, setData] = useState([{ idx: 0, gates: [] }]);

  async function getResult() {
    const response = await fetchResult(data);
    const body = await response.json();
    const newRes = body.finalResult;

    setNewResult(newRes);
  }

  const selectGate = (gateName) => {
    const newData = [...data];
    const param = gateName === "CNOT" ? activeQubitIdx + 1 : "";

    // to help the backend apply the gates in order and the frontend to render gates correctly
    // we add I gates that do nothing and are invisible in the circuit svg
    if (gateName === "CNOT") {
      // not allowing to add CNOT gate when the selected qubit is the last one
      if (!newData[activeQubitIdx + 1]) return;

      const activeQubitGatesNum = newData[activeQubitIdx].gates.length;
      const targetQubitGatesNum = newData[activeQubitIdx + 1].gates.length;
      if (activeQubitGatesNum > targetQubitGatesNum) {
        const diff = activeQubitGatesNum - targetQubitGatesNum;
        console.log(diff);
        newData[activeQubitIdx + 1].gates = [
          ...newData[activeQubitIdx + 1].gates,
          ...new Array(diff).fill({ name: "I", param: "" }),
        ];
      } else if (activeQubitGatesNum < targetQubitGatesNum) {
        const diff = targetQubitGatesNum - activeQubitGatesNum;
        newData[activeQubitIdx].gates = [
          ...newData[activeQubitIdx].gates,
          ...new Array(diff).fill({ name: "I", param: "" }),
        ];
      }

      newData[activeQubitIdx + 1].gates.push({
        name: "CNOTtarget",
        param: param,
      });
    }

    newData[activeQubitIdx].gates.push({ name: gateName, param: param });
    setData(newData);
  };

  const resetAll = () => {
    setNewResult("");
    setActiveQubitIdx(0);
    setData([{ idx: 0, gates: [] }]);
  };

  const addQubit = () => {
    const newQubitIndx = data.length;
    setNewResult("");
    setActiveQubitIdx(newQubitIndx);
    setData([...data, { idx: newQubitIndx, gates: [] }]);
  };
  console.log(newResult);
  return (
    <PageWrapper>
      <CssBaseline />
      <Menu />
      <main>
        <div className="appBarSpacer" />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Gate selection */}
            <Grid item xs={12}>
              <Paper>
                <h2
                  style={{
                    fontFamily: "Source Code Pro, monospace",
                    fontWeight: "bold",
                  }}
                >
                  Gates
                </h2>
                <Grid container spacing={3}>
                  {availableGatesList.map((g) => (
                    <Gate key={g} g={g} selectGate={selectGate} />
                  ))}
                </Grid>
              </Paper>
            </Grid>
            {/* Circuit */}
            <Grid item xs={12}>
              <Paper>
              <h2
                  style={{
                    fontFamily: "Source Code Pro, monospace",
                    fontWeight: "bold",
                  }}
                >
                  Circuit
                </h2>
                <Grid container spacing={3}>
                  <Grid item xs={2}>
                    {data.map((dataItem) => (
                      <CircuitQubit
                        key={dataItem.idx}
                        className={
                          activeQubitIdx === dataItem.idx
                            ? "selected-qubit"
                            : "not-selected-qubit"
                        }
                        activeQubit={activeQubitIdx}
                        qubitIdx={dataItem.idx}
                        qubitState={0}
                        onClick={() => setActiveQubitIdx(dataItem.idx)}
                      />
                    ))}
                    <AddButton onClick={addQubit} />
                  </Grid>
                  <Grid key="circuit" item xs={10}>
                    <Circuit key={"c"} data={data} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <ResultsBox data={data} result={newResult} />
                  </Grid>
                  <Grid item xs={12}>
                    <MeasureButton onClick={getResult} />
                    <BinButton onClick={resetAll} />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </PageWrapper>
  );
}

export default CircuitPage;

function fetchResult(data) {
  return fetch(process.env.REACT_APP_BACKEND_BASE_URL, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      charset: "UTF-8",
    },
    method: "POST",
    body: JSON.stringify({
      data: data,
    }),
  });
}

