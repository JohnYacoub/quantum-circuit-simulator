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
import Circuit from "./Circuit";
import Gate from "./Gate";
import Footer from "./Footer";
import CircuitQubit from "./CircuitQubit";
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
  const [gates, setGate] = useState([]);
  const getResult = () => {
    if (!gates.includes("M")) setGate([...gates, "M"]);
  };
  const selectGate = gateName => {
    let newGates = gates;
    const myind = gates.findIndex(g => g === "M");
    if (myind > -1) newGates = gates.splice(myind, 1);
    setGate([...gates, gateName]);
  };

  const resetAll = () => {
    setGate([]);
    setResult("");
  };

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
                    <CircuitQubit qubitState={0} />
                  </Grid>
                  <Grid key="circuit" item xs={12} md={6} lg={6}>
                    <Circuit gateList={gates} />
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
