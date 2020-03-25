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
import Orders from "./Orders";
import MeasureButton from "./MeasureButton";
import GateCard from "./GateCard";
import Title from "./Title";
import BinButton from "./BinButton";
import "./App.css";
import h from "./images/h.jpg";
import x from "./images/x.jpg";
import y from "./images/y.jpg";
import z from "./images/z.jpg";

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
    flexGrow: 1
  },
  drawerPaper: {
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
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    //display: "flex",
    overflow: "auto",
    flexDirection: "column",
    textAlign: "center"
  },
  fixedHeight: {
    height: 240
  },
  qubitState: {
    fontSize: 30,
    paddingTop: "20%"
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [result, setResult] = useState("");
  const [oneSelected, setOneSelected] = useState(false);
  const [zeroSelected, setZeroSelected] = useState(false);
  const [gates, setGate] = useState("");
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  const selectGate = gateName => {
    setGate(gates.concat(gateName));
  };

  const handleQubitClick = qubitState => {
    if (qubitState === 0) {
      setZeroSelected(!zeroSelected);
    } else {
      setOneSelected(!oneSelected);
    }
  };

  const resetAll = () => {
    setZeroSelected(false);
    setOneSelected(false);
    setGate("");
    setResult("");
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
            color="inherit"
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
            <ChevronLeftIcon />
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
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Title>States</Title>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={6}>
                    <Paper
                      key={0}
                      className={
                        zeroSelected ? "selected-state" : "not-selected-state"
                      }
                      state={0}
                      onClick={() => handleQubitClick(0)}
                    >
                      <div className={qubitState}>|0></div>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Paper
                      key={1}
                      className={
                        oneSelected ? "selected-state" : "not-selected-state"
                      }
                      state={1}
                      onClick={() => handleQubitClick(1)}
                    >
                      <div className={qubitState}>|1></div>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {/* Gate selection */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Title>Gates</Title>
                <GateCard src={h} onClick={() => selectGate("H")} />
                <GateCard src={x} onClick={() => selectGate("X")} />
                <GateCard src={y} onClick={() => selectGate("Y")} />
                <GateCard src={z} onClick={() => selectGate("Z")} />
              </Paper>
            </Grid>
            {/* Circuit */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Title>Circuit</Title>
                <MeasureButton onClick={getResult} />
                <BinButton onClick={resetAll} />
                    <div>Result:  {result}</div>
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
