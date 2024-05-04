let fft;

class AudioState {
    constructor(audioFilePath) { // Add audioFilePath argument
        this.audioFile;
        // this.fft;
        this.isPlaying = false;
        this.playbackSpeed = 1.0;
        this.preloadAudio(audioFilePath); // Call loadAudio in constructor

        this.setupAudioVisualizer();
        this.lastSpectrum = null;


    }
    setupAudioVisualizer() {
        fft = new p5.FFT(0.9, 128); // Create FFT object with smoothing and bin count
        this.audioFile.connect(fft); // Connect audio to FFT for analysis
    }

    // Load synth sound for Dynamic Audio Visualizer
    preloadAudio(audioFilePath) {
        this.audioFile = loadSound(audioFilePath, this.onAudioLoaded.bind(this));
    }

    onAudioLoaded() {
        console.log("Audio Loaded!"); // Optional: Verification
    }

    playAudio() {
        if (this.audioFile) {
            this.audioFile.play();
            this.lastSpectrum = null; // Clear last spectrum on play
            this.isPlaying = true;
        }
    }

    stopAudio() {
        if (this.audioFile) {
            this.audioFile.stop();
            // Capture spectrum data only if audio has played some content
            if (this.audioFile.currentTime() > 0) {
                this.lastSpectrum = fft.analyze();
            }
            this.isPlaying = false;
        }
    }


    draw() {
        background(0);

        // fill(100, 50, 100);
        // ellipse(100, height / 2, 100);

        fill(255);
        text("Where Sound Meets Color - Audio Visualizer | Nia Brown 2024", 900, 100);


        // --- PLAY/PAUSE SOUND ---
        if (this.audioFile) {
            const buttonX = 50; // Center the button horizontally
            const buttonY = height - 50; // Position the button near the bottom
            const buttonRadius = 30;

            fill(255, 236, 0); // Button background color (adjust as needed)
            ellipse(buttonX, buttonY, 60, 60); // Draw larger ellipse

            fill(0); // Button text color
            const buttonText = this.isPlaying ? "Pause" : "Play";
            textSize(20);
            textAlign(CENTER, CENTER);
            text(buttonText, buttonX, buttonY);


            // Check for mouse clicks within the exact button radius (ellipse)
            const distanceFromCenterX = Math.abs(mouseX - buttonX);  // Correct calculation (X)
            const distanceFromCenterY = Math.abs(mouseY - buttonY);  // Correct calculation (Y)


            // Check for mouse clicks within the button area
            if (distanceFromCenterX < buttonRadius && distanceFromCenterY < buttonRadius) {
                if (mouseIsPressed) {
                    if (this.isPlaying) {
                        this.stopAudio();
                    } else {
                        this.playAudio();
                    }
                }
            }

        }
        // --- END OF PLAY/PAUSE SOUND ---

        // --- VISUALS ---
        // -Inspired by:
        // Daniel Shiffman
        // Code for: https://youtu.be/2O3nm0Nvbi4

        if (this.isPlaying) {
            const spectrum = fft.analyze();
            // console.log(spectrum);

            // Draw audio visualization based on spectrum data 

            noStroke();
            translate(100, 110); // position of visualization

            for (let i = 0; i < spectrum.length; i++) {
                const amp = spectrum[i];
                const barWidth = 100; // Adjust bar width as needed
                const barSpacing = 30;


                const totalSpacing = (spectrum.length - 2) * barSpacing;

                const x = map(i, 0, spectrum.length, 0, width + (totalSpacing - 10)); // Map index to adjusted horizontal range
                const y = map(amp, 0, 256, height, 0); // Map amplitude to vertical position
                fill(color(i * 2, 255 - y, y)); // Dynamic color based on frequency and position
                rect(x, y, barWidth, height - y); // Draw bars with calculated position, width, and height
            }
        } else if (this.lastSpectrum) {
            // Use the last analyzed spectrum data when paused
            const spectrum = this.lastSpectrum;
            for (let i = 0; i < spectrum.length; i++) {
              const amp = spectrum[i];
              // ... existing code for drawing bars based on spectrum ...
              const barWidth = 100; // Adjust bar width as needed
                const barSpacing = 30;


                const totalSpacing = (spectrum.length - 2) * barSpacing;

                const x = map(i, 0, spectrum.length, 0, width + (totalSpacing - 10)); // Map index to adjusted horizontal range
                const y = map(amp, 0, 256, height, 0); // Map amplitude to vertical position
                fill(color(i * 2, 255 - y, y)); // Dynamic color based on frequency and position
                rect(x, y, barWidth, height - y); // Draw bars with calculated position, width, and height
            }
          } else {
            text("PAUSED", 300, 100);
          }
    }



    mousePressed() {
        currentState = audioState; // change if neccesary
    }
}

