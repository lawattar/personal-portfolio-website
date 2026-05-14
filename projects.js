const tabButtons = Array.from(document.querySelectorAll(".projects-tab"));
const tabPanels = Array.from(document.querySelectorAll(".projects-panel"));
const bajaShowcase = document.querySelector('[data-baja-showcase="true"]');
const bajaShowcaseCurrentImage = document.querySelector(".baja-showcase-image-current");
const bajaShowcaseNextImage = document.querySelector(".baja-showcase-image-next");
const bajaShowcaseEmpty = document.querySelector(".baja-showcase-empty");
const bajaShowcasePrevButton = document.querySelector(".baja-showcase-arrow-prev");
const bajaShowcaseNextButton = document.querySelector(".baja-showcase-arrow-next");
const bajaShowcaseDots = document.querySelector(".baja-showcase-dots");
const scrollHint = document.querySelector(".scroll-hint");
const APP_BASE_URL = import.meta.env.BASE_URL || "/";

const projectsByTab = {
  featured: [
    {
      key: "baja-sae-motion-sim",
      title: "BAJA SAE Motion Sim",
      image: "/images/projects/baja-motion-sim.svg",
      description:
        "Motion platform and simulation workflow for driver training and system validation using vehicle dynamics and control tuning.",
      tags: ["Simulation", "Controls", "Testing"],
    },
    {
      key: "sr26-steering-wheel",
      title: "SR26 Steering Wheel",
      image: "/images/projects/sr26-steering-wheel.svg",
      description:
        "Next-generation wheel architecture focused on packaging efficiency, improved controls, and cleaner manufacturing flow.",
      tags: ["Design", "DFM", "Revision"],
    },
    {
      key: "sr25-steering-wheel",
      title: "SR25 Steering Wheel",
      image: "/images/projects/sr25-steering-wheel.svg",
      description:
        "Complete steering wheel package: ergonomic layout, button mapping, electronics integration, and iterative enclosure design.",
      tags: ["Mechanical", "CAD", "Embedded"],
    },
    {
      key: "custom-linear-actuators",
      title: "Custom Linear Actuators",
      image: "/images/projects/custom-linear-actuators.svg",
      description:
        "Custom actuator design focused on force delivery, packaging constraints, motion control, and durability for repeated operation.",
      tags: ["Mechanisms", "Motion", "Design"],
    },
    {
      key: "redbull-f1-steering-wheel-replica",
      title: "RedBull F1 Steering Wheel Replica",
      image: "/images/projects/redbull-f1-steering-wheel-replica.svg",
      description:
        "Replica steering wheel build focused on packaging, controls layout, and visual fidelity inspired by modern F1 interfaces.",
      tags: ["Replica", "Controls", "CAD"],
    },
    {
      key: "custom-v-twin-motorcycle-engine",
      title: "Custom V-Twin Motorcycle Engine",
      image: "/images/projects/custom-v-twin-engine.svg",
      description:
        "Long-horizon concept-to-prototype engine project with CAD modeling, subsystem studies, and manufacturability planning.",
      tags: ["Powertrain", "CAD", "Manufacturing"],
      note: "Suggested structure: split this into subprojects (valvetrain, cranktrain, cooling, packaging, controls).",
    },
    {
      key: "agricultural-drone-design",
      title: "Agricultural Drone Design",
      image: "/images/projects/agricultural-drone-design.svg",
      description:
        "Concept and system design for an agricultural drone platform focused on stability, payload integration, and field operations.",
      tags: ["Aerospace", "Systems", "Design"],
    },
    {
      key: "cwru-motorsports-led-sign",
      title: "CWRU Motorsports LED Sign",
      image: "/images/projects/cwru-led-sign.svg",
      description:
        "Custom LED branding fixture with enclosure design, mounting strategy, and clean wiring approach for event display.",
      tags: ["Electrical", "Fabrication", "Branding"],
    },
    {
      key: "geometric-led-wall-panels",
      title: "Geometric LED Wall Panels",
      image: "/images/projects/geometric-led-wall-panels.svg",
      description:
        "Modular geometric LED wall panel system with focus on repeatable fabrication, clean wiring, and visual impact.",
      tags: ["Lighting", "Electronics", "Fabrication"],
    },
    {
      key: "greek-lithophane-lamps",
      title: "Greek Lithophane Lamps",
      image: "/images/projects/greek-lithophane-lamps.svg",
      description:
        "Parametric lamp designs balancing printable geometry, material diffusion, and ornamental visual detail.",
      tags: ["3D Print", "Parametric", "Product"],
    },
  ],
  baja: [
    {
      key: "baja-sae-motion-sim",
      title: "BAJA SAE Motion Sim",
      image: "/images/projects/baja-motion-sim.svg",
      description:
        "Motion platform and simulation workflow for driver training and system validation using vehicle dynamics and control tuning.",
      tags: ["Simulation", "Controls", "Testing"],
    },
    {
      key: "sr26-steering-wheel",
      title: "SR26 Steering Wheel",
      image: "/images/projects/sr26-steering-wheel.svg",
      description:
        "Next-generation wheel architecture focused on packaging efficiency, improved controls, and cleaner manufacturing flow.",
      tags: ["Design", "DFM", "Revision"],
    },
    {
      key: "sr25-steering-wheel",
      title: "SR25 Steering Wheel",
      image: "/images/projects/sr25-steering-wheel.svg",
      description:
        "Complete steering wheel package: ergonomic layout, button mapping, electronics integration, and iterative enclosure design.",
      tags: ["Mechanical", "CAD", "Embedded"],
    },
    {
      key: "cwru-motorsports-led-sign",
      title: "CWRU Motorsports LED Sign",
      image: "/images/projects/cwru-led-sign.svg",
      description:
        "Custom LED branding fixture with enclosure design, mounting strategy, and clean wiring approach for event display.",
      tags: ["Electrical", "Fabrication", "Branding"],
    },
  ],
  coding: [
    {
      key: "threejs-global-temperature-ui",
      title: "Three.js Global Temperature UI",
      image: "/images/projects/threejs-global-temperature-ui.svg",
      description:
        "Interactive Three.js climate visualization interface focused on responsive data storytelling and real-time rendering.",
      tags: ["Three.js", "Data Viz", "UI"],
      externalLinks: [{ label: "View Repo", href: "https://github.com/lawattar" }],
    },
    {
      key: "stm32-linear-actuator-controller",
      title: "STM32 Linear Actuator Controller",
      image: "/images/projects/stm32-linear-actuator-controller.svg",
      description:
        "Embedded control system on STM32 for linear actuator motion, tuning, and hardware-in-the-loop validation.",
      tags: ["STM32", "Embedded", "Controls"],
      externalLinks: [{ label: "View Repo", href: "https://github.com/lawattar" }],
    },
    {
      key: "pygame-pacman",
      title: "pygame Pacman",
      image: "/images/projects/pygame-pacman.svg",
      description:
        "Arcade-style Pacman implementation in pygame with gameplay logic, collision handling, and animation states.",
      tags: ["Python", "Pygame", "Game Dev"],
      externalLinks: [{ label: "View Repo", href: "https://github.com/lawattar" }],
    },
  ],
  experience: [
    {
      key: "lincoln-electric",
      title: "Lincoln Electric",
      image: "/images/projects/lincoln-electric.svg",
      description: "Hands-on engineering and technical workflow exposure in an industrial manufacturing environment.",
      tags: ["Manufacturing", "Engineering", "Industry"],
    },
    {
      key: "scribeamerica",
      title: "ScribeAmerica",
      image: "/images/projects/scribe-america.svg",
      description: "Medical documentation support with focus on communication quality and detail accuracy.",
      tags: ["Documentation", "Medical", "Detail"],
    },
    {
      key: "life-guard",
      title: "Life Guard",
      image: "/images/projects/lifeguard.svg",
      description: "Water safety operations, emergency response, and public safety management.",
      tags: ["Safety", "Operations", "Leadership"],
    },
    {
      key: "life-guard-supervisor",
      title: "Life Guard Supervisor",
      image: "/images/projects/lifeguard-supervisor.svg",
      description: "Shift supervision, team coordination, and escalation handling during active pool operations.",
      tags: ["Supervision", "Training", "Responsibility"],
    },
    {
      key: "volunteering",
      title: "Volunteering",
      image: "/images/projects/volunteering.svg",
      description: "Community-centered volunteer projects with emphasis on service and consistency.",
      tags: ["Service", "Community", "Impact"],
    },
    {
      key: "food-bank",
      title: "CWRU Food Pantry",
      image: "/images/projects/food-bank.svg",
      description: "Food distribution and support initiatives for local communities.",
      tags: ["Community", "Logistics", "Volunteer"],
    },
    {
      key: "computer-building",
      title: "Computer Building",
      image: "/images/projects/computer-building.svg",
      description: "Custom PC builds, part selection, assembly, validation, and troubleshooting.",
      tags: ["Hardware", "Build", "Troubleshooting"],
    },
    {
      key: "arabic-art-and-calligraphies",
      title: "Arabic Art and Calligraphies",
      image: "/images/projects/arabic-art-calligraphy.svg",
      description: "Creative and cultural visual work across calligraphy and design pieces.",
      tags: ["Art", "Calligraphy", "Creative"],
    },
  ],
  athletics: [
    {
      key: "powerlifting",
      title: "Powerlifting",
      image: "/images/projects/powerlifting.svg",
      description: "Powerlifting training blocks, meets, and strength progression highlights.",
      tags: ["Strength", "Training", "Competition"],
    },
    {
      key: "rugby",
      title: "Rugby",
      image: "/images/projects/rugby.svg",
      description: "CWRU Rugby training, matches, and team development highlights.",
      tags: ["CWRU", "Rugby", "Teamwork"],
    },
  ],
  leadership: [
    {
      key: "cwru-lifts",
      title: "CWRU Lifts",
      image: "/images/projects/cwru-lifts.svg",
      description: "Lifting events, competition videos, and promotional flyers.",
      tags: ["Lifting", "Events", "Media"],
    },
    {
      key: "msa",
      title: "MSA",
      image: "/images/projects/msa.svg",
      description: "Leadership and community programming through MSA initiatives.",
      tags: ["Leadership", "Community", "Organization"],
    },
  ],
};

