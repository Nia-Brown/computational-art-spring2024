let particles = [];

function setup() {
  createCanvas(400, 400);

  // Particles in background
  for (let i = 0; i < 50; i++) {
    particles.push({
      position: createVector(random(width), random(height)),
      velocity: createVector(random(-2, 2), random(-2, 2)),
      size: random(5, 15),
      color: color(random(255), random(255), random(255), 150),
    });
  }
}

function draw() {
  angleMode(DEGREES); // Mouth degrees
  rectMode(CENTER);
  // Set background to light yellow
  background(255, 255, 200);

  // Draw colorful moving circles
  for (let i = 0; i < particles.length; i++) {
    updateParticle(particles[i]);
    displayParticle(particles[i]);
  }

  // Hair
  fill(0, 0, 0);
  stroke(81, 20, 20); // Use the same brown color for stroke
  strokeWeight(4);
  rect(200, 180, 190, 140, 90); // Back Hair

  // Shirt
  fill(20, 167, 183);
  noStroke(); // No stroke for the shirt
  rect(200, 450, 190, 270, 40);

  // Draw face (brown ovular circle in the center)
  fill(139, 69, 19); // Brown color
  stroke(139, 69, 19); // Use the same brown color for stroke
  strokeWeight(4);

  // Neck
  stroke(81, 20, 20);
  rect(200, 300, 80, 100, 30);

  // Head
  stroke(81, 20, 20);
  ellipse(width / 2, height / 2, 150, 180); // Adjust size for oval shape

  // Eyes
  fill(255);
  noStroke(); // No stroke for the eyes
  ellipse(165, 180, 40, 35); // Left eye
  ellipse(240, 180, 40, 35); // Right eye

  fill(0);
  ellipse(165, 180, 18, 20); // Left pupil
  ellipse(240, 180, 18, 20); // Right pupil

  // Mouth
  fill(162, 39, 39);
  stroke(0, 0, 0);
  arc(200, 240, 50, 50, 0, 180);

  // Nose
  noFill();
  stroke(0, 0, 0); // Use the same brown color for stroke
  strokeWeight(4);
  arc(198, 210, 25, 15, 270, 90);

  // Hair pt. 2
  fill(0, 0, 0);
  stroke(81, 20, 20); // Use the same brown color for stroke
  strokeWeight(4);
  rect(200, 120, 125, 45, 58);

  // Eyebrows
  strokeWeight(4);
  line(150, 150, 175, 150); // Left eyebrow
  line(260, 150, 230, 150); // Right eyebrow

  // Draw hair (simple lines)
  stroke(81, 20, 20); // Use the same brown color
  strokeWeight(4);
}

// Function to update particle position
function updateParticle(particle) {
  particle.position.add(particle.velocity);

  // Wrap around the canvas edges
  if (particle.position.x < 0) particle.position.x = width;
  if (particle.position.x > width) particle.position.x = 0;
  if (particle.position.y < 0) particle.position.y = height;
  if (particle.position.y > height) particle.position.y = 0;
}

// Function to display particle
function displayParticle(particle) {
  // Draw the particle
  fill(particle.color);
  ellipse(particle.position.x, particle.position.y, particle.size, particle.size);
}
