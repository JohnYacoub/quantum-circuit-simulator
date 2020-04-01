import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import CircuitQubit, { CircuitQubitLabel } from "./CircuitQubit";
import "./App.css";

class MultiQubitPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      activeQubit: 0,
      data: [{ idx: 0, gates: [] }]
    };
  }
  /*const classes = useStyles();
  const [result, setResult] = useState("");
  const [activeQubit, setActiveQubit] = useState(0);
  const [data, setData] = useState([{ idx: 0, gates: [] }]);
  */
  getResult = () => {
    //if (!gates.includes("M")) setGates([...gates, "M"]);
  };
  selectGate = gateName => {
    let newDataMatrix = this.state.data;
   
    
    if (gateName === "CNOT") {
      newDataMatrix[this.state.activeQubit].gates.push("CNOTc");
      newDataMatrix[this.state.activeQubit + 1].gates.push("CNOTt");
    } else{
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
                    {["H", "S", "T",, "CNOT", "X", "Y", "Z", "Rx", "Ry", "Rz"].map(g => (
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
                            <CircuitQubitLabel qubitIdx={dataItem.idx} />
                            <CircuitQubit
                              qubitIdx={dataItem.idx}
                              qubitState={0}
                              onClick={this.activateQubit}
                            />
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
