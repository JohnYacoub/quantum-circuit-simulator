import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MultiQubitPage from "./MultiQubitPage";
import { ThemeProvider } from "@material-ui/styles";
import QuantumTheme from "./QuantumTheme";

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
            <Route exact path="/">
              <MultiQubitPage />
            </Route>
            <Route path="/statistics">
              <div>S</div>
            </Route>
            <Route path="/physics">
              <div>C</div>
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
