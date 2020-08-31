import React from "react";
import AddButton from "./AddButton";
import BinButton from "./BinButton";
import Box from "@material-ui/core/Box";
import CalculateCircuit from "./CalculateCircuit";
import Circuit, { CircuitWrapper } from "./Circuit";
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
import styled from "styled-components/macro";
import "./App.css";
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

class MultiQubitPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      activeQubit: 0,
      data: [{ idx: 0, gates: [] }],
    };
  }

  getResult = () => {
    if (this.state.data[0].gates === []) {
      this.setState({ result: "Select at least 1 gate!" });
    } else {
      const maxLength = Math.max(
        ...this.state.data.map((circuitItem) => {
          return circuitItem.gates.length;
        })
      );
      const gates = this.state.data
        .map((circuitItem) => {
          return circuitItem.gates;
        })
        .map((gatesList) => {
          if (gatesList.length < maxLength) {
            const diff = maxLength - gatesList.length;
            console.log([...gatesList, ...new Array(diff).fill("I")]);
            return [...gatesList, ...new Array(diff).fill("I")];
          } else {
            return gatesList;
          }
        });

      // fetch result from backend
      // let resultAsString = "";
      // fetch(`http://localhost:5000/circuit-result`, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //     charset: "UTF-8",
      //   },
      //   method: "POST",
      //   body: JSON.stringify({
      //     qubitNum: `${this.state.data.length}`,
      //     gates: gates,
      //     angle: `${90}`,
      //   }),
      // })
      //   .then((response) =>
      //     response.json().then((data) => {
      //       resultAsString = data.finalResult.join("");
      //       this.setState({
      //         result: resultAsString,
      //       });
      //     })
      //   )
      //   .catch((err) => {
      //     console.log("Error Reading data " + err);
      //   });

      const newDataState = this.state.data.map((dataItem) => {
        return {
          idx: dataItem.idx,
          gates: !dataItem.gates.includes("M")
            ? [...dataItem.gates, "M"]
            : dataItem.gates,
        };
      });

      this.setState({
        activeQubit: 0,
        data: newDataState,
        result: CalculateCircuit(this.state.data.length, gates).join(""),
      });
    }
  };

  selectGate = (gateName) => {
    const cleanMatrix = this.state.data.map((dataItem) => {
      if (dataItem.gates.includes("M"))
        this.setState({
          result: "",
        });
      return dataItem.gates.includes("M")
        ? { idx: dataItem.idx, gates: dataItem.gates.slice(0, -1) }
        : { idx: dataItem.idx, gates: dataItem.gates };
    });
    console.log(cleanMatrix);
    let newDataMatrix = cleanMatrix;
    if (gateName === "CNOT") {
      if (newDataMatrix[this.state.activeQubit + 1] == null) return;
      if (
        newDataMatrix[this.state.activeQubit].gates.length >=
        newDataMatrix[this.state.activeQubit + 1].gates.length
      ) {
        const diff =
          newDataMatrix[this.state.activeQubit].gates.length -
          newDataMatrix[this.state.activeQubit + 1].gates.length;
        newDataMatrix[this.state.activeQubit + 1].gates = [
          ...[
            ...newDataMatrix[this.state.activeQubit + 1].gates,
            ...new Array(diff).fill("I"),
          ],
          "CNOTt",
        ];
        newDataMatrix[this.state.activeQubit].gates.push("CNOTc");
      } else if (
        newDataMatrix[this.state.activeQubit + 1].gates.length >
        newDataMatrix[this.state.activeQubit].gates.length
      ) {
        const diff =
          newDataMatrix[this.state.activeQubit + 1].gates.length -
          newDataMatrix[this.state.activeQubit].gates.length;
        newDataMatrix[this.state.activeQubit].gates = [
          ...[
            ...newDataMatrix[this.state.activeQubit].gates,
            ...new Array(diff).fill("I"),
          ],
          "CNOTc",
        ];

        newDataMatrix[this.state.activeQubit + 1].gates.push("CNOTt");
      }
    } else {
      newDataMatrix[this.state.activeQubit].gates.push(gateName);
    }

    this.setState({
      data: newDataMatrix,
    });
  };

  resetAll = () => {
    this.setState({
      result: "",
      activeQubit: 0,
      data: [{ idx: 0, gates: [] }],
    });
  };

  addQubit = () => {
    const newQubitIndx = this.state.data.length;
    this.setState({
      result: "",
      activeQubit: newQubitIndx,
      data: [...this.state.data, { idx: newQubitIndx, gates: [] }],
    });
  };

  activateQubit = (qubit) => {
    this.setState({
      activeQubit: qubit,
    });
  };

  render() {
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
          <Container maxWidth="lg" className="container">
            <Grid container spacing={3}>
              {/* Gate selection */}
              <Grid item xs={12}>
                <Paper>
                  <Title>Gates</Title>
                  <Grid container spacing={3}>
                    {availableGatesList.map((g) => (
                      <Grid
                        key={g}
                        className="gate-wrapper"
                        item
                        md={1}
                        lg={1}
                        style={{
                          marginRight: "1em",
                          textAlign: "-webkit-center",
                        }}
                      >
                        <Gate g={g} selectGate={this.selectGate} />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
              {/* Circuit */}
              <Grid item xs={12}>
                <Paper>
                  <Title>Circuit</Title>
                  <Grid className="circuit" container spacing={3}>
                    <Grid item xs={12} md={2} lg={2}>
                      <Grid container spacing={3}>
                        {this.state.data.map((dataItem) => (
                          <Grid item xs={12} key={dataItem.idx}>
                            <CircuitQubit
                              className={
                                this.state.activeQubit === dataItem.idx
                                  ? "selected-qubit"
                                  : "not-selected-qubit"
                              }
                              activeQubit={this.state.activeQubit}
                              qubitIdx={dataItem.idx}
                              qubitState={0}
                              onClick={() => this.activateQubit(dataItem.idx)}
                            />
                          </Grid>
                        ))}
                        <Grid item xs={12}>
                          <AddButton onClick={this.addQubit} />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      key="circuit"
                      id="circuitGrid"
                      item
                      xs={12}
                      md={6}
                      lg={6}
                    >
                      <CircuitWrapper>
                        {this.state.data.map((qubit) => (
                          <Circuit key={qubit} gateList={qubit.gates} />
                        ))}
                      </CircuitWrapper>
                    </Grid>
                    <ResultsBox
                      data={this.state.data}
                      result={this.state.result}
                    />
                  </Grid>
                  <MeasureButton onClick={this.getResult} />
                  <BinButton onClick={this.resetAll} />
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
}
export default MultiQubitPage;