// Detailed modal content per project.
// `mediaFolder` maps to: /public/portfolio-images/<mediaFolder>/
// Auto-loader checks numbered files: 1.jpg, 2.png, 3.mp4, ...
const projectDetails = {
  "sr25-steering-wheel": {
    summary: "Full design story for SR25, including controls architecture and packaging choices.",
    points: ["Controls layout iterations", "Embedded wiring decisions", "Manufacturing constraints"],
    mediaFolder: "sr25-steering-wheel",
  },
  "sr26-steering-wheel": {
    summary: "SR26 revision goals and improvements over SR25.",
    points: ["Weight and packaging updates", "Improved serviceability", "Refined control ergonomics"],
    mediaFolder: "sr26-steering-wheel",
  },
  "redbull-f1-steering-wheel-replica": {
    summary: "RedBull F1 steering wheel replica process and build details.",
    points: ["Reference mapping", "Button/encoder layout", "Packaging and finish quality"],
    mediaFolder: "redbull-f1-steering-wheel-replica",
  },
  "agricultural-drone-design": {
    summary: "Agricultural drone design workflow and subsystem decisions.",
    points: ["Frame and payload tradeoffs", "Power and endurance strategy", "Field-use reliability goals"],
    mediaFolder: "agricultural-drone-design",
  },
  "custom-linear-actuators": {
    summary: "Custom linear actuator development and integration details.",
    points: ["Force and stroke tradeoffs", "Packaging and mounting", "Reliability and repeatability"],
    mediaFolder: "custom-linear-actuators",
    mediaTypeToggle: true,
  },
  "baja-sae-motion-sim": {
    summary: "Motion simulation stack with hardware/software integration.",
    points: ["Vehicle dynamics integration", "Telemetry and controls workflow", "Validation tests"],
    mediaFolder: "baja-sae-motion-sim",
    customSlidesPlacement: "split-first-last",
    mediaTypeToggle: true,
    slides: [
      {
        type: "embed",
        src: "https://www.youtube.com/embed/-549WYZ5cbQ?rel=0&vq=hd720",
        caption: "BAJA SAE Motion Sim demo video",
      },
      {
        type: "embed",
        src: "https://www.youtube.com/embed/gbVb0tjXpt8?rel=0&vq=hd720",
        caption: "BAJA SAE Motion Sim additional demo",
      },
    ],
  },
  "custom-v-twin-motorcycle-engine": {
    summary: "Main engine project with multiple subsystem tracks.",
    points: ["Subsystem planning", "CAD and packaging", "Manufacturing feasibility"],
    mediaFolder: "custom-v-twin-motorcycle-engine",
    downloadAction: {
      label: "Download Report",
      href: "/Files/EMAE_360_Report.pdf",
      filename: "EMAE_360_Report.pdf",
    },
  },
  "cwru-motorsports-led-sign": {
    summary: "Design and build details for the LED sign project.",
    points: ["Enclosure design", "Power and wiring layout", "Mounting approach"],
    mediaFolder: "cwru-motorsports-led-sign",
  },
  "geometric-led-wall-panels": {
    summary: "Geometric LED wall panel concept, build process, and electronics integration.",
    points: ["Modular panel architecture", "Power distribution and wiring", "Fabrication and assembly workflow"],
    mediaFolder: "geometric-led-wall-panels",
  },
  "greek-lithophane-lamps": {
    summary: "Parametric design and print outcomes for lithophane lamps.",
    points: ["Material diffusion behavior", "Geometry tuning", "Final print setup"],
    mediaFolder: "greek-lithophane-lamps",
    downloadAction: {
      label: "View Files",
      href: "https://makerworld.com/en/@lawattar",
      external: true,
    },
  },
  "threejs-global-temperature-ui": {
    summary: "Global temperature data UI built with Three.js for interactive climate exploration.",
    points: ["3D globe rendering", "Temperature data mapping", "Interactive camera and UI controls"],
    mediaFolder: "threejs-global-temperature-ui",
    customSlidesPlacement: "prepend",
    slides: [
      {
        type: "embed",
        src: "/portfolio-images/threejs-global-temperature-ui/slides/embed/index.html",
        caption: "Interactive embedded demo",
      },
    ],
  },
  "stm32-linear-actuator-controller": {
    summary: "STM32-based actuator controller focused on robust motion control and tuning workflow.",
    points: ["Control loop implementation", "Serial telemetry and debugging", "Bench and integration testing"],
    mediaFolder: "stm32-linear-actuator-controller",
  },
  "pygame-pacman": {
    summary: "Pacman clone in pygame covering classic game mechanics and system architecture.",
    points: ["Entity movement and collision", "Game states and scoring", "Input handling and polish"],
    mediaFolder: "pygame-pacman",
  },
  "lincoln-electric": {
    summary: "Experience highlights and technical learnings.",
    points: ["Industrial workflows", "Process quality exposure", "Engineering communication"],
    mediaFolder: "lincoln-electric",
  },
  scribeamerica: {
    summary: "Medical documentation role and operational workflow.",
    points: ["Accuracy under time pressure", "Structured note workflows", "Interdisciplinary communication"],
    mediaFolder: "scribeamerica",
  },
  "life-guard": {
    summary: "Lifeguarding responsibilities and key scenarios.",
    points: ["Emergency response readiness", "Safety rule enforcement", "Public communication"],
    mediaFolder: "life-guard",
  },
  "life-guard-supervisor": {
    summary: "Supervisory role details and team operations.",
    points: ["Shift leadership", "Incident escalation handling", "Training support"],
    mediaFolder: "life-guard-supervisor",
  },
  volunteering: {
    summary: "Volunteer initiatives and impact snapshots.",
    points: ["Community coordination", "Reliability and consistency", "Service outcomes"],
    mediaFolder: "volunteering",
  },
  "food-bank": {
    summary: "Food bank contribution details and logistics.",
    points: ["Distribution operations", "Team coordination", "Community support"],
    mediaFolder: "food-bank",
  },
  "computer-building": {
    summary: "Custom PC assembly projects and troubleshooting notes.",
    points: ["Part selection strategy", "Build and validation flow", "Post-build tuning"],
    mediaFolder: "computer-building",
  },
  "arabic-art-and-calligraphies": {
    summary: "Arabic art and calligraphy work with visual progression.",
    points: ["Composition studies", "Line style and form", "Final compositions"],
    mediaFolder: "arabic-art-and-calligraphies",
  },
  rugby: {
    summary: "Rugby highlights across training, matches, and team development.",
    points: ["CWRU rugby timeline", "Training and match clips", "Role and growth"],
    mediaFolder: "rugby",
  },
  powerlifting: {
    summary: "Powerlifting progression across training blocks, meets, and performance milestones.",
    points: ["Strength cycles", "Meet prep and execution", "Performance highlights"],
    mediaFolder: "powerlifting",
  },
  lifting: {
    summary: "Lifting training progression, events, and competition prep.",
    points: ["Training blocks", "Event preparation", "Performance milestones"],
    mediaFolder: "lifting",
  },
  "cwru-lifts": {
    summary: "CWRU lifts events, media, and flyer design work.",
    points: ["Event photos", "Competition videos", "Flyer and promo design"],
    mediaFolder: "cwru-lifts",
  },
  msa: {
    summary: "MSA leadership activities, events, and community coordination.",
    points: ["Event planning", "Team coordination", "Community engagement"],
    mediaFolder: "msa",
  },
};

