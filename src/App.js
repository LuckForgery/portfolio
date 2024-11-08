import React, { useState, useRef, useEffect } from "react";
import logo from "./profile.jpeg";
import "./App.css";
import StarryCanvas from "./StarryCanvas.jsx";

function App() {
  /*
  const [imageSize, setImageSize] = useState(430);
  const [imagePosition, setImagePosition] = useState(0); // Add a new state to track the image position

  const divRef = useRef(null);
  const profileImgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const rect = divRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const divHeight = rect.height;

      const visibleHeight =
        Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const visibilityPercentage = visibleHeight / divHeight;

      if (rect.bottom > 3) {
        setImageSize(70 + visibilityPercentage * 360);
      } else {
        setImageSize(70);
      }

      // Adjust image position
      const maxTranslation = 150; //maximum translation distance
      let translateDistance = maxTranslation * (1 - visibilityPercentage);
      translateDistance = Math.min(translateDistance, maxTranslation);

      setImagePosition(-translateDistance); // Set the translation (negative because it's upward)
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  ref={profileImgRef}
  style={{
    height: `${imageSize}px`,
    transform: `translateY(${imagePosition}px)`,
  }}
*/
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
      <img src={logo} id="profile" alt="profile" />
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
