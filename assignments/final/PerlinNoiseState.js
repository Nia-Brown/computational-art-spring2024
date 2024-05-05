class PerlinNoiseState {
    constructor(img, noiseScale, angleOffset, angleSpeed) {
        this.img = img;
        this.noiseScale = noiseScale;
        this.angleOffset = angleOffset;
        this.angleSpeed = angleSpeed;
    }

    draw() {
        background(220);


        // Update angle offset based on speed
        this.angleOffset += this.angleSpeed;

        // Draw the image with swirling effect
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let angle = noise(x * noiseScale, y * noiseScale) * TWO_PI + angleOffset;
                let xOffset = cos(angle) * 10;
                let yOffset = sin(angle) * 10;
                let px = constrain(x + xOffset, 0, width - 1);
                let py = constrain(y + yOffset, 0, height - 1);

                let c = img.get(px, py);
                set(x, y, c);
            }
        }
        updatePixels();
    }

    mousePressed() {
        currentState = perlinState;
    }
}