const modalState = {
  projectKey: null,
  slides: [],
  index: 0,
  slideGroups: null,
  activeGroupKey: null,
};

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "svg", "gif"];
const VIDEO_EXTENSIONS = ["mp4", "webm", "mov"];
const MAX_AUTO_SLIDES = 16;
const MAX_MISSES_BEFORE_STOP = 3;
const BAJA_SHOWCASE_FOLDER = "baja-gallery";
const CARD_PREVIEW_SUBFOLDER = "preview";
const CARD_SLIDES_SUBFOLDER = "slides";
const BAJA_SHOWCASE_MAX_SLIDES = 40;
const BAJA_SHOWCASE_MAX_MISSES = 5;
const BAJA_SHOWCASE_INTERVAL_MS = 5000;
const BAJA_SHOWCASE_SLIDE_MS = 1000;
const BAJA_SHOWCASE_SLIDE_EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";
const CARD_PREVIEW_ROOT_MARGIN = "0px 0px 260px 0px";

// Code-only card visibility controls by tab.
// Set a project key to false to hide that card from the tab.
// Example:
// featured: { "sr26-steering-wheel": false }
const CARD_VISIBILITY_CONFIG = {
  featured: {},
  baja: {},
  coding: {},
  experience: { volunteering: false },
  athletics: {},
  leadership: {},
};

const projectIndex = new Map();
const cardVisibilityByTab = new Map();
let portfolioImagesManifest = null;
let portfolioImagesManifestPromise = null;
const projectPreviewSourceCache = new Map();
const projectPreviewSourcePromiseCache = new Map();
let cardPreviewObserver = null;
const bajaShowcaseState = {
  slides: [],
  index: 0,
  timerId: null,
  initialized: false,
  loading: false,
  isSliding: false,
  slideToken: 0,
};

const createProjectCard = (project) => {
  const card = document.createElement("article");
  card.className = "project-card reveal";
  card.dataset.projectKey = project.key;
  card.dataset.hasDetail = "true";

  const chips = (project.tags ?? []).map((tag) => `<span class="project-chip">${tag}</span>`).join("");
  const linkHtml = (project.externalLinks ?? [])
    .map((link) => `<a class="project-action" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`)
    .join("");

  card.innerHTML = `
    <div class="project-image-wrap">
      <img class="project-image" src="${project.image}" alt="${project.title} image" loading="lazy" />
    </div>
    <div class="project-content">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-chip-row">${chips}</div>
      <div class="project-actions">
        <button class="project-action project-action-button" type="button" data-project-key="${project.key}">Open Details</button>
        ${linkHtml}
      </div>
      ${project.note ? `<div class="project-note">${project.note}</div>` : ""}
    </div>
  `;

  return card;
};

const getUniqueProjectsForTab = (tabKey) => {
  const projects = projectsByTab[tabKey] ?? [];
  const seenKeys = new Set();
  return projects.filter((project) => {
    if (!project?.key || seenKeys.has(project.key)) return false;
    seenKeys.add(project.key);
    return true;
  });
};

const ensureTabVisibilityMap = (tabKey) => {
  if (!cardVisibilityByTab.has(tabKey)) {
    cardVisibilityByTab.set(tabKey, new Map());
  }

  const visibilityMap = cardVisibilityByTab.get(tabKey);
  const configForTab = CARD_VISIBILITY_CONFIG[tabKey] ?? {};
  getUniqueProjectsForTab(tabKey).forEach((project) => {
    if (!visibilityMap.has(project.key)) {
      visibilityMap.set(project.key, configForTab[project.key] !== false);
    }
  });

  return visibilityMap;
};

const applyCardVisibilityForTab = (tabKey) => {
  const panel = tabPanels.find((candidatePanel) => candidatePanel.dataset.panel === tabKey);
  if (!panel) return;

  const visibilityMap = ensureTabVisibilityMap(tabKey);
  panel.querySelectorAll(".project-card").forEach((card) => {
    const projectKey = card.getAttribute("data-project-key");
    const isVisible = projectKey ? visibilityMap.get(projectKey) !== false : true;
    card.style.display = isVisible ? "" : "none";
    card.setAttribute("data-card-visible", isVisible ? "true" : "false");
  });
};

const renderPanels = () => {
  for (const panel of tabPanels) {
    const tabKey = panel.dataset.panel;
    const projects = projectsByTab[tabKey] ?? [];
    panel.innerHTML = "";
    ensureTabVisibilityMap(tabKey);

    const grid = document.createElement("div");
    grid.className = "projects-grid";

    for (const project of projects) {
      projectIndex.set(project.key, project);
      grid.appendChild(createProjectCard(project));
    }

    panel.appendChild(grid);
  }
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    }
  },
  { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
);

const refreshRevealTargets = () => {
  revealObserver.disconnect();
  const activePanel = document.querySelector(".projects-panel.is-active");
  if (!activePanel) return;
  activePanel.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));
};

const ensureCardPreviewObserver = () => {
  if (cardPreviewObserver) return cardPreviewObserver;

  cardPreviewObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        observer.unobserve(card);
        loadCardPreviewForCard(card);
      });
    },
    { root: null, rootMargin: CARD_PREVIEW_ROOT_MARGIN, threshold: 0.01 },
  );

  return cardPreviewObserver;
};

const stopBajaShowcase = () => {
  if (bajaShowcaseState.timerId) {
    window.clearInterval(bajaShowcaseState.timerId);
    bajaShowcaseState.timerId = null;
  }
};

const updateBajaShowcaseDots = () => {
  if (!bajaShowcaseDots) return;
  const dots = Array.from(bajaShowcaseDots.querySelectorAll(".baja-showcase-dot"));
  dots.forEach((dot, index) => {
    const isActive = index === bajaShowcaseState.index;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-selected", isActive ? "true" : "false");
  });
};

