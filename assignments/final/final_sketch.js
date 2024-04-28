// State Manager
let stateManager;
let originalState;

function preload() {
  originalState = new OriginalState();
  // Preload images
  originalState.loadImages();
}

function setup() {
  createCanvas(2500, 600);
  stateManager = new StateManager(originalState);
}

function resetButton() {
  let button = createButton('Return to Gallery');
  button.position(width / 2 - 50, height + 20);
  button.mousePressed(() => {
    stateManager.switchState(originalState);
  });
}

function draw() {
  stateManager.currentState.draw();
  resetButton();
}

function mouseClicked() {
  stateManager.handleMouseClick();
}

// States
class OriginalState {
  constructor() {
    this.boxWidth = 500;
    this.boxHeight = 300;
    this.spacing = (width - (this.boxWidth * 5)) / 6;
    this.images = [];
  }

  loadImages() {
    // Load images into the array
    this.images.push(loadImage('../final_images/soundwaves.jpg'));
    // this.images.push(loadImage('path_to_fractal_garden_image.jpg'));
    // Load more images as needed
  }

  draw() {
    for (let i = 0; i < 5; i++) {
      let x = this.spacing + (this.boxWidth + this.spacing) * i;
      let y = 0;

      // Draw box
      fill(200);
      rect(x, y, this.boxWidth, this.boxHeight);

      // Display preloaded image
      if (this.images[i]) {
        image(this.images[i], x, y, this.boxWidth, this.boxHeight);
      }

      // Check if mouse is over the box
      if (mouseX > x && mouseX < x + this.boxWidth && mouseY > y && mouseY < y + this.boxHeight) {
        cursor(HAND);
        if (mouseIsPressed) {
          // Switch to corresponding state based on index (i)
          switch (i) {
            case 0:
              stateManager.switchState(new AudioVisualizerState());
              break;
            case 1:
              stateManager.switchState(new FractalGardenState());
              break;
            // Add more cases for other states
            default:
              console.warn("Unknown box index:", i);
          }
        }
      }
    }
  }
}

class AudioVisualizerState {
  draw() {
    // Draw audio visualizer
    background(255);
    // Add audio visualizer drawing logic here
  }
}

class FractalGardenState {
  draw() {
    // Draw fractal garden
    background(77, 76, 75);
    // Add fractal garden drawing logic here
  }
}

// State Manager
class StateManager {
  constructor(initialState) {
    this.states = {};
    this.currentState = initialState;
  }

  addState(name, state) {
    this.states[name] = state;
  }

  switchState(newState) {
    this.currentState = newState;
  }

  handleMouseClick() {
    // No need to implement this in the manager since it's handled in OriginalState
  }
}
