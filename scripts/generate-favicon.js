const fs = require('fs');
const { createCanvas } = require('canvas');
const { Code } = require('lucide-react');

// Create a canvas
const canvas = createCanvas(32, 32);
const ctx = canvas.getContext('2d');

// Set background to transparent
ctx.clearRect(0, 0, 32, 32);

// Draw the Code icon
ctx.fillStyle = '#ffffff';
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 2;

// Draw the code brackets
ctx.beginPath();
ctx.moveTo(8, 16);
ctx.lineTo(12, 8);
ctx.lineTo(12, 24);
ctx.lineTo(8, 16);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(24, 16);
ctx.lineTo(20, 8);
ctx.lineTo(20, 24);
ctx.lineTo(24, 16);
ctx.stroke();

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/favicon.ico', buffer);

console.log('Favicon generated successfully!'); 