const renderBajaShowcaseDots = () => {
  if (!bajaShowcaseDots) return;
  bajaShowcaseDots.innerHTML = "";
  if (bajaShowcaseState.slides.length <= 1) {
    bajaShowcaseDots.style.display = "none";
    return;
  }

  bajaShowcaseDots.style.display = "flex";
  bajaShowcaseState.slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "baja-showcase-dot";
    dot.dataset.index = String(index);
    dot.setAttribute("aria-label", `Go to BAJA image ${index + 1}`);
    dot.setAttribute("aria-selected", "false");
    bajaShowcaseDots.appendChild(dot);
  });
  updateBajaShowcaseDots();
};

const resetBajaShowcaseSlidePositions = () => {
  if (!bajaShowcaseCurrentImage || !bajaShowcaseNextImage) return;
  bajaShowcaseCurrentImage.style.transition = "none";
  bajaShowcaseNextImage.style.transition = "none";
  bajaShowcaseCurrentImage.style.transform = "translateX(0)";
  bajaShowcaseNextImage.style.transform = "translateX(100%)";
  bajaShowcaseNextImage.style.visibility = "hidden";
};

const preloadUpcomingBajaSlide = () => {
  const total = bajaShowcaseState.slides.length;
  if (total <= 1) return;
  const nextIndex = (bajaShowcaseState.index + 1) % total;
  const upcoming = bajaShowcaseState.slides[nextIndex];
  if (!upcoming?.src) return;
  const img = new Image();
  img.decoding = "async";
  img.src = upcoming.src;
};

const renderBajaShowcaseSlide = ({ animate = false, direction = 1 } = {}) => {
  if (!bajaShowcase || !bajaShowcaseCurrentImage || !bajaShowcaseNextImage || !bajaShowcaseEmpty) return;

  if (bajaShowcaseState.slides.length === 0) {
    if (bajaShowcasePrevButton) bajaShowcasePrevButton.style.display = "none";
    if (bajaShowcaseNextButton) bajaShowcaseNextButton.style.display = "none";
    bajaShowcaseState.isSliding = false;
    if (!bajaShowcaseState.loading) {
      bajaShowcaseCurrentImage.removeAttribute("src");
      bajaShowcaseNextImage.removeAttribute("src");
      resetBajaShowcaseSlidePositions();
      bajaShowcaseEmpty.style.display = "grid";
      if (bajaShowcaseDots) bajaShowcaseDots.style.display = "none";
    } else {
      bajaShowcaseEmpty.style.display = "none";
    }
    return;
  }

  bajaShowcaseEmpty.style.display = "none";
  const nextSlide = bajaShowcaseState.slides[bajaShowcaseState.index];
  if (!nextSlide) return;
  const hasMultipleSlides = bajaShowcaseState.slides.length > 1;
  if (bajaShowcasePrevButton) bajaShowcasePrevButton.style.display = hasMultipleSlides ? "grid" : "none";
  if (bajaShowcaseNextButton) bajaShowcaseNextButton.style.display = hasMultipleSlides ? "grid" : "none";

  if (bajaShowcaseDots) {
    if (bajaShowcaseDots.childElementCount !== bajaShowcaseState.slides.length) {
      renderBajaShowcaseDots();
    } else {
      updateBajaShowcaseDots();
    }
  }

  const currentSrc = bajaShowcaseCurrentImage.getAttribute("src") ?? "";
  const targetSrc = nextSlide.src;

  if (!animate || !currentSrc || currentSrc === targetSrc || !hasMultipleSlides) {
    bajaShowcaseCurrentImage.src = targetSrc;
    resetBajaShowcaseSlidePositions();
    preloadUpcomingBajaSlide();
    return;
  }

  if (bajaShowcaseState.isSliding) return;
  bajaShowcaseState.isSliding = true;
  bajaShowcaseState.slideToken += 1;
  const slideToken = bajaShowcaseState.slideToken;

  const startOffset = direction >= 0 ? "100%" : "-100%";
  const endOffset = direction >= 0 ? "-100%" : "100%";
  const transition = `transform ${BAJA_SHOWCASE_SLIDE_MS}ms ${BAJA_SHOWCASE_SLIDE_EASE}`;

  const finalizeSlide = () => {
    if (slideToken !== bajaShowcaseState.slideToken) return;
    bajaShowcaseCurrentImage.src = targetSrc;
    resetBajaShowcaseSlidePositions();
    bajaShowcaseState.isSliding = false;
    preloadUpcomingBajaSlide();
  };

  const startSlideTransition = () => {
    if (slideToken !== bajaShowcaseState.slideToken) return;
    bajaShowcaseNextImage.style.visibility = "visible";
    bajaShowcaseCurrentImage.style.transition = "none";
    bajaShowcaseNextImage.style.transition = "none";
    bajaShowcaseCurrentImage.style.transform = "translateX(0)";
    bajaShowcaseNextImage.style.transform = `translateX(${startOffset})`;

    // Force layout so the browser commits start positions before transition.
    void bajaShowcaseNextImage.offsetWidth;

    bajaShowcaseCurrentImage.style.transition = transition;
    bajaShowcaseNextImage.style.transition = transition;
    bajaShowcaseCurrentImage.style.transform = `translateX(${endOffset})`;
    bajaShowcaseNextImage.style.transform = "translateX(0)";

    const safetyTimeout = window.setTimeout(() => {
      finalizeSlide();
    }, BAJA_SHOWCASE_SLIDE_MS + 80);

    bajaShowcaseNextImage.addEventListener(
      "transitionend",
      () => {
        window.clearTimeout(safetyTimeout);
        finalizeSlide();
      },
      { once: true },
    );
  };

  if (bajaShowcaseNextImage.getAttribute("src") !== targetSrc) {
    bajaShowcaseNextImage.src = targetSrc;
  }

  const isNextImageReady = bajaShowcaseNextImage.complete && bajaShowcaseNextImage.naturalWidth > 0;
  if (isNextImageReady) {
    startSlideTransition();
    return;
  }

  const onNextReady = () => {
    cleanupListeners();
    startSlideTransition();
  };

  const onNextError = () => {
    cleanupListeners();
    if (slideToken !== bajaShowcaseState.slideToken) return;
    bajaShowcaseCurrentImage.src = targetSrc;
    resetBajaShowcaseSlidePositions();
    bajaShowcaseState.isSliding = false;
  };

  const cleanupListeners = () => {
    bajaShowcaseNextImage.removeEventListener("load", onNextReady);
    bajaShowcaseNextImage.removeEventListener("error", onNextError);
  };

  bajaShowcaseNextImage.addEventListener("load", onNextReady, { once: true });
  bajaShowcaseNextImage.addEventListener("error", onNextError, { once: true });
};

const moveBajaShowcaseBy = (direction) => {
  if (bajaShowcaseState.slides.length <= 1 || bajaShowcaseState.isSliding) return;
  bajaShowcaseState.index =
    (bajaShowcaseState.index + direction + bajaShowcaseState.slides.length) % bajaShowcaseState.slides.length;
  renderBajaShowcaseSlide({ animate: true, direction });
  stopBajaShowcase();
  startBajaShowcase();
};

const startBajaShowcase = () => {
  if (!bajaShowcase || bajaShowcaseState.slides.length <= 1) return;
  if (bajaShowcaseState.timerId) return;

  bajaShowcaseState.timerId = window.setInterval(() => {
    moveBajaShowcaseBy(1);
  }, BAJA_SHOWCASE_INTERVAL_MS);
};

const setBajaShowcaseVisibility = (activeTabKey) => {
  if (!bajaShowcase) return;
  const isVisible = activeTabKey === "baja" || activeTabKey === "featured";
  bajaShowcase.classList.toggle("is-visible", isVisible);

  if (!isVisible) {
    stopBajaShowcase();
    return;
  }

  renderBajaShowcaseSlide();
  startBajaShowcase();
  refreshBajaShowcaseSlides();
};

