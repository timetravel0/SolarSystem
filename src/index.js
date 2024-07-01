import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Planet } from 'astronomia/planetposition';
import vsop87Bmercury from 'astronomia/data/vsop87Bmercury';
import vsop87Bvenus from 'astronomia/data/vsop87Bvenus';
import vsop87Bearth from 'astronomia/data/vsop87Bearth';
import vsop87Bmars from 'astronomia/data/vsop87Bmars';
import vsop87Bjupiter from 'astronomia/data/vsop87Bjupiter';
import vsop87Bsaturn from 'astronomia/data/vsop87Bsaturn';
import vsop87Buranus from 'astronomia/data/vsop87Buranus';
import vsop87Bneptune from 'astronomia/data/vsop87Bneptune';
import * as TWEEN from '@tweenjs/tween.js';
import * as CANNON from 'cannon';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

// Set up Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
pointLight.position.set(0, 0, 0);
pointLight.castShadow = true;
scene.add(pointLight);

const RADIUS = 1; // Assign a constant radius for visibility

// Starfield
function createStarfield() {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({ color: 0x888888 });

  const starVertices = [];
  for (let i = 0; i < 1000000; i++) {
    const x = THREE.MathUtils.randFloatSpread(200000);
    const y = THREE.MathUtils.randFloatSpread(200000);
    const z = THREE.MathUtils.randFloatSpread(200000);
    starVertices.push(x, y, z);
  }
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}
createStarfield();

// Bloom Effect
const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;
const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE);
const materials = {};
const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' });

const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0;
bloomPass.strength = 4;
bloomPass.radius = 2;

