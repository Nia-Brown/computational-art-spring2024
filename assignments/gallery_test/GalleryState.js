class GalleryState {
    constructor() {
        this.portraitWidth = 500;
        this.portraitHeight = 300;

        this.audioVisualizerPosition = createVector(100, 100);
        this.faceMapPosition = createVector(700, 100);
        this.perlinNoisePosition = createVector(1300, 100);

    }

    

    draw() {
        background(255);

        fill(255, 236, 0);
        rect(this.audioVisualizerPosition.x, this.audioVisualizerPosition.y, this.portraitWidth, this.portraitHeight);

        fill(60, 90, 100);
        rect(this.faceMapPosition.x, this.faceMapPosition.y, this.portraitWidth, this.portraitHeight);

        fill(206, 103, 210);
        rect(this.perlinNoisePosition.x, this.perlinNoisePosition.y, this.portraitWidth, this.portraitHeight);
    }

    mousePressed() {
        if(this.mouseOverBox(this.audioVisualizerPosition)) {
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
        && mouseY < pos.y + this.portraitHeight) 
        {
            return true;
        }
        return false;
    }
}