let appleImg, bananaImg, donutImg;
let gif;
let frameCount = 0;

function preload() {
  gif = loadImage('ant.gif');
  appleImg = loadImage('appleWatercolor.png'); //apple
  bananaImg = loadImage('banana.png'); //banana
  donutImg = loadImage('donut.png'); //donut
}

// A path object (series of connected points)
let path;

// Two vehicles
let vehicles = [];


function setup() {
  createCanvas(700, 500);
  // Call a function to generate new Path object
  newPath();

  // Create 16 vehicles
  for (let i = 0; i < 16; i++) {
    let x = random(width);
    let y = random(height);
    let maxspeed = random(2, 4);
    let maxforce = 0.3;
    vehicles.push(new Vehicle(x, y, maxspeed, maxforce));
  }

   
}

function draw() {
  // Create checkerboard pattern
  let squareSize = 37; 
  for (let y = 0; y < height; y += squareSize) {
    for (let x = 0; x < width; x += squareSize) {
      if ((x + y) % (2 * squareSize) === 0) {
        fill(250);  // White squares
      } else {
        fill(255, 185, 179); // Light pink squares
      }
      rect(x, y, squareSize, squareSize);
    }
  }

  // Trail starting point
  let startX = 400;
  let startY = 500;

  // Loop to draw multiple ants
  for (let i = 0; i <= 17; i++) { 
    let antX = startX + i * 12 + frameCount; 
    let antY = startY - i * 18 - random(1, 7); // Diagonal offset for Y

    // Ensure antX stays within canvas bounds
    antX = constrain(antX, 0, 750); // Restrict antX between 0 and canvas width
    drawAnt(antX, antY);
  }

  frameCount++; // Increment frame count for animation

  // -- DONUT --

  // Draw the donut (dough)
  fill(240, 230, 140); // Light brown dough color
  stroke(255, 140, 0); // Remove stroke for smoother look
  ellipse(460, 150, 100, 100); // Smaller outer circle

  // Draw the donut icing (lighter blue)
  fill(139, 167, 243); // Light blue icing color
  noStroke();
  ellipse(460, 150, 77, 77); // Smaller inner circle

  // Draw sprinkles 
  // Draw another donut hole (center)
  fill(255, 255, 255); // White color for the hole
  ellipse(460, 150, 30, 30); // Smaller center hole

  // Draw sprinkles (predefined positions)
  noStroke();
  fill(255, 91, 85); // Light blue sprinkle color

  // Sprinkle positions 
  ellipse(485, 140, 4, 4);
  ellipse(445, 170, 4, 4);
  ellipse(460, 120, 4, 4);
  ellipse(450, 180, 4, 4);
  ellipse(450, 115, 4, 4);
  ellipse(430, 145, 4, 4);


  fill(255, 255, 0); // Light yellow sprinkle color

  // More sprinkle positions 
  ellipse(440, 140, 3, 3);
  ellipse(450, 120, 3, 3);
  ellipse(475, 125, 3, 3);
  ellipse(490, 155, 3, 3);

  // --END OF DONUT--
  
  // Display the path
  path.display();
  

  // Draw a brown bowl in the upper left corner
  fill(139, 69, 19);
  noStroke();
  ellipse(150, 150, 200, 200); 

  
  image(donutImg, 460, 150, 100, 120);

  // -- ORANGE --

  // Draw a p5 oranges inside the bowl
  fill(255, 165, 0);
  ellipse(180, 115, 60, 60);
  for (let i = 0; i < 6; i++) {
    let angle = map(i, 0, 5, 0, TWO_PI);
    let x = 180 + cos(angle) * 10;
    let y = 115 + sin(angle) * 10;
    stroke(255, 140, 0);
    strokeWeight(2);
    line(180, 115, x, y);
  }

  // Duplicate the orange (another p5 orange) slightly shifted to the right
  push(); // Push the current drawing style matrix
  translate(20, 0); // Move 20 pixels to the right
  fill(255, 165, 0);
  ellipse(180, 150, 50, 50);
  for (let i = 0; i < 6; i++) {
    let angle = map(i, 0, 5, 0, TWO_PI);
    let x = 180 + cos(angle) * 10;
    let y = 150 + sin(angle) * 10;
    stroke(255, 140, 0);
    strokeWeight(2);
    line(180, 150, x, y);
  }
  pop(); // Restore the previous drawing style

  // -- end of oranges --

  // Food inside the bowl 
  image(appleImg, 100, 70, 65, 70);
  
  // Rotate the banana counterclockwise
  push(); 
    // Move the image to its center point
    translate(450, 300); 
    // Rotate banana
    rotate(-HALF_PI); 
    image(bananaImg, 60, -370, 130, 160); 
  pop(); 
  
  // -- SANDWICH --

  // First sandwich (bottom left)
  drawSandwich(100, 350);

  // Duplicate the sandwich
  push();
  translate(275, -40); // Move the second sandwich to the right
  // Rotate 45 degrees counter-clockwise 
  rotate(PI / 4); 
  drawSandwich(0, 0); 
  pop(); 

  // Draw crumbs next to the first sandwich 
  drawCrumb(300 + 15, 350 + 30, 6); 
  drawCrumb(260, 350 + 20, 6);     // Crumb with slight vertical variation
  drawCrumb(275, 400 + 15, 6);
  drawCrumb(285, 425, 6);
  drawCrumb(265, 400, 6);
  drawCrumb(300, 460, 6);

  

  for (let v of vehicles) {
    // Path following and separation are worked on in this function
    v.applyBehaviors(vehicles, path);
    // Call the generic run method (update, borders, display, etc.)
    v.run();
  }

  
}

