import React, { useRef, useState, useEffect } from "react";
import profileSlider from "./ProfileHandler.jsx";
import logo from "./profile.jpeg";

export default function ProfileSlider() {
  const divRef = useRef(null);
  const profileImgRef = useRef(null);
  const { imageSize, imagePosition } = profileSlider(divRef);
  const [showSlide, setSlider] = useState(true);
  useEffect(() => {
    const isSmartphone = /Mobi|Android/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth <= 600;

    if (isSmartphone && isSmallScreen) {
      setSlider(false);
    }
  }, []);

  return (
    <>
      {showSlide && (
        <img
          src={logo}
          id="profile"
          alt="profile"
          style={{
            height: `${imageSize}px`,
            transform: `translateY(${imagePosition}px)`,
          }}
          ref={profileImgRef}
        />
      )}
      <div ref={divRef} className="bufferTop" id="home">
        <section>
          We shouldn't spend our lives dreaming success.
          <br />
          Let's make this happen, <span className="blue">together</span>.
        </section>
      </div>
    </>
  );
}
