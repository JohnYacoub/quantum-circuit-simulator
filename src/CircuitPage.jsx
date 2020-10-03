import React, { useContext, useState } from "react";
import AddButton from "./AddButton";
import BinButton from "./BinButton";
import Box from "@material-ui/core/Box";
import CalculateCircuit from "./CalculateCircuit";
import Circuit from "./Circuit";
import CircuitQubit from "./CircuitQubit";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "./Footer";
import Gate from "./Gate";
import Grid from "@material-ui/core/Grid";
import MeasureButton from "./MeasureButton";
import Menu from "./Menu";
import PageWrapper from "./PageWrapper";
import Paper from "@material-ui/core/Paper";
import Title from "./Title";
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
  const [newActiveQubit, setNewActiveQubit] = activeQubit;
  const [newResult, setNewResult] = result;
  const [data, setData] = useState([{ idx: 0, gates: [] }]);

  async function getResult() {
    if (data[0].gates === []) {
      setNewResult("Select at least 1 gate!");
    } else {
      const maxLength = Math.max(
        ...data.map((circuitItem) => {
          return circuitItem.gates.length;
        })
      );
      const gates = data
        .map((circuitItem) => {
          return circuitItem.gates;
        })
        .map((gatesList) => {
          if (gatesList.length < maxLength) {
            const diff = maxLength - gatesList.length;
            return [...gatesList, ...new Array(diff).fill("I")];
          } else {
            return gatesList;
          }
        });

      const newDataState = data.map((dataItem) => {
        return {
          idx: dataItem.idx,
          gates: !dataItem.gates.includes("M")
            ? [...dataItem.gates, "M"]
            : dataItem.gates,
        };
      });

      setNewActiveQubit(0);
      setData(newDataState);

      // works with python backend
      // const response = await fetchResult(data, gates);
      // const body = await response.json();
      // const newRes = body.finalResult.join("");

      const newRes = CalculateCircuit(gates).join("");

      setNewResult(newRes);

    }
  }

  const selectGate = (gateName) => {
    const cleanMatrix = data.map((dataItem) => {
      if (dataItem.gates.includes("M")) setNewResult("");
      return dataItem.gates.includes("M")
        ? { idx: dataItem.idx, gates: dataItem.gates.slice(0, -1) }
        : { idx: dataItem.idx, gates: dataItem.gates };
    });
    let newDataMatrix = cleanMatrix;
    if (gateName === "CNOT") {
      if (newDataMatrix[newActiveQubit + 1] == null) return;
      if (
        newDataMatrix[newActiveQubit].gates.length >=
        newDataMatrix[newActiveQubit + 1].gates.length
      ) {
        const diff =
          newDataMatrix[newActiveQubit].gates.length -
          newDataMatrix[newActiveQubit + 1].gates.length;
        newDataMatrix[newActiveQubit + 1].gates = [
          ...[
            ...newDataMatrix[newActiveQubit + 1].gates,
            ...new Array(diff).fill("I"),
          ],
          "CNOTt",
        ];
        newDataMatrix[newActiveQubit].gates.push("CNOTc");
      } else if (
        newDataMatrix[newActiveQubit + 1].gates.length >
        newDataMatrix[newActiveQubit].gates.length
      ) {
        const diff =
          newDataMatrix[newActiveQubit + 1].gates.length -
          newDataMatrix[newActiveQubit].gates.length;
        newDataMatrix[newActiveQubit].gates = [
          ...[
            ...newDataMatrix[newActiveQubit].gates,
            ...new Array(diff).fill("I"),
          ],
          "CNOTc",
        ];

        newDataMatrix[newActiveQubit + 1].gates.push("CNOTt");
      }
    } else {
      newDataMatrix[newActiveQubit].gates.push(gateName);
    }

    setData(newDataMatrix);
  };

  const resetAll = () => {
    setNewResult("");
    setNewActiveQubit(0);
    setData([{ idx: 0, gates: [] }]);
  };

  const addQubit = () => {
    const newQubitIndx = data.length;
    setNewResult("");
    setNewActiveQubit(newQubitIndx);
    setData([...data, { idx: newQubitIndx, gates: [] }]);
  };

  return (
    <PageWrapper>
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
        rel="stylesheet"
      />
      <CssBaseline />
      <Menu />
      <main>
        <div className="appBarSpacer" />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Gate selection */}
            <Grid item xs={12}>
              <Paper>
                <Title>Gates</Title>
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
                <Title>Circuit</Title>
                <Grid container spacing={3}>
                  <Grid item xs={2}>
                    {data.map((dataItem) => (
                      <CircuitQubit
                        key={dataItem.idx}
                        className={
                          newActiveQubit === dataItem.idx
                            ? "selected-qubit"
                            : "not-selected-qubit"
                        }
                        activeQubit={newActiveQubit}
                        qubitIdx={dataItem.idx}
                        qubitState={0}
                        onClick={() => setNewActiveQubit(dataItem.idx)}
                      />
                    ))}
                    <AddButton onClick={addQubit} />
                  </Grid>
                  <Grid key="circuit" item xs={10}>
                    <Circuit key={"c"} data={data} />
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
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
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </PageWrapper>
  );
}

export default CircuitPage;

function fetchResult(data, gates) {
  return fetch(`http://localhost:5000/circuit-result`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      charset: "UTF-8",
    },
    method: "POST",
    body: JSON.stringify({
      qubitNum: `${data.length}`,
      gates: gates,
    }),
  });
}
