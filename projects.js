const tabButtons = Array.from(document.querySelectorAll(".projects-tab"));
const tabPanels = Array.from(document.querySelectorAll(".projects-panel"));

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
  ],
  mechanical: [
    {
      key: "cwru-motorsports-led-sign",
      title: "CWRU Motorsports LED Sign",
      image: "/images/projects/cwru-led-sign.svg",
      description:
        "Custom LED branding fixture with enclosure design, mounting strategy, and clean wiring approach for event display.",
      tags: ["Electrical", "Fabrication", "Branding"],
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
  coding: [
    {
      key: "coding-projects",
      title: "Coding Projects",
      image: "/images/projects/coding-projects.svg",
      description:
        "Software-focused work including simulation tooling, interface logic, embedded utilities, and automation scripts.",
      tags: ["JavaScript", "Embedded", "Tooling"],
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
      title: "Food Bank",
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
      key: "rugby",
      title: "Rugby",
      image: "/images/projects/rugby.svg",
      description: "Been on the CWRU Rugby Team for three years.",
      tags: ["CWRU", "Rugby", "Teamwork"],
    },
    {
      key: "cwru-lifts",
      title: "CWRU Lifts",
      image: "/images/projects/cwru-lifts.svg",
      description: "Lifting events, competition videos, and promotional flyers.",
      tags: ["Lifting", "Events", "Media"],
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
  },
  "baja-sae-motion-sim": {
    summary: "Motion simulation stack with hardware/software integration.",
    points: ["Vehicle dynamics integration", "Telemetry and controls workflow", "Validation tests"],
    mediaFolder: "baja-sae-motion-sim",
    slides: [
      {
        type: "embed",
        src: "https://www.youtube.com/embed/-549WYZ5cbQ?rel=0",
        caption: "BAJA SAE Motion Sim demo video",
      },
    ],
  },
  "custom-v-twin-motorcycle-engine": {
    summary: "Main engine project with multiple subsystem tracks.",
    points: ["Subsystem planning", "CAD and packaging", "Manufacturing feasibility"],
    mediaFolder: "custom-v-twin-motorcycle-engine",
  },
  "cwru-motorsports-led-sign": {
    summary: "Design and build details for the LED sign project.",
    points: ["Enclosure design", "Power and wiring layout", "Mounting approach"],
    mediaFolder: "cwru-motorsports-led-sign",
  },
  "greek-lithophane-lamps": {
    summary: "Parametric design and print outcomes for lithophane lamps.",
    points: ["Material diffusion behavior", "Geometry tuning", "Final print setup"],
    mediaFolder: "greek-lithophane-lamps",
  },
  "coding-projects": {
    summary: "Code portfolio snapshots and technical decisions.",
    points: ["Simulation utilities", "UI logic", "Embedded support tooling"],
    mediaFolder: "coding-projects",
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
  "cwru-lifts": {
    summary: "CWRU lifts events, media, and flyer design work.",
    points: ["Event photos", "Competition videos", "Flyer and promo design"],
    mediaFolder: "cwru-lifts",
  },
};

const modalState = {
  projectKey: null,
  slides: [],
  index: 0,
};

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "svg"];
const VIDEO_EXTENSIONS = ["mp4", "webm", "mov"];
const MAX_AUTO_SLIDES = 16;
const MAX_MISSES_BEFORE_STOP = 3;

const projectIndex = new Map();

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

const renderPanels = () => {
  for (const panel of tabPanels) {
    const tabKey = panel.dataset.panel;
    const projects = projectsByTab[tabKey] ?? [];
    panel.innerHTML = "";

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

const setActiveTab = (tabKey) => {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === tabKey);
  });

  refreshRevealTargets();
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
    <div class="media-modal-stage"></div>
    <div class="media-modal-controls">
      <button class="media-modal-nav" type="button" data-dir="-1">Prev</button>
      <span class="media-modal-counter"></span>
      <button class="media-modal-nav" type="button" data-dir="1">Next</button>
    </div>
    <p class="media-modal-caption"></p>
    <p class="media-modal-description"></p>
    <ul class="media-modal-points"></ul>
  </div>
`;
document.body.appendChild(modalRoot);

const modalTitle = modalRoot.querySelector(".media-modal-title");
const modalStage = modalRoot.querySelector(".media-modal-stage");
const modalCounter = modalRoot.querySelector(".media-modal-counter");
const modalCaption = modalRoot.querySelector(".media-modal-caption");
const modalDescription = modalRoot.querySelector(".media-modal-description");
const modalPoints = modalRoot.querySelector(".media-modal-points");

const isVideoExtension = (extension) => VIDEO_EXTENSIONS.includes(extension);

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

const resolveAutoSlides = async (projectKey, mediaFolder) => {
  if (!mediaFolder) return [];

  const folderPath = `/portfolio-images/${mediaFolder}`;
  const slides = [];
  const extensions = [...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS];
  let misses = 0;

  for (let i = 1; i <= MAX_AUTO_SLIDES; i += 1) {
    let foundForIndex = false;
    for (const extension of extensions) {
      const source = `${folderPath}/${i}.${extension}`;
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

    if (foundForIndex) {
      misses = 0;
    } else {
      misses += 1;
      if (misses >= MAX_MISSES_BEFORE_STOP) break;
    }
  }

  return slides;
};

const resolveFirstPreviewImage = async (projectKey, mediaFolder) => {
  const folderPath = `/portfolio-images/${mediaFolder}`;
  for (const extension of IMAGE_EXTENSIONS) {
    const source = `${folderPath}/1.${extension}`;
    // eslint-disable-next-line no-await-in-loop
    const mediaType = await probeMediaSource(source);
    if (mediaType === "image") return source;
  }
  return null;
};

const applyAutoPreviewImages = async () => {
  const entries = Array.from(projectIndex.values());

  await Promise.all(
    entries.map(async (project) => {
      const detail = projectDetails[project.key] ?? {};
      const mediaFolder = detail.mediaFolder ?? project.key;
      const previewImage = await resolveFirstPreviewImage(project.key, mediaFolder);
      if (!previewImage) return;

      const card = document.querySelector(`.project-card[data-project-key="${project.key}"]`);
      const image = card?.querySelector(".project-image");
      if (!(image instanceof HTMLImageElement)) return;
      image.src = previewImage;
      image.alt = `${project.title} preview image`;
    }),
  );
};

const getProjectModalContent = async (projectKey) => {
  const project = projectIndex.get(projectKey);
  if (!project) return null;

  const detail = projectDetails[projectKey] ?? {};
  const customSlides = Array.isArray(detail.slides) ? detail.slides : [];
  const autoSlides = customSlides.length === 0
    ? await resolveAutoSlides(projectKey, detail.mediaFolder ?? projectKey)
    : [];
  const slides = customSlides.length > 0
    ? customSlides
    : autoSlides.length > 0
    ? autoSlides
    : [
        {
          type: "image",
          src: project.image,
          caption: `${project.title} preview`,
        },
      ];

  return {
    title: project.title,
    summary: detail.summary ?? project.description,
    points: detail.points ?? [],
    slides,
  };
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
  modalTitle.textContent = project.title;
  modalDescription.textContent = "Loading media...";
  modalCaption.textContent = "";
  modalCounter.textContent = "";
  modalStage.innerHTML = `<div class="media-modal-loading">Loading...</div>`;
  modalPoints.innerHTML = "";
  modalPoints.style.display = "none";

  const content = await getProjectModalContent(projectKey);
  if (!content || !modalRoot.classList.contains("is-open")) return;

  modalState.projectKey = projectKey;
  modalState.slides = content.slides;
  modalState.index = 0;

  modalTitle.textContent = content.title;
  modalDescription.textContent = content.summary;
  renderModalPoints(content.points);
  renderModalSlide();
};

const closeProjectModal = () => {
  modalRoot.classList.remove("is-open");
  modalRoot.removeAttribute("data-project-key");
  document.body.classList.remove("modal-open");
  modalStage.innerHTML = "";
  modalState.projectKey = null;
  modalState.slides = [];
  modalState.index = 0;
};

modalRoot.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.dataset.modalClose === "true") {
    closeProjectModal();
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
applyAutoPreviewImages();
