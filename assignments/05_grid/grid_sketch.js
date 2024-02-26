let cols, rows;
let scl = 20; // Scale
let w = 2000; // Width of grid
let h = 1600; // Height of grid
let hoveredX = -1; // Store the hovered square's x index
let hoveredY = -1; // Store the hovered square's y index

function setup() {
  createCanvas(800, 600);
  cols = w / scl;
  rows = h / scl;
   // Set a noise seed for consistency
  noiseSeed(42); 
}

function draw() {
  background(255);
  // Locates mouse based on position
  hoveredX = floor(mouseX / scl);
  hoveredY = floor(mouseY / scl);
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let xoff = x * 0.1;
      let yoff = y * 0.1;
      // Perlin noise: varies shape
      let n = noise(xoff, yoff) * TWO_PI; 
      // Use sine function for organic movement
      let s = sin(frameCount * 0.1 + n); 

      push();
      translate(x * scl, y * scl);
      // Rotate squares
      rotate(s);
      if (x === hoveredX && y === hoveredY) {
        // Change color to green when hovered
        fill(32, 212, 32); 
      } else {
        // Map noise to hue value
        let hue = map(noise(x * 0.01, y * 0.01), 0, 1, 0, 360); 
        // Fixed saturation value
        let saturation = 40;
        // Fixed brightness value 
        let brightness = 80; 
        fill(hue, saturation, brightness);
      }
      // Rectangle
      rect(0, 0, scl, scl); 
      pop();
    }
  }
}
