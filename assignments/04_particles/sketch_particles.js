// Define ball objects
var balls = [];

// Gravity variable
var gravity = 1;
//Apple image
var appleImage;
// Park background
var backgroundImg;

function preload() {
    // Load the apple image
    appleImage = loadImage('apple.png');
    backgroundImg = loadImage('park.jpg');
}

function setup() {
    createCanvas(900, 800);
    angleMode(DEGREES);

    // Create ball objects (startX, startY, Size)
    for (var i = 0; i <= 6; i++) {
        balls.push(new Ball(random(-250, 400 / 2), random(-600 / 2, -100), random(30, 40)));
    }
}

function draw() {
    // Park image
    image(backgroundImg, 0, 0, width, height);

    translate(width / 2, height / 2 + 200);

    // Draw tree branch
    branch(100);

    // Code block from: https://editor.p5js.org/shiffman/sketches/B1E5uGa0
    // Update and display balls
    for (var i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].display();
    }
}

function branch(len) {

    // Each singular branch seperates into three additional branches
    push()

    if (len > 10) {
        strokeWeight(map(len, 10, 110, 0.5, 10))
        stroke(70, 40, 20)
        line(0, 0, 0, -len)
        translate(0, -len)
        // rotate(random(-20, -30))
        rotate(30)
        // Generates the length of the recursive branches
        branch(len * 0.75)

        rotate(-60)
        branch(len * 0.8)
    } else {
        // If the length of the branch is < 10, create leaves
        //Leaf colors
        var r = 90 + random(-20, 20)
        var g = 120 + random(-20, 20)
        var b = 40 + random(-20, 20)
        // Color leaves, making them a litle transparent
        fill(r, g, b, 180)

        noStroke()

        beginShape()
        for (var i = 45; i < 135; i++) {
            var rad = 15
            var x = rad * cos(i)
            var y = rad * sin(i)
            vertex(x, y)
        }
        for (var i = 135; i > 40; i--) {
            var rad = 15
            var x = rad * cos(i)
            var y = rad * sin(-i) + 20
            vertex(x, y)
        }
        endShape(CLOSE)
    }
    pop()
}


function Ball(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.update = function() {
        // Update the ball's position
        this.y += gravity;

        // Limit the ball's movement within the width of the tree
        if (this.y > height / 2 + 200 + 10) {
            this.y = height / 2 + 200 + 10;
        }
    };

    this.display = function() {
        // Draw the apple image at the ball's position
        image(appleImage, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    };
}

