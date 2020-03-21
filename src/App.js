import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [movie, setMovies] = useState("no");
  useEffect(() => {
    fetch("http://localhost:5000/probability", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        charset: "UTF-8"
      }
    })
      .then(response =>
        response.json().then(data => {
          setMovies(data.probability);
        })
      )
      .catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });
  });
  return (
    <div className="App">
      <header className="App-header">
        <p style={{fontSize: 50}}>
          <code>Probability of 1: {movie}</code>
        </p>
      </header>
    </div>
  );
}

export default App;
