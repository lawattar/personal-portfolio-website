import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const canvas = document.querySelector("#scene");
const audioToggleButton = document.querySelector(".audio-toggle");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color("#040812");
scene.fog = new THREE.Fog("#040812", 25, 120);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);

// Lighting intensity: adjust these for darker/brighter mood.
const moonLight = new THREE.DirectionalLight("#f0f2f8ff", 2.25);
moonLight.position.set(12, 5,50);
moonLight.castShadow = true;
moonLight.shadow.mapSize.set(1024, 1024);
moonLight.shadow.camera.near = 0.5;
moonLight.shadow.camera.far = 45;
moonLight.shadow.camera.left = -10;
moonLight.shadow.camera.right = 10;
moonLight.shadow.camera.top = 10;
moonLight.shadow.camera.bottom = -10;
scene.add(moonLight);

const hemiLight = new THREE.HemisphereLight("#6a7eb2", "#05070d", 0.42);
scene.add(hemiLight);

const ambientLight = new THREE.AmbientLight("#3f4f77", 0.3);
scene.add(ambientLight);

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
loader.setDRACOLoader(dracoLoader);

// Camera position: offset from Blender camera (local camera axes. x is pan left/right. y is pan up/down).
const cameraOffset = new THREE.Vector3(-.3, -.1, -1);
// Camera rotation: offset from Blender camera (radians: x (up/down?), y , z (DONT TOUCH)).
const cameraRotationOffset = new THREE.Euler(-.28, 0, 0);
// Camera zoom: offset from Blender camera zoom (positive = zoom in, negative = zoom out).
const cameraZoomOffset = -.075;
// Ultrawide framing controls (prevents scene from feeling too zoomed out horizontally).
const ultrawideCompensationEnabled = true;
const ultrawideReferenceAspect = 16 / 9;
const ultrawideAspectCap = 32 / 9;
// 0 = disabled, 1 = full compensation.
const ultrawideZoomCompensation = 0.9;

// Subtle mouse parallax strength/smoothing.
const parallaxStrength = new THREE.Vector2(0.1, 0.1);
const parallaxSmoothing = 0.045;

// Rain effect toggle for testing.
const rainEnabled = true;
const rainDropCount = 7500;
const rainAreaWidth = 80;
const rainAreaDepth = 50;
const rainMinY = -2;
const rainMaxY = 14;
const rainSpeedMin = 6;
const rainSpeedMax = 16;
const rainWindX = -0.2;
// Rain drop shape controls.
// `rainShape`: "teardrop" or "streak"
const rainShape = "teardrop";
// Width/length are normalized ratios of each particle sprite (0..1).
const rainDropWidth = 0.2;
const rainDropLength = 0.9;
// Overall particle size and visibility.
const rainDropSize = 0.12;
const rainDropOpacity = 0.8;

// Lightning effect toggle and controls (lighting-only, no visible strike mesh).
const lightningEnabled = true;
const lightningIntervalMin = 4.0;
const lightningIntervalMax = 9.0;
const lightningBurstsMin = 1;
const lightningBurstsMax = 3;
const lightningIntraBurstDelayMin = 0.05;
const lightningIntraBurstDelayMax = 0.2;
const lightningFlashDurationMin = 0.05;
const lightningFlashDurationMax = 0.14;
const lightningFlashStrengthMin = 0.55;
const lightningFlashStrengthMax = 1.0;
const lightningMoonBoost = 7.5;
const lightningHemiBoost = 0.28;
const lightningAmbientBoost = 0.22;
const lightningExposureBoost = 0.65;
const lightningFogLift = 0.3;
const lightningBackgroundLift = 0.25;
const lightningTintColor = "#98aeff";
// Initial lightning strike controls (runs once on page load).
const initialLightningStrikeEnabled = true;
// Keep this <= 2.0 for the first flash.
const initialLightningStrikeDelay = 2;
// Startup burst controls.
const initialLightningStrikeBurstCount = 2;
const initialLightningStrikeBurstDelayMin = 0.08;
const initialLightningStrikeBurstDelayMax = 0.18;
const initialLightningStrikeBurstDurationMin = 0.08;
const initialLightningStrikeBurstDurationMax = 0.16;
const initialLightningStrikeBurstStrengthMin = 0.7;
const initialLightningStrikeBurstStrengthMax = 1.0;

