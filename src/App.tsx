import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CircuitPage from "./CircuitPage";

const App = () => {
  return (
    <Router>
      <Route exact path="/">
        <CircuitPage />
      </Route>
    </Router>
  );
};

export default App;
