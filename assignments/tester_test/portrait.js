let img;
let noiseScale = 0.02;
let angleOffset = 0;
let angleSpeed = 1.0;

function preload() {
  img = loadImage("https://assets.vangoghmuseum.nl/f9a7a187-484e-4821-b84a-79c836109029?w=1280&h=720&c=12f8ae08a908d9261f58a6bb1bfaa67e8daf061b56752678819c8c241a881bbe");
}

function setup() {
  createCanvas(700, 530);
  img.resize(width, height);
}

function draw() {
  background(220);
  
  // Update angle offset based on speed
  angleOffset += angleSpeed;

  // Draw the image with swirling effect
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let angle = noise(x * noiseScale, y * noiseScale) * TWO_PI + angleOffset;
      let xOffset = cos(angle) * 10;
      let yOffset = sin(angle) * 10;
      let px = constrain(x + xOffset, 0, width - 1);
      let py = constrain(y + yOffset, 0, height - 1);
      
      let c = img.get(px, py);
      set(x, y, c);
    }
  }
  updatePixels();
}