const bloomComposer = new EffectComposer(renderer);
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const finalPass = new ShaderPass(
  new THREE.ShaderMaterial({
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D baseTexture;
      uniform sampler2D bloomTexture;
      varying vec2 vUv;
      void main() {
        gl_FragColor = (texture2D(baseTexture, vUv) + vec4(1.0) * texture2D(bloomTexture, vUv));
      }
    `,
    defines: {}
  }), 'baseTexture'
);

const finalComposer = new EffectComposer(renderer);
finalComposer.addPass(renderScene);
finalComposer.addPass(finalPass);

function renderBloom(mask) {
  if (mask === true) {
    scene.traverse(darkenNonBloomed);
    bloomComposer.render();
    scene.traverse(restoreMaterial);
  } else {
    camera.layers.set(BLOOM_SCENE);
    bloomComposer.render();
    camera.layers.set(ENTIRE_SCENE);
  }
}

function darkenNonBloomed(obj) {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
}

function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

// Create a physics world
const world = new CANNON.World();
world.gravity.set(0, 0, 0);

// Array to store body data
const bodies = [];

// Array to store labels
const labels = [];
const orbitLines = [];

// Reference to labels container
const labelsContainer = document.getElementById('labels-container');

// Solar system data (scaled for visualization)
const solarSystem = [
  { name: 'Sun', radius: RADIUS * 5, distance: 0, color: 0xffff00, mass: 1.989e30, speed: 0, texture: 'textures/2k_sun.jpg' },
  { name: 'Mercury', radius: RADIUS * 0.383, distance: 10, color: 0x8c7c6e, mass: 3.285e23, speed: 47.87, texture: 'textures/2k_mercury.jpg' },
  { name: 'Venus', radius: RADIUS * 0.949, distance: 20, color: 0xe39e1c, mass: 4.867e24, speed: 35.02, texture: 'textures/2k_venus_surface.jpg' },
  { name: 'Earth', radius: RADIUS, distance: 30, color: 0x6b93d6, mass: 5.972e24, speed: 29.78, texture: 'textures/2k_earth_daymap.jpg' },
  { name: 'Mars', radius: RADIUS * 0.532, distance: 45, color: 0xc1440e, mass: 6.39e23, speed: 24.07, texture: 'textures/2k_mars.jpg' },
  { name: 'Jupiter', radius: RADIUS * 11.21, distance: 78, color: 0xd8ca9d, mass: 1.898e27, speed: 13.07, texture: 'textures/2k_jupiter.jpg' },
  { name: 'Saturn', radius: RADIUS * 9.45, distance: 142, color: 0xead6b8, mass: 5.683e26, speed: 9.69, texture: 'textures/2k_saturn.jpg' },
  { name: 'Uranus', radius: RADIUS * 4.01, distance: 287, color: 0xd1e7e7, mass: 8.681e25, speed: 6.81, texture: 'textures/2k_uranus.jpg' },
  { name: 'Neptune', radius: RADIUS * 3.88, distance: 450, color: 0x3b66cc, mass: 1.024e26, speed: 5.43, texture: 'textures/2k_neptune.jpg' },
];

const moon = { name: 'Moon', radius: RADIUS * 0.2727, distance: 0.00257, color: 0xffffff, mass: 7.342e22, speed: 1.022, parent: 'Earth', texture: 'textures/2k_moon.jpg' };

// Function to calculate Julian Date
function toJulianDate(date) {
  return date.getTime() / 86400000.0 + 2440587.5;
}

let JD = toJulianDate(new Date());

// Create instances for each planet's VSOP87 data
const vsop87Data = {
  mercury: new Planet(vsop87Bmercury),
  venus: new Planet(vsop87Bvenus),
  earth: new Planet(vsop87Bearth),
  mars: new Planet(vsop87Bmars),
  jupiter: new Planet(vsop87Bjupiter),
  saturn: new Planet(vsop87Bsaturn),
  uranus: new Planet(vsop87Buranus),
  neptune: new Planet(vsop87Bneptune)
};

// Function to get the planet's current position in AU
function getPlanetPosition(name, JD) {
  const planet = vsop87Data[name.toLowerCase()];
  if (!planet) {
    console.warn(`Planet data for ${name} not found.`);
    return null;
  }
  const position = planet.position(JD);
  return {
    x: position.range * Math.cos(position.lon),
    y: 0,
    z: position.range * Math.sin(position.lon),
    range: position.range,
    lon: position.lon
  };
}

// Function to calculate distance between two positions in AU
function calculateDistance(pos1, pos2) {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  const dz = pos1.z - pos2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

const G = 6.67430e-11; // Gravitational constant
const timeScale = 1e-2; // Significantly reduced time scale for slower updates

// Create celestial bodies

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Function to create and add a celestial body
function createBody(planetData, parentBody = null) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(planetData.texture);

  const geometry = new THREE.SphereGeometry(planetData.radius, 32, 32);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);

  // Add to bloom layer
  mesh.layers.enable(BLOOM_SCENE);

  // Physics body
  const shape = new CANNON.Sphere(planetData.radius);
  const body = new CANNON.Body({
    mass: planetData.mass,
    position: new CANNON.Vec3(mesh.position.x, mesh.position.y, mesh.position.z),
    shape,
  });
  world.addBody(body);

  // Add rings for Saturn
  if (planetData.name === 'Saturn') {
    const ringGeometry = new THREE.RingGeometry(RADIUS * 10, RADIUS * 20, 32);
    const ringMaterial = new THREE.MeshStandardMaterial({
      map: textureLoader.load('textures/2k_saturn_ring_alpha.png'),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2;
    mesh.add(ringMesh);
  }

  let position;
  if (planetData.name === 'Sun') {
    mesh.position.set(0, 0, 0); // Set Sun at the center
  } else if (planetData.name === 'Moon') {
    if (parentBody) {
      mesh.position.set(
        parentBody.mesh.position.x + planetData.distance * 1000,
        parentBody.mesh.position.y,
        parentBody.mesh.position.z
      );
    }
  } else {
    position = getPlanetPosition(planetData.name, JD);
    if (!position) {
      console.error(`Position for ${planetData.name} could not be determined.`);
      return null;
    }
    const scaleFactor = 100; // Scale factor for visualization
    if (parentBody) {
      mesh.position.set(
        parentBody.mesh.position.x + position.x * scaleFactor,
        parentBody.mesh.position.y + position.y * scaleFactor,
        parentBody.mesh.position.z + position.z * scaleFactor
      );
    } else {
      mesh.position.set(position.x * scaleFactor, position.y * scaleFactor, position.z * scaleFactor);
    }
  }

  const velocity = position ? new THREE.Vector3(
    -Math.sin(position.lon) * planetData.speed,
    0,
    Math.cos(position.lon) * planetData.speed
  ) : new THREE.Vector3(0, 0, 0);

  const bodyData = { mesh, mass: planetData.mass, velocity, radius: planetData.radius, data: planetData, parent: parentBody };

  bodies.push(bodyData);

  // Create label
  const labelDiv = document.createElement('div');
  labelDiv.className = 'label';
  labelDiv.textContent = planetData.name;
  labelDiv.style.position = 'absolute';
  labelDiv.style.color = 'white';
  labelDiv.style.pointerEvents = 'none'; // Prevent label from blocking mouse events
  labelsContainer.appendChild(labelDiv);
  labels.push({ element: labelDiv, body: bodyData });

  // Create orbit line
  if (position && planetData.name !== 'Moon') {
    const orbitGeometry = new THREE.BufferGeometry();
    const orbitMaterial = new THREE.LineBasicMaterial({ color: planetData.color, opacity: 0.5, transparent: true });
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      const x = Math.cos(angle) * position.range * 100;
      const z = Math.sin(angle) * position.range * 100;
      points.push(new THREE.Vector3(x, 0, z));
    }
    orbitGeometry.setFromPoints(points);
    const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
    scene.add(orbitLine);
    orbitLines.push(orbitLine);
  }

  return bodyData;
}

// Create celestial bodies
solarSystem.forEach((planetData) => createBody(planetData));

// Find Earth mesh and create the Moon orbiting around it
const earthBody = bodies.find(body => body.data.name === 'Earth');
const moonBody = createBody(moon, earthBody);

// Create moon orbit line
if (earthBody) {
  const moonOrbitGeometry = new THREE.BufferGeometry();
  const moonOrbitMaterial = new THREE.LineBasicMaterial({ color: moon.color, opacity: 0.5, transparent: true });
  const moonOrbitPoints = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    const x = Math.cos(angle) * moon.distance * 1000;
    const z = Math.sin(angle) * moon.distance * 1000;
    moonOrbitPoints.push(new THREE.Vector3(x + earthBody.mesh.position.x, 0, z + earthBody.mesh.position.z));
  }
  moonOrbitGeometry.setFromPoints(moonOrbitPoints);
  const moonOrbitLine = new THREE.Line(moonOrbitGeometry, moonOrbitMaterial);
  scene.add(moonOrbitLine);
  orbitLines.push(moonOrbitLine);
}

// Position camera
camera.position.set(0, 500, 500);
camera.lookAt(0, 0, 0);
controls.update();

function updatePositions(delta) {
  const maxVelocity = 0.01; // Cap the maximum velocity to prevent fast movements

  for (let i = 1; i < bodies.length; i++) { // Start from 1 to skip the Sun
    const body = bodies[i];
    let centralBody;

    // Check if the body is the Moon
    if (body === moonBody) {
      centralBody = earthBody;
    } else {
      centralBody = bodies[0]; // Sun
    }

    // Calculate gravitational force from the central body
    const centralPosition = centralBody.mesh.position;
    const distance = body.mesh.position.distanceTo(centralPosition);
    const forceMagnitude = (G * centralBody.mass * body.mass) / (distance * distance);
    const forceDirection = centralPosition.clone().sub(body.mesh.position).normalize();
    const force = forceDirection.multiplyScalar(forceMagnitude);

    const acceleration = force.divideScalar(body.mass);

    body.velocity.add(acceleration.multiplyScalar(delta * timeScale));

    // Cap the velocity
    if (body.velocity.length() > maxVelocity) {
      body.velocity.setLength(maxVelocity);
    }

    // Update position
    body.mesh.position.add(body.velocity.clone().multiplyScalar(delta * timeScale));
  }
}

function updateLabels() {
  labels.forEach(({ element, body }) => {
    const screenPosition = body.mesh.position.clone().project(camera);
    const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-screenPosition.y * 0.5 + 0.5) * window.innerHeight;
    element.style.transform = `translate(-50%, -50%) translate(${x}px,${y - 20}px)`; // Position label above the planet
  });
}

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  updatePositions(delta);
  updateLabels();

  controls.update();
  renderBloom(true);
  finalComposer.render();
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  bloomComposer.setSize(window.innerWidth, window.innerHeight);
  finalComposer.setSize(window.innerWidth, window.innerHeight);
});

// Handle mouse click
window.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(bodies.map(body => body.mesh));

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    const clickedBody = bodies.find(body => body.mesh === clickedObject);
    if (clickedBody) {
      zoomToPlanet(clickedBody.data.name);
      updateInfoPanel(clickedBody.data);
    }
  }
}

function updateInfoPanel(planetData) {
  const infoPanel = document.getElementById('info-panel');
  const earthPosition = getPlanetPosition('Earth', JD);
  const planetPosition = getPlanetPosition(planetData.name, JD);
  const distanceToEarth = planetPosition && earthPosition ? calculateDistance(earthPosition, planetPosition).toFixed(2) : 'N/A';

  infoPanel.innerHTML = `
    <h3>${planetData.name}</h3>
    <p>Mass: ${planetData.mass.toExponential(2)} kg</p>
    <p>Distance from Sun: ${(planetData.distance).toFixed(2)} AU</p>
    <p>Distance to Earth: ${distanceToEarth} AU</p>
    <p>Radius: ${(planetData.radius / RADIUS).toFixed(4)} Earth radii</p>
    <p>Orbital Speed: ${planetData.speed.toFixed(2)} km/s</p>
  `;
}

// Function to zoom to a specific planet with a smooth transition
function zoomToPlanet(planetName) {
  const body = bodies.find(body => body.data.name === planetName);
  if (body) {
    const position = body.mesh.position;
    new TWEEN.Tween(camera.position)
      .to({ x: position.x + 100, y: position.y + 100, z: position.z + 100 }, 2000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        camera.lookAt(position);
      })
      .start();
    controls.target.set(position.x, position.y, position.z);
    controls.update();
  }
}

// Function to update positions for a specific date
function updatePositionsForDate(date) {
  JD = toJulianDate(date);
  bodies.forEach(body => {
    if (body.data.name !== 'Sun' && body.data.name !== 'Moon') {
      const position = getPlanetPosition(body.data.name, JD);
      const scaleFactor = 100;
      body.mesh.position.set(position.x * scaleFactor, position.y * scaleFactor, position.z * scaleFactor);
    }
  });
  updateLabels();
}

// Adding a menu bar
const menuBar = document.createElement('div');
menuBar.style.position = 'absolute';
menuBar.style.top = '0';
menuBar.style.width = '100%';
menuBar.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
menuBar.style.color = 'white';
menuBar.style.display = 'flex';
menuBar.style.justifyContent = 'space-around';
menuBar.style.padding = '10px';
document.body.appendChild(menuBar);

// Adding planet selection dropdown
const planetSelect = document.createElement('select');
planetSelect.innerHTML = solarSystem.map(planet => `<option value="${planet.name}">${planet.name}</option>`).join('');
planetSelect.onchange = (event) => {
  const selectedPlanet = event.target.value;
  zoomToPlanet(selectedPlanet);
  const selectedBody = bodies.find(body => body.data.name === selectedPlanet);
  if (selectedBody) {
    updateInfoPanel(selectedBody.data);
  }
};
menuBar.appendChild(planetSelect);

// Adding a date picker to set a specific date
const datePicker = document.createElement('input');
datePicker.type = 'date';
datePicker.onchange = (event) => {
  const selectedDate = new Date(event.target.value);
  updatePositionsForDate(selectedDate);
};
menuBar.appendChild(datePicker);

// Display current date and time
const dateTimeDisplay = document.createElement('div');
function updateDateTime() {
  const now = new Date();
  dateTimeDisplay.textContent = now.toLocaleString();
}
updateDateTime();
setInterval(updateDateTime, 1000); // Update every second
menuBar.appendChild(dateTimeDisplay);

// Initialize TWEEN for animations
function animateTween() {
  requestAnimationFrame(animateTween);
  TWEEN.update();
}
animateTween();

// Start with the Sun selected and zoomed in
zoomToPlanet('Sun');
const sunBody = bodies.find(body => body.data.name === 'Sun');
if (sunBody) {
  updateInfoPanel(sunBody.data);
}
