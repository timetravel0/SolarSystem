# Solar System Simulation

## Overview

This project is a 3D simulation of the solar system using Three.js, Cannon.js, and astronomy data from the VSOP87 model. It visualizes the positions and movements of the planets and their moons, providing an interactive and educational tool to explore our solar system. The simulation includes features like realistic textures, bloom effects, and gravitational physics.

## Features

- **Realistic 3D Visualization**: Uses high-quality textures for planets and moons.
- **Interactive Controls**: Rotate, zoom, and pan around the solar system using mouse controls.
- **Planetary Information**: Displays detailed information about each planet, including mass, distance from the Sun, distance to Earth, radius, and orbital speed.
- **Date Picker**: Set a specific date to see the positions of the planets on that date.
- **Planet Zoom**: Click on a planet or select it from the dropdown menu to zoom in and center the camera on it.
- **Bloom Effect**: Enhances the visual appeal with a bloom effect around bright objects like the Sun.
- **Gravitational Physics**: Simulates gravitational interactions between planets and their moons.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/timetravel0/SolarSystem.git
   cd solar-system-simulation
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Run the application:
   ```
   npm run build
   ```
   Open your browser and navigate to http://localhost:3000.

## Usage
- **Rotate the view**: Click and drag the mouse.
- **Zoom in/out**: Use the mouse wheel.
- **Pan the view**: Right-click and drag the mouse.
- **Select a planet**: Use the dropdown menu in the top bar or click on a planet.
- **Set a specific date**: Use the date picker in the top bar.
- **View planet information**: Click on a planet to display its details in the information panel.

## Technologies Used
- Three.js: A JavaScript library for creating 3D graphics.
- Cannon.js: A physics engine for simulating gravitational interactions.
- Astronomia: A library for astronomical calculations based on the VSOP87 model.
- TWEEN.js: A tweening library for smooth animations.
- Webpack: A module bundler for JavaScript.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue with your suggestions.





