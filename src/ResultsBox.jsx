import React from "react";
import BarChart from "./BarChart";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components/macro";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  legend: {
    paddingTop: "1rem",
    fontSize: "1rem",
    color: "#b5b0b0",
    fontWeight: "bold",
  },
}));

const StyledResultBox = styled.div`
  overflow-x: auto;
  padding: 2rem;
  div.results {
    font-family: Source Code Pro, monospace;
  }
`;

const ResultsBox = ({ ...props }) => {
  const { data, result } = props;
  const classes = useStyles();
  return (
    <div>
      {result !== "" ? (
        <StyledResultBox>
          <Grid item className="results" xs={12}>
            <BarChart qubitNum={data.length} result={result} />
            <Typography className={classes.legend} noWrap>
              Computational basis states
            </Typography>
          </Grid>
        </StyledResultBox>
      ) : (
        ``
      )}
    </div>
  );
};
export default ResultsBox;
