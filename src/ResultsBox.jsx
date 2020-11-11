import React from "react";
import BarChart from "./BarChart";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components/macro";

const StyledResultBox = styled.div`
  overflow-x: auto;
  padding: 2rem;
  div.results {
    font-family: Source Code Pro, monospace;
  }
`;

const ResultsBox = ({ data, result }) => {
  return (
    <div>
      {result !== "" ? (
        <StyledResultBox>
          <Grid item className="results" xs={12}>
            <BarChart qubitNum={data.length} result={result} />
            <div
              style={{
                paddingTop: "1rem",
                fontSize: "1rem",
                color: "#b5b0b0",
                fontWeight: "bold",
              }}
            >
              Computational basis states
            </div>
          </Grid>
        </StyledResultBox>
      ) : (
        ``
      )}
    </div>
  );
};
export default ResultsBox;
