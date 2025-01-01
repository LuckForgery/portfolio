import React, { useRef, useEffect } from "react";
import { CORE_SKILLS } from "./skills.js";

function Options() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    if (!canvas) return;

    canvas.width = parent.offsetWidth;
    canvas.height = parent.offestHeight / 2; //set canvas to full size of the window
    const ctx = canvas.getContext("2d"); //get the canvas from html
    var HORIZONTAL = 6,
      VERTICAL = 5,
      RADIUS = 50,
      PADDINGX = -5,
      PADDINGY = -20,
      SCALE_FACTOR = 300,
      mouseX = 0,
      mouseY = 0, //save current mouse/finger position
      circles = [], //array of menu items
      centerX = canvas.width / 2,
      centerY = canvas.height / 2, //saves the center position of canvas
      startX,
      startY, //saves position of mouse/finger where draging/swiping starts
      offsetX =
        (canvas.width -
          (RADIUS * 2 * HORIZONTAL +
            PADDINGX * (HORIZONTAL - 1) +
            RADIUS +
            PADDINGX / 2)) /
          2 +
        RADIUS,
      offsetY =
        (canvas.height - (RADIUS * 2 * VERTICAL + PADDINGY * (VERTICAL - 1))) /
          2 +
        RADIUS, //offset to center the menu items and move them around, gets in/decreased by dragging
      oldOffsetX,
      oldOffsetY, //save old offsets to update current offset
      scale,
      i,
      j, //used for counters
      x = 0,
      y = 0; //used for creating the array of circles

    async function initBoard() {
      const loadedImages = await Promise.all(
        CORE_SKILLS.map((skill) => loadImage(skill)),
      );

      let imageIndex = 0;
      for (i = 0; i < VERTICAL; i++) {
        for (j = 0; j < HORIZONTAL; j++) {
          if (
            !(
              (j === 0 && i === 0) ||
              (VERTICAL % 2 === 0 &&
                j === HORIZONTAL - 1 &&
                i === VERTICAL - 1) ||
              (VERTICAL % 2 !== 0 && j === 0 && i === VERTICAL - 1)
            )
          ) {
            addCircle(
              CORE_SKILLS[imageIndex % CORE_SKILLS.length].color,
              loadedImages[imageIndex % CORE_SKILLS.length],
            );
            imageIndex++;
          }
          /* ---- CONTROL for smartphone HERE (remove the line for smartphone screen) ---- */
          x += RADIUS * 2 + PADDINGX; //increase x for the next circle
        }
        if (i === 2) {
          addCircle(
            CORE_SKILLS[imageIndex % CORE_SKILLS.length].color,
            loadedImages[imageIndex % CORE_SKILLS.length],
          );
          imageIndex++;
        }
        x = i % 2 === 0 ? PADDINGX / 2 + RADIUS : 0;
        y += RADIUS * 2 + PADDINGY; //increase y for the next circle row
      }
    }

    function loadImage(skill) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = skill.image;
      });
    }
    function addCircle(colour, image) {
      circles.push({
        x: x,
        y: y,
        color: colour,
        image: image,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas
      ctx.save();

      ctx.translate(offsetX, offsetY);

      for (i = 0; i < circles.length; i++) {
        scale = getDistance(circles[i]);
        ctx.save();
        ctx.translate(circles[i].x, circles[i].y);
        ctx.scale(scale, scale);
        ctx.fillStyle = circles[i].color;
        ctx.beginPath();
        ctx.arc(0, 0, RADIUS, 0, Math.PI * 2);
        ctx.fill();
        if (circles[i].image) {
          const imageSize = RADIUS * 1.5; // Adjust image size as needed
          ctx.drawImage(
            circles[i].image,
            -imageSize / 2, // Center horizontally
            -imageSize / 2, // Center vertically
            imageSize,
            imageSize,
          );
        }
        ctx.restore();
      }

      ctx.restore();
      requestAnimationFrame(draw);
    }

    function getDistance(circle) {
      const verticalScalingFactor = 1.7,
        maxDistX = canvas.width / 2 - RADIUS - PADDINGX / 2,
        maxDistY = canvas.height / 2 - RADIUS - PADDINGY / 2;

      var dx = circle.x - centerX + offsetX,
        dy = circle.y - centerY + offsetY,
        distX = Math.min(Math.abs(dx), maxDistX),
        distY = Math.min(Math.abs(dy), maxDistY),
        dist = Math.sqrt(
          Math.pow(distX, 2) + Math.pow(distY * verticalScalingFactor, 2),
        ),
        scale = 1 - dist / SCALE_FACTOR;

      return scale > 0 ? scale : 0;
    }

    function handleTouch(e) {
      document.body.style.overflow = "hidden";
      canvas.addEventListener("touchmove", handleSwipe);
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      oldOffsetX = offsetX;
      oldOffsetY = offsetY;
    }

    function handleSwipe(e) {
      mouseX = e.changedTouches[0].clientX;
      mouseY = e.changedTouches[0].clientY;
      offsetX = oldOffsetX + mouseX - startX;
      offsetY = oldOffsetY + mouseY - startY;
    }

    function handleClick(e) {
      canvas.addEventListener("mousemove", handleMouse);
      canvas.addEventListener("mouseup", handleRelease);
      startX = e.clientX;
      startY = e.clientY;
      oldOffsetX = offsetX;
      oldOffsetY = offsetY;
      canvas.style.cursor = "grabbing";
    }

    function handleMouse(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      offsetX = oldOffsetX + mouseX - startX;
      offsetY = oldOffsetY + mouseY - startY;
    }

    function handleRelease() {
      canvas.removeEventListener("mouseup", handleRelease);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.style.cursor = "grab";
    }

    canvas.addEventListener("touchstart", handleTouch);
    canvas.addEventListener("mousedown", handleClick);
    canvas.addEventListener("touchend", () => {
      document.body.style.overflow = "auto";
      canvas.removeEventListener("touchmove", handleSwipe);
    });
    window.addEventListener("resize", () => {
      canvas.height = parent.offsetHeight / 2;
      canvas.width = parent.offsetWidth;
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
    });

    initBoard();
    draw();

    return () => {
      // Cleanup function to stop animation and prevent memory leaks
      window.cancelAnimationFrame(draw);
    };
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "flex",
        marginRight: "auto",
        marginLeft: "auto",
        cursor: "grab",
      }}
    />
  );
}

export default Options;