// Low ground fog (road-level) toggle and controls. Couldnt get this to work right, so I disabled it.
const groundFogEnabled = false;
const groundFogColor = "#9aaad1";
const groundFogOpacity = 0.9;
const groundFogHeight = -1.3;
const groundFogRadius = 100;
const groundFogLayerCount = 4;
const groundFogCenter = new THREE.Vector3(0, groundFogHeight, 0);
const groundFogDriftSpeed = 0.015;
const groundFogPulseAmount = 0.12;
const groundFogPulseSpeed = 0.2;

// Audio controls.
const audioEnabled = true;
const ambienceAudioEnabled = true;
const ambienceAudioPath = "/audios/jci-21-rain-and-thunder-sfx-12820.mp3";
const ambienceAudioVolume = 0.005;
const randomThunderAudioEnabled = true;
const randomThunderAudioPath = "/audios/mixkit-strong-close-thunder-explosion-1300.mp3";
const randomThunderAudioVolume = 0.025;
const randomThunderMinDelay = 5; // Hard minimum should stay >= 5 seconds.
const randomThunderMaxDelay = 18;

// Car position/rotation/scale: optional offsets relative to exported transform.
// Set `carNodeName` to the exact Blender object/group name to enable this.
const carNodeName = "";
const carTransformOffset = {
  position: new THREE.Vector3(0, 0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  scale: new THREE.Vector3(1, 1, 1),
};

// Forest position/rotation/scale: optional offsets relative to exported transform.
// Set `forestNodeName` to the exact Blender object/group name to enable this.
const forestNodeName = "";
const forestTransformOffset = {
  position: new THREE.Vector3(0, 0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  scale: new THREE.Vector3(1, 1, 1),
};

const importedCameraBase = {
  hasValue: false,
  position: new THREE.Vector3(),
  quaternion: new THREE.Quaternion(),
  zoom: 1,
};

const pointerTarget = new THREE.Vector2(0, 0);
const pointerSmooth = new THREE.Vector2(0, 0);
const localCameraOffset = new THREE.Vector3();
const worldCameraOffset = new THREE.Vector3();
const cameraRotationOffsetQ = new THREE.Quaternion();
const clock = new THREE.Clock();

let rainSystem = null;
let groundFogSystem = null;
const audioState = {
  ambience: null,
  thunder: null,
  nextThunderTimer: 0,
  pendingUserGesture: false,
  muted: false,
};

const baseLighting = {
  moonIntensity: moonLight.intensity,
  hemiIntensity: hemiLight.intensity,
  ambientIntensity: ambientLight.intensity,
  exposure: renderer.toneMappingExposure,
  fogColor: scene.fog.color.clone(),
  backgroundColor: scene.background.clone(),
};

const lightningState = {
  nextEventTimer: THREE.MathUtils.randFloat(lightningIntervalMin, lightningIntervalMax),
  activeTime: 0,
  activeDuration: 0,
  activeStrength: 0,
  burstFlashesRemaining: 0,
  initialFlashPending: initialLightningStrikeEnabled,
  initialFlashTimer: initialLightningStrikeDelay,
  initialBurstFlashesRemaining: 0,
  initialBurstTimer: 0,
};

const lightningTint = new THREE.Color(lightningTintColor);

const setAudioMuted = (muted) => {
  audioState.muted = muted;
  if (audioState.ambience) audioState.ambience.muted = muted;
  if (audioState.thunder) audioState.thunder.muted = muted;

  if (audioToggleButton) {
    audioToggleButton.dataset.muted = muted ? "true" : "false";
    audioToggleButton.setAttribute("aria-label", muted ? "Unmute audio" : "Mute audio");
    audioToggleButton.setAttribute("title", muted ? "Unmute audio" : "Mute audio");
  }
};

const createAudioTrack = (path, loop, volume) => {
  const audio = new Audio(path);
  audio.preload = "auto";
  audio.loop = loop;
  audio.volume = THREE.MathUtils.clamp(volume, 0, 1);
  audio.muted = audioState.muted;
  if (loop) {
    audio.addEventListener("ended", () => {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore playback failures caused by browser autoplay policies.
      });
    });
  }
  return audio;
};

const scheduleNextThunderSound = () => {
  const minDelay = Math.max(5, randomThunderMinDelay);
  const maxDelay = Math.max(minDelay, randomThunderMaxDelay);
  audioState.nextThunderTimer = THREE.MathUtils.randFloat(minDelay, maxDelay);
};

