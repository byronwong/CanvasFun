'use strict';
// https://youtu.be/3b7FyIxWW94?t=431
// Initial setup
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const delay = 250; // ms for debounsing on window resize
let timeout = false; // store setTimeout ID for debouncing on window resize

// Set canvas to full screen
canvas.width = innerWidth;
canvas.height = innerHeight;

// create mouse object to track its position
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

let ball = undefined;

// Event Listeners
// Update mouse object when position changes
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

// once window stops re-sizing after delay re-paint canvas
function redrawCanvas() {
  console.log('re-drawing canvas');
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
}

// listen for window resize and then re-paint canvas using debouncing
addEventListener('resize', () => {
  clearTimeout(timeout);
  timeout = setTimeout(redrawCanvas, delay);
});

// Items to draw
class Ball {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  drawBall() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = '#C9008A';
    context.fill();
  }
}

// inital Fn to kick-off canvas
function init() {
  ball = new Ball(200, 200, 0, 5, 50);
  console.log(ball);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  ball.drawBall();

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    // invert direction and the multiply by fristion amount
    ball.dy = -ball.dy * 0.8;
  } else {
    // add gravity acceleration
    ball.dy += 1;
  }

  ball.y += ball.dy;
  // context.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y);
}

window.onload = () => {
  init();
  animate();
};
