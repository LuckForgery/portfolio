import React, { useState, useEffect } from "react";
import StarryCanvas from "./StarryCanvas.jsx";
import logo from "./profile.jpeg";

export default function MainBlock() {
  const [showCanvas, setShowCanvas] = useState(true);

  useEffect(() => {
    const isSmartphone = /Mobi|Android/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth <= 600;

    if (isSmartphone && isSmallScreen) {
      setShowCanvas(false);
    }
  }, []);
  return (
    <>
      {!showCanvas && <img src={logo} id="profileStatic" alt="profile" />}
      <div className={showCanvas ? "profile" : "profileStatic"}>
        <div className="stars">
          {showCanvas && <StarryCanvas className="canvas" />}
        </div>
        <section id={showCanvas ? undefined : "sloganPhone"}>
          Pro. Beyond
        </section>
      </div>
    </>
  );
}
