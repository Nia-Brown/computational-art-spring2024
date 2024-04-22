// Individual sketch functions for each portrait
let sketchAudioVisualizer = function (p) {
    p.setup = function () {
        let canvas = p.createCanvas(500, 300);
        canvas.parent('audio-visualizer'); // Position canvas within the div
        audioVisualizer = new AudioVisualizer(p);
    };

    p.draw = function () {
        p.background(255); // change maybe
        if (playing) {
            console.log('playing:', playing); // Check playing state
            let spectrum = fft.analyze();
            console.log(spectrum); // Check spectrum data
            audioVisualizer.update(spectrum);
            displayBars(p);
        }

        audioVisualizer.display();

        // Update playback speed based on mouse movement
        audioVisualizer.setPlaybackSpeed(p.mouseX / p.width);
    };
};

let sketchFractalGarden = function (p) {
    p.setup = function () {
        let canvas = p.createCanvas(500, 300);
        canvas.parent('fractal-garden');
        FractalGarden = new FractalGarden(p);
    };

    p.draw = function () {
        p.background(77, 76, 75);
        FractalGarden.update();
        FractalGarden.display();
    };
};

// Similar sketch functions for particleSymphony, perlinPortrait, and cellularCity

// Global variables (outside of any sketch function)
let song;
let fft;
let playing = false;
let playButton;
let audioVisualizer;

function preload() {
    song = loadSound('../final/sounds/dream.mp3'); // Replace with your audio path
}

function setup() {
    fft = new p5.FFT();

    playButton = createButton('Play');
    playButton.position(width / 2 - 30, height + 20);
    playButton.mousePressed(toggleSound);

    // Create new p5 instances for each sketch function
    new p5(sketchAudioVisualizer);
    new p5(sketchFractalGarden);
    // ... create p5 instances for other sketch functions
}

function toggleSound() {
    if (song.isPlaying()) {
        song.pause();
        playing = false;
        playButton.html('Play');
    } else {
        song.loop();
        playing = true;
        playButton.html('Pause');
    }
}

let currentFrame = 0; // Track playback position

// AudioVisualizer class (modified to accept spectrum data)
class AudioVisualizer {
    constructor(p) {
        this.fft = new p5.FFT();
        this.isPlaying = false;
        this.p = p; // Reference to the p5 instance
        this.bars = []; // Array to store bar information
        this.playbackSpeed = 1.0; // Initial playback speed
    }

    update(spectrum) {
        if (this.isPlaying) {
            console.log('playing:', playing); // Check playing state
            console.log(spectrum); // Check spectrum data

            this.bars = []; // Clear previous bars
            for (let i = 0; i < spectrum.length; i++) {
                let amp = spectrum[i];
                let barHeight = this.p.map(amp, 0, 256, 0, this.p.height);
                let barColor = this.p.color(0, 255, 0); // Bright green
                console.log(barColor);
                this.bars.push({ height: barHeight, color: barColor });
            }
            console.log(this.bars); // Check bars array content
        }

        currentFrame += this.playbackSpeed; // Advance playback position

        // Schedule next update based on adjusted speed
        setTimeout(() => this.update(), 1000 / (this.playbackSpeed * song.duration()));
    }


    display(p) {
        
        if (this.isPlaying) {
            for (let i = 0; i < this.bars.length; i++) {
                this.p.fill(this.bars[i].color);
                // Check calculated color values (optional)
                // console.log(this.bars[i].color);
                console.log('Drawing bar:', i);
                p.rect(i * this.p.width / this.bars.length, this.p.height, this.p.width / this.bars.length * 5, -barHeight); // Increased width by factor of 5
            }
        }
    }

    setPlaybackSpeed(speed) {
        this.playbackSpeed = speed;
    }
}


// Implement similar classes for FractalGarden, ParticleSymphony, etc.
class FractalGarden {
    constructor(p) {

    }

    update() {

    }

    display() {

    }
}  