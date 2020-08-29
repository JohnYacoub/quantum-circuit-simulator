import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MultiQubitPage from "./MultiQubitPage";
import { createMuiTheme } from "@material-ui/core/styles";

import { ThemeProvider } from "@material-ui/styles";
const theme = createMuiTheme({
  palette: {
    primary: { main: "#f8f8ff" },
    secondary: { main: "#000000" },
  },
});
export default function App() {
  return (
    <ThemeProvider theme={theme}>
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
