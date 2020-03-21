import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [movie, setMovies] = useState("no");
  useEffect(() => {
    fetch("http://127.0.0.1:5000/movies",  {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'charset':'UTF-8'
       }

    }).then(response =>
      response.json().then(data => {
        setMovies(data.movie);
      })
      ).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      })
 
  });
  return (
    <div className="App">
      <div>{movie}</div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
