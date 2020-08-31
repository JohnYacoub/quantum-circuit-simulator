import React from "react";
import Grid from "@material-ui/core/Grid";
import ChartTabs from "./ChartTabs";
import styled from "styled-components/macro";

const StyledResultBox = styled.div`
  div.results {
    width: 30vw;
    margin-top: -3em;
    font-family: Source Code Pro, monospace;
  }
  div.resultsHeader {
    border-radius: 1em;
    background-color: grey;
    color: white;
    height: 2em;
  }
`;

export default function ResultsBox(props) {
  return (
    <Grid
      key="result"
      item
      xs={12}
      md={props.result !== "" ? 4 : 2}
      lg={props.result !== "" ? 4 : 2}
    >
      {props.result !== "" ? (
        <StyledResultBox>
          <Grid className="results" container spacing={2}>
            <Grid item xs={12} className="resultsHeader">
              Results
            </Grid>
            <Grid item xs={12} sm={6}>
              Input
              <div>
                {`|
              ${new Array(props.data.length).fill(0).map((item) => {
                return item;
              })}
              >`}
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              Output <div>{`|${props.result}>`}</div>
            </Grid>
            <Grid item xs={12}>
              <ChartTabs qubitNum={props.data.length} result={props.result} />
            </Grid>
          </Grid>
        </StyledResultBox>
      ) : (
        ``
      )}
    </Grid>
  );
}
