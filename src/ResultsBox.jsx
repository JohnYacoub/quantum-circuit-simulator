import React from "react";
import Grid from "@material-ui/core/Grid";
import ChartBox from "./ChartBox";
import styled from "styled-components/macro";

const StyledResultBox = styled.div`
  div.results {
    margin-top: -3em;
    font-family: Source Code Pro, monospace;
  }
  div.resultsHeader {
    border-radius: 1em;
    background-color: grey;
    color: white;
    height: 2em;
  }
  div.results > div.itemTitle {
    flex-basis: 0%;
  }
`;

const Div = styled.div`
  padding-right: 1em;
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
            <Div>
              Input
              <div>
                {`|
              ${"0".repeat(props.data.length)}
              >`}
              </div>
            </Div>
            <Div>
              Output <div>{`|${props.result}>`}</div>
            </Div>
            <Grid item xs={12}>
              <ChartBox qubitNum={props.data.length} result={props.result} />
            </Grid>
          </Grid>
        </StyledResultBox>
      ) : (
        ``
      )}
    </Grid>
  );
}
