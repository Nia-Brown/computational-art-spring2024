class GalleryState {
    constructor() {
        this.portraitWidth = 500;
        this.portraitHeight = 300;

        this.audioVisualizerPosition = createVector(100, 120);
        this.faceMapPosition = createVector(700, 120);
        this.perlinNoisePosition = createVector(1300, 120);

        // images
        // Load images for each state
        this.audioVisualizerImage = loadImage("../final/images/AudioScreenshot.jpg");
        this.faceMapImage = loadImage("../final/images/FaceMapCover.jpg");
        this.perlinNoiseImage = loadImage("../final/images/perlinNoiseCoverr.jpg");

        this.gif = loadImage("https://media.giphy.com/media/IziVwtkjcwvhU9lWAb/giphy.gif");
        this.characterX = 0; // Start from the left side
        this.characterY = 320; // Align with the bottom of the canvas
    }



    draw() {
        // background(255);
        background("#1b1b1b");

        // Draw the header text
        textSize(40);
        fill(255, 251, 0);
        textAlign(CENTER, TOP);
        text("Nia's Generative Art Gallery", width / 2, 20);

        // Draw the gallery boxes with yellow borders
        stroke(255, 251, 0); // Set stroke color to yellow
        strokeWeight(20); // Set stroke weight to 20 pixels

        // Audio Visualizer
        noFill(); // Don't fill the rectangle
        rect(this.audioVisualizerPosition.x, this.audioVisualizerPosition.y, this.portraitWidth, this.portraitHeight);

        // Face Map
        rect(this.faceMapPosition.x, this.faceMapPosition.y, this.portraitWidth, this.portraitHeight);

        // Perlin Noise
        rect(this.perlinNoisePosition.x, this.perlinNoisePosition.y, this.portraitWidth, this.portraitHeight);

        // Draw the images
        image(this.audioVisualizerImage, this.audioVisualizerPosition.x, this.audioVisualizerPosition.y, this.portraitWidth, this.portraitHeight);
        image(this.faceMapImage, this.faceMapPosition.x, this.faceMapPosition.y, this.portraitWidth, this.portraitHeight);
        image(this.perlinNoiseImage, this.perlinNoisePosition.x, this.perlinNoisePosition.y, this.portraitWidth, this.portraitHeight);

        // Reset stroke settings
        noStroke();

        // Calculate the character's position based on frameCount
        // Adjust the character's speed by changing the divisor (e.g., 100)
        this.characterX = (frameCount );

        // Display the character at the calculated position
        image(this.gif, this.characterX, this.characterY, 480, 480);
    }

    mousePressed() {
        if (this.mouseOverBox(this.audioVisualizerPosition)) {
            currentState = audioState;
        }

        if (this.mouseOverBox(this.faceMapPosition)) {
            currentState = faceMapState;
        }

        if (this.mouseOverBox(this.perlinNoisePosition)) {
            currentState = perlinState;
        }
    }

    mouseOverBox(pos) {
        if (mouseX > pos.x
            && mouseX < pos.x + this.portraitWidth
            && mouseY > pos.y
            && mouseY < pos.y + this.portraitHeight) {
            return true;
        }
        return false;
    }
}