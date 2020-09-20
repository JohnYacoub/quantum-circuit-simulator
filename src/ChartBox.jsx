import React from "react";
import BarChart from "./BarChart";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    minWidth: 0,
  },
  legend: {
    paddingTop: "1rem",
    fontSize: "1rem",
    color: "#b5b0b0",
    fontWeight: "bold",
  },
}));

const ChartBox = ({ ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BarChart qubitNum={props.qubitNum} result={props.result} />
      <Typography className={classes.legend} noWrap>
        Computational basis states
      </Typography>
    </div>
  );
};

export default ChartBox;
