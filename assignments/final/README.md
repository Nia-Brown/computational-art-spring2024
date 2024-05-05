# Nia Brown's Final Project

## **NOTE: Because there were/have been issues loading all of my code at once, I have embedded screenshot videos of how each gallery should work.**


## 1. TITLE: Nia's Generative Art Gallery

Each portrait/artwork has it's own unique behavior. Below is a screenshot of the home page (GalleryState.js):

![Gallery Home Page](<images/Gallery Home Page.png>)

-------------------------------------
From left to right:

### Portrait 1:  Dynamic Audio Visualizer

Displays a colorful and dynamic audio visualizer that responds to pre-recorded audio files. The shapes and colors  change based on the audio input. 

### VIDEO:
<video controls src="Portrait 1: Audio Visualizer.mp4" title="Title"></video>

### Portrait 2: Face Map

The camera on the user's computer is used to map and create dots that move and change as the user's facial expressions and and head moves. Ml5.js (Machine Learning library) was imported. Additionally, whener the user's head moves, new fireworks are generated and explode on the canvas.

### VIDEO:
<video controls src="Portrait 2: Face Map.mp4" title="Title"></video>

### Portrait 3: Perlin Noise

Generate portraits of people using Perlin noise. The portraits can morph and shift over time, creating a sense of movement and transformation. 

### VIDEO: 
<video controls src="Portrait 3: Perlin Painting-1.mp4" title="Title"></video>

## 2. LINK: [insert link here]
<!-- drag and click shift to drop videos, images into readMe.md -->

NOTE: Because there were/have been issues loading all of my code at once, I have embedded screenshot videos of how each gallery should work.

## 3. FIVE INTERCONNECTED ASPECTS:

i. Portrait 1:  Dynamic Audio Visualizer:
    -Play/Pause determines if audio visualizer begins or not.
    - Users can click play/pause button to trigger "freeze frame" of current audio visualizer state. For example, when clicking "pause", the bar height and color of the audio visualizer freezes and doesn't go away until user clicks "play" or "return to gallery".
    -Color and height of audio visualizer is dependent upon mp3 file chosen.

ii. Portrait 2: Face Map
    - Portrait will only map face if the face is detected, therefore the camera must be on and working in order to show user's face.
    - If the face goes out of camera view, text that says "no face detected" appears until the face is back in view.
    - User's facial expression and head movement must change for face to map and reflect those changes digitally (on the face map)
    - User's head must move to trigger the fireworks exploding.

iii. Portrait 3: Perlin Noise Painting
    - Image provided generates painting/portraits of people using Perlin noise and swirling effect. Image must be present for "painting" effect to work.
    - Swirling/distorted effect is based on angle, xOffset, and YOffset of image on the canvas.

9 total interconnected aspects across each portrait gallery.


## 4. MULTIMEDIA:

I primarily used: images (Perlin Noise Painting), video cameras (Face Map), music (Dynamic Audio Visualizer), and machine learning libraries (Face Map) to create a 3D effect.

I also used animation and a gif to create the effect of the man with a skateboard walking through the gallery.

## 5. ALLOWED TO PUBLICLY SHARE:

Yes.