function constrain(value, low, high) {
  // This function ensures a value stays within a specified range
  return Math.min(Math.max(value, low), high);
}

function drawAnt(x, y) {
  // Body (oval shape)
  fill(0, 0, 0); // Black for ant body
  ellipse(x, y, 8, 5);

  // Head (circle shape)
  fill(0, 0, 0);
  ellipse(x - 3, y, 4, 4);

  // Legs (6 lines)
  stroke(0, 0, 0);
  strokeWeight(1);
  line(x - 2, y + 2, x - 7, y + 5);
  line(x - 2, y + 2, x - 7, y - 1);
  line(x + 2, y + 2, x + 7, y + 5);
  line(x + 2, y + 2, x + 7, y - 1);
  line(x - 2, y - 2, x - 7, y - 5);
  line(x + 2, y - 2, x + 7, y - 5);
}

function drawSandwich(x,y) {
  // Bread (bottom slice)
  fill(239, 222, 176); // Light brown for bread
  stroke(102, 66, 60); // Dark brown outline
  strokeWeight(2);
  rect(100, 350, 120, 120); // x, y, width, height (bottom left corner)

  // Lettuce 
  fill(85, 164, 47); // Green for lettuce
  ellipse(190, 410, 80, 100); 

  // Tomato 
  fill(255, 99, 71); // Red for tomato
  ellipse(210, 375, 50, 50); 

  // Tomato
  fill(255, 99, 71); // Red for tomato
  ellipse(210, 450, 50, 50); 

  fill(239, 222, 176); // Light brown for bread
  rect(100, 350, 120, 120); 

  // Add lines with slight variations for a textured look
  stroke(205, 186, 150); 
  strokeWeight(1);
  for (let i = 100; i < 220; i += 10) {
    line(i, 350, i, 470); // Vertical lines
  }

}

function drawCrumb(x, y, size) {
  // Set fill color for the crumbs (light brown)
  fill(173, 94, 66);
  noStroke();

  // Draw a simple circle
  ellipse(x, y, size, size);  
}


class Vehicle {

