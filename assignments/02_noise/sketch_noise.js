// Nia Brown 2024
// While looking at work, use mouse to hover over my art!

// Define variables
const message = 'Hello! Check out my Github!';
const messageX = 20;
const messageY = 150;

let rez1;
let z;
let backgroundImage;
let planeImage;

function preload() {
  // Load the hot dog image
  backgroundImage = loadImage('https://static.vecteezy.com/system/resources/previews/021/952/581/original/free-spicy-hot-dog-hot-dog-transparent-background-free-png.png');

  // Load the hot dog with transparency
  HotDogImage = loadImage('https://static.vecteezy.com/system/resources/previews/021/952/581/original/free-spicy-hot-dog-hot-dog-transparent-background-free-png.png');
}

function setup() {
  createCanvas(500, 800);
  colorMode(HSB, 360, 100, 100, 255);
  noStroke();
  rez1 = 0.005;
  z = 1000;

 // text size
 textSize(24);
}

function draw() {
  // Draw the background pattern
  drawBackgroundPattern();


  // Draw the hotdog image at the mouse position
  image(HotDogImage, mouseX, mouseY, 100, 100);

  // Animation and color change for text. Text color is default
  // black until hovered over, where text and screen turns red
  if (isMouseInsideText(message, messageX, messageY)) {
    cursor(HAND);
    fill(0, 200, 255);
    stroke(0, 98, 84);
  } else {
    cursor(ARROW);
    noStroke();
    fill(0);
  }

  text(message, messageX, messageY);
 
}

// When the link is clicked, take user to my GitHUb
function mouseClicked() {
    if (isMouseInsideText(message, messageX, messageY)) {
      window.open('https://github.com/Nia-Brown/computational-art-spring2024', '_blank');
    }
  }
  
// Text placement
function isMouseInsideText(message, messageX, messageY) {
    const messageWidth = textWidth(message);
    const messageTop = messageY - textAscent();
    const messageBottom = messageY + textDescent();
  
    return mouseX > messageX && mouseX < messageX + messageWidth &&
      mouseY > messageTop && mouseY < messageBottom;
}



function drawBackgroundPattern() {
    // Create the p5 pixel art. Dynamic movements
  for (let x = 0; x < width; x += 3) {
    for (let y = 0; y < height; y += 3) {
      let n1 = noise(x * rez1, y * rez1, z * rez1) + 0.033;
      n1 = map(n1, 0.3, 0.7, 0, 1);
      if (n1 < 0) {
        n1 += 1;
      }
      if (n1 > 1) {
        n1--;
      }
      let col;
      if (n1 < 0.2) {
        col = color(99, 65, 56); // various shades of green
      } else if (n1 < 0.4) {
        col = color(210, 80, 80); // various shades of blue
      } else if (n1 < 0.6) {
        col = color(60, 80, 80); // various shades of yellow
      } else if (n1 < 0.8) {
        col = color(296, 50, 72); // grape
      } else {
        col = color(114, 89, 67); // red
      }

      fill(col);
      rect(x, y, 6);
    }
  }
  z += 2;
}