bajaShowcasePrevButton?.addEventListener("click", () => {
  moveBajaShowcaseBy(-1);
});

bajaShowcaseNextButton?.addEventListener("click", () => {
  moveBajaShowcaseBy(1);
});

bajaShowcaseDots?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const dot = target.closest(".baja-showcase-dot");
  if (!(dot instanceof HTMLButtonElement)) return;
  if (bajaShowcaseState.isSliding) return;

  const nextIndex = Number(dot.dataset.index);
  if (Number.isNaN(nextIndex) || nextIndex < 0 || nextIndex >= bajaShowcaseState.slides.length) return;
  if (nextIndex === bajaShowcaseState.index) return;

  const direction = nextIndex > bajaShowcaseState.index ? 1 : -1;
  bajaShowcaseState.index = nextIndex;
  renderBajaShowcaseSlide({ animate: true, direction });
  stopBajaShowcase();
  startBajaShowcase();
});

const setActiveTab = (tabKey) => {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === tabKey);
  });

  applyCardVisibilityForTab(tabKey);
  refreshRevealTargets();
  setBajaShowcaseVisibility(tabKey);
  observeActivePanelCardPreviews();
  // Pull the latest manifest on tab changes so newly added preview/slide assets appear without restarting dev.
  loadPortfolioImagesManifest(true);
  updateScrollHintVisibility();
  window.requestAnimationFrame(updateScrollHintVisibility);
  history.replaceState(null, "", `?tab=${tabKey}`);
};

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveTab(button.dataset.tab);
  });
});

const getInitialTab = () => {
  const url = new URL(window.location.href);
  const requestedTab = url.searchParams.get("tab");
  const tabExists = tabButtons.some((button) => button.dataset.tab === requestedTab);
  return tabExists ? requestedTab : "featured";
};

const modalRoot = document.createElement("div");
modalRoot.className = "media-modal";
modalRoot.innerHTML = `
  <div class="media-modal-backdrop" data-modal-close="true"></div>
  <div class="media-modal-panel" role="dialog" aria-modal="true" aria-label="Project details">
    <button class="media-modal-close" type="button" aria-label="Close details" data-modal-close="true">x</button>
    <h3 class="media-modal-title"></h3>
    <div class="media-modal-stage-wrap">
      <button class="media-modal-stage-arrow media-modal-stage-arrow-prev" type="button" data-dir="-1" aria-label="Previous media">
        &#8249;
      </button>
      <div class="media-modal-stage"></div>
      <button class="media-modal-stage-arrow media-modal-stage-arrow-next" type="button" data-dir="1" aria-label="Next media">
        &#8250;
      </button>
    </div>
    <div class="media-modal-controls">
      <div class="media-modal-mode-buttons" aria-label="Media mode"></div>
      <span class="media-modal-counter"></span>
    </div>
    <p class="media-modal-caption"></p>
    <p class="media-modal-description"></p>
    <ul class="media-modal-points"></ul>
    <div class="media-modal-extra-actions"></div>
  </div>
`;
document.body.appendChild(modalRoot);

const modalTitle = modalRoot.querySelector(".media-modal-title");
const modalStage = modalRoot.querySelector(".media-modal-stage");
const modalStagePrevArrow = modalRoot.querySelector(".media-modal-stage-arrow-prev");
const modalStageNextArrow = modalRoot.querySelector(".media-modal-stage-arrow-next");
const modalModeButtons = modalRoot.querySelector(".media-modal-mode-buttons");
const modalCounter = modalRoot.querySelector(".media-modal-counter");
const modalCaption = modalRoot.querySelector(".media-modal-caption");
const modalDescription = modalRoot.querySelector(".media-modal-description");
const modalPoints = modalRoot.querySelector(".media-modal-points");
const modalExtraActions = modalRoot.querySelector(".media-modal-extra-actions");

const isVideoExtension = (extension) => VIDEO_EXTENSIONS.includes(extension);
const isImageExtension = (extension) => IMAGE_EXTENSIONS.includes(extension);

const getPathExtension = (assetPath) => {
  const cleanPath = assetPath.split("?")[0];
  const dotIndex = cleanPath.lastIndexOf(".");
  if (dotIndex === -1) return "";
  return cleanPath.slice(dotIndex + 1).toLowerCase();
};

const getMediaTypeFromPath = (assetPath) => {
  const extension = getPathExtension(assetPath);
  if (isImageExtension(extension)) return "image";
  if (isVideoExtension(extension)) return "video";
  return null;
};

const toPublicAssetUrl = (assetPath) => {
  if (!assetPath) return "";
  if (/^[a-z][a-z\d+\-.]*:\/\//i.test(assetPath)) return assetPath;
  const normalizedBase = APP_BASE_URL.endsWith("/") ? APP_BASE_URL : `${APP_BASE_URL}/`;
  const normalizedPath = assetPath.replace(/^\/+/, "");
  return `${normalizedBase}${normalizedPath}`;
};

const triggerBlobDownload = (blob, filename) => {
  const blobUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = blobUrl;
  anchor.download = filename || "download";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
};

const downloadWithFallbacks = async (assetPath, filename) => {
  const trimmedPath = String(assetPath || "").replace(/^\/+/, "");
  const caseVariantPath = trimmedPath.startsWith("files/")
    ? `Files/${trimmedPath.slice("files/".length)}`
    : trimmedPath.startsWith("Files/")
    ? `files/${trimmedPath.slice("Files/".length)}`
    : null;

  const candidates = [
    toPublicAssetUrl(trimmedPath),
    `/${trimmedPath}`,
    `./${trimmedPath}`,
    ...(caseVariantPath ? [toPublicAssetUrl(caseVariantPath), `/${caseVariantPath}`, `./${caseVariantPath}`] : []),
  ];

  for (const url of candidates) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) continue;

      const contentType = response.headers.get("content-type") || "";
      const blob = await response.blob();
      const looksLikePdf =
        contentType.toLowerCase().includes("application/pdf") ||
        String(filename || "").toLowerCase().endsWith(".pdf");
      const looksValidSize = blob.size > 100000;

      if (!looksLikePdf || !looksValidSize) continue;

      triggerBlobDownload(blob, filename);
      return true;
    } catch {
      // Try next fallback URL.
    }
  }

  return false;
};

const isImagePath = (assetPath) => getMediaTypeFromPath(assetPath) === "image";

const getManifestPreviewForProject = (projectKey, manifest) => {
  if (!manifest || typeof manifest !== "object") return null;
  const detail = projectDetails[projectKey] ?? {};
  const mediaFolder = detail.mediaFolder ?? projectKey;
  if (!mediaFolder) return null;

  const previewFolderKey = `${mediaFolder}/${CARD_PREVIEW_SUBFOLDER}`;
  const previewCandidates = Array.isArray(manifest[previewFolderKey]) ? manifest[previewFolderKey] : [];
  const previewSource = previewCandidates.find((candidate) => typeof candidate === "string" && isImagePath(candidate));
  if (previewSource) return previewSource;

  const rootCandidates = Array.isArray(manifest[mediaFolder]) ? manifest[mediaFolder] : [];
  const rootSource = rootCandidates.find((candidate) => typeof candidate === "string" && isImagePath(candidate));
  if (rootSource) return rootSource;

  return null;
};

const applyManifestPreviewsToCards = (manifest) => {
  const cards = Array.from(document.querySelectorAll(".project-card[data-project-key]"));
  cards.forEach((card) => {
    if (!(card instanceof HTMLElement)) return;
    const projectKey = card.getAttribute("data-project-key");
    if (!projectKey) return;
    const previewSource = getManifestPreviewForProject(projectKey, manifest);
    if (!previewSource) return;

    const image = card.querySelector(".project-image");
    if (!(image instanceof HTMLImageElement)) return;

    if (image.src !== previewSource) {
      image.src = previewSource;
    }
    const project = projectIndex.get(projectKey);
    if (project) image.alt = `${project.title} preview image`;
    card.dataset.previewLoaded = "true";
    card.dataset.previewLoading = "false";
  });
};

