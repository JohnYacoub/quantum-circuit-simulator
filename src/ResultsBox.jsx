import React from "react";
import Grid from "@material-ui/core/Grid";
import ChartBox from "./ChartBox";
import styled from "styled-components/macro";

const StyledResultBox = styled.div`
  div.results {
    font-family: Source Code Pro, monospace;
  }
`;

const ResultsBox = ({ ...props }) => {
  return (
    <div>
      {props.result !== "" ? (
        <StyledResultBox>
          <Grid item className="results" xs={12} spacing={2}>
            <ChartBox qubitNum={props.data.length} result={props.result} />
          </Grid>
        </StyledResultBox>
      ) : (
        ``
      )}
    </div>
  );
};
export default ResultsBox;
