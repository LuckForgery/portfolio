import React, { useEffect, useRef } from "react";

const StarryCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");

    console.log("Parent size:", parent.offsetWidth, parent.offsetHeight);

    const setCanvasSize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    const particlesArray = [];

    const mouse = {
      x: null,
      y: null,
      radius: 60,
    };

    const shootingStarsArray = [];

    window.addEventListener("mousemove", function (event) {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    window.addEventListener("resize", setCanvasSize);

    class Particle {
      constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = 1.5;
        this.maxSize = Math.random() * 1.7; // random size between 2 and 7
        this.size = Math.random() * this.maxSize;
        this.growthRate = Math.random() * 0.00001 + 0.00002; // random growth rate between 0.1 and 0.3
        this.growing = Math.random() >= 0.1; // random initial direction (growing or shrinking)

        // Set color based on probability
        const rand = Math.random();
        if (rand < 1 / 40) {
          this.color = "lightblue";
        } else if (rand < 1 / 20 + 1 / 40) {
          // accounting for the 1/40 chance the particle is already blue
          this.color = "orange";
        } else {
          this.color = "white";
        }
      }

      updateSize() {
        if (this.growing) {
          this.size += this.growthRate;
          if (this.size > this.maxSize) {
            this.growing = false;
          }
        } else {
          this.size -= this.growthRate;
          if (this.size <= 0) {
            this.size = 0;
            this.growing = true;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.updateSize();
        this.draw();
      }
    }

    class ShootingStar {
      constructor(x, y, angle, speed) {
        this.x = x;
        this.y = y;
        this.length = Math.random() * 20 + 5;
        this.speed = speed;
        this.angle = angle;
        this.dx = Math.cos(this.angle) * this.speed;
        this.dy = Math.sin(this.angle) * this.speed;
        this.opacity = 1;
        this.decreasing = 0.01;
        this.color = ["139,129,255", "252,185,0", "252,237,214"][
          Math.floor(Math.random() * 3)
        ];
      }

      draw() {
        // Gradient for the trail
        const gradientTrail = ctx.createLinearGradient(
          this.x - this.length * this.dx,
          this.y - this.length * this.dy,
          this.x,
          this.y,
        );
        gradientTrail.addColorStop(0, `rgba(${this.color}, 0)`);
        gradientTrail.addColorStop(1, `rgba(${this.color}, ${this.opacity})`);
        ctx.strokeStyle = gradientTrail;
        ctx.beginPath();
        ctx.moveTo(
          this.x - this.length * this.dx,
          this.y - this.length * this.dy,
        );
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        // Gradient for the head
        const gradientHead = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          ctx.lineWidth + 0.5,
        );
        gradientHead.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
        gradientHead.addColorStop(1, `rgba(${this.color}, 0)`);
        ctx.fillStyle = gradientHead;
        ctx.beginPath();
        ctx.fill();
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;
        this.opacity -= this.decreasing;
        if (this.opacity < 0) this.opacity = 0;
        this.draw();
      }
    }

    function maybeCreateShootingStar() {
      if (Math.random() < 0.005) {
        let x, y, angle;

        const edge = Math.floor(Math.random() * 4); // 0:top, 1:right, 2:bottom, 3:left

        switch (edge) {
          case 0: // from top
            x = Math.random() * canvas.width;
            y = 0;
            angle = Math.random() * Math.PI;
            break;
          case 1: // from right
            x = canvas.width;
            y = Math.random() * canvas.height;
            angle = Math.random() * Math.PI + 0.5 * Math.PI;
            break;
          case 2: // from bottom
            x = Math.random() * canvas.width;
            y = canvas.height;
            angle = Math.random() * Math.PI + Math.PI;
            break;
          case 3: // from left
            x = 0;
            y = Math.random() * canvas.height;
            angle = Math.random() * Math.PI + 1.5 * Math.PI;
            break;
          default:
        }

        const speedVariation = Math.random();
        let speed;
        if (speedVariation < 0.2) {
          speed = 10000;
        } else if (speedVariation < 0.7) {
          speed = 10;
        } else {
          speed = 1;
        }

        shootingStarsArray.push(new ShootingStar(x, y, angle, speed));
      }
    }

    function init() {
      for (let i = 0; i < 800; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const dx = Math.random() * 0.05 - 0.01;
        const dy = Math.random() * 0.01 - 0.01;
        particlesArray.push(new Particle(x, y, dx, dy));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }

      // Shooting stars update
      for (let i = shootingStarsArray.length - 1; i >= 0; i--) {
        shootingStarsArray[i].update();
        if (shootingStarsArray[i].opacity <= 0) {
          shootingStarsArray.splice(i, 1);
        }
      }

      maybeCreateShootingStar();
      requestAnimationFrame(animate);
    }

    setCanvasSize();
    init();
    animate();
    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
    /*

*/
  }, []);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default StarryCanvas;
