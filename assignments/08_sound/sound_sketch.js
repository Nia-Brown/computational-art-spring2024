// Saxophone: NOTE | TO HEAR THE MUSIC PRESS THE CORRESPONDING KEYBOARD KEY WITH THE KEYS ON THE
// SAXOPHONE TO PLAY THE SOUND 

let saxKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
let saxSounds = [];
let currentNote = -1;
let saxX = 200;
let saxY = 150;
let keyWidth = 30;
let keyHeight = 50;
let keyOffset = 10;
let synth;

// Define an array of colors for each key
let keyColors = [
  [255, 0, 0],   // Red
  [0, 255, 0],   // Green
  [0, 0, 255],   // Blue
  [255, 255, 0], // Yellow
  [255, 0, 255], // Magenta
  [0, 255, 255], // Cyan
  [237, 139, 255], // pink
  [128, 0, 128], // Purple
  [36, 86, 223] // Dark blue
];

let numNotes = 10; // Number of moving musical notes
let notes = []; // Array to store note objects

let numLayers = 5; // Number of layers
let waveSpeeds = [0.02, 0.03, 0.04, 0.05, 0.01]; // Speed of each layer
let waveHeights = [200, 450, 650, 750, 800]; // Height of each layer
let waveColors = ['#FF0000', '#00FF00', '#0000FF', '#49E449', '#F5A6F5']; // Color of each layer

function preload() {
  // Plays jazz sounds for first 6 keys. Last 3 are synth sounds (hold down key(s))
  saxSounds.push(loadSound('../08_sound/samples/sax1.mp3'));
  saxSounds.push(loadSound('../08_sound/samples/sax2.mp3'));
  saxSounds.push(loadSound('../08_sound/samples/sax3.mp3'));
  saxSounds.push(loadSound('../08_sound/samples/sax4.mp3'));
  saxSounds.push(loadSound('../08_sound/samples/sax5.mp3'));
  saxSounds.push(loadSound('../08_sound/samples/sax6.mp3'));

  // --MUSICAL NOTES--
  for (let i = 0; i < numNotes; i++) {
    notes.push({
      x: random(width),
      y: random(height),
      size: random(5, 10), // Control head size
      stemLength: (10, 20), // Control stem length
      dx: random(1, 2), // Horizontal speed
      dy: random(1, 2), // Vertical speed
      color: color(0, 0, 0) // Semi-transparent color
    });
  }
}

function setup() {
  createCanvas(400, 700);


  // Initialize the synth
  synth = new p5.Oscillator();
  synth.setType('sine');
  synth.amp(0);
  synth.start();
}

