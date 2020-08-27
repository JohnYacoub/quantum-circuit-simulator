import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Menu from "./Menu";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MeasureButton from "./MeasureButton";
import Title from "./Title";
import BinButton from "./BinButton";
import AddButton from "./AddButton";
import Circuit from "./Circuit";
import Gate from "./Gate";
import Footer from "./Footer";
import ChartTabs from "./ChartTabs";
import CircuitQubit from "./CircuitQubit";
import "./App.css";
import CalculateCircuit from "./CalculateCircuit";
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
      activeQubit: null,
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
      activeQubit: 0,
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
      <div className="wrapper">
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
                <Paper className="paper">
                  <Title>Gates</Title>
                  <Grid container spacing={3}>
                    {availableGatesList.map((g) => (
                      <Grid
                        key={g}
                        className="gate-wrapper"
                        item
                       
                        md={1}
                        lg={1}
                      >
                        <Gate g={g} selectGate={this.selectGate} />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
              {/* Circuit */}
              <Grid item xs={12}>
                <Paper className="paper">
                  <Title>Circuit</Title>
                  <Grid className="circuit" container spacing={3}>
                    <Grid className="qubitGrid" item xs={12} md={2} lg={2}>
                      <Grid
                        className="qubitLabelsContainer"
                        container
                        spacing={3}
                      >
                        {this.state.data.map((dataItem) => (
                          <Grid className="qubitGrid" item xs={12} key={dataItem.idx}>
                            <div
                              className={
                                this.state.activeQubit === dataItem.idx
                                  ? "selected-qubit"
                                  : "not-selected-qubit"
                              }
                              onClick={() => this.activateQubit(dataItem.idx)}
                            >
                              <CircuitQubit
                                activeQubit={this.state.activeQubit}
                                qubitIdx={dataItem.idx}
                                qubitState={0}
                              />
                            </div>
                          </Grid>
                        ))}
                        <Grid className="qubitGrid" item xs={12}>
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
                      <div className="circuitWrapper">
                        {this.state.data.map((qubit) => (
                          <Circuit key={qubit} gateList={qubit.gates} />
                        ))}
                      </div>
                    </Grid>
                    <Grid
                      key="result"
                      item
                      xs={12}
                      md={this.state.result !== "" ? 4 : 2}
                      lg={this.state.result !== "" ? 4 : 2}
                    >
                      {this.state.result !== "" ? (
                        <div>
                          <Grid className="results" container spacing={2}>
                            <Grid
                              className="title"
                              item
                              xs={12}
                              className="resultsHeader"
                            >
                              Results
                            </Grid>
                            <Grid className="title" item xs={12} sm={6}>
                              Input{" "}
                              <div>
                                {`|
                                ${new Array(this.state.data.length)
                                  .fill(0)
                                  .map((item) => {
                                    return item;
                                  })}
                                >`}
                              </div>
                            </Grid>
                            <Grid className="title" item xs={12} sm={6}>
                              Output <div>{`|${this.state.result}>`}</div>
                            </Grid>
                            <Grid className="title" item xs={12}>
                              <ChartTabs
                                qubitNum={this.state.data.length}
                                result={this.state.result}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      ) : (
                        ``
                      )}
                    </Grid>
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
      </div>
    );
  }
}
export default MultiQubitPage;