    // Constructor initialize all values
    constructor(x, y, ms, mf) {
      this.position = createVector(x, y);
      // Size of ants
      this.r = 28;
      this.maxspeed = ms;
      this.maxforce = mf;
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(this.maxspeed, 0);
      // ant image
      this.antImage = ('');
    }
  
    
      // A function to deal with path following and separation
      applyBehaviors(vehicles, path) {
        // Follow mouse force
        let target = createVector(mouseX, mouseY);
        let seekForce = this.seek(target);
    
        // Separate from other vehicles force
        let separateForce = this.separate(vehicles);
    
        // Arbitrary weighting
        seekForce.mult(0.9); 
        separateForce.mult(0.9); 
    
        // Accumulate in acceleration
        this.applyForce(seekForce);
        this.applyForce(separateForce);
      }
    
      applyForce(force) {
        this.acceleration.add(force);
      }
    
      // Main "run" function
      run() {
        this.update();
        this.render();
      }
  
      
    // Aspects of this function implements Craig Reynolds' path following algorithm
    // http://www.red3d.com/cwr/steer/PathFollow.html
    

    // Separation
    // Method checks for nearby boids and steers away
    separate(boids) {
      let desiredseparation = this.r * 1;
      let steer = createVector(0, 0, 0);
      let count = 0;
      // For every boid in the system, check if it's too close
      for (let i = 0; i < boids.length; i++) {
        let other = boids[i];
        let d = p5.Vector.dist(this.position, other.position);
        // If the distance is greater than 0 and less than random amount
        if ((d > 0) && (d < desiredseparation)) {
          // Calculate vector pointing away from neighbor
          let diff = p5.Vector.sub(this.position, other.position);
          diff.normalize();
          diff.div(d); // Weight by distance
          steer.add(diff);
          count++; // Keep track of how many
        }
      }
      // Average -- divide by how many
      if (count > 0) {
        steer.div(count);
      }
  
      // As long as the vector is greater than 0
      if (steer.mag() > 0) {
        // Implement Reynolds: Steering = Desired - Velocity
        steer.normalize();
        steer.mult(this.maxspeed);
        steer.sub(this.velocity);
        steer.limit(this.maxforce);
      }
      return steer;
    }
    // -- End of aspects of Craig Reynold's code --
  
    // Method to update position
    update() {
      // Update velocity
      this.velocity.add(this.acceleration);
      // Limit speed
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      // Reset accelertion to 0 each cycle
      this.acceleration.mult(0);
    }
  
    // Calculates and applies a steering force towards a target
    seek(target) {
      let desired = p5.Vector.sub(target, this.position); // A vector pointing from the position to the target
  
      // Normalize desired and scale to maximum speed
      desired.normalize();
      desired.mult(this.maxspeed);
      // Steering = Desired minus Vepositionity
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce); // Limit to maximum steering force
  
      return steer;
    }
  
  
    render() {
        push();
        translate(this.position.x, this.position.y);
        image(gif, -this.r / 2, -this.r / 2, this.r, this.r); 
        pop();
      }
  
  }
 

class Path {

    constructor() {
      this.radius = 20;
      this.points = [];
    }
  
    // Add a point to the path
    addPoint(x, y) {
      let point = createVector(x, y);
      this.points.push(point);
    }
  
    // Draw the path
    display() {
      strokeJoin(ROUND);
  
      
      endShape(CLOSE);
    }
  }

function newPath() {
  path = new Path();
  let offset = 30;
  path.addPoint(offset, offset);
  path.addPoint(width - offset, offset);
  path.addPoint(width - offset, height - offset);
  path.addPoint(width / 2, height - offset * 3);
  path.addPoint(offset, height - offset);
}

function mousePressed() {
  // Create a new vehicle at the mouse position
  newVehicle(mouseX, mouseY);
}

function newVehicle(x, y) {
  let maxspeed = random(2, 4);
  let maxforce = 0.3;
  vehicles.push(new Vehicle(x, y, maxspeed, maxforce));
}
