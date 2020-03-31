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

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    justifyContent: "center",
    textAlign: "-webkit-center"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    borderRadius: 0
  }
}));

export default function MultiQubitPage() {
  const classes = useStyles();
  const [result, setResult] = useState("");
  const [activeQubit, setActiveQubit] = useState(0);
  const [qubitIndeces, setQubitIndeces] = useState([0]);
  const [data, setData] = useState([{ idx: 0, gates: [] }]);
  const getResult = () => {
    //if (!gates.includes("M")) setGates([...gates, "M"]);
  };
  const selectGate = gateName => {
    let newDataMatrix = data;
    newDataMatrix[activeQubit].gates.push(gateName);
    setData(newDataMatrix);
  };

  const resetAll = () => {
    setData([{ idx: 0, gates: [] }]);
    setQubitIndeces([0]);
    setResult("");
  };

  const addQubit = () => {
    const newQubitIndx = qubitIndeces.length;
    setData([...data, { idx: newQubitIndx, gates: [] }]);
    setQubitIndeces(() => [...qubitIndeces, newQubitIndx]);
  };
  console.log(data);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Menu />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Gate selection */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Title>Gates</Title>
                <Grid container spacing={3}>
                  {["H", "S", "T", "X", "Y", "Z", "Rx", "Ry", "Rz"].map(g => (
                    <Grid
                      key={g}
                      className="gate-wrapper"
                      item
                      xs={18}
                      md={1}
                      lg={1}
                    >
                      <Gate g={g} selectGate={selectGate} />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
            {/* Circuit */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Title>Circuit</Title>
                <Grid className="circuit" container spacing={3}>
                  <Grid className="qubitGrid" item xs={12} md={2} lg={2}>
                    <Grid
                      className="qubitLabelsContainer"
                      container
                      spacing={3}
                    >
                      {qubitIndeces.map(idx => (
                        <Grid className="qubitGrid" item xs={12}>
                          <CircuitQubitLabel qubitIdx={idx} />
                          <CircuitQubit qubitState={0} />
                        </Grid>
                      ))}
                      <Grid className="qubitGrid" item xs={12}>
                        <AddButton onClick={addQubit} />
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
                    <div style={{ overflow: "auto" }}>
                      {data.map(qubit => (
                        <Circuit gateList={qubit.gates} />
                      ))}
                    </div>
                  </Grid>
                  <Grid key="result" item xs={12} md={2} lg={2}>
                    {result !== "" ? <div>Result: {result}</div> : ``}
                  </Grid>
                </Grid>
                <MeasureButton onClick={getResult} />
                <BinButton onClick={resetAll} />
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