function draw() {
  background(213, 191, 213);

  // Draw moving musical notes
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    stroke(note.color); // Use black stroke
    strokeWeight(2); // Make the stem thicker
    fill(note.color);

    // Draw the note head as an oval 
    ellipse(note.x, note.y - note.size / 2, note.size * 2, note.size); // Adjust y-coordinate

    // Draw the stem on the right corner of the ocal
    line(note.x + note.size, note.y - note.size / 2, note.x + note.size, note.y - note.size / 2 - note.stemLength);

    // Update note position with wrapping around the screen
    note.x += note.dx;
    if (note.x > width) note.x = 0;
    note.y += note.dy;
    if (note.y > height) note.y = 0;
  }

  // Wave layers
  for (let i = 0; i < numLayers; i++) {
    let waveColor = color(waveColors[i]);
    waveColor.setAlpha(90); // transparency

    fill(waveColor);
    beginShape();
    for (let x = 0; x < width; x += 10) {
      let y = map(noise(x * 0.01, frameCount * waveSpeeds[i] * 0.5), 0, 1, height - waveHeights[i], height);
      vertex(x, y);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }

 // --SAXOPHONE--

  // Draw gooseneck
  fill(255, 225, 139);
  triangle(200, 80, 200, 50, 330, 40);

  // Draw saxophone body
  fill(255, 225, 139);
  stroke(0);
  rect(175, 50, 50, 580, 20);
  strokeWeight(1.5);

  // Draw wide, rounded rectangle on the left side
  beginShape();
  vertex(20, 450); // Top left corner
  vertex(130, 410); // Top right corner
  vertex(125, 600); // Bottom right corner
  bezierVertex(130, 600, 80, 650, 30, 600); // Bottom edge as a curve
  endShape(CLOSE);

  // Draw two circles stacked vertically on the left side
  fill(255, 188, 0);
  let circleSize = 40;
  ellipse(55, 500, circleSize, circleSize);
  ellipse(55, 570, circleSize, circleSize);

  // Draw wide, thin oval horizontally on top of the rectangle
  push();
  translate(75, 450);
  rotate(-QUARTER_PI / 3); // Rotate the oval counterclockwise
  fill(255, 188, 0);
  ellipse(0, -20, 140, 18); // Draw the oval at the new rotated position
  pop();

  fill(255, 225, 139);

  let centerX = width / 2;
  let bottomY = 600; // Y-coordinate of the bottom of the sax body
  let radiusX = 97; // X-radius of the semicircle
  let radiusY = 60; // Y-radius of the semicircle
  let startAngle = 0; // Start angle (180 degrees)
  let endAngle = PI; // End angle (360 degrees)

  arc(130, bottomY, radiusX * 2, radiusY * 2, startAngle, endAngle);

  // Draw smaller semicircle cutout within the larger semicircle
  let innerRadiusX = 24; // X-radius 
  let innerRadiusY = 20; // Y-radius 
  let innerStartAngle = 0; // Start angle 
  let innerEndAngle = PI; // End angle 
  fill(213, 191, 213);
  arc(150, bottomY, innerRadiusX * 2, innerRadiusY * 2, innerStartAngle, innerEndAngle, OPEN);

  // Draw saxophone keys
  for (let i = 0; i < saxKeys.length; i++) {
    let keyY = saxY - keyHeight * 1.5 + i * (keyHeight + keyOffset);
    fill(255, 188, 0);
    if (currentNote === i) {
      fill(keyColors[i]); // Highlight pressed key
    }
    ellipse(175, keyY, keyWidth, 40, 5);
    fill(0);
    ellipse(saxX, keyY + keyHeight - 40, 8); // Draw small ellipse
    textAlign(RIGHT, CENTER); // Align text to the right
    text(saxKeys[i], saxX + keyWidth / 2, keyY + keyHeight / 2 - 15); // Move text up by 15 pixels
  }

  translate(305, 30); // Move down by 15 units and right by 50 units

  // Rotate the shape
  rotate(radians(70)); // Rotate by 70 degrees (converted to radians)

  // Draw mouthpiece with silver tip
  fill(200);
  quad(0, 0, 13, -20, 23, -20, 36, 0);

  // Draw silver tip
  fill(192, 192, 192); // Silver color
  quad(13, -20, 23, -20, 23, 0, 13, 0);

  // Reset transformations
  resetMatrix();

  // --END OF SAXOPHONE--
}

// PRESS THE CORRESPONDING KEY LETTERS AS SEEN ON THE VIRTUAL SAXOPHONE TO PLAY THE SOUNDS AND SYNTHS
function keyPressed() {
  let keyIndex = saxKeys.indexOf(key.toUpperCase());
  if (keyIndex !== -1) {
    currentNote = keyIndex;
    playSound(keyIndex);
  }
}

// Synth will stop when key is released. Make sure to hold down key to hear longer sound
function keyReleased() {
  currentNote = -1;
  synth.stop();
}

function playSound(index) {
  if (index >= 6) {
    let scale = scales['ionian'];
    let note = scale[index - 6] + 60; // Starting from C4 (MIDI note 60)
    let freq = midiToFreq(note);
    synth.start();
    synth.freq(freq);
    synth.amp(0.5, 0.1); // Fade in over 0.1 seconds
    setTimeout(() => synth.amp(0, 0.5), random(5000, 10000)); // Fade out after 5-10 seconds
  } else {
    saxSounds[index].play();
  }
}


