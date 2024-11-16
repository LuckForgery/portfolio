import { useState, useEffect } from "react";

const ProfileHandler = (divRef) => {
  const [imageSize, setImageSize] = useState(430);
  const [imagePosition, setImagePosition] = useState(0);

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

      const maxTranslation = 150;
      let translateDistance = maxTranslation * (1 - visibilityPercentage);
      translateDistance = Math.min(translateDistance, maxTranslation);

      setImagePosition(-translateDistance);
    };

    window.addEventListener("scroll", handleScroll);

    const getCookie = (name) => {
      let match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)"),
      );
      return match ? match[2] : null;
    };

    const viewport = document.querySelector("meta[name='viewport']");
    const viewMode = getCookie("view-mode");

    if (viewport) {
      if (viewMode === "desktop") {
        viewport.setAttribute("content", "width=1024");
      } else if (viewMode === "mobile") {
        viewport.setAttribute(
          "content",
          "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no",
        );
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [divRef]); // Ensure divRef is passed as a dependency

  return { imageSize, imagePosition };
};

export default ProfileHandler;
