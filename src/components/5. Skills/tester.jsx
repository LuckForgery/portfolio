import React, { useRef, useEffect } from "react";

function CircularMenu() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2; //set canvas to full size of the window
    canvas.style = "display:flex;margin: 0 auto";
    const ctx = canvas.getContext("2d"); //get the canvas from html
    var colors = [
        "#7cb2e1",
        "#87c7fb",
        "#628fb5",
        "#48848f",
        "#69c1d1",
        "#7ee8fc",
        "#6ebbff",
        "#5a98d0",
      ],
      mouseX = 0,
      mouseY = 0, //save current mouse/finger position
      circles = [], //array of menu items
      centerX,
      centerY, //saves the center position of canvas
      startX,
      startY, //saves position of mouse/finger where draging/swiping starts
      offsetX,
      offsetY, //offset to center the menu items and move them around, gets in/decreased by dragging
      oldOffsetX,
      oldOffsetY, //save old offsets to update current offset
      scale,
      i,
      j, //used for counters
      x,
      y, //used for creating the array of circles
      HORIZONTAL = 6,
      VERTICAL = 5,
      RADIUS = 50,
      PADDINGX = -5,
      PADDINGY = -20,
      SCALE_FACTOR = 300;
    offsetX =
      (canvas.width -
        (RADIUS * 2 * HORIZONTAL +
          PADDINGX * (HORIZONTAL - 1) +
          RADIUS +
          PADDINGX / 2)) /
        2 +
      RADIUS; //center the circles by getting its width and calculating the leftover space
    offsetY =
      (canvas.height - (RADIUS * 2 * VERTICAL + PADDINGY * (VERTICAL - 1))) /
        2 +
      RADIUS;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    x = 0;
    y = 0;

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
          addCircle(colors[Math.round(Math.random() * (colors.length - 1))]);
        }
        /* ---- CONTROL for smartphone HERE (remove the line for smartphone screen) ---- */
        x += RADIUS * 2 + PADDINGX; //increase x for the next circle
      }
      if (i === 2) {
        addCircle(colors[Math.round(Math.random() * (colors.length - 1))]);
      }
      x = i % 2 === 0 ? PADDINGX / 2 + RADIUS : 0;
      y += RADIUS * 2 + PADDINGY; //increase y for the next circle row
    }

    function addCircle(colour) {
      circles.push({
        x: x,
        y: y,
        color: colour,
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
      //window.addEventListener("touchmove", handleSwipe);
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      oldOffsetX = offsetX;
      oldOffsetY = offsetY;
    }

    function handleSwipe(e) {
      //disable page scroll
      mouseX = e.changedTouches[0].clientX;
      mouseY = e.changedTouches[0].clientY;
      offsetX = oldOffsetX + mouseX - startX;
      offsetY = oldOffsetY + mouseY - startY;
      //re-enable page scroll
    }

    function handleClick(e) {
      window.addEventListener("mousemove", handleMouse);
      window.addEventListener("mouseup", handleRelease);
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
      window.removeEventListener("mouseup", handleRelease);
      window.removeEventListener("mousemove", handleMouse);
      canvas.style.cursor = "grab";
    }

    draw();

    window.addEventListener("touchstart", handleTouch);
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("touchend", () => {
      window.removeEventListener("touchmove", handleSwipe);
    });
    window.addEventListener("resize", () => {
      canvas.height = window.innerHeight / 2;
      canvas.width = window.innerWidth / 2;
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
    });

    return () => {
      // Cleanup function to stop animation and prevent memory leaks
      window.cancelAnimationFrame(draw);
    };
  }, [canvasRef]);

  return <canvas ref={canvasRef} />;
}

export default CircularMenu;
