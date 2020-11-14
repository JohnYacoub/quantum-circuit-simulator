import React, { useState } from "react";
import AddButton from "./AddButton";
import StyledButton from "./StyledButton";
import Circuit from "./Circuit";
import CircuitQubit from "./CircuitQubit";
import Container from "@material-ui/core/Container";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Divider from "./Divider";
import Gate from "./Gate";
import Grid from "@material-ui/core/Grid";
import Menu from "./Menu";
import PageWrapper from "./PageWrapper";
import BarChart from "./BarChart";
import BlochSphere from "./BlochSphere";
import SpeedIcon from "@material-ui/icons/Speed";
import Loader from "./Loader";
import QubitInfoCard from "./QubitInfoCard";
import GateInfoCard from "./GateInfoCard";
import DefaultGraph from "./DefaultGraph";
const gatesList = [
  "H",
  "CNOT",
  "X",
  "Y",
  "Z",
  "Rx",
  "Ry",
  "Rz",
  "S",
  "T",
];

const CircuitPage = () => {
  const [activeQubitIdx, setActiveQubitIdx] = useState(0);
  const [newResult, setNewResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [hoveredGate, setHoveredGate] = useState("Quantum");
  const [data, setData] = useState<
    Array<{ idx: number; gates: Array<{ name: string; param: any }> }>
  >([{ idx: 0, gates: [] }]);

  async function getResult() {
    setLoading(true);
    const response = await fetchResult(data);
    if (!response.ok) return console.log("error");
    const body = await response.json();
    const newRes = body.finalResult;

    setNewResult(newRes);
    setLoading(false);
  }

  const selectGate = (gateName: string) => {
    const newData = [...data];
    const param = gateName === "CNOT" ? activeQubitIdx + 1 : "";

    // to help the backend apply the gates in order and the frontend to render gates correctly
    // we add I gates that do nothing and are invisible in the circuit svg
    if (gateName === "CNOT") {
      // not allowing to add CNOT gate when the selected qubit is the last one
      if (!newData[activeQubitIdx + 1]) return;

      const activeQubitGatesNum = newData[activeQubitIdx].gates.length;
      const targetQubitGatesNum = newData[activeQubitIdx + 1].gates.length;
      if (activeQubitGatesNum > targetQubitGatesNum) {
        const diff = activeQubitGatesNum - targetQubitGatesNum;
        newData[activeQubitIdx + 1].gates = [
          ...newData[activeQubitIdx + 1].gates,
          ...new Array(diff).fill({ name: "I", param: "" }),
        ];
      } else if (activeQubitGatesNum < targetQubitGatesNum) {
        const diff = targetQubitGatesNum - activeQubitGatesNum;
        newData[activeQubitIdx].gates = [
          ...newData[activeQubitIdx].gates,
          ...new Array(diff).fill({ name: "I", param: "" }),
        ];
      }

      newData[activeQubitIdx + 1].gates.push({
        name: "CNOTtarget",
        param: param,
      });
    }

    newData[activeQubitIdx].gates.push({ name: gateName, param: param });
    setData(newData);
  };

  const resetAll = () => {
    setNewResult("");
    setActiveQubitIdx(0);
    setData([{ idx: 0, gates: [] }]);
  };

  const addQubit = () => {
    const newQubitIndx = data.length;
    setNewResult("");
    setActiveQubitIdx(newQubitIndx);
    setData([...data, { idx: newQubitIndx, gates: [] }]);
  };

  return (
    <PageWrapper>
      <Menu />
      <main>
        <div className="appBarSpacer" />
        <Container maxWidth="lg">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} style={{ paddingTop: "3%" }}>
              <Grid container>
                <Grid item xs={10} sm={7}>
                  <Grid container spacing={3} style={{ marginBottom: "1rem" }}>
                    {gatesList.slice(0, 5).map((gate) => (
                      <Grid
                        key={gate}
                        item
                        xs={2}
                        onMouseOver={() => setHoveredGate(gate)}
                        onMouseLeave={() => setHoveredGate("Quantum")}
                      >
                        <Gate gateName={gate} selectGate={selectGate} />
                      </Grid>
                    ))}
                  </Grid>
                  <Grid container spacing={3} style={{ marginBottom: "1rem" }}>
                    {gatesList.slice(5, 10).map((gate) => (
                      <Grid
                        key={gate}
                        item
                        xs={2}
                        onMouseOver={() => setHoveredGate(gate)}
                        onMouseLeave={() => setHoveredGate("Quantum")}
                      >
                        <Gate gateName={gate} selectGate={selectGate} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={10} sm={3}>
                  <GateInfoCard gateName={`${hoveredGate}`} />
                </Grid>
              </Grid>
            </Grid>
            {/* <hr
              style={{
                border: "1px dashed white",
                position: "absolute",
                border: "none",
                borderLeft: "3px solid white",
                width: 0,
                height: "224px",
              }}
            /> */}
            <Grid
              item
              xs={12}
              sm={6}
            >
              <BlochSphere width={300} height={240} />
              <div
                id="bloch"
                style={{
                  marginTop: "0rem",
                  marginBottom: "-2rem",
                  display: "inline-block",
                }}
              />
              <QubitInfoCard />
            </Grid>
          </Grid>
        </Container>
        <Divider />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <div style={{ float: "right", marginTop: "-2.5rem" }}>
                <StyledButton onClick={getResult}>
                  <SpeedIcon style={{ fontSize: 20 }} />
                </StyledButton>
                <StyledButton onClick={resetAll}>
                  <DeleteOutlinedIcon style={{ fontSize: 17 }} />
                </StyledButton>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  {data.map((dataItem) => (
                    <CircuitQubit
                      key={dataItem.idx}
                      className={
                        activeQubitIdx === dataItem.idx
                          ? "selected-qubit"
                          : "not-selected-qubit"
                      }
                      qubitIdx={dataItem.idx}
                      onClick={() => setActiveQubitIdx(dataItem.idx)}
                    />
                  ))}
                  <AddButton onClick={addQubit} />
                </Grid>
                <Grid key="circuit" item xs={8}>
                  <Circuit key={"c"} data={data} />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                textAlign: "center",
              }}
            >
               {Object.keys(newResult).length === 0 && <DefaultGraph />}
              {loading ? <Loader /> : <BarChart result={newResult} />}
            </Grid>
          </Grid>
        </Container>
      </main>
    </PageWrapper>
  );
};

export default CircuitPage;

function fetchResult(data: object) {
  return fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      charset: "UTF-8",
    },
    method: "POST",
    body: JSON.stringify({
      data: data,
    }),
  });
}
