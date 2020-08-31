import React from "react";
import BarChart from "./BarChart";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    minWidth: 0,
    overflow: "scroll",
  },
}));

export default function ChartBox(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BarChart qubitNum={props.qubitNum} result={props.result} />
    </div>
  );
}
