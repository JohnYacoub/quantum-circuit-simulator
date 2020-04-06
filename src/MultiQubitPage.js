import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Menu from "./Menu";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import MeasureButton from "./MeasureButton";
import Title from "./Title";
import BinButton from "./BinButton";
import AddButton from "./AddButton";
import Circuit from "./Circuit";
import Gate from "./Gate";
import Footer from "./Footer";
import CircuitQubit, { CircuitQubitLabel } from "./CircuitQubit";
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
  "T"
];
class MultiQubitPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      activeQubit: null,
      data: [{ idx: 0, gates: [] }]
    };
  }
  /*const classes = useStyles();
  const [result, setResult] = useState("");
  const [activeQubit, setActiveQubit] = useState(0);
  const [data, setData] = useState([{ idx: 0, gates: [] }]);
  */
  getResult = () => {
    if (this.state.data[0].gates === []) {
      this.setState({ result: "Select at least 1 gate!" });
    } else {
      const maxLength = Math.max(
        ...this.state.data.map(circuitItem => {
          return circuitItem.gates.length;
        })
      );
      const gates = this.state.data
        .map(circuitItem => {
          return circuitItem.gates;
        })
        .map(gatesList => {
          if (gatesList.length < maxLength) {
            const diff = maxLength - gatesList.length;
            console.log([...gatesList, ...new Array(diff).fill("I")]);
            return [...gatesList, ...new Array(diff).fill("I")];
          } else {
            return gatesList;
          }
        });

      let res = "";
      fetch(`https://flask-env.eba-crhpybfe.eu-west-2.elasticbeanstalk.com/circuit-result`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          charset: "UTF-8"
        },
        method: "POST",
        body: JSON.stringify({
          qubitNum: `${this.state.data.length}`,
          gates: gates,
          angle: `${90}`
        })
      })
        .then(response =>
          response.json().then(data => {
            res = `${data.finalResult}`;
            this.setState({
              result: res
            });
          })
        )
        .catch(err => {
          console.log("Error Reading data " + err);
        });
      
      const newDataState = this.state.data.map(dataItem => {
        return {
          idx: dataItem.idx,
          gates: !dataItem.gates.includes("M")
            ? [...dataItem.gates, "M"]
            : dataItem.gates
        };
      });
      
      this.setState({
        activeQubit: 0,
        data: newDataState
      });
    }
  };
  selectGate = gateName => {
    const cleanMatrix = this.state.data.map((dataItem)=>{
      return dataItem.gates.includes("M")? { idx: dataItem.idx, gates: dataItem.gates.slice(0,-1) } : { idx: dataItem.idx, gates: dataItem.gates }
    })
    console.log(cleanMatrix)
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
            ...new Array(diff).fill("I")
          ],
          "CNOTt"
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
            ...new Array(diff).fill("I")
          ],
          "CNOTc"
        ];

        newDataMatrix[this.state.activeQubit + 1].gates.push("CNOTt");
      }
    } else {
      newDataMatrix[this.state.activeQubit].gates.push(gateName);
    }

    this.setState({
      data: newDataMatrix
    });
  };

  resetAll = () => {
    this.setState({
      result: "",
      activeQubit: 0,
      data: [{ idx: 0, gates: [] }]
    });
  };

  addQubit = () => {
    const newQubitIndx = this.state.data.length;
    this.setState({
      result: "",
      activeQubit: 0,
      data: [...this.state.data, { idx: newQubitIndx, gates: [] }]
    });
  };

  activateQubit = qubit => {
    this.setState({
      activeQubit: qubit
    });
  };

  render() {
    return (
      <div className="wrapper">
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
                    {availableGatesList.map(g => (
                      <Grid
                        key={g}
                        className="gate-wrapper"
                        item
                        xs={18}
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
                        {this.state.data.map(dataItem => (
                          <Grid className="qubitGrid" item xs={12}>
                            <Tooltip
                              title={
                                this.state.activeQubit === dataItem.idx
                                  ? "Active"
                                  : "Click to activate"
                              }
                            >
                              <div
                                className={
                                  this.state.activeQubit === dataItem.idx
                                    ? "selected-qubit"
                                    : "not-selected-qubit"
                                }
                              >
                                <CircuitQubitLabel qubitIdx={dataItem.idx} />
                                <CircuitQubit
                                  activeQubit={this.state.activeQubit}
                                  qubitIdx={dataItem.idx}
                                  qubitState={0}
                                  onClick={this.activateQubit}
                                />
                              </div>
                            </Tooltip>
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
                        {this.state.data.map(qubit => (
                          <Circuit gateList={qubit.gates} />
                        ))}
                      </div>
                    </Grid>
                    <Grid key="result" item xs={12} md={2} lg={2}>
                      {this.state.result !== "" ? (
                        <div>Result: {this.state.result}</div>
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