const removeAudioGestureHandlers = () => {
  window.removeEventListener("pointerdown", tryStartAmbienceAfterGesture);
  window.removeEventListener("keydown", tryStartAmbienceAfterGesture);
  window.removeEventListener("touchstart", tryStartAmbienceAfterGesture);
};

const tryStartAmbienceAfterGesture = () => {
  if (!audioEnabled || !audioState.pendingUserGesture || !audioState.ambience) return;
  const playPromise = audioState.ambience.play();
  if (!playPromise || typeof playPromise.then !== "function") {
    audioState.pendingUserGesture = false;
    removeAudioGestureHandlers();
    return;
  }

  playPromise
    .then(() => {
      audioState.pendingUserGesture = false;
      removeAudioGestureHandlers();
    })
    .catch(() => {
      audioState.pendingUserGesture = true;
    });
};

const initAudio = () => {
  setAudioMuted(audioState.muted);
  if (!audioEnabled) {
    if (audioToggleButton) audioToggleButton.style.display = "none";
    return;
  }

  if (ambienceAudioEnabled) {
    audioState.ambience = createAudioTrack(ambienceAudioPath, true, ambienceAudioVolume);
    const playPromise = audioState.ambience.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          audioState.pendingUserGesture = false;
        })
        .catch(() => {
          // Browser autoplay policy can block audio until user interaction.
          audioState.pendingUserGesture = true;
          window.addEventListener("pointerdown", tryStartAmbienceAfterGesture);
          window.addEventListener("keydown", tryStartAmbienceAfterGesture);
          window.addEventListener("touchstart", tryStartAmbienceAfterGesture, { passive: true });
        });
    }
  }

  if (randomThunderAudioEnabled) {
    audioState.thunder = createAudioTrack(randomThunderAudioPath, false, randomThunderAudioVolume);
    scheduleNextThunderSound();
  }
};

if (audioToggleButton) {
  audioToggleButton.addEventListener("click", () => {
    setAudioMuted(!audioState.muted);
    if (!audioState.muted && audioState.pendingUserGesture) {
      tryStartAmbienceAfterGesture();
    }
  });
}

const updateAudio = (deltaSeconds) => {
  if (!audioEnabled || !randomThunderAudioEnabled || !audioState.thunder) return;
  if (audioState.pendingUserGesture) return;

  audioState.nextThunderTimer -= deltaSeconds;
  if (audioState.nextThunderTimer > 0) return;

  audioState.thunder.volume = THREE.MathUtils.clamp(randomThunderAudioVolume, 0, 1);
  audioState.thunder.currentTime = 0;
  audioState.thunder.play().catch(() => {
    // Ignore intermittent playback failures.
  });
  scheduleNextThunderSound();
};

const updatePointer = (clientX, clientY) => {
  pointerTarget.x = (clientX / window.innerWidth - 0.5) * 2;
  pointerTarget.y = (clientY / window.innerHeight - 0.5) * 2;
};

window.addEventListener("mousemove", (event) => {
  updatePointer(event.clientX, event.clientY);
});

window.addEventListener(
  "touchmove",
  (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    updatePointer(touch.clientX, touch.clientY);
  },
  { passive: true },
);

