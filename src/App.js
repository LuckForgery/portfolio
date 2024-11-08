import React, { useState, useRef, useEffect } from "react";
import logo from "./profile.jpeg";
import "./App.css";
import StarryCanvas from "./StarryCanvas";

function App() {
  return (
    <div className="App">
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
        <div className="stars">
          <StarryCanvas className="canvas" />
        </div>
      </header>
    </div>
  );
}

export default App;
