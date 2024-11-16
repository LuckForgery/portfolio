import React, { useState, useEffect } from "react";
import StarryCanvas from "./StarryCanvas.jsx";

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
      <section>Pro. Beyond</section>
    </div>
  );
}
