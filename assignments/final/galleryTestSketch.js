let currentState;
let audioState;
let faceMapState;
let galleryState;
let perlinState;
let predictions = [];
let fireworks = [];
// let img = loadImage("https://assets.vangoghmuseum.nl/f9a7a187-484e-4821-b84a-79c836109029?w=1280&h=720&c=12f8ae08a908d9261f58a6bb1bfaa67e8daf061b56752678819c8c241a881bbe");


let noiseScale = 0.02;
let angleOffset = 0;
let angleSpeed = 1.0;
let img;

// function preload() {
//   // Load the image and log a message when it's loaded
//   img = loadImage("../final/images/vangogo.jpg");
// }

function setup() {
  createCanvas(1900, 800);
  // colorMode(HSB);

  // ------------- FACEMAPSTATE SETUP CODE -------------
  let facemesh;
  let modelReady;
  // // UNCOMMENT TO WORK !!!!!!!!!!!!!!!!!!
  video = createCapture(VIDEO);
  video.size(width, height);
  facemesh = ml5.facemesh(video, modelReady);

  // // // This sets up an event that fills the global variable "predictions"
  // // // with an array every time new predictions are made
  facemesh.on("predict", results => {
    predictions = results;
    endShape(CLOSE);

    //   //firework
    addFirework();
  });

  background(0);
  // Hide the video element, and just show the canvas
  // UNCOMMENT TO WORK !!!!!!!!!!!!!!!!!!
  video.hide();

  // ------------- END OF FACEMAPSTATE SETUP CODE -------------

  // ------------- AUDIO STATE SETUP CODE -------------

  audioState = new AudioState();

  audioState.preloadAudio("../final/sounds/houseMix.mp3", function () {
    console.log("Audio Loaded!"); // Optional: Verify audio loading
  });

  // END OF AUDIO STATE SETUP CODE -------------


  // UNCOMMENT TO WORK !!!!!!!!!!!!!!!!!!
  faceMapState = new FaceMapState(predictions, fireworks);   // Pass predictions as an argument (optional)

  // ------------- PERLIN STATE SETUP CODE -------------

  // Commented out because it slows down the webpage. Feel free to uncomment- easier to watch video of perlin portrait 
  // I made in the README.md file on GitHub

  // let img = loadImage("https://assets.vangoghmuseum.nl/f9a7a187-484e-4821-b84a-79c836109029?w=1280&h=720&c=12f8ae08a908d9261f58a6bb1bfaa67e8daf061b56752678819c8c241a881bbe");

  // img.resize(700, 530);
  // perlinState = new PerlinNoiseState(img, noiseScale, angleOffset, angleSpeed);


  // ------------- END OF PERLIN STATE SETUP CODE -------------

  galleryState = new GalleryState();

  currentState = galleryState;
}

function modelReady() {
  console.log("Model ready!");
}

// Function to add fireworks at random positions on the screen for FaceMapState.js
function addFirework() {
  const x = random(width); // Random x position on the screen
  const y = random(height); // Random y position on the screen
  const color = [random(255), random(255), random(255)]; // Random color
  fireworks.push(new Firework(x, y, color));
}


function draw() {
  currentState.draw();
  createReturnButton();
}


function mousePressed() {
  currentState.mousePressed();
  if (currentState === audioState) {
    handlePlayPause(audioState); // Pass audioState instance
  }
}

function handlePlayPause(audio) { // Function to handle play/pause 
  if (audio.isPlaying) {
    audio.stopAudio();
  } else {
    audio.playAudio();
  }
}

// Button to return to original gallery state
function createReturnButton() {
  const buttonContainer = document.querySelector('.return-button-container');
  buttonContainer.innerHTML = ""; // Clear any existing button

  if (currentState !== galleryState) { // Only create button if not in gallery state
    const button = document.createElement('button');
    button.textContent = "Return to Gallery";
    button.classList.add('return-button');
    buttonContainer.appendChild(button);

    // Add click event listener for the button
    button.addEventListener('click', () => {
      currentState = galleryState;
    });
  }
}