const getExtensionCandidates = (extension) => {
  const lower = extension.toLowerCase();
  const upper = extension.toUpperCase();
  if (lower === upper) return [lower];
  return [lower, upper];
};

const buildNumberedSourceCandidates = (folderPath, index, extension) => {
  const candidates = [];
  getExtensionCandidates(extension).forEach((ext) => {
    candidates.push(`${folderPath}/${index}.${ext}`);
  });
  return candidates;
};

const getMediaTypeFromContentType = (contentTypeHeader) => {
  const contentType = (contentTypeHeader ?? "").toLowerCase();
  if (contentType.startsWith("image/")) return "image";
  if (contentType.startsWith("video/")) return "video";
  return null;
};

const probeMediaSource = async (url) => {
  try {
    const headResponse = await fetch(url, { method: "HEAD", cache: "no-store" });
    if (headResponse.ok) {
      const mediaType = getMediaTypeFromContentType(headResponse.headers.get("content-type"));
      if (mediaType) return mediaType;
      // Some servers may not return content-type on HEAD; fall back to GET.
    }
    if (!headResponse.ok && headResponse.status !== 405) return null;

    const getResponse = await fetch(url, { method: "GET", cache: "no-store" });
    if (!getResponse.ok) return null;
    return getMediaTypeFromContentType(getResponse.headers.get("content-type"));
  } catch {
    return null;
  }
};

const loadPortfolioImagesManifest = async (forceRefresh = false) => {
  if (forceRefresh) {
    portfolioImagesManifest = null;
    portfolioImagesManifestPromise = null;
    projectPreviewSourceCache.clear();
    projectPreviewSourcePromiseCache.clear();
  }

  if (portfolioImagesManifest) return portfolioImagesManifest;
  if (portfolioImagesManifestPromise) return portfolioImagesManifestPromise;

  const cacheBuster = `t=${Date.now()}`;
  portfolioImagesManifestPromise = fetch(`/portfolio-images-manifest.json?${cacheBuster}`, { cache: "no-store" })
    .then((response) => (response.ok ? response.json() : {}))
    .catch(() => ({}))
    .then((manifest) => {
      portfolioImagesManifest = manifest && typeof manifest === "object" ? manifest : {};
      applyManifestPreviewsToCards(portfolioImagesManifest);
      return portfolioImagesManifest;
    })
    .finally(() => {
      portfolioImagesManifestPromise = null;
    });

  return portfolioImagesManifestPromise;
};

const buildMediaManifestKey = (mediaFolder, subfolder = null) => {
  if (!mediaFolder) return "";
  if (!subfolder) return mediaFolder;
  return `${mediaFolder}/${subfolder}`;
};

const getManifestFolderSources = async (mediaFolder, subfolder = null) => {
  const key = buildMediaManifestKey(mediaFolder, subfolder);
  if (!key) return [];

  const manifest = await loadPortfolioImagesManifest();
  const folderEntries = manifest?.[key];
  if (!Array.isArray(folderEntries)) return [];

  const validEntries = folderEntries.filter((entry) => typeof entry === "string" && entry.length > 0);
  return validEntries;
};

const resolveAutoSlides = async (projectKey, mediaFolder) => {
  if (!mediaFolder) return [];

  const manifestSlideSources = await getManifestFolderSources(mediaFolder, CARD_SLIDES_SUBFOLDER);
  if (manifestSlideSources.length > 0) {
    const manifestSlides = manifestSlideSources
      .map((source, index) => {
        const mediaType = getMediaTypeFromPath(source);
        if (!mediaType) return null;
        return {
          type: mediaType,
          src: source,
          caption: `${projectKey} media ${index + 1}`,
        };
      })
      .filter(Boolean);
    if (manifestSlides.length > 0) return manifestSlides;
  }

  const manifestSources = await getManifestFolderSources(mediaFolder);
  if (manifestSources.length > 0) {
    const manifestSlides = manifestSources
      .map((source, index) => {
        const mediaType = getMediaTypeFromPath(source);
        if (!mediaType) return null;
        return {
          type: mediaType,
          src: source,
          caption: `${projectKey} media ${index + 1}`,
        };
      })
      .filter(Boolean);
    if (manifestSlides.length > 0) return manifestSlides;
  }

  const slidesFolderPath = `/portfolio-images/${mediaFolder}/${CARD_SLIDES_SUBFOLDER}`;
  const folderPath = `/portfolio-images/${mediaFolder}`;
  const slides = [];
  const extensions = [...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS];
  let misses = 0;

  for (let i = 1; i <= MAX_AUTO_SLIDES; i += 1) {
    let foundForIndex = false;
    for (const extension of extensions) {
      const candidates = [
        ...buildNumberedSourceCandidates(slidesFolderPath, i, extension),
        ...buildNumberedSourceCandidates(folderPath, i, extension),
      ];
      for (const source of candidates) {
        // eslint-disable-next-line no-await-in-loop
        const mediaType = await probeMediaSource(source);
        if (!mediaType) continue;

        slides.push({
          type: mediaType ?? (isVideoExtension(extension) ? "video" : "image"),
          src: source,
          caption: `${projectKey} media ${i}`,
        });
        foundForIndex = true;
        break;
      }
      if (foundForIndex) break;
    }

    if (foundForIndex) {
      misses = 0;
    } else {
      misses += 1;
      if (misses >= MAX_MISSES_BEFORE_STOP) break;
    }
  }

  return slides;
};

const resolveBajaShowcaseSlides = async () => {
  const folderPath = `/portfolio-images/${BAJA_SHOWCASE_FOLDER}`;
  const numberedSlides = [];
  let misses = 0;

  for (let i = 1; i <= BAJA_SHOWCASE_MAX_SLIDES; i += 1) {
    let found = false;
    for (const extension of IMAGE_EXTENSIONS) {
      const candidates = buildNumberedSourceCandidates(folderPath, i, extension);
      for (const source of candidates) {
        // eslint-disable-next-line no-await-in-loop
        const mediaType = await probeMediaSource(source);
        if (mediaType !== "image") continue;
        numberedSlides.push({
          src: source,
          caption: `BAJA gallery ${i}`,
        });
        found = true;
        break;
      }
      if (found) break;
    }

    if (found) {
      misses = 0;
    } else {
      misses += 1;
      if (misses >= BAJA_SHOWCASE_MAX_MISSES) break;
    }
  }

  if (numberedSlides.length > 0) return numberedSlides;

  // Fallback: if files are not numbered, use manifest order.
  const manifestSources = await getManifestFolderSources(BAJA_SHOWCASE_FOLDER);
  if (manifestSources.length > 0) {
    const manifestSlides = manifestSources
      .filter((source) => getMediaTypeFromPath(source) === "image")
      .map((source, index) => ({
        src: source,
        caption: `BAJA gallery ${index + 1}`,
      }));
    if (manifestSlides.length > 0) return manifestSlides;
  }

  return [];
};

const refreshBajaShowcaseSlides = async () => {
  bajaShowcaseState.loading = true;
  renderBajaShowcaseSlide();
  await loadPortfolioImagesManifest(true);
  bajaShowcaseState.slides = await resolveBajaShowcaseSlides();
  bajaShowcaseState.index = 0;
  bajaShowcaseState.loading = false;
  renderBajaShowcaseSlide();
  startBajaShowcase();
};

const initBajaShowcase = async () => {
  if (bajaShowcaseState.initialized) return;
  bajaShowcaseState.initialized = true;
  bajaShowcaseState.slides = await resolveBajaShowcaseSlides();
  bajaShowcaseState.index = 0;

  const activeTab = document.querySelector(".projects-tab.is-active");
  const activeTabKey = activeTab?.getAttribute("data-tab") ?? "featured";
  setBajaShowcaseVisibility(activeTabKey);
};

