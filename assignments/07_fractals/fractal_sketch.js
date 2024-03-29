// NOTE: USE SLIDER ON WEB PAGE TO ADJUST THE DEPTH OF THE RECURSION!
// THE JAVASCRIPT CONSOLE will also update the depth value as well to coinside with the slider value

let count = 0;
let colorList = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#8000FF", "#FF00FF"]; // Rainbow color list
let maxDepth = 10; // Initial maximum depth

function setup() {
  createCanvas(600, 500);
  stroke(255);
  noFill();
  background(40);
}

function draw() {
  translate(width / 2, height / 2);
  // input range: lowIn, highIn, lowOut, highOut
  let depth = int(map(sliderValue(), 2, 10, 2, maxDepth)); 
  // Logs depth to console
  console.log("Current Depth:", depth); 
  drawTriangle(200, 0, depth); 
}

function sliderValue() {
  // Get value from slider element in html file
  return select('#slider').value(); 
}

function drawTriangle(size, colorIndex, depth) {
  count++;

  if (depth === 0) {
    return;
  }

  // Color based on color list and recursion depth 
  stroke(colorList[colorIndex % colorList.length]);

  let x1 = 0,
    y1 = -size,
    x2 = size,
    y2 = size,
    x3 = -size,
    y3 = size;

  // Rotate based on position (more rotations for corners)
  if (x1 === 0) {
    // Creates spirals
    rotate(radians(count * 0.1)); 
  } else {
    rotate(radians(count * 0.05));
  }

  triangle(x1, y1, x2, y2, x3, y3);

  
  push();
  translate(size / 3, size / 3);
  // Changes color for additonal triangles
  stroke(colorList[(colorIndex + 2) % colorList.length]); 
  // Faster rotation for new trianges
  rotate(radians(count * 0.2)); 
  // Smaller triangles that point upwards
  triangle(-size / 5, 0, size / 5, 0, 0, -size / 3); 
  pop();

  push();
  translate(-size / 3, -size / 3);
  stroke(colorList[(colorIndex - 1 + colorList.length) % colorList.length]); 
  rotate(radians(-count * 0.2)); 
  // Smaller triangles that point downwards
  triangle(-size / 5, 0, size / 5, 0, 0, size / 3); 
  pop();

  push();
  translate(0, -size);
  rotate(radians(120));
  // Decrement depth for recursion calls
  drawTriangle(size / 2, (colorIndex + 1) % colorList.length, depth - 1); 
  pop();

  push();
  translate(size, size);
  rotate(radians(-120));
  drawTriangle(size / 2, (colorIndex - 1 + colorList.length) % colorList.length, depth - 1); 
  pop();

  push();
  translate(0, size / 4);
  rotate(radians(count * 0.05)); 
  drawTriangle(size / 4, colorIndex, depth - 1); 
  pop();
}
