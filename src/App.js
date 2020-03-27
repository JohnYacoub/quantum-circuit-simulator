import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import MeasureButton from "./MeasureButton";
import Title from "./Title";
import BinButton from "./BinButton";
import Circuit from "./Circuit";
import "./App.css";

function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"React App powered by Q# and Python"}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    backgroundColor:"black",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    fontWeight:"bold",
    flexGrow: 1
  },
  drawerPaper: {
    background: "black",
    color: "white",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
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
    borderRadius:0
  },
  qubitState: {
    fontSize: 15,
    fontWeight: "bold",
    verticalAlign: "middle",
    paddingTop: "25%",
    padding: 0
  },
  qubitInCircuit: {
    fontSize: 20,
    fontWeight: "bold",
    verticalAlign: "middle",
    paddingTop: "25%",
    padding: 0
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = useState("");
  const [selectedState, setSelectedState] = useState(false);

  const [gates, setGate] = useState([]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getResult = () => {
    if (selectedState === false) {
      setResult("Choose a start state!");
    } else if (gates.length === 0) {
      setResult("Select at least 1 gate!");
    } else {
      let res = "";
      fetch(
        `http://localhost:5000/result/${selectedState}/${gates.join("")}/90`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            charset: "UTF-8"
          }
        }
      )
        .then(response =>
          response.json().then(data => {
            res = `${data.probability}`;
            setResult(res);
          })
        )
        .catch(err => {
          console.log("Error Reading data " + err);
        });
      if (!gates.includes("M")) setGate([...gates, "M"]);
    }
  };

  const selectGate = gateName => {
    let newGates = gates;
    const myind = gates.findIndex(g => g === "M");
    if (myind > -1) newGates = gates.splice(myind, 1);
    setGate([...gates, gateName]);
  };

  const handleQubitClick = qubitState => {
    if (qubitState === selectedState) {
      setSelectedState(false);
    } else {
      setSelectedState(qubitState);
    }
  };

  const resetAll = () => {
    setSelectedState(false);
    setGate([]);
    setResult("");
  };

  const qubitState = clsx(classes.paper, classes.qubitState);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="white"
            noWrap
            className={classes.title}
          >
            Quantum Circuits
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon style={{color:"white"}} />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Qubit States */}
            <Grid item xs={12} md={3} lg={2}>
              <Paper className={classes.paper}>
                <Title>States</Title>
                <Grid container spacing={1}>
                  {[0, 1].map(q => (
                    <Grid key={q} item xs={8} md={0} lg={0}>
                      <div
                        className={`${qubitState} ${
                          selectedState === q
                            ? "selected-state"
                            : "not-selected-state"
                        }`}
                        onClick={() => handleQubitClick(q)}
                      >
                        <code className={qubitState}>|{q}></code>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
            {/* Gate selection */}
            <Grid item xs={12} md={7} lg={10}>
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
                      <div
                        className={`${g} gate`}
                        onClick={() => selectGate(g)}
                      >
                        <div className="gate-text">{g}</div>
                      </div>
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
                    {selectedState !== false ? (
                      <code className={classes.qubitInCircuit}>
                        |{selectedState}>
                      </code>
                    ) : (
                      ``
                    )}
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