const resolveFirstPreviewImage = async (projectKey, mediaFolder) => {
  const manifestPreviewSources = await getManifestFolderSources(mediaFolder, CARD_PREVIEW_SUBFOLDER);
  const firstManifestImage = manifestPreviewSources.find((source) => getMediaTypeFromPath(source) === "image");
  if (firstManifestImage) return firstManifestImage;

  const manifestSources = await getManifestFolderSources(mediaFolder);
  const firstRootManifestImage = manifestSources.find((source) => getMediaTypeFromPath(source) === "image");
  if (firstRootManifestImage) return firstRootManifestImage;

  const previewFolderPath = `/portfolio-images/${mediaFolder}/${CARD_PREVIEW_SUBFOLDER}`;
  const folderPath = `/portfolio-images/${mediaFolder}`;

  for (const extension of IMAGE_EXTENSIONS) {
    const previewNameCandidates = [
      `card preview.${extension.toLowerCase()}`,
      `card preview.${extension.toUpperCase()}`,
      `preview.${extension.toLowerCase()}`,
      `preview.${extension.toUpperCase()}`,
    ];
    for (const fileName of previewNameCandidates) {
      const source = `${previewFolderPath}/${fileName}`;
      // eslint-disable-next-line no-await-in-loop
      const mediaType = await probeMediaSource(source);
      if (mediaType === "image") return source;
    }
  }

  for (const extension of IMAGE_EXTENSIONS) {
    const candidates = [
      ...buildNumberedSourceCandidates(previewFolderPath, 1, extension),
      ...buildNumberedSourceCandidates(folderPath, 1, extension),
    ];
    for (const source of candidates) {
      // eslint-disable-next-line no-await-in-loop
      const mediaType = await probeMediaSource(source);
      if (mediaType === "image") return source;
    }
  }
  return null;
};

const getProjectPreviewSource = async (projectKey, forceRefresh = false) => {
  if (forceRefresh) {
    await loadPortfolioImagesManifest(true);
  }

  if (projectPreviewSourceCache.has(projectKey)) {
    return projectPreviewSourceCache.get(projectKey);
  }

  if (projectPreviewSourcePromiseCache.has(projectKey)) {
    return projectPreviewSourcePromiseCache.get(projectKey);
  }

  const previewPromise = (async () => {
    const detail = projectDetails[projectKey] ?? {};
    const mediaFolder = detail.mediaFolder ?? projectKey;
    const source = await resolveFirstPreviewImage(projectKey, mediaFolder);
    if (!source && !forceRefresh) {
      return getProjectPreviewSource(projectKey, true);
    }
    if (source) {
      projectPreviewSourceCache.set(projectKey, source);
    } else {
      projectPreviewSourceCache.delete(projectKey);
    }
    projectPreviewSourcePromiseCache.delete(projectKey);
    return source;
  })();

  projectPreviewSourcePromiseCache.set(projectKey, previewPromise);
  return previewPromise;
};

const loadCardPreviewForCard = async (card) => {
  if (!(card instanceof HTMLElement)) return;
  if (card.dataset.previewLoaded === "true" || card.dataset.previewLoading === "true") return;

  const projectKey = card.getAttribute("data-project-key");
  if (!projectKey) return;

  card.dataset.previewLoading = "true";

  const image = card.querySelector(".project-image");
  if (!(image instanceof HTMLImageElement)) {
    card.dataset.previewLoaded = "true";
    card.dataset.previewLoading = "false";
    return;
  }

  const previewSource = await getProjectPreviewSource(projectKey);
  if (previewSource && card.isConnected) {
    image.src = previewSource;
    const project = projectIndex.get(projectKey);
    if (project) image.alt = `${project.title} preview image`;
    card.dataset.previewLoaded = "true";
  } else {
    // Leave this retryable in case media was added recently or a prior lookup failed.
    card.dataset.previewLoaded = "false";
  }
  card.dataset.previewLoading = "false";
};

const observeActivePanelCardPreviews = () => {
  const activePanel = document.querySelector(".projects-panel.is-active");
  if (!activePanel) return;

  const observer = ensureCardPreviewObserver();
  observer.disconnect();

  const activeCards = Array.from(activePanel.querySelectorAll(".project-card"));
  if (activeCards.length === 0) return;

  // Eagerly load all cards currently visible in active tab for more reliable preview hydration.
  activeCards.forEach((card) => {
    loadCardPreviewForCard(card);
  });
  activeCards.forEach((card) => observer.observe(card));
};

const getProjectModalContent = async (projectKey) => {
  const project = projectIndex.get(projectKey);
  if (!project) return null;
  await loadPortfolioImagesManifest(true);

  const detail = projectDetails[projectKey] ?? {};
  const customSlides = Array.isArray(detail.slides) ? detail.slides : [];
  const autoSlides = await resolveAutoSlides(projectKey, detail.mediaFolder ?? projectKey);

  let slides = [];
  let slideGroups = null;
  let defaultSlideGroupKey = null;
  if (autoSlides.length > 0 && customSlides.length > 0) {
    const placement = detail.customSlidesPlacement;
    if (placement === "prepend") {
      slides = [...customSlides, ...autoSlides];
    } else if (placement === "split-first-last") {
      slides = [customSlides[0], ...autoSlides, ...customSlides.slice(1)];
    } else {
      slides = [...autoSlides, ...customSlides];
    }
  } else if (customSlides.length > 0) {
    slides = customSlides;
  } else if (autoSlides.length > 0) {
    slides = autoSlides;
  } else {
    slides = [
      {
        type: "image",
        src: project.image,
        caption: `${project.title} preview`,
      },
    ];
  }

  if (detail.mediaTypeToggle === true) {
    const videoSlides = slides.filter((slide) => slide && (slide.type === "embed" || slide.type === "video"));
    const pictureSlides = slides.filter((slide) => slide && slide.type === "image");

    const groups = [];
    if (videoSlides.length > 0) {
      groups.push({ key: "videos", label: "Videos", slides: videoSlides });
    }
    if (pictureSlides.length > 0) {
      groups.push({ key: "pictures", label: "Pictures", slides: pictureSlides });
    }

    if (groups.length > 0) {
      slideGroups = groups;
      defaultSlideGroupKey = groups.some((group) => group.key === "videos") ? "videos" : groups[0].key;
      slides = groups.find((group) => group.key === defaultSlideGroupKey)?.slides ?? slides;
    }
  }

  return {
    title: project.title,
    summary: detail.summary ?? project.description,
    points: detail.points ?? [],
    downloadAction: detail.downloadAction ?? null,
    slideGroups,
    defaultSlideGroupKey,
    slides,
  };
};

const renderModalModeButtons = () => {
  if (!modalModeButtons) return;
  modalModeButtons.innerHTML = "";

  if (!Array.isArray(modalState.slideGroups) || modalState.slideGroups.length < 2) {
    modalModeButtons.style.display = "none";
    return;
  }

  modalModeButtons.style.display = "inline-flex";
  modalState.slideGroups.forEach((group) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "media-modal-mode-button";
    button.textContent = group.label;
    button.setAttribute("data-media-mode-key", group.key);
    button.classList.toggle("is-active", group.key === modalState.activeGroupKey);
    button.setAttribute("aria-pressed", group.key === modalState.activeGroupKey ? "true" : "false");
    modalModeButtons.appendChild(button);
  });
};

const setModalSlideGroup = (groupKey, resetIndex = true) => {
  if (!Array.isArray(modalState.slideGroups) || modalState.slideGroups.length === 0) return;
  const group = modalState.slideGroups.find((candidate) => candidate.key === groupKey);
  if (!group) return;

  modalState.activeGroupKey = group.key;
  modalState.slides = Array.isArray(group.slides) ? group.slides : [];
  if (resetIndex) modalState.index = 0;

  renderModalModeButtons();
  renderModalSlide();
};

