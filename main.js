import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const canvas = document.querySelector("#scene");
const loadingScreen = document.querySelector(".loading-screen");
const audioToggleButton = document.querySelector(".audio-toggle");
const brakeModeButton = document.querySelector('[data-light-mode="brake"]');
const reverseModeButton = document.querySelector('[data-light-mode="reverse"]');

// Loading screen controls.
const loadingScreenEnabled = true;
const loadingScreenMinDurationMs = 1000;
const loadingScreenFadeDurationMs = 500;
// Load-order optimization controls.
const prioritizeSpinnerFirstPaint = true;
const spinnerPaintDelayFrames = 2;
const deferSecondaryEffectsUntilSceneReady = true;
const precompileSceneBeforeReveal = true;

let loadingSceneReady = !loadingScreenEnabled;
let loadingMinDurationReached = !loadingScreenEnabled;

const tryHideLoadingScreen = () => {
  if (!loadingScreenEnabled || !loadingScreen) return;
  if (!loadingSceneReady || !loadingMinDurationReached) return;
  loadingScreen.classList.add("is-hidden");
};

if (loadingScreen) {
  if (loadingScreenEnabled) {
    loadingScreen.style.setProperty("--loading-fade-ms", `${loadingScreenFadeDurationMs}ms`);
    window.setTimeout(() => {
      loadingMinDurationReached = true;
      tryHideLoadingScreen();
    }, loadingScreenMinDurationMs);
  } else {
    loadingScreen.classList.add("is-hidden");
  }
}

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
const moonLight = new THREE.DirectionalLight("#f0f2f8ff", 2);
moonLight.position.set(200, 100,0); //set(30, 10,-100); for front, and set(50, 20,200) for normal, .set(200, 100,0) for livery focus
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

// Selective imported light controls (Blender punctual lights).
// Active light mode at startup: "brake" or "reverse".
const defaultLightMode = "brake";
// Keep this false so only brake lights are active for now.
const keepOtherImportedLights = false;
// If keeping other imported lights, reduce them to avoid whitewashing.
const otherImportedLightsIntensityMultiplier = 0.15;
// Exact node names from Blender Outliner / GLB nodes.
const brakeLightNodeNames = ["Brake Light Left", "Brake Light Right"];
// Dim/localized brake glow controls (to avoid lighting the whole scene).
const brakeLightColor = "#ff2c2c";
const brakeLightIntensity = 4;
const brakeLightDistance = 1.8; // Point/Spot only.
const brakeLightDecay = 2.0; // Point/Spot only.
const brakeLightCastShadow = false;

// Reverse light controls.
const reverseLightNodeNames = ["Reverse"];
const reverseLightColor = "#d9ecff";
const reverseLightIntensity = 2;
const reverseLightDistance = 5; // Point/Spot only.
const reverseLightDecay = 3; // Point/Spot only. Increase to increase spread.
const reverseLightCastShadow = false;

// Steering wheel LED point lights (by GLB light definition name).
// These are independent of brake/reverse mode buttons.
const steeringWheelLightsEnabled = true;
const steeringLightDefinitionConfig = {
  Point: {
    enabled: true,
    color: "#FF403A",
    intensity: 0.25,
    distance: 0.01, // Keep short to avoid scene spill.
    decay: 1.0,
  },
  "Point.001": {
    enabled: true,
    color: "#FF73F6",
    intensity: 0.25,
    distance: 0.025,
    decay: 1.0,
  },
  "Point.002": {
    enabled: true,
    color: "#636EFF",
    intensity: 0.25,
    distance: 0.025,
    decay: 1.0,
  },
};
const steeringLightCastShadow = false;

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
loader.setDRACOLoader(dracoLoader);

