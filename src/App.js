import React, { useState, useRef, useEffect } from "react";
import logo from "./profile.jpeg";
import "./App.css";
import StarryCanvas from "./StarryCanvas.jsx";

function App() {
  return (
    <>
      <div className="navBar">
        <table>
          <tr className="menue">
            <td id="m1" href="#">
              <a>Home Section</a>
            </td>
            <td id="m2" href="#">
              <a>Education/Experience</a>
            </td>
            <td id="m3" href="#">
              <a>Active Skills</a>
            </td>
            <td id="m4" href="#">
              <a>My Solutions</a>
            </td>
          </tr>
          <tr className="details">
            <td id="name">Darius IC Boteand</td>
            <td id="LinkedIn">
              <div
                onClick={() => {
                  window.open("https://www.linkedin.com/in/darius-ic-boteand");
                }}
              >
                {" "}
                in
              </div>
            </td>
          </tr>
        </table>
      </div>

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
    </>
  );
}

export default App;