const renderModalPoints = (points) => {
  modalPoints.innerHTML = "";
  if (!points || points.length === 0) {
    modalPoints.style.display = "none";
    return;
  }

  modalPoints.style.display = "grid";
  points.forEach((point) => {
    const li = document.createElement("li");
    li.textContent = point;
    modalPoints.appendChild(li);
  });
};

const renderModalSlide = () => {
  if (!modalState.slides.length) return;
  modalState.index = ((modalState.index % modalState.slides.length) + modalState.slides.length) % modalState.slides.length;
  const slide = modalState.slides[modalState.index];
  const hasMultipleSlides = modalState.slides.length > 1;

  if (modalStagePrevArrow) {
    modalStagePrevArrow.style.display = hasMultipleSlides ? "grid" : "none";
  }
  if (modalStageNextArrow) {
    modalStageNextArrow.style.display = hasMultipleSlides ? "grid" : "none";
  }

  modalCounter.textContent = `${modalState.index + 1} / ${modalState.slides.length}`;
  modalCaption.textContent = slide.caption ?? "";
  modalStage.innerHTML = "";

  if (slide.type === "video") {
    const video = document.createElement("video");
    video.src = slide.src;
    video.controls = true;
    video.preload = "metadata";
    video.className = "media-modal-video";
    modalStage.appendChild(video);
  } else if (slide.type === "embed") {
    const iframe = document.createElement("iframe");
    iframe.src = slide.src;
    iframe.className = "media-modal-embed";
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    iframe.setAttribute("title", slide.caption ?? "Embedded video");
    modalStage.appendChild(iframe);
  } else {
    const img = document.createElement("img");
    img.src = slide.src;
    img.alt = slide.caption ?? "Project media";
    img.className = "media-modal-image";
    modalStage.appendChild(img);
  }
};

const openProjectModal = async (projectKey) => {
  const project = projectIndex.get(projectKey);
  if (!project) return;

  modalRoot.classList.add("is-open");
  modalRoot.setAttribute("data-project-key", projectKey);
  document.body.classList.add("modal-open");
  updateScrollHintVisibility();
  modalTitle.textContent = project.title;
  modalDescription.textContent = "Loading media...";
  modalCaption.textContent = "";
  modalCounter.textContent = "";
  modalStage.innerHTML = `<div class="media-modal-loading">Loading...</div>`;
  modalPoints.innerHTML = "";
  modalPoints.style.display = "none";
  modalState.slideGroups = null;
  modalState.activeGroupKey = null;
  if (modalModeButtons) {
    modalModeButtons.innerHTML = "";
    modalModeButtons.style.display = "none";
  }
  if (modalExtraActions) {
    modalExtraActions.innerHTML = "";
    modalExtraActions.style.display = "none";
  }

  const content = await getProjectModalContent(projectKey);
  if (!content || !modalRoot.classList.contains("is-open")) return;

  modalState.projectKey = projectKey;
  modalState.slideGroups = Array.isArray(content.slideGroups) ? content.slideGroups : null;
  modalState.activeGroupKey = content.defaultSlideGroupKey ?? null;
  modalState.slides = content.slides;
  modalState.index = 0;

  modalTitle.textContent = content.title;
  modalDescription.textContent = content.summary;
  renderModalPoints(content.points);
  if (modalExtraActions) {
    modalExtraActions.innerHTML = "";
    if (content.downloadAction?.href && content.downloadAction?.label) {
      const button = document.createElement("button");
      button.className = "media-modal-download";
      button.type = "button";
      button.textContent = content.downloadAction.label;
      button.addEventListener("click", async () => {
        if (
          content.downloadAction.external === true ||
          /^[a-z][a-z\d+\-.]*:\/\//i.test(content.downloadAction.href)
        ) {
          window.open(content.downloadAction.href, "_blank", "noopener,noreferrer");
          return;
        }

        button.disabled = true;
        const originalText = button.textContent;
        button.textContent = "Preparing download...";
        const ok = await downloadWithFallbacks(
          content.downloadAction.href,
          content.downloadAction.filename ?? "download.pdf",
        );
        button.disabled = false;
        button.textContent = originalText;
        if (!ok) {
          console.error("Failed to download report from all candidate URLs.");
          window.alert("Could not download the report file. Check that /public/Files/EMAE_360_Report.pdf exists and refresh.");
        }
      });
      modalExtraActions.appendChild(button);
      modalExtraActions.style.display = "flex";
    } else {
      modalExtraActions.style.display = "none";
    }
  }
  if (modalState.slideGroups && modalState.activeGroupKey) {
    setModalSlideGroup(modalState.activeGroupKey, true);
  } else {
    renderModalModeButtons();
    renderModalSlide();
  }
};

const closeProjectModal = () => {
  modalRoot.classList.remove("is-open");
  modalRoot.removeAttribute("data-project-key");
  document.body.classList.remove("modal-open");
  modalStage.innerHTML = "";
  modalState.projectKey = null;
  modalState.slides = [];
  modalState.index = 0;
  modalState.slideGroups = null;
  modalState.activeGroupKey = null;
  if (modalModeButtons) {
    modalModeButtons.innerHTML = "";
    modalModeButtons.style.display = "none";
  }
  updateScrollHintVisibility();
};

modalRoot.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.dataset.modalClose === "true") {
    closeProjectModal();
    return;
  }

  const mediaModeButton = target.closest(".media-modal-mode-button");
  if (mediaModeButton instanceof HTMLButtonElement) {
    const modeKey = mediaModeButton.getAttribute("data-media-mode-key");
    if (modeKey) {
      setModalSlideGroup(modeKey, true);
    }
    return;
  }

  if (target.dataset.dir) {
    if (!modalState.slides.length) return;
    modalState.index += Number(target.dataset.dir);
    renderModalSlide();
  }
});

document.addEventListener("keydown", (event) => {
  if (!modalRoot.classList.contains("is-open")) return;

  if (event.key === "Escape") {
    closeProjectModal();
    return;
  }

  if (!modalState.slides.length) return;
  if (event.key === "ArrowRight") {
    modalState.index += 1;
    renderModalSlide();
  } else if (event.key === "ArrowLeft") {
    modalState.index -= 1;
    renderModalSlide();
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const actionButton = target.closest(".project-action-button");
  if (actionButton) {
    const projectKey = actionButton.getAttribute("data-project-key");
    if (projectKey) openProjectModal(projectKey);
    return;
  }

  const card = target.closest(".project-card");
  if (!card) return;
  if (target.closest("a, button")) return;

  const projectKey = card.getAttribute("data-project-key");
  if (projectKey) openProjectModal(projectKey);
});

renderPanels();
setActiveTab(getInitialTab());
initBajaShowcase();
loadPortfolioImagesManifest();

function updateScrollHintVisibility() {
  if (!scrollHint) return;
  if (document.body.classList.contains("modal-open")) {
    scrollHint.classList.remove("is-visible");
    return;
  }

  const scrollingElement = document.scrollingElement ?? document.documentElement;
  const scrollableHeight = scrollingElement.scrollHeight - window.innerHeight;
  // Ignore tiny layout overflow so short tabs (like Athletics/Leadership) do not show the hint.
  const minMeaningfulScrollPx = 140;
  const isScrollable = scrollableHeight > minMeaningfulScrollPx;
  const nearBottom = window.scrollY >= Math.max(0, scrollableHeight - 84);

  scrollHint.classList.toggle("is-visible", isScrollable && !nearBottom);
}

window.addEventListener("scroll", updateScrollHintVisibility, { passive: true });
window.addEventListener("resize", updateScrollHintVisibility);
window.setTimeout(updateScrollHintVisibility, 0);
