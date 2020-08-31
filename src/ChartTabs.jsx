import React from "react";
import AppBar from "@material-ui/core/AppBar";
import BarChart from "./BarChart";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    minWidth: 0,
    overflow: "scroll",
  },
}));

export default function ChartTabs(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BarChart qubitNum={props.qubitNum} result={props.result} />
    </div>
  );
}