// Camera position: offset from Blender camera (local camera axes. x is pan left/right. y is pan up/down).
const cameraOffset = new THREE.Vector3(-.3, -.1, -1);
// Camera rotation: offset from Blender camera (radians: x (up/down?), y , z (DONT TOUCH)).
const cameraRotationOffset = new THREE.Euler(-.28, 0, 0);
// Camera zoom: offset from Blender camera zoom (positive = zoom in, negative = zoom out).
const cameraZoomOffset = -.175;
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
const ambienceAudioStartOffsetSeconds = 2;
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
const brakeLightNodeSet = new Set(brakeLightNodeNames);
const reverseLightNodeSet = new Set(reverseLightNodeNames);

let rainSystem = null;
let groundFogSystem = null;
let secondaryEffectsStarted = false;
const audioState = {
  ambience: null,
  thunder: null,
  nextThunderTimer: 0,
  pendingUserGesture: false,
  muted: false,
};
const lightModeState = {
  mode: defaultLightMode,
};
const loadedSceneState = {
  root: null,
  gltf: null,
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

const seekAudioToOffset = (audio, offsetSeconds) => {
  if (!(offsetSeconds > 0)) return;

  const applyOffset = () => {
    const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
    const maxSeek = duration > 0 ? Math.max(0, duration - 0.05) : offsetSeconds;
    audio.currentTime = Math.max(0, Math.min(offsetSeconds, maxSeek));
  };

  if (audio.readyState >= 1) {
    applyOffset();
    return;
  }

  audio.addEventListener("loadedmetadata", applyOffset, { once: true });
};

const createAudioTrack = (path, loop, volume, startOffsetSeconds = 0) => {
  const audio = new Audio(path);
  audio.preload = "auto";
  audio.loop = false;
  audio.volume = THREE.MathUtils.clamp(volume, 0, 1);
  audio.muted = audioState.muted;
  seekAudioToOffset(audio, startOffsetSeconds);
  if (loop) {
    audio.addEventListener("ended", () => {
      seekAudioToOffset(audio, startOffsetSeconds);
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
  seekAudioToOffset(audioState.ambience, ambienceAudioStartOffsetSeconds);
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
    audioState.ambience = createAudioTrack(
      ambienceAudioPath,
      true,
      ambienceAudioVolume,
      ambienceAudioStartOffsetSeconds,
    );
    seekAudioToOffset(audioState.ambience, ambienceAudioStartOffsetSeconds);
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

const startSecondaryEffects = () => {
  if (secondaryEffectsStarted) return;
  secondaryEffectsStarted = true;
  createRain();
  createGroundFog();
  initAudio();
};

const scheduleSecondaryEffectsStart = () => {
  if (!deferSecondaryEffectsUntilSceneReady) {
    startSecondaryEffects();
    return;
  }

  const start = () => {
    startSecondaryEffects();
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(start, { timeout: 1200 });
  } else {
    window.setTimeout(start, 0);
  }
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

const updateLightModeButtons = () => {
  if (brakeModeButton) {
    const isActive = lightModeState.mode === "brake";
    brakeModeButton.dataset.active = isActive ? "true" : "false";
    brakeModeButton.setAttribute("aria-pressed", isActive ? "true" : "false");
  }

  if (reverseModeButton) {
    const isActive = lightModeState.mode === "reverse";
    reverseModeButton.dataset.active = isActive ? "true" : "false";
    reverseModeButton.setAttribute("aria-pressed", isActive ? "true" : "false");
  }
};

const setLightMode = (nextMode) => {
  if (nextMode !== "brake" && nextMode !== "reverse") return;
  if (lightModeState.mode === nextMode) return;

  lightModeState.mode = nextMode;
  updateLightModeButtons();

  if (loadedSceneState.root && loadedSceneState.gltf) {
    setupImportedLightsAndShadows(loadedSceneState.root, loadedSceneState.gltf);
  }
};

if (brakeModeButton) {
  brakeModeButton.addEventListener("click", () => {
    setLightMode("brake");
  });
}

if (reverseModeButton) {
  reverseModeButton.addEventListener("click", () => {
    setLightMode("reverse");
  });
}

updateLightModeButtons();

const getLightSourceNodeInfo = (lightObject, gltf) => {
  const association = gltf.parser.associations.get(lightObject);
  const nodeIndex = association?.nodes;
  const nodeDef = nodeIndex !== undefined ? gltf.parser.json?.nodes?.[nodeIndex] : null;
  const sourceNodeName = nodeDef?.name || lightObject.name || null;
  const lightIndex = nodeDef?.extensions?.KHR_lights_punctual?.light;
  const lightDefinitionName = lightIndex !== undefined
    ? gltf.parser.json?.extensions?.KHR_lights_punctual?.lights?.[lightIndex]?.name ?? null
    : null;

  return { sourceNodeName, lightDefinitionName };
};

const setupImportedLightsAndShadows = (root, gltf) => {
  const foundBrakeLights = new Set();
  const foundReverseLights = new Set();
  const foundSteeringLightDefs = new Set();
  const importedLights = [];
  const importedLightSourceNames = new Set();
  const importedLightDefinitionNames = new Set();
  const isBrakeMode = lightModeState.mode === "brake";
  const isReverseMode = lightModeState.mode === "reverse";

  root.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }

    if (!obj.isLight) return;
    importedLights.push(obj);
  });

  for (const obj of importedLights) {
    if (!obj.userData.baseImportedLightState) {
      obj.userData.baseImportedLightState = {
        intensity: obj.intensity,
        color: obj.color.clone(),
        distance: obj.distance,
        decay: obj.decay,
        castShadow: obj.castShadow,
      };
    }
    const baseState = obj.userData.baseImportedLightState;

    const { sourceNodeName, lightDefinitionName } = getLightSourceNodeInfo(obj, gltf);
    if (sourceNodeName) importedLightSourceNames.add(sourceNodeName);
    if (lightDefinitionName) importedLightDefinitionNames.add(lightDefinitionName);

    const isBrakeLight = sourceNodeName ? brakeLightNodeSet.has(sourceNodeName) : brakeLightNodeSet.has(obj.name);
    const isReverseLight = sourceNodeName ? reverseLightNodeSet.has(sourceNodeName) : reverseLightNodeSet.has(obj.name);
    const steeringConfig = lightDefinitionName ? steeringLightDefinitionConfig[lightDefinitionName] : null;
    const isSteeringLight = Boolean(steeringWheelLightsEnabled && steeringConfig?.enabled);
    if (isBrakeLight) {
      foundBrakeLights.add(sourceNodeName ?? obj.name);
    }
    if (isReverseLight) {
      foundReverseLights.add(sourceNodeName ?? obj.name);
    }
    if (isSteeringLight && lightDefinitionName) {
      foundSteeringLightDefs.add(lightDefinitionName);
    }

    const isSelectedBrakeLight = isBrakeMode && isBrakeLight;
    const isSelectedReverseLight = isReverseMode && isReverseLight;
    const isSelectedSteeringLight = isSteeringLight;
    const isSelectedSpecialLight = isSelectedBrakeLight || isSelectedReverseLight || isSelectedSteeringLight;

    // Keep imported lights visible at all times to avoid shader recompiles
    // when switching modes. We gate contribution using intensity instead.
    obj.visible = true;

    if (!isSelectedSpecialLight && !keepOtherImportedLights) {
      obj.color.copy(baseState.color);
      obj.intensity = 0;
      if (obj.isPointLight || obj.isSpotLight) {
        obj.distance = baseState.distance;
        obj.decay = baseState.decay;
      }
      obj.castShadow = false;
      continue;
    }

    if (!isSelectedSpecialLight) {
      obj.color.copy(baseState.color);
      obj.intensity = baseState.intensity * otherImportedLightsIntensityMultiplier;
      if (obj.isPointLight || obj.isSpotLight) {
        obj.distance = baseState.distance;
        obj.decay = baseState.decay;
      }
      obj.castShadow = baseState.castShadow;
      continue;
    }

    if (isSelectedBrakeLight) {
      // Force a subtle red brake-light look.
      obj.color.set(brakeLightColor);
      obj.intensity = brakeLightIntensity;
      if (obj.isPointLight || obj.isSpotLight) {
        obj.distance = brakeLightDistance;
        obj.decay = brakeLightDecay;
      }
      obj.castShadow = brakeLightCastShadow;
      continue;
    }

    if (isSelectedReverseLight) {
      // Reverse light look (cool white by default).
      obj.color.set(reverseLightColor);
      obj.intensity = reverseLightIntensity;
      if (obj.isPointLight || obj.isSpotLight) {
        obj.distance = reverseLightDistance;
        obj.decay = reverseLightDecay;
      }
      obj.castShadow = reverseLightCastShadow;
      continue;
    }

    if (isSelectedSteeringLight && steeringConfig) {
      // Steering wheel LED point lights (short-range to avoid scene spill).
      obj.color.set(steeringConfig.color);
      obj.intensity = steeringConfig.intensity;
      if (obj.isPointLight || obj.isSpotLight) {
        obj.distance = steeringConfig.distance;
        obj.decay = steeringConfig.decay;
      }
      obj.castShadow = steeringLightCastShadow;
    }
  }

  if (isBrakeMode) {
    const missingBrakeLights = brakeLightNodeNames.filter((name) => !foundBrakeLights.has(name));
    if (missingBrakeLights.length > 0) {
      console.warn("Missing brake light nodes in GLB:", missingBrakeLights.join(", "));
      console.warn(
        "Imported light source nodes found:",
        Array.from(importedLightSourceNames).sort().join(", "),
      );
      console.warn("After changing brake light names/toggles, refresh the page.");
    }
  }

  if (isReverseMode) {
    const missingReverseLights = reverseLightNodeNames.filter((name) => !foundReverseLights.has(name));
    if (missingReverseLights.length > 0) {
      console.warn("Missing reverse light nodes in GLB:", missingReverseLights.join(", "));
      console.warn(
        "Imported light source nodes found:",
        Array.from(importedLightSourceNames).sort().join(", "),
      );
      console.warn("After changing reverse light names/toggles, refresh the page.");
    }
  }

  if (steeringWheelLightsEnabled) {
    const enabledSteeringDefs = Object.entries(steeringLightDefinitionConfig)
      .filter(([, config]) => config.enabled)
      .map(([defName]) => defName);
    const missingSteeringDefs = enabledSteeringDefs.filter((defName) => !foundSteeringLightDefs.has(defName));
    if (missingSteeringDefs.length > 0) {
      console.warn("Missing steering light definitions in GLB:", missingSteeringDefs.join(", "));
      console.warn(
        "Imported light definitions found:",
        Array.from(importedLightDefinitionNames).sort().join(", "),
      );
      console.warn("After changing steering light settings, refresh the page.");
    }
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

  loadedSceneState.root = root;
  loadedSceneState.gltf = gltf;
  setupImportedLightsAndShadows(root, gltf);
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

  if (precompileSceneBeforeReveal && typeof renderer.compileAsync === "function") {
    await renderer.compileAsync(scene, camera);
  }
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

if (!deferSecondaryEffectsUntilSceneReady) {
  startSecondaryEffects();
}

const runAfterAnimationFrames = (frameCount, callback) => {
  const frames = Math.max(0, frameCount);
  if (frames === 0) {
    callback();
    return;
  }

  let remaining = frames;
  const step = () => {
    remaining -= 1;
    if (remaining <= 0) {
      callback();
      return;
    }
    window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
};

const beginSceneLoad = () => {
  loadScene()
    .catch((error) => {
      console.error("Failed to load /models/scene-compressed.glb:", error);
    })
    .finally(() => {
      loadingSceneReady = true;
      tryHideLoadingScreen();
      scheduleSecondaryEffectsStart();
      dracoLoader.dispose();
    });
};

if (prioritizeSpinnerFirstPaint) {
  runAfterAnimationFrames(spinnerPaintDelayFrames, beginSceneLoad);
} else {
  beginSceneLoad();
}
