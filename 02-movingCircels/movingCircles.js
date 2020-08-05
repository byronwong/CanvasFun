'use strict';

// code here...

const canvas = document.querySelector('.canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const context = canvas.getContext('2d');


let x, y,radius, dx, dy;


x = 200;
y = 200;
radius = 100;

dx = 8;
dy = 4;

function animate() {

    requestAnimationFrame(animate);
    
    context.clearRect(0,0, canvas.width, canvas.height);
    
    context.beginPath();
    context.arc(x, y,radius, 0, Math.PI * 2, false);
    context.stroke();


    if(x + radius > canvas.width || x < radius) {
        dx = -dx;
    }

    if (y + radius > canvas.height || y < radius) {
        dy = -dy
    }
    
    x += dx;
    y += dy;

};

animate();
