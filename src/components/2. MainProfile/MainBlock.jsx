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
    <div className="profile">
      <div className="stars">
        {showCanvas && <StarryCanvas className="canvas" />}
      </div>
      {!showCanvas && (
        <img
          src={logo}
          id="profile"
          alt="profile"
          style={{
            height: `2vh`,
          }}
        />
      )}
      <section>Pro. Beyond</section>
    </div>
  );
}
