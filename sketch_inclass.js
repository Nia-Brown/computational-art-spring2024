let hue = 0;
let x;
let y;

let velX = 3;
let velY = 2;

function setup() {
  createCanvas(400, 300);

  x = width/2;
  y = height/2;
  
  colorMode(HSB);
  position = createVector(width/2, height/2);
  velocity = createVector(5,3);

}

function draw() {
  background(0, 0, 100);
  hue += 5;

  position.x += velocity.x;
  if ( position.x > width || position.x < 0) {
    velocity.x *= -1;
  }

  position.y += velocity.y;
  if (position.y > height || position.y < 0) {
    velocity.y *= -1;
  }
  
  let saturation = mouseX / width * 100;

  circle(position.x, position.y, 100);
  fill(hue % 360, saturation, 100);
  // background(hue % 360, saturation, 100);
}
