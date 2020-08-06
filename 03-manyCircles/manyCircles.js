'use strict';

// TODO:
// https://youtu.be/vxljFhP2krI?t=1280

const numberOfCircles = 100;
let circleArray = [];

const canvas = document.querySelector('.canvas');

const context = canvas.getContext('2d');
const maxCircleRadius = 500;

const mouse = {
  x: undefined,
  y: undefined,
};

const colorArray = ['#FD3A0D', '#E3150B', '#FA0057', '#E30BC3', '#CF0DFD'];

class Circle {
  constructor(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.originalRadius = radius;
    this.color = color;
  }
}

function createCircles(numberOfCircles) {
  for (let i = 0; i < numberOfCircles; i++) {
    // FIX: add 1 to radius to ensure minimum radius is 1
    const radius = Math.random() * 50 + 1;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = Math.random() - 0.5;
    const dy = Math.random() - 0.5;
    const color = colorArray[Math.floor(Math.random() * colorArray.length)];

    const circle = new Circle(x, y, radius, dx, dy, color);
    circleArray.push(circle);
  }
}

function drawCircle({ x, y, radius, color }) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.fillStyle = color;
  context.fill();
}

// update function to be drawn on each frame
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (const circle of circleArray) {
    if (
      circle.x + circle.radius > canvas.width ||
      circle.x - circle.radius < 0
    ) {
      circle.dx = -circle.dx;
    }
    if (
      circle.y + circle.radius > canvas.height ||
      circle.y - circle.radius < 0
    ) {
      circle.dy = -circle.dy;
    }

    circle.y += circle.dy;
    circle.x += circle.dx;

    // increase the size off all circles within 50px of the cursor
    // else reduce the size of the circle back to the original
    // FIX: add 1 to prevent negative radius
    if (
      mouse.x - circle.x < 50 &&
      mouse.x - circle.x > -50 &&
      mouse.y - circle.y < 50 &&
      mouse.y - circle.y > -50
    ) {
      if (circle.radius < maxCircleRadius) {
        circle.radius += 1;
      }
    } else if (circle.radius > circle.originalRadius + 1) {
      circle.radius -= 1;
    }

    drawCircle(circle);
  }
}

// =======
// Interactions update mouse position

// should this event handler be bound to the canvas rather than the window?
window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

// =======
// window resize debounce
let timeout = false;
const delay = 250;

// do something once the resize has completed
function getDimensions() {
  console.log(
    `called getDimensions: width: ${window.innerWidth}, height: ${window.innerHeight}`
  );

  // set new canvas dimesions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // kick off or re-paint canvas
  createCircles(numberOfCircles);
  animate();
}

// window.resize event listener
window.addEventListener('resize', function () {
  // clear the circles from the page
  circleArray = [];

  // clear the timeout
  clearTimeout(timeout);
  // start timing for event "completion"
  timeout = setTimeout(getDimensions, delay);
});

// start execution on load
window.onload = () => {
  getDimensions();
};
