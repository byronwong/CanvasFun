'use strict';

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

// inital Fn to kick-off canvas
function init() {
  console.log('js here...');
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y);
}

window.onload = () => {
  init();
  animate();
};