const removeImportedLightsAndSetupShadows = (root) => {
  const lights = [];
  root.traverse((obj) => {
    if (obj.isLight) lights.push(obj);
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  for (const light of lights) {
    light.parent?.remove(light);
  }
};

const applyTransformOffset = (node, offset) => {
  node.position.add(offset.position);
  node.rotation.x += offset.rotation.x;
  node.rotation.y += offset.rotation.y;
  node.rotation.z += offset.rotation.z;
  node.scale.multiply(offset.scale);
};

const applyNamedTransformOffset = (root, nodeName, offset, label) => {
  if (!nodeName) return;

  const node = root.getObjectByName(nodeName);
  if (!node) {
    console.warn(`${label} node "${nodeName}" not found. Update the node name in main.js.`);
    return;
  }

  applyTransformOffset(node, offset);
};

const applyExportedCamera = (exportedCamera) => {
  exportedCamera.updateWorldMatrix(true, false);
  exportedCamera.getWorldPosition(importedCameraBase.position);
  exportedCamera.getWorldQuaternion(importedCameraBase.quaternion);
  importedCameraBase.hasValue = true;

  if (exportedCamera.isPerspectiveCamera) {
    camera.fov = exportedCamera.fov;
    camera.near = exportedCamera.near;
    camera.far = exportedCamera.far;
    importedCameraBase.zoom = exportedCamera.zoom;
    camera.zoom = Math.max(0.01, importedCameraBase.zoom + cameraZoomOffset);
  }
};

const getCompensatedCameraZoom = () => {
  const baseZoom = Math.max(0.01, importedCameraBase.zoom + cameraZoomOffset);
  if (!ultrawideCompensationEnabled) return baseZoom;

  const viewportAspect = window.innerWidth / window.innerHeight;
  const cappedAspect = Math.min(viewportAspect, ultrawideAspectCap);
  if (cappedAspect <= ultrawideReferenceAspect) return baseZoom;

  const rawMultiplier = cappedAspect / ultrawideReferenceAspect;
  const compensationMultiplier = THREE.MathUtils.lerp(1, rawMultiplier, ultrawideZoomCompensation);
  return Math.max(0.01, baseZoom * compensationMultiplier);
};

const createRainDropTexture = () => {
  const textureSize = 128;
  const canvas = document.createElement("canvas");
  canvas.width = textureSize;
  canvas.height = textureSize;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const widthPx = THREE.MathUtils.clamp(rainDropWidth, 0.03, 0.48) * textureSize;
  const lengthPx = THREE.MathUtils.clamp(rainDropLength, 0.2, 1.0) * textureSize;
  const centerX = textureSize * 0.5;
  const top = (textureSize - lengthPx) * 0.5;
  const bottom = top + lengthPx;

  const gradient = ctx.createLinearGradient(0, top, 0, bottom);
  gradient.addColorStop(0.0, "rgba(255,255,255,0.00)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.75)");
  gradient.addColorStop(1.0, "rgba(255,255,255,0.15)");
  ctx.fillStyle = gradient;

  if (rainShape === "streak") {
    ctx.fillRect(centerX - widthPx * 0.5, top, widthPx, lengthPx);
  } else {
    // Teardrop silhouette.
    ctx.beginPath();
    ctx.moveTo(centerX, top);
    ctx.bezierCurveTo(
      centerX + widthPx * 0.65,
      top + lengthPx * 0.28,
      centerX + widthPx * 0.55,
      top + lengthPx * 0.74,
      centerX,
      bottom,
    );
    ctx.bezierCurveTo(
      centerX - widthPx * 0.55,
      top + lengthPx * 0.74,
      centerX - widthPx * 0.65,
      top + lengthPx * 0.28,
      centerX,
      top,
    );
    ctx.closePath();
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.needsUpdate = true;
  return texture;
};

const createGroundFogTexture = () => {
  const textureSize = 256;
  const canvas = document.createElement("canvas");
  canvas.width = textureSize;
  canvas.height = textureSize;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const center = textureSize * 0.5;
  const gradient = ctx.createRadialGradient(center, center, textureSize * 0.08, center, center, center);
  gradient.addColorStop(0.0, "rgba(255,255,255,0.55)");
  gradient.addColorStop(0.55, "rgba(255,255,255,0.26)");
  gradient.addColorStop(1.0, "rgba(255,255,255,0.0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, textureSize, textureSize);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
};

const createGroundFog = () => {
  if (!groundFogEnabled) return;

  const fogTexture = createGroundFogTexture();
  if (!fogTexture) return;

  const group = new THREE.Group();
  const materials = [];
  const baseOpacities = [];
  const phases = [];

  for (let i = 0; i < groundFogLayerCount; i += 1) {
    const layerScale = groundFogRadius * (1 + i * 0.22);
    const layerOpacity = groundFogOpacity * (1 - i * 0.16);
    const geometry = new THREE.PlaneGeometry(layerScale, layerScale, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: groundFogColor,
      transparent: true,
      opacity: layerOpacity,
      depthWrite: false,
      fog: false,
      map: fogTexture.clone(),
      alphaMap: fogTexture.clone(),
    });
    material.map.wrapS = THREE.RepeatWrapping;
    material.map.wrapT = THREE.RepeatWrapping;
    material.alphaMap.wrapS = THREE.RepeatWrapping;
    material.alphaMap.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set(1.3 + i * 0.18, 1.3 + i * 0.18);
    material.alphaMap.repeat.copy(material.map.repeat);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(
      groundFogCenter.x + (Math.random() - 0.5) * 1.2,
      groundFogCenter.y + i * 0.03,
      groundFogCenter.z + (Math.random() - 0.5) * 1.2,
    );
    mesh.renderOrder = 5;
    group.add(mesh);
    materials.push(material);
    baseOpacities.push(layerOpacity);
    phases.push(Math.random() * Math.PI * 2);
  }

  scene.add(group);
  groundFogSystem = { group, materials, baseOpacities, phases };
};

const createRain = () => {
  if (!rainEnabled) return;

  const positions = new Float32Array(rainDropCount * 3);
  const speeds = new Float32Array(rainDropCount);

  for (let i = 0; i < rainDropCount; i += 1) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * rainAreaWidth;
    positions[i3 + 1] = THREE.MathUtils.lerp(rainMinY, rainMaxY, Math.random());
    positions[i3 + 2] = (Math.random() - 0.5) * rainAreaDepth;
    speeds[i] = THREE.MathUtils.lerp(rainSpeedMin, rainSpeedMax, Math.random());
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const rainTexture = createRainDropTexture();

  const material = new THREE.PointsMaterial({
    color: "#9fb0d8",
    size: rainDropSize,
    transparent: true,
    opacity: rainDropOpacity,
    depthWrite: false,
    map: rainTexture ?? undefined,
    alphaMap: rainTexture ?? undefined,
    alphaTest: 0.01,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  scene.add(points);

  rainSystem = { points, geometry, positions, speeds };
};

const updateRain = (deltaSeconds) => {
  if (!rainSystem) return;

  const { points, geometry, positions, speeds } = rainSystem;
  points.position.copy(camera.position);

  for (let i = 0; i < rainDropCount; i += 1) {
    const i3 = i * 3;
    positions[i3] += rainWindX * deltaSeconds;
    positions[i3 + 1] -= speeds[i] * deltaSeconds;

    if (positions[i3 + 1] < rainMinY) {
      positions[i3] = (Math.random() - 0.5) * rainAreaWidth;
      positions[i3 + 1] = rainMaxY;
      positions[i3 + 2] = (Math.random() - 0.5) * rainAreaDepth;
      speeds[i] = THREE.MathUtils.lerp(rainSpeedMin, rainSpeedMax, Math.random());
    }
  }

  geometry.attributes.position.needsUpdate = true;
};

const updateGroundFog = (deltaSeconds, elapsedSeconds) => {
  if (!groundFogSystem) return;

  const { materials, baseOpacities, phases } = groundFogSystem;
  for (let i = 0; i < materials.length; i += 1) {
    const material = materials[i];
    const pulse = 1 + groundFogPulseAmount * Math.sin(elapsedSeconds * groundFogPulseSpeed + phases[i]);
    material.opacity = Math.max(0, baseOpacities[i] * pulse);

    const drift = groundFogDriftSpeed * (1 + i * 0.28);
    material.map.offset.x += drift * deltaSeconds;
    material.alphaMap.offset.x += drift * deltaSeconds;
    material.map.offset.y += drift * 0.45 * deltaSeconds;
    material.alphaMap.offset.y += drift * 0.45 * deltaSeconds;
  }
};

const setLightningBlend = (blend) => {
  moonLight.intensity = baseLighting.moonIntensity + lightningMoonBoost * blend;
  hemiLight.intensity = baseLighting.hemiIntensity + lightningHemiBoost * blend;
  ambientLight.intensity = baseLighting.ambientIntensity + lightningAmbientBoost * blend;
  renderer.toneMappingExposure = baseLighting.exposure + lightningExposureBoost * blend;
  scene.fog.color.copy(baseLighting.fogColor).lerp(lightningTint, lightningFogLift * blend);
  scene.background.copy(baseLighting.backgroundColor).lerp(lightningTint, lightningBackgroundLift * blend);
};

const triggerLightningFlash = (durationOverride = null, strengthOverride = null) => {
  lightningState.activeDuration = durationOverride ?? THREE.MathUtils.randFloat(
    lightningFlashDurationMin,
    lightningFlashDurationMax,
  );
  lightningState.activeTime = lightningState.activeDuration;
  lightningState.activeStrength = strengthOverride ?? THREE.MathUtils.randFloat(
    lightningFlashStrengthMin,
    lightningFlashStrengthMax,
  );
};

const triggerInitialLightningBurstFlash = () => {
  const duration = THREE.MathUtils.randFloat(
    initialLightningStrikeBurstDurationMin,
    initialLightningStrikeBurstDurationMax,
  );
  const strength = THREE.MathUtils.randFloat(
    initialLightningStrikeBurstStrengthMin,
    initialLightningStrikeBurstStrengthMax,
  );
  triggerLightningFlash(duration, strength);
};

const updateLightning = (deltaSeconds) => {
  if (lightningState.initialFlashPending) {
    lightningState.initialFlashTimer -= deltaSeconds;
    if (lightningState.initialFlashTimer <= 0) {
      lightningState.initialBurstFlashesRemaining = Math.max(1, initialLightningStrikeBurstCount);
      lightningState.initialBurstTimer = 0;
      lightningState.initialFlashPending = false;
    } else {
      setLightningBlend(0);
    }
    return;
  }

  if (lightningState.activeTime > 0) {
    lightningState.activeTime = Math.max(0, lightningState.activeTime - deltaSeconds);
    const decay = lightningState.activeDuration > 0
      ? lightningState.activeTime / lightningState.activeDuration
      : 0;
    setLightningBlend(decay * decay * lightningState.activeStrength);
    return;
  }

  if (lightningState.initialBurstFlashesRemaining > 0) {
    lightningState.initialBurstTimer -= deltaSeconds;
    if (lightningState.initialBurstTimer <= 0) {
      triggerInitialLightningBurstFlash();
      lightningState.initialBurstFlashesRemaining -= 1;
      if (lightningState.initialBurstFlashesRemaining > 0) {
        lightningState.initialBurstTimer = THREE.MathUtils.randFloat(
          initialLightningStrikeBurstDelayMin,
          initialLightningStrikeBurstDelayMax,
        );
      }
    } else {
      setLightningBlend(0);
    }
    return;
  }

  if (!lightningEnabled) {
    setLightningBlend(0);
    return;
  }

  setLightningBlend(0);
  lightningState.nextEventTimer -= deltaSeconds;
  if (lightningState.nextEventTimer > 0) return;

  if (lightningState.burstFlashesRemaining <= 0) {
    lightningState.burstFlashesRemaining = THREE.MathUtils.randInt(lightningBurstsMin, lightningBurstsMax);
  }

  triggerLightningFlash();
  lightningState.burstFlashesRemaining -= 1;
  lightningState.nextEventTimer = lightningState.burstFlashesRemaining > 0
    ? THREE.MathUtils.randFloat(lightningIntraBurstDelayMin, lightningIntraBurstDelayMax)
    : THREE.MathUtils.randFloat(lightningIntervalMin, lightningIntervalMax);
};

const loadScene = async () => {
  const gltf = await loader.loadAsync("/models/scene-compressed.glb");
  const root = gltf.scene;

  removeImportedLightsAndSetupShadows(root);
  applyNamedTransformOffset(root, carNodeName, carTransformOffset, "Car");
  applyNamedTransformOffset(root, forestNodeName, forestTransformOffset, "Forest");
  scene.add(root);

  const exportedCamera = gltf.cameras[0];
  if (exportedCamera) {
    applyExportedCamera(exportedCamera);
  } else {
    console.warn("No camera found in GLB: using default Three.js camera.");
  }

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  if (importedCameraBase.hasValue) {
    camera.zoom = getCompensatedCameraZoom();
  }
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

window.addEventListener("resize", onResize);

const animate = () => {
  const deltaSeconds = Math.min(clock.getDelta(), 0.05);
  const elapsedSeconds = clock.elapsedTime;
  pointerSmooth.lerp(pointerTarget, parallaxSmoothing);

  if (importedCameraBase.hasValue) {
    localCameraOffset.set(
      cameraOffset.x + pointerSmooth.x * parallaxStrength.x,
      cameraOffset.y - pointerSmooth.y * parallaxStrength.y,
      cameraOffset.z,
    );

    worldCameraOffset.copy(localCameraOffset).applyQuaternion(importedCameraBase.quaternion);
    camera.position.copy(importedCameraBase.position).add(worldCameraOffset);
    camera.quaternion.copy(importedCameraBase.quaternion);
    cameraRotationOffsetQ.setFromEuler(cameraRotationOffset);
    camera.quaternion.multiply(cameraRotationOffsetQ);

    const targetZoom = getCompensatedCameraZoom();
    if (camera.zoom !== targetZoom) {
      camera.zoom = targetZoom;
      camera.updateProjectionMatrix();
    }
  }

  updateRain(deltaSeconds);
  updateGroundFog(deltaSeconds, elapsedSeconds);
  updateLightning(deltaSeconds);
  updateAudio(deltaSeconds);
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
createRain();
createGroundFog();
initAudio();

loadScene()
  .catch((error) => {
    console.error("Failed to load /models/scene-compressed.glb:", error);
  })
  .finally(() => {
    dracoLoader.dispose();
  });
