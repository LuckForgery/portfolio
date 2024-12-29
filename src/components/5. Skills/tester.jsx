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
        "#18acf5",
        "#18a555",
        "#ff871c",
        "#ffffff",
        "#ff0000",
        "#de24a8",
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
      VERTICAL = 4, //how many circles will be on the canvas
      RADIUS = 40, //size of circles
      PADDINGX = 20,
      PADDINGY = 20, //the gap between circles
      SCALE_FACTOR = 300; //small number = icons get small faster, smaller number = icons get small slowly
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
        var randomColor =
          colors[Math.round(Math.random() * (colors.length - 1))]; //generating a random color for the menu circle
        var imgLink =
          "https://www.freepik.com/free-photo/handshake-icon-concept-partnership-agreement_35037994.htm#fromView=keyword&page=1&position=7&uuid=ade2bde6-a193-4ed2-83e6-d8dd546d6a39";
        circles.push({
          x: x,
          y: y,
          color: randomColor,
          image: imgLink,
        }); //add circle with x and y coordinates and color to the array
        x += RADIUS * 2 + PADDINGX; //increase x for the next circle
      }

      if (i % 2 === 0) {
        x = PADDINGX / 2 + RADIUS; //if its the second, fourth, sixth etc. row then move the row to right
      } else {
        x = 0;
      }

      y += RADIUS * 2 + PADDINGY; //increase y for the next circle row
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas

      ctx.save();

      ctx.translate(offsetX, offsetY);

      for (i = 0; i < circles.length; i++) {
        ctx.save();

        scale = getDistance(circles[i]);
        ctx.translate(circles[i].x, circles[i].y);
        ctx.translate(RADIUS / 2, RADIUS / 2);
        ctx.scale(scale, scale);
        ctx.translate(-RADIUS / 2, -RADIUS / 2);

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
      var dx, dy, dist, distX, distY;
      dx = circle.x - centerX + offsetX;
      dy = circle.y - centerY + offsetY;
      // Calculate separate distances for horizontal and vertical axis
      //distX = Math.abs(dx);
      //distY = Math.abs(dy);
      const maxDistX = canvas.width / 2 - RADIUS - PADDINGX / 2;
      const maxDistY = canvas.height / 2 - RADIUS - PADDINGY / 2;

      distX = Math.min(Math.abs(dx), maxDistX);
      distY = Math.min(Math.abs(dy), maxDistY);
      // Adjust the scaling based on a factor for the vertical axis
      const verticalScalingFactor = 1.7; // Adjust this value to control the oval shape
      // Combine distances with a weighted average considering vertical scaling
      dist = Math.sqrt(
        Math.pow(distX, 2) + Math.pow(distY * verticalScalingFactor, 2),
      );
      scale = 1 - dist / SCALE_FACTOR;
      scale = scale > 0 ? scale : 0;

      return scale;
    }

    function handleTouch(e) {
      window.addEventListener("touchmove", handleSwipe);
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
