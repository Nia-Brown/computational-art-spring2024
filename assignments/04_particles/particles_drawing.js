
function setup () {
    createCanvas(900, 800)
    angleMode(DEGREES)   
    noLoop()

    frameRate(30);
}

function draw() {
    background(200) // Change

   translate(width / 2, height / 2 + 200)

   branch(100)
   translate(0,frameCount*25);
   ellipse(51,30,30);

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
        branch(len * random(0.7, 0.9))

        
        rotate(-60)
        branch(len * random(0.7, 0.9))
    } else {
        // If the length of the branch is < 10, create leaves
        //Leaf colors
        var r = 90 + random(-20, 20)
        var g = 120 + random(-20, 20)
        var b = 40 + random(-20, 20)
        // Color leaves, making them a litle transparent
        fill(r, g, b, 180)

        noStroke()

        // ellipse(0, 0, 10)
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

//new
