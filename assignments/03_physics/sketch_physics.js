// NOTE: Slight frame rate issue
let shapes = [];
let gravity;

let basketballImg;
let courtImg;

// Preload basketball court and basketball image
function preload() {
  basketballImg = loadImage('basketball.png');
  courtImg = loadImage('basketball_court.jpg');
}

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);
  gravity = createVector(0, 0.2);
}


function draw() {
  // Draw the basketball court background image
  image(courtImg, 0, 0, width, height);

  // Display the "click me" message
  textSize(20);
  fill(255);
  text("Click anywhere on the court to generate basketballs!", 20, 40);

  for (let i = shapes.length - 1; i >= 0; i--) {
    let shape = shapes[i];
    shape.applyForce(gravity);
    shape.update();
    shape.display();
    
    // Check if the shape hits the "water" surface
    if (shape.pos.y > height - 50) {
      splash(shape.pos);
      shapes.splice(i, 1);
    }
  }
}

// Click the canvas multiple times!
function mousePressed() {
    let shape = new Shape(mouseX, mouseY);
    shapes.push(shape);
}

// Splash effect
function splash(pos) {
    let numSplashes = 4; // Number of splash shapes per iteration
    for (let i = 0; i < numSplashes; i++) {
      let splashPos = createVector(pos.x + random(-5, 5), pos.y);
      let splashShape = new Splash(splashPos);
      shapes.push(splashShape);
    }
  }
  
// Original shape class (before choosing basketball image)
class Shape {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-10, -5));
    this.acc = createVector(0, 0);
    this.color = color(random(360), 80, 80);
    this.size = random(30, 60);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // Reset acceleration
  }

  // Display basketballs
  display() {
    image(basketballImg, this.pos.x, this.pos.y, this.size, this.size);
  }
}

// Splash effect (creates multiple basketballs - slight framerate issue)
class Splash extends Shape {
  constructor(pos) {
    super(pos.x, pos.y);
    this.vel = createVector(random(-1, 1), random(-4, -2));
    this.size = random(3, 8);
  }
  display() {
    image(basketballImg, this.pos.x, this.pos.y, this.size, this.size);
  }
}
