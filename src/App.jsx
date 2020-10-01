import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CircuitPage from "./CircuitPage";
import { ThemeProvider } from "@material-ui/styles";
import QuantumTheme from "./QuantumTheme";
import {QuantumContextContainer} from "./QuantumContextContainer";

const App = () => {
  return (
    <ThemeProvider theme={QuantumTheme}>
      <div className="root">
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <Router>
          <Switch>
            <QuantumContextContainer>
              <Route exact path="/">
                <CircuitPage />
              </Route>
              <Route path="/statistics">
                <div>S</div>
              </Route>
              <Route path="/physics">
                <div>C</div>
              </Route>
            </QuantumContextContainer>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
