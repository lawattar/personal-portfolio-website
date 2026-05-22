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
        "Motion simulation platform designed for Baja SAE driver development using custom actuators, STM32 controls, and real-time telemetry integration.",
      tags: ["Simulation", "Controls", "Testing"],
    },
    {
      key: "sr26-steering-wheel",
      title: "SR26 Steering Wheel",
      image: "/images/projects/sr26-steering-wheel.svg",
      description:
        "Second-generation BAJA steering wheel focused on packaging efficiency, manufacturability, and improved driver ergonomics.",
      tags: ["Design", "DFM", "Revision"],
    },
    {
      key: "sr25-steering-wheel",
      title: "SR25 Steering Wheel",
      image: "/images/projects/sr25-steering-wheel.svg",
      description:
        "First-generation BAJA steering wheel featuring a 4.3\" display, 6 push buttons, and 3 rotary knobs.",
      tags: ["Mechanical", "CAD", "Embedded"],
    },
    {
      key: "custom-linear-actuators",
      title: "Custom Linear Actuators",
      image: "/images/projects/custom-linear-actuators.svg",
      description:
        "Designed and manufactured custom high-speed linear actuators for motion simulation based on an open-source GitHub project.",
      tags: ["Mechanisms", "Motion", "Design"],
    },
    {
      key: "redbull-f1-steering-wheel-replica",
      title: "Red Bull F1 Steering Wheel Replica",
      image: "/images/projects/redbull-f1-steering-wheel-replica.svg",
      description:
        "Custom F1 wheel replica using models from Pokornyi Engineering. This was my first steering wheel project, and served as a strong foundation for my future BAJA designs.",
      tags: ["Replica", "Controls", "CAD"],
    },
    {
      key: "custom-v-twin-motorcycle-engine",
      title: "Custom V-Twin Motorcycle Engine",
      image: "/images/projects/custom-v-twin-engine.svg",
      description:
        "Custom V-twin engine modeled from the ground up with emphasis on thermodynamic modeling, manufacturability, mechanical analysis, and market feasibility.",
      tags: ["Powertrain", "CAD", "Manufacturing"],
    },
    {
      key: "agricultural-drone-design",
      title: "Agricultural Drone Design",
      image: "/images/projects/agricultural-drone-design.svg",
      description:
        "Heavy-lift agricultural drone concept designed around payload capacity, power systems, and long-endurance flight.",
      tags: ["Aerospace", "Systems", "Design"],
    },
    {
      key: "cwru-motorsports-led-sign",
      title: "CWRU Motorsports LED Sign",
      image: "/images/projects/cwru-led-sign.svg",
      description:
        "Custom designed and manufactured a CWRU BAJA sign to display in our team workspace in Sears think[box].",
      tags: ["Electrical", "Fabrication", "Branding"],
    },
    {
      key: "geometric-led-wall-panels",
      title: "Geometric LED Wall Panels",
      image: "/images/projects/geometric-led-wall-panels.svg",
      description:
        "My first LED project using WS2815 LEDs and an ESP32 running WLED. Lighting modes can be controlled via a mobile app.",
      tags: ["Lighting", "Electronics", "Fabrication"],
    },
    {
      key: "greek-lithophane-lamps",
      title: "Greek Lithophane Lamps",
      image: "/images/projects/greek-lithophane-lamps.svg",
      description:
        "Lamps designed around the Bambu Lab MH001 LED Lamp Kit that came with my P1S 3D printer.",
      tags: ["3D Print", "Parametric", "Product"],
    },
    {
      key: "helical-antenna-design",
      title: "Helical Antenna Design",
      image: "/images/projects/helical-antenna-design.svg",
      description: "Helical antenna calibrated for highly-directional 5 GHz WiFi.",
      tags: ["RF", "Design", "Prototype"],
    },
  ],
  baja: [
    {
      key: "baja-sae-motion-sim",
      title: "BAJA SAE Motion Sim",
      image: "/images/projects/baja-motion-sim.svg",
      description:
        "Motion simulation platform designed for Baja SAE driver development using custom actuators, STM32 controls, and real-time telemetry integration.",
      tags: ["Simulation", "Controls", "Testing"],
    },
    {
      key: "sr26-steering-wheel",
      title: "SR26 Steering Wheel",
      image: "/images/projects/sr26-steering-wheel.svg",
      description:
        "Second-generation BAJA steering wheel focused on packaging efficiency, manufacturability, and improved driver ergonomics.",
      tags: ["Design", "DFM", "Revision"],
    },
    {
      key: "sr25-steering-wheel",
      title: "SR25 Steering Wheel",
      image: "/images/projects/sr25-steering-wheel.svg",
      description:
        "First-generation BAJA steering wheel featuring a 4.3\" display, 6 push buttons, and 3 rotary knobs.",
      tags: ["Mechanical", "CAD", "Embedded"],
    },
    {
      key: "cwru-motorsports-led-sign",
      title: "CWRU Motorsports LED Sign",
      image: "/images/projects/cwru-led-sign.svg",
      description:
        "Custom designed and manufactured a CWRU BAJA sign to display in our team workspace in Sears think[box].",
      tags: ["Electrical", "Fabrication", "Branding"],
    },
  ],
  coding: [
    {
      key: "threejs-global-temperature-ui",
      title: "Three.js Global Temperature UI",
      image: "/images/projects/threejs-global-temperature-ui.svg",
      description:
        "Interactive Three.js globe with controllable elevation parameters that pinpoints temperature and location based on user input.",
      tags: ["Three.js", "Data Viz", "UI"],
      externalLinks: [{ label: "View Repo", href: "https://github.com/lawattar" }],
    },
    {
      key: "stm32-linear-actuator-controller",
      title: "STM32 Linear Actuator Controller",
      image: "/images/projects/stm32-linear-actuator-controller.svg",
      description:
        "Custom STM32 array and electronics enclosure used to control my BAJA simulator linear actuators. This was based upon open source code that I improved using hardware timers.",
      tags: ["STM32", "Embedded", "Controls"],
      externalLinks: [{ label: "View Repo", href: "https://github.com/lawattar" }],
    },
    {
      key: "pygame-pacman",
      title: "pygame Pacman",
      image: "/images/projects/pygame-pacman.svg",
      description:
        "Custom version of Pacman that I coded in python/pygame during high school.",
      tags: ["Python", "Pygame", "Game Dev"],
      externalLinks: [{ label: "View Repo", href: "https://github.com/lawattar" }],
    },
  ],
  experience: [
    {
      key: "lincoln-electric",
      title: "Lincoln Electric",
      image: "/images/projects/lincoln-electric.svg",
      description: "Tool Design and Plant Engineering Intern",
      tags: ["Manufacturing", "Engineering", "Industry"],
    },
    {
      key: "scribeamerica",
      title: "ScribeAmerica",
      image: "/images/projects/scribe-america.svg",
      description: "MetroHealth Emergency Room Medical Scribe",
      tags: ["Documentation", "Medical", "Detail"],
    },
    {
      key: "life-guard",
      title: "Life Guard",
      image: "/images/projects/lifeguard.svg",
      description: "Rocky River Recreation Center Life Guard",
      tags: ["Safety", "Operations", "Leadership"],
    },
    {
      key: "life-guard-supervisor",
      title: "Life Guard Supervisor",
      image: "/images/projects/lifeguard-supervisor.svg",
      description: "Supervised life guards and maintained water chemical levels.",
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
      key: "computer-building",
      title: "Computer Building",
      image: "/images/projects/computer-building.svg",
      description: "Planned and built 8 computers for family members and friends.",
      tags: ["Hardware", "Build", "Troubleshooting"],
    },
    {
      key: "arabic-art-and-calligraphies",
      title: "Arabic Art and Calligraphies",
      image: "/images/projects/arabic-art-calligraphy.svg",
      description: "Designed and manufactured Arabic calligraphies, graduation plaques, and keychains.",
      tags: ["Art", "Calligraphy", "Creative"],
    },
  ],
  athletics: [
    {
      key: "powerlifting",
      title: "Powerlifting",
      image: "/images/projects/powerlifting.svg",
      description:
        "I am passionate about the gym and have helped set up and run numerous powerlifting events around Cleveland and CWRU.",
      tags: ["Strength", "Training", "Competition"],
    },
    {
      key: "rugby",
      title: "Rugby",
      image: "/images/projects/rugby.svg",
      description: "Competed on the CWRU Rugby team throughout college.",
      tags: ["CWRU", "Rugby", "Teamwork"],
    },
  ],
  leadership: [
    {
      key: "cwru-lifts",
      title: "CWRU Lift",
      image: "/images/projects/cwru-lifts.svg",
      description: "Held an executive position every year during college, including social media and design roles.",
      tags: ["Lifting", "Events", "Media"],
    },
    {
      key: "msa",
      title: "CWRU MSA",
      image: "/images/projects/msa.svg",
      description: "Helped unite Muslims across campus by planning and running club events and fundraisers.",
      tags: ["Leadership", "Community", "Organization"],
    },
    {
      key: "case-surgical-society",
      title: "Case Surgical Society",
      image: "/images/projects/case-surgical-society.svg",
      description: "Surgical-interest club involvement with events, hands-on sessions, and student collaboration.",
      tags: ["Surgery", "Club", "Leadership"],
    },
    {
      key: "food-bank",
      title: "Center for Civic Engagement & Learning",
      image: "/images/projects/food-bank.svg",
      description: "Volunteered to organize and stock the CWRU community food pantry.",
      tags: ["Community", "Logistics", "Volunteer"],
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
    slideMetadata: [
      {
        title: "Completed SR25 Steering Wheel",
        points: [
          "I designed the SR25 steering wheel in Siemens NX, and manufactured the components using waterjet and 3D printing processes",
          "Features include a custom STM32 PCB, 6 Otto P9 push buttons, 21 LEDs, 2 thumb potentiometers, 3 rotary encoders, and a display showing RPM, speed, shock data, vehicle telemetry, etc.",
          "I also had to learn advanced CAD surfacing methods to create the complex rear grip geometry",
          "I designed the custom grips around 3D hand scans of our drivers and used experience from my Red Bull F1 replica wheel project as inspiration",
          "This was the first steering wheel in team history to feature an integrated display system",
        ],
      },
      {
        title: "Rear CAD View and Handle Grooves",
        points: [
          "Transparent rear CAD view showcasing internal PCB and packaging layout",
          "This view also showcases the grooved grip geometry. This custom grip reduced driver fatigue during the 4 hour BAJA endurance races.",
        ],
      },
      {
        title: "Front View of CAD Model",
        points: [
          "Front CAD showing updated \"knurled\" grip geometry and front panel packaging layout",
          "CAD development focused heavily on ergonomics, manufacturability, and serviceability",
        ],
      },
      {
        title: "Push-To-Talk Paddle System",
        points: [
          "Rear paddle system uses neodymium magnets and micro-switches to provide tactile driver feedback",
          "I selected paddles over buttons to improve usability while preserving front panel controls for shock macros",
          "We also wanted to avoid routing the mic cable through the electronics enclosure due to EMI issues in old designs",
        ],
      },
      {
        title: "SR23 vs SR25 Structural Optimization",
        points: [
          "I performed FEA in Ansys comparing SR23 and SR25 wheel structures under a 120 ft-lb applied steering moment",
          "The SR25 wheel achieved similar performance while weighing 0.52 lb total (0.07 lb decrease)",
          "Design iterations balanced FOS against diminishing returns/complexity from additional lightweighting",
        ],
      },
      {
        title: "Me sitting in SR25 trying out the wheel",
        points: [
          "Image shows SR25 installed inside the competition vehicle with live telemetry functioning",
          "Special thanks to Zach Brown for designing the display PCB, and Ben Roy for display driver integration",
        ],
        actions: [
          {
            label: "Zach Brown",
            href: "https://www.linkedin.com/in/zbrown23/",
            external: true,
          },
          {
            label: "Ben Roy",
            href: "https://www.linkedin.com/in/benmroy603/",
            external: true,
          },
        ],
      },
      {
        title: "Electronics Packaging Constraints",
        points: [
          "I packaged all internal electronics within approximately 0.5 inches of enclosure depth",
          "Front mounting architecture prioritized easy serviceability, but severely limited the amount of space I had to work with",
        ],
      },
      {
        title: "Rear Paddle Assembly",
        points: [
          "Paddle mounting system during assembly and enclosure integration",
          "Mechanical layout focused on durability, tactile feel, and repeatable driver operation",
        ],
      },
      {
        title: "Waterproofing Failure Analysis",
        points: [
          "Competition testing revealed sealing issues with an early TPU gasket approach",
          "Limited gasket seating width and material stiffness reduced waterproofing effectiveness",
          "Lessons learned directly influenced sealing improvements in the second-generation SR26 wheel",
        ],
      },
    ],
  },
  "sr26-steering-wheel": {
    summary: "SR26 revision goals and improvements over SR25.",
    points: ["Weight and packaging updates", "Improved serviceability", "Refined control ergonomics"],
    mediaFolder: "sr26-steering-wheel",
    slideMetadata: [
      {
        title: "SR26 Steering Wheel Final Design",
        points: [
          "Rendered view of the completed SR26 steering wheel installed in the vehicle",
          "Features 8 Otto P9 push buttons for shock macros, 21 LEDs, 2 thumb potentiometers, 3 RS26 rotary encoders, and 4 rear paddles",
          "I redesigned the custom driver handles around updated 3D hand scans and introduced modular grip corners. This allows drivers to test different shapes and select their preferred ergonomics for hand-over-hand style steering.",
          "This generation wheel uses a full carbon fiber front panel with urethane-bonded 3D printed inserts and a 70mm quick release for rapid removal",
          "The systems team overhauled the UI with expanded message lights and a dedicated debugging mode",
        ],
      },
      {
        title: "Ergonomic Development Updates",
        points: [
          "Updated handle geometry eliminated driver blistering during endurance events",
          "Modular grip architecture and improved hand scan integration significantly improved comfort and usability",
        ],
      },
      {
        title: "Front Wheel CAD Overview",
        points: [
          "Front CAD render showcasing packaging layout, controls, display system, and updated handle geometry",
          "Packaging and ergonomics were refined while maintaining aggressive size constraints",
        ],
      },
      {
        title: "Rear Architecture and Paddle System",
        points: [
          "Rear view showcasing 4 paddles, modular handles, and 70mm quick release mounting pattern",
          "I designed the wheel to support both direct steering column mounting for competition and quick-release mounting for off-season testing",
        ],
      },
      {
        title: "Driver Hand Scan",
        points: [
          "Drivers pressed their hands into clay molds which I converted into handle geometry inside Siemens NX",
          "The scans directly influenced my handle CAD and overall wheel ergonomics",
        ],
      },
      {
        title: "Grip Surface Development",
        points: [
          "The red surface represents the hand scan, while the blue surface shows the finished grip geometry",
          "I built the grip surfaces using splines, G1 continuity constraints, and Through Curve Mesh surfacing",
          "The steering wheel CAD totaled nearly 2000 features due to the complexity of the surfaces! 🤯",
        ],
      },
      {
        title: "Front Electronics Packaging",
        points: [
          "Front CAD view with enclosure removed showcasing packaging",
          "Only approximately 0.5 inches of internal height was available for the electronics",
          "I designed PCB mounts and screen attachment mechanisms, and I also added desiccant pods to provide some moisture protection",
        ],
      },
      {
        title: "Rear Electronics Packaging",
        points: [
          "Rear CAD view with enclosure hidden showcases screen PCB, front encoder PCB packaging, and cable routing",
          "I even CAD modeled display cables to verify clearance before manufacturing",
        ],
      },
      {
        title: "Steering Column Mount FEA",
        points: [
          "ANSYS validation of the updated steering mount was performed using a 160 lb steering force moment",
          "The design was waterjet machined, and it achieved approximately 2 factor of safety while maintaining the same weight as SR25's mount",
          "This new design supports the larger 70mm quick release mounting pattern",
        ],
      },
      {
        title: "Wheel Frame FEA",
        points: [
          "The wheel frame was validated in ANSYS around a 5 factor of safety using a 160 lb applied steering force moment",
          "I optimized weight cutouts and removed unnecessary webbing while maintaining weight/strength targets",
          "The final structure weighed approximately 0.51 lb (same as SR25) despite increased wheel dimensions (0.5\" wider than SR25)",
        ],
      },
      {
        title: "Finished Wheel Frames",
        points: ["The waterjet manufactured wheel frames were finished with black powder coating"],
      },
      {
        title: "Prototype Test Fitting",
        points: [
          "Test fits of 3D printed components and carbon fiber front panel assembly were performed",
          "Driver feedback during testing validated ergonomic improvements",
        ],
      },
      {
        title: "Rear Prototype Assembly",
        points: [
          "Rear view of physical prototype showcasing paddle mounts, quick release system, and custom handles",
        ],
      },
      {
        title: "Carbon Fiber Panel Bonding",
        points: [
          "I bonded front panel inserts directly onto the carbon fiber plate",
          "The polycarbonate screen cover was also bonded directly into the assembly",
        ],
      },
      {
        title: "Pong Working on the Wheel 🤯",
        points: ["The systems team even got pong to work on the wheel!",
          "Doom is up next 😈"
        ],
      },
      {
        title: "Competition Vehicle Integration",
        points: [
          "Final SR26 wheel installed on the competition vehicle with telemetry display and shock indicators functioning",
        ],
      },
      {
        title: "Oregon Competition Durability Test",
        points: [
          "Wheel after Baja Oregon 2026 covered in mud and debris following competition use",
          "Safe to say we need screen tearoffs lol",
          "Despite severe conditions, the wheel continued functioning reliably",
          "Next slide showcases teardown results validating waterproofing improvements",
        ],
      },
      {
        title: "Waterproofing Validation",
        points: [
          "Post-event teardown showed no signs of mud or water ingress",
          "I widened gasket seating surfaces compared to SR25, and I switched to custom laser-cut EPDM foam gaskets for improved sealing",
          "Packaging of PCBs, buttons, and encoder systems remained fully protected!",
        ],
      },
    ],
  },
  "redbull-f1-steering-wheel-replica": {
    summary: "Red Bull F1 steering wheel replica process and build details.",
    points: ["Reference mapping", "Button/encoder layout", "Packaging and finish quality"],
    mediaFolder: "redbull-f1-steering-wheel-replica",
    slideMetadata: [
      {
        title: "Completed Red Bull F1 Replica Wheel",
        points: [
          "I manufactured and assembled a Red Bull Formula 1 style steering wheel replica for my BAJA motion simulator using DIY files from Pokornyi Engineering",
          "I produced the components on my Bambu Lab P1S and integrated the completed wheel into my simulator platform",
          'Features include a 4.3" VoCore display, programmable RGB LEDs, magnetic paddle shifters, rotary encoders, and authentic Formula-style controls',
        ],
      },
      {
        title: "Front Assembly and Electronics Integration",
        points: [
          "I assembled the front controls and electronics while integrating the display, programmable lighting, switches, and rotary controls",
          "The design includes ergonomic grips, multiple encoder inputs, and adjustable button lighting inspired by modern Formula 1 steering systems",
        ],
      },
      {
        title: "Rear Structure and Paddle System",
        points: [
          "Rear view showcasing the quick release mechanism, dual clutch paddles, magnetic shift paddles, and carbon fiber reinforced structure",
        ],
      },
    ],
  },
  "agricultural-drone-design": {
    summary:
      "Heavy-lift agricultural drone concept focused on endurance, propulsion optimization, and CAD-driven assembly integration.",
    points: ["Frame and payload tradeoffs", "Power and endurance strategy", "Field-use reliability goals"],
    mediaFolder: "agricultural-drone-design",
    slideMetadata: [
      {
        title: "Hexacopter CAD Render",
        points: [
          "Served as CAD lead for overall drone architecture and assembly",
          "Researched motor and propeller combinations to improve flight efficiency",
          "Performed battery sizing calculations to optimize range and payload capacity",
          "Integrated structural, propulsion, and payload systems",
        ],
      },
      {
        title: "Engineering Assembly Drawing",
        points: [
          "Created fully detailed drone assembly drawings and layouts",
          "Used numbered callouts and BOM references for component identification",
          "Prepared technical documentation for manufacturing and team review",
        ],
      },
    ],
  },
  "custom-linear-actuators": {
    summary:
      "Custom linear actuator project for BAJA SAE motion simulation, including CAD design, electronics integration, and high-speed firmware validation.",
    points: ["Actuator architecture", "Electronics and controls", "Testing and performance tuning"],
    mediaFolder: "custom-linear-actuators",
    mediaTypeToggle: true,
    slideMetadata: [
      {
        title: "Senior Design Intersections Poster",
        points: [
          "Senior design project focused on developing custom linear actuators for BAJA SAE driver training",
          "Initial actuator architecture was based on Andrey Zhuravlev's open-source motion platform design",
          "Included actuator calculations, CAD development, hardware integration, and physical testing",
          "Open-source reference: https://github.com/vazhure/vAzhureRacingHub",
        ],
      },
      {
        title: "Actuator Cutaway Render",
        points: [
          "Cut-section render showing the internal actuator structure",
          "Includes a 750W AC servo motor, SFU1610 ballscrew, coupler, bearings, and PETG enclosure",
          "Designed around high-speed linear motion and compact packaging requirements",
        ],
      },
      {
        title: "STM32 Controller Connections",
        points: [
          "Control system built around a 1 master, 4 slave STM32 microcontroller array",
          "Master STM32 handles PC communication while slave boards generate servo pulse outputs",
          "Includes USB serial communication, shared grounding, and limit switch connections",
          "All STM32s were mounted to a custom PCB in the electronics enclosure",
        ],
      },
      {
        title: "Electronics Wiring Enclosure",
        points: [
          "Central enclosure containing servo drive wiring and STM32 control hardware",
          "Integrated a shared ground bus bar across the enclosure panels and servo drives",
          "Added an EMI filter to improve electrical stability and reduce noise",
        ],
      },
      {
        title: "Servo Drive Integration",
        points: [
          "Front view of the completed servo drive and STM32 control array",
          "All four servo drives communicate with the simulator control system simultaneously",
          "Includes an audio amplifier used to drive bass shakers mounted to the rig",
        ],
      },
      {
        title: "Initial Actuator Testing",
        points: [
          "Early actuator testing using the desktop telemetry control application",
          "Motion response was functional but initially limited in speed",
          "Later firmware and software optimizations significantly improved actuator performance",
        ],
      },
      {
        title: "160 lb Load Capacity Testing",
        points: [
          "Physical load testing performed using approximately 160 lbs of weight",
          "Testing validated over 1800 N of total actuator force output",
          "Experimental results exceeded the original target acceleration requirements from the senior design study",
        ],
      },
      {
        title: "400 mm/s Firmware Upgrade",
        points: [
          "Demonstrates all four actuators running on updated high-speed firmware",
          "Activated STM32 hardware timers for faster pulse generation",
          "Increased maximum actuator speed from approximately 150 mm/s to 400 mm/s",
          "Custom firmware fork: https://github.com/lawattar/vAzhureRacingHub/blob/main/MotionPlatform3/1dof/STM32_Code_V3.ino",
        ],
      },
    ],
  },
  "baja-sae-motion-sim": {
    summary:
      "Full-scale BAJA SAE motion simulator built from a retired competition frame, custom actuators, STM32 controls, and real-time telemetry integration.",
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
    slideMetadata: [
      {
        title: "Full Motion Simulator Demo",
        points: [
          "I recieved a grant from the world-renowned Sears think[box] to construct my project",
          "The attached video demonstrates the completed simulator running with live driving inputs",
          "It uses custom linear actuators mounted to the CWRU BAJA SR21 frame",
          "It also integrates STM32-based control hardware with racing telemetry",
          "I built this for training drivers without causing wear on the real car components",
        ],
      },
      {
        title: "Original SR21 Competition Frame",
        points: [
          "Started as a former CWRU Motorsports competition chassis",
          "I used the existing cockpit as the foundation for the simulator",
          "Preserved realistic BAJA seating, steering, and driver positioning",
          "Provided a full-scale platform for driver training",
        ],
      },
      {
        title: "Retired Frame Teardown",
        points: [
          "Removed unused and damaged competition components from the chassis",
          "Evaluated mounting locations for actuators, electronics, and controls",
          "Prepared the frame for transport back to my house",
        ],
      },
      {
        title: "Frame Preparation",
        points: [
          "Removed panels and firewall from the chassis",
          "Pressure washed the frame to remove leftover mud and grease residue",
          "Prepped the chassis with primer for repainting",
        ],
      },
      {
        title: "Simulator Floor and Steering Base",
        points: [
          "Installed a custom plywood floorboard with metal on top",
          "Added a plywood base for the steering wheel and electronics",
          "Began adapting the cockpit for simulator controls",
          "Established the layout for pedals, steering, and display hardware",
        ],
      },
      {
        title: "Version 1 - Static Simulator",
        points: [
          "Built the first usable driving setup inside the BAJA frame",
          "Used a single repurposed TV for the display",
          "Validated seating position and ergonomics",
          "This version served as the baseline before adding motion and upgraded displays",
        ],
      },
      {
        title: "Version 2 - Triple Monitor Upgrade",
        points: [
          "Upgraded from a single display to a triple-monitor layout",
          "Improved field of view for greater immersiveness",
          "Created a more realistic visual environment before motion integration",
        ],
      },
      {
        title: "think[box] Project Showcase",
        points: [
          "Presented the completed full-motion simulator at think[box]",
          "Demonstrated the system to students, staff, and visitors",
          "Showcased custom actuators, controls, and simulator integration",
          "The Case Alumni Association Director of Communications even gave it a test! 😃",
        ],
      },
      {
        title: "Actuator Motion Test",
        points: [
          "Shows actuator response during initial motion testing",
          "Validates platform movement before final tuning of the PID controller",
          "Tests the mechanical mounting and travel limits",
          "Helped identify improvements for speed, stiffness, and reliability",
        ],
      },
    ],
  },
  "custom-v-twin-motorcycle-engine": {
    summary: "Main engine project with multiple subsystem tracks.",
    points: ["Subsystem planning", "CAD and packaging", "Manufacturing feasibility"],
    mediaFolder: "custom-v-twin-motorcycle-engine",
    slideMetadata: [
      {
        title: "Front Engine Render",
        points: [
          "1800cc V-twin motorcycle engine designed for EMAE 360 Design and Manufacturing II (senior capstone course)",
          "Worked as CAD and FEA lead within a 10-person engineering team",
          "Designed around a longitudinal camshaft architecture inspired by the Drysdale Godzilla V-twin",
          "Focused on manufacturability, durability, and real-world consumer demands",
        ],
      },
      {
        title: "Rear Engine Render",
        points: [
          "Rear view showcasing exhaust routing, intake packaging, and cylinder layout",
          "Integrated water cooling passages and lubrication routing in the crankcase",
          "Engine designed to meet CARB emissions requirements while maintaining cruiser-style performance",
        ],
      },
      {
        title: "Valve and Cranktrain Motion",
        points: [
          "Animated render of the cranktrain, valvetrain, and longitudinal camshaft system",
          "Helical camshaft configuration chosen to challenge conventional V-twin packaging approaches",
          "Inspired by the Drysdale Godzilla V-twin engine",
          "Reference: https://thekneeslider.com/drysdale-godzilla-v-twin/",
        ],
      },
      {
        title: "Cooling and Lubrication Paths",
        points: [
          "Visualization of internal coolant and oil routing throughout the engine",
          "Cylinder walls use water cooling passages for thermal management",
          "Mechanical oil pump supplies lubrication to the crankshaft journal bearings and rotating assemblies",
        ],
      },
      {
        title: "Transient Cranktrain FEA",
        points: [
          "Transient ANSYS simulation used to validate cranktrain loading across the engine cycle",
          "Compared transient FEA forces against original MATLAB dynamic force calculations",
          "Despite student-version node/mesh limitations, results closely matched the hand-calculated loading values",
          "Used to verify crankshaft, piston, and connecting rod design loads before final FEA analysis",
        ],
      },
      {
        title: "Cylinder Pressure and Force Generation",
        points: [
          "Calculated cylinder pressure and cranktrain loading for every degree of crank rotation",
          "Generated transient loading tables and pressure curves through extensive Excel and MATLAB analysis",
          "Used these values as inputs for the transient FEA simulations throughout the project",
          "Additional derivations and calculations are documented in the downloadable report",
        ],
      },
      {
        title: "Connecting Rod Design and FEA",
        points: [
          "Designed custom connecting rod geometry and validated it through ANSYS structural analysis",
          "Targeted a minimum factor of safety of 3.0 to satisfy class design requirements",
          "Optimized geometry to reduce weight while maintaining durability under peak combustion loads",
          "Manufacturing and material selection details are documented in the final report",
        ],
      },
      {
        title: "Camshaft Contact Pressure FEA",
        points: [
          "Contact pressure analysis used to evaluate cam lobe durability and wear characteristics",
          "Spring forces were derived through valvetrain dynamics and valve spring calculations",
          "Results helped determine whether cast iron camshaft lobes would provide sufficient durability versus forged alternatives",
        ],
      },
      {
        title: "Valve Contact Pressure FEA",
        points: [
          "Contact pressure simulation performed on the intake valve and valve seat interface",
          "Validated that the selected valve geometry could safely withstand the required spring forces",
          "Used to confirm durability and fatigue performance of the valvetrain assembly",
        ],
      },
    ],
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
    slideMetadata: [
      {
        title: "CWRU Motorsports Addressable LED Sign Demo",
        points: [
          "I created a custom CWRU Baja LED sign using individually addressable WS2815 LEDs and ESP32 wireless control",
          "I designed the LED sign using Siemens NX and 3D printed all parts on my Bambu Lab P1S",
          "I performed testing to optimize 3D printed diffuser thickness and minimize LED hotspot visibility (less visible in real life compared to camera)",
          "I integrated WLED firmware for mobile control over colors, animations, and lighting effects",
        ],
      },
      {
        title: "Electronics Enclosure Assembly",
        points: [
          "The electronics enclosure houses an ESP32, toggle switch, and 12V DC power input",
          "I also added a 12V to 5V buck converter to power the ESP32 from the primary supply",
        ],
      },
    ],
  },
  "geometric-led-wall-panels": {
    summary: "Geometric LED wall panel concept, build process, and electronics integration.",
    points: ["Modular panel architecture", "Power distribution and wiring", "Fabrication and assembly workflow"],
    mediaFolder: "geometric-led-wall-panels",
    slideMetadata: [
      {
        title: "Geometric LED Wall Panels",
        points: [
          "I designed and built modular wall panels inspired by Nanoleaf lighting systems using WS2815 addressable LEDs",
          "I created the CAD models in SolidWorks and prepared them for 3D printing using Cura",
          "I manufactured the housings on my Creality CR-10 (my first 3D printer) and integrated an ESP32 running WLED for wireless control",
        ],
      },
      {
        title: "Power and Controls System",
        points: [
          "I repurposed an Xbox 360 power supply which conveniently provided both 12V and 5V rails",
          "The built-in voltage rails eliminated the need for an additional buck converter",
          "I connected the system to a smart plug for remote power control",
        ],
      },
    ],
  },
  "greek-lithophane-lamps": {
    summary: "Parametric design and print outcomes for lithophane lamps.",
    points: ["Material diffusion behavior", "Geometry tuning", "Final print setup"],
    mediaFolder: "greek-lithophane-lamps",
    slideMetadata: [
      {
        title: "Poseidon Lithophane Lamp",
        points: [
          "I generated artwork and converted it into a spherical lithophane using open-source software",
          "I designed the lamp around the Bambu Lab MH001 LED Lamp Kit and optimized print settings for improved image clarity and light transmission",
          "The final design was published publicly on MakerWorld and calibrated for support efficiency, seam placement, and print quality",
        ],
      },
      {
        title: "Poseidon Lamp Print Process",
        points: [
          "The lithophane image gradually becomes visible during printing as printer lighting passes through the changing wall thicknesses",
        ],
      },
      {
        title: "Dionysus Lithophane Design",
        points: [
          "I created a second mythology-inspired lithophane lamp featuring Dionysus using the same spherical lithophane workflow",
        ],
      },
      {
        title: "Dionysus Lamp Animation",
        points: ["Animated gif of the completed Dionysus lithophane with the led attached"],
      },
      {
        title: "Scene Detail Closeup",
        points: [
          "Close-up view showcasing the detail created through the varying wall thickness across the scene",
        ],
      },
      {
        title: "Dionysus Print Progress",
        points: [
          "Print progress view showing image formation as light passes through the lithophane",
        ],
      },
    ],
    downloadAction: {
      label: "View Files",
      href: "https://makerworld.com/en/@lawattar",
      external: true,
    },
  },
  "helical-antenna-design": {
    summary: "Helical antenna design work and prototype development.",
    points: ["Geometry exploration", "RF-focused design", "Prototype iteration"],
    mediaFolder: "helical-antenna-design",
    slideMetadata: [
      {
        title: "Final Helical Antenna Design",
        points: [
          "This is my final helical antenna design optimized for highly directional 5 GHz WiFi operation through winding diameter and spacing optimization",
          "I added a reflector to redirect radiation toward the front of the antenna and improve directional performance",
          "The design features an F-Type cable connection similar to those found on WiFi routers",
          "To create the windings, I first wrapped the wire around a mandrel to shape it and then fed it through retaining holes",
          "I 3D printed the antenna body on my Creality CR10",
        ],
      },
      {
        title: "Initial Antenna Prototype",
        points: [
          "This was my initial helical antenna design before optimization",
          "Performance was limited due to incorrect winding spacing and diameter calculations",
          "The original design also used heavy solid copper wire, which added excessive weight and bent the rear F-Type connection",
        ],
      },
      {
        title: "Rear Connector",
        points: [
          "Rear view showcasing the antenna wire passing through the reflector to the F-Type connector",
        ],
      },
    ],
  },
  "threejs-global-temperature-ui": {
    summary: "Global temperature data UI built with Three.js for interactive climate exploration.",
    points: ["3D globe rendering", "Temperature data mapping", "Interactive camera and UI controls"],
    mediaFolder: "threejs-global-temperature-ui",
    customSlidesPlacement: "prepend",
    slideMetadata: [
      {
        title: "Three.js Global Temperature UI",
        points: [
          "I designed this using HTML, CSS, and JavaScript for a web design technical elective course",
          "The interface uses an API to fetch weather data for a user-input location and display it on an interactive open source Three.js globe",
          "I added custom controls for the Three.js rendering, allowing users to adjust Earth color maps and elevation map visualization",
          "Try it out by clicking on the interactive embedded demo above!",
        ],
      },
    ],
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
    slideMetadata: [
      {
        title: "STM32 Linear Actuator Firmware Development",
        points: [
          "I added several hundred lines of C++ code to an open-source motion platform firmware design, enabling STM32 hardware timers and allowing my BAJA motion simulator actuators to run at full speed",
          "I also coded an adjustable PID controller, allowing for fine control of the motion response",
          "Custom firmware fork: https://github.com/lawattar/vAzhureRacingHub/blob/main/MotionPlatform3/1dof/STM32_Code_V3.ino",
          "Initial actuator architecture was based on Andrey Zhuravlev's open-source motion platform design: https://github.com/vazhure/vAzhureRacingHub",
          "I increased maximum actuator speed from approximately 150 mm/s to 400 mm/s",
        ],
      },
      {
        title: "Servo Controller Electronics Enclosure",
        points: [
          "Custom electronics enclosure housing four 750W servo controllers, STM32 controller array, EMI filter, grounding bus bar, and bass shaker amplifier",
          "The STM32 array was mounted centrally and generated pulse and direction commands for each servo controller",
          "I designed some custom 3D printed mounts for the various components, and I also installed fans and a temperature sensor to keep everything cool",
        ],
      },
      {
        title: "System Wiring and EMI Management",
        points: [
          "This image showcases the true extent of the wiring required for the system",
          "I grounded all servo controllers and enclosure panels using a shared grounding point with a dedicated bus bar",
          "An EMI filter was also added to minimize electrical noise and improve overall system reliability",
        ],
      },
    ],
  },
  "pygame-pacman": {
    summary: "Pacman clone in pygame covering classic game mechanics and system architecture.",
    points: ["Entity movement and collision", "Game states and scoring", "Input handling and polish"],
    mediaFolder: "pygame-pacman",
    slideMetadata: [
      {
        title: "Python Pacman Recreation",
        points: [
          "I recreated Pacman in Python during high school as an early programming project",
          "I developed the game using PyGame while learning object-oriented programming and game development concepts",
          "The project helped build foundational programming experience that later expanded into larger software and embedded systems projects",
        ],
      },
    ],
  },
  "lincoln-electric": {
    summary: "Experience highlights and technical learnings.",
    points: ["Industrial workflows", "Process quality exposure", "Engineering communication"],
    mediaFolder: "lincoln-electric",
    slideMetadata: [
      {
        title: "Lincoln Electric Tool Design and Plant Engineering Internship",
        points: [
          "I completed 200+ CAD parts across 15 projects ranging from coolant pump fixtures to electronics machine enclosures",
          "I collaborated with the tool room and gained hands-on exposure to CMM, Wire EDM, plasma cutting, lathes, and milling processes",
          "I supported manufacturing and plant engineering projects at Lincoln Electric's Euclid, Ohio facility",
        ],
      },
    ],
  },
  scribeamerica: {
    summary: "Medical documentation role and operational workflow.",
    points: ["Accuracy under time pressure", "Structured note workflows", "Interdisciplinary communication"],
    mediaFolder: "scribeamerica",
    slideMetadata: [
      {
        title: "MetroHealth Emergency Department Medical Scribe",
        points: [
          "I completed 20–30 medical charts per shift while supporting emergency room physicians",
          "I recorded chart information and lab interpretations using Epic medical software",
          "I worked under HIPAA standards and patient privacy requirements in a fast-paced emergency department environment",
        ],
      },
    ],
  },
  "life-guard": {
    summary: "Lifeguarding responsibilities and key scenarios.",
    points: ["Emergency response readiness", "Safety rule enforcement", "Public communication"],
    mediaFolder: "life-guard",
    slideMetadata: [
      {
        title: "Civic Center Lifeguard",
        points: [
          "I monitored pool areas and helped maintain a safe environment for up to 100 patrons at a time",
          "I assisted with deck operations, rule enforcement, and medical response situations",
          "I earned Red Cross CPR certification and supported daily aquatic facility operations",
        ],
      },
    ],
  },
  "life-guard-supervisor": {
    summary: "Supervisory role details and team operations.",
    points: ["Shift leadership", "Incident escalation handling", "Training support"],
    mediaFolder: "life-guard-supervisor",
    slideMetadata: [
      {
        title: "Civic Center Supervisor",
        points: [
          "I supervised a staff of 40+ lifeguards while coordinating rotations and daily operations",
          "I monitored water chemistry parameters including pH, temperature, and alkalinity",
          "I managed patron concerns and helped maintain a safe and organized recreational environment",
        ],
      },
    ],
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
    slideMetadata: [
      {
        title: "Community Food Pantry Support",
        points: [
          "I volunteered through CWRU's Center for Civic Engagement & Learning",
          "I supported community service initiatives, including helping stock the CWRU food pantry",
          "I combined my interests in fitness/health and service by contributing to initiatives focused on increasing food accessibility",
        ],
      },
    ],
  },
  "computer-building": {
    summary:
      "Personal computer build projects covering high-performance workstations, themed RGB systems, and low-budget first builds.",
    points: ["System planning", "Hardware integration", "Performance-focused assembly"],
    mediaFolder: "computer-building",
    slideMetadata: [
      {
        title: "High-End College Workstation Build",
        points: [
          "Built for a friend during college as a high-performance gaming and workstation PC",
          "Features an Intel Core i9 processor and an ASUS RTX 4080 GPU",
          "Integrated a 360mm AIO cooler and multiple Lian Li infinity mirror fans",
        ],
      },
      {
        title: "White-Themed RGB Build",
        points: [
          "Custom white-themed PC I built for a friend during high school",
          "Features an Intel Core i7 processor and Gigabyte RTX 3070 Ti graphics card",
          "Integrated synchronized controllable RGB lighting throughout the entire system",
        ],
      },
      {
        title: "Humble Beginnings - My First Budget PC Build",
        points: [
          "Built in 10th grade on an approximately $250 total budget",
          "Used an Intel Xeon X5675 with an X58/LGA1366 motherboard sourced from AliExpress",
          "Originally assembled inside a cardboard box due to having a limited budget",
        ],
      },
    ],
  },
  "arabic-art-and-calligraphies": {
    summary:
      "Collection of Arabic calligraphy projects combining CAD modeling, typography, and multicolor additive manufacturing.",
    points: ["Composition studies", "Line style and form", "Final compositions"],
    mediaFolder: "arabic-art-and-calligraphies",
    slideMetadata: [
      {
        title: "MSA Graduation Calligraphy",
        points: [
          "Created for a graduating MSA executive board member",
          "Designed in Siemens NX and produced on a Bambu Lab P1S",
          "Combined layered typography with decorative border detailing",
          "Established workflow for future multicolor calligraphy projects",
        ],
      },
      {
        title: "Custom Drawn Calligraphy #2",
        points: [
          "Drew and refined the Arabic lettering manually instead of using an existing design",
          "Modeled and prepared geometry in Siemens NX",
          "Manufactured using FDM printing",
        ],
      },
      {
        title: "Calligraphy #3",
        points: [
          "Created for a fellow community member",
          "Modeled and prepared geometry in Siemens NX",
          "Manufactured using FDM printing",
        ],
      },
      {
        title: "Custom Graduation Plaques",
        points: [
          "Designed plaque graphics in Canva before importing into NX",
          "Manufactured in multicolor using a Bambu Lab P1S",
          "Produced multiple personalized nameplate variations",
          "Optimized workflow for repeatable small-batch production",
        ],
      },
      {
        title: "Plaque Detail Closeup",
        points: [
          "Showcases the layered text and multicolor print",
          "Tuned print settings for improved edge quality and readability",
          "Demonstrates consistency across batch production",
        ],
      },
      {
        title: "Competition Bookmark Set",
        points: [
          "Designed custom event graphics and Arabic calligraphy in NX",
          "Produced using multicolor FDM",
          "Manufactured multiple copies for community distribution",
        ],
      },
      {
        title: "Arabic Name Keychains",
        points: [
          "Created custom Arabic name keychains for individual requests",
          "Manufactured using AMS multicolor printing on my P1S",
          "Refined text legibility for small-format details",
          "Produced repeatable personalized designs with minimal post-processing",
        ],
      },
    ],
  },
  rugby: {
    summary: "Rugby highlights across training, matches, and team development.",
    points: ["CWRU rugby timeline", "Training and match clips", "Role and growth"],
    mediaFolder: "rugby",
    slideMetadata: [
      {
        title: "Match Highlight vs John Carroll",
        points: ["360 jersey tackle during a match against John Carroll University"],
      },
      {
        title: "2024–2025 Team Season",
        points: [
          "Team photo from the 2024–2025 CWRU Rugby season",
        ],
      },
      {
        title: "In-Game Defensive Play",
        points: [
          "Defensive tackle during my first season on the team",
        ],
      },
    ],
  },
  powerlifting: {
    summary: "Powerlifting progression across training blocks, meets, and performance milestones.",
    points: ["Strength cycles", "Meet prep and execution", "Performance highlights"],
    mediaFolder: "powerlifting",
    slideMetadata: [
      {
        title: "315 lb Paused Bench Press",
        points: ["315 lb paused bench press at 198 lb bodyweight"],
      },
    ],
  },
  lifting: {
    summary: "Lifting training progression, events, and competition prep.",
    points: ["Training blocks", "Event preparation", "Performance milestones"],
    mediaFolder: "lifting",
    slideMetadata: [
      {
        title: "315 lb Bench Press",
        points: ["315 lb paused bench press at 198 lb bodyweight"],
      },
    ],
  },
  "cwru-lifts": {
    summary: "CWRU lifts events, media, and flyer design work.",
    points: ["Event photos", "Competition videos", "Flyer and promo design"],
    mediaFolder: "cwru-lifts",
    slideMetadata: [
      {
        title: "CWRU Lift Branding and Club Identity",
        points: [
          "I helped build and grow CWRU Lift, a student powerlifting organization at Case Western Reserve University",
          "I created club graphics, branding assets, and promotional materials for events and social media",
          "We focused on building an inclusive lifting community centered around strength training, competition preparation, and fitness education",
        ],
      },
      {
        title: "Club Event Promotion and Graphic Design",
        points: [
          "These are some promotional graphics I designed for club competitions, mock meets, and social events",
          "I created marketing material including Lift or Treat, collegiate mock competitions, and Arnold Sports Festival recruiting campaigns",
        ],
      },
      {
        title: "Club Community and Growth",
        points: [
          "During my time on exec, we organized club activities and supported student participation in powerlifting and strength sports",
          "We built a welcoming environment for 200+ lifters ranging from beginners to experienced competitors",
          "Some of our members have even gone on to compete at the national level!"
        ],
      },
      {
        title: "Competition Highlight Reel",
        points: [
          "This is a highlight reel I edited that showcases one of CWRU Lift's full mock powerlifting competitions",
          "As social chair, I captured the meet atmosphere, athlete performances, and community engagement throughout the event",
          "I produced instagram social media content to promote the organization and document club activities",
        ],
      },
    ],
  },
  msa: {
    summary: "MSA leadership activities, events, and community coordination.",
    points: ["Event planning", "Team coordination", "Community engagement"],
    mediaFolder: "msa",
    slideMetadata: [
      {
        title: "Muslim Student Association",
        points: [
          "I served as Social Chair for CWRU MSA and helped plan events for a community of 400+ members",
          "I collaborated with nearby universities on fundraisers, social events, and community initiatives",
          "I helped strengthen student connections through programming focused on community, faith, and campus engagement",
        ],
      },
      {
        title: "MSA Soccer Event",
        points: [
          "I helped organize recreational events such as soccer games to strengthen community engagement outside of campus programming",
        ],
      },
      {
        title: "Halaqah and Religious Discussion",
        points: [
          "Regular halaqah gatherings provided opportunities for religious discussion, reflection, and community learning",
        ],
      },
    ],
  },
  "case-surgical-society": {
    summary:
      "Case Surgical Society involvement focused on surgical case learning, practical skill-building, and cadaver-based anatomy exposure.",
    points: ["Case review", "Suture practice", "Cadaver dissection sessions"],
    mediaFolder: "case-surgical-society",
    slideMetadata: [
      {
        title: "Surgical Skills and Case Review",
        points: [
          "Attended weekly surgical case discussions and procedure reviews",
          "Practiced suturing and knot-tying techniques on silicone training pads",
          "Participated in human cadaver dissection sessions with the CWRU medical school",
        ],
      },
    ],
  },
};

const modalState = {
  projectKey: null,
  slides: [],
  index: 0,
  slideGroups: null,
  activeGroupKey: null,
  defaultSummary: "",
  defaultPoints: [],
  downloadAction: null,
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
// Particle background controls. Falls back to blue CSS gradient if this fails.
const PARTICLE_BACKGROUND_CONFIG = {
  enabled: true,
  containerId: "particles-js",
  settingsPath: "/Files/Background/settings json.txt",
};
// Page background mode.
// `useGradient: false` => plain black (default)
// `useGradient: true`  => original blue gradient
const PAGE_BACKGROUND_CONFIG = {
  useGradient: false,
};
// Shooting star controls:
// - `enabled`: master toggle
// - `density`: higher = more frequent streaks
// - `quantityMin` / `quantityMax`: stars per burst
// - `opacityMin` / `opacityMax`: head brightness range
// - `color`: base streak color
// - `angleDeg` (+ jitter): streak direction
const SHOOTING_STARS_CONFIG = {
  enabled: false,
  density: 1,
  quantityMin: 1,
  quantityMax: 2,
  minSpawnDelayMs: 4200,
  maxSpawnDelayMs: 9800,
  maxConcurrent: 3,
  color: "#dcecff",
  opacityMin: 0.5,
  opacityMax: 0.95,
  trailMidOpacityFactor: 0.42,
  trailMidStopPercent: 58,
  trailLengthMinPx: 140,
  trailLengthMaxPx: 290,
  thicknessMinPx: 1.2,
  thicknessMaxPx: 2.8,
  glowBlurMinPx: 5,
  glowBlurMaxPx: 12,
  angleDeg: 40,
  angleJitterDeg: 10,
  minDurationMs: 900,
  maxDurationMs: 1700,
  minTravelPx: 260,
  maxTravelPx: 560,
  startXMinPercent: 56,
  startXMaxPercent: 110,
  startYMinPercent: -4,
  startYMaxPercent: 42,
  respectReducedMotion: true,
};

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
const shootingStarsState = {
  layer: null,
  timerId: null,
  activeCount: 0,
};

const createProjectCard = (project) => {
  const card = document.createElement("article");
  card.className = "project-card reveal";
  card.dataset.projectKey = project.key;
  card.dataset.hasDetail = "true";

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

const applyPageBackgroundMode = () => {
  document.body.classList.toggle("use-gradient-background", PAGE_BACKGROUND_CONFIG.useGradient === true);
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const getRandomRange = (min, max) => Math.random() * (max - min) + min;
const getRandomIntInclusive = (min, max) => Math.floor(getRandomRange(min, max + 1));

const parseCssColorToRgb = (() => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  return (color) => {
    const fallback = { r: 220, g: 236, b: 255 };
    if (!context) return fallback;

    context.fillStyle = "#ffffff";
    context.fillStyle = color;
    const normalized = String(context.fillStyle || "").trim();

    const hexMatch = normalized.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hexMatch) {
      const hex = hexMatch[1];
      if (hex.length === 3) {
        return {
          r: Number.parseInt(`${hex[0]}${hex[0]}`, 16),
          g: Number.parseInt(`${hex[1]}${hex[1]}`, 16),
          b: Number.parseInt(`${hex[2]}${hex[2]}`, 16),
        };
      }
      return {
        r: Number.parseInt(hex.slice(0, 2), 16),
        g: Number.parseInt(hex.slice(2, 4), 16),
        b: Number.parseInt(hex.slice(4, 6), 16),
      };
    }

    const rgbMatch = normalized.match(/rgba?\(([^)]+)\)/i);
    if (rgbMatch) {
      const channels = rgbMatch[1]
        .split(",")
        .slice(0, 3)
        .map((token) => Number.parseFloat(token.trim()));
      if (channels.length === 3 && channels.every((value) => Number.isFinite(value))) {
        return {
          r: clamp(Math.round(channels[0]), 0, 255),
          g: clamp(Math.round(channels[1]), 0, 255),
          b: clamp(Math.round(channels[2]), 0, 255),
        };
      }
    }

    return fallback;
  };
})();

const clearShootingStarsTimer = () => {
  if (shootingStarsState.timerId !== null) {
    window.clearTimeout(shootingStarsState.timerId);
    shootingStarsState.timerId = null;
  }
};

const getShootingStarsSpawnDelay = () => {
  const density = Math.max(0.05, SHOOTING_STARS_CONFIG.density);
  const minDelay = Math.max(120, SHOOTING_STARS_CONFIG.minSpawnDelayMs / density);
  const maxDelay = Math.max(minDelay, SHOOTING_STARS_CONFIG.maxSpawnDelayMs / density);
  return getRandomRange(minDelay, maxDelay);
};

const spawnOneShootingStar = () => {
  const layer = shootingStarsState.layer;
  if (!layer) return;
  if (shootingStarsState.activeCount >= SHOOTING_STARS_CONFIG.maxConcurrent) return;

  const star = document.createElement("span");
  star.className = "shooting-star";

  const angle =
    SHOOTING_STARS_CONFIG.angleDeg +
    getRandomRange(-SHOOTING_STARS_CONFIG.angleJitterDeg, SHOOTING_STARS_CONFIG.angleJitterDeg);
  const angleRad = (angle * Math.PI) / 180;
  const travel = getRandomRange(SHOOTING_STARS_CONFIG.minTravelPx, SHOOTING_STARS_CONFIG.maxTravelPx);
  const dx = Math.cos(angleRad) * travel;
  const dy = Math.sin(angleRad) * travel;

  const startX =
    (getRandomRange(SHOOTING_STARS_CONFIG.startXMinPercent, SHOOTING_STARS_CONFIG.startXMaxPercent) / 100) *
    window.innerWidth;
  const startY =
    (getRandomRange(SHOOTING_STARS_CONFIG.startYMinPercent, SHOOTING_STARS_CONFIG.startYMaxPercent) / 100) *
    window.innerHeight;

  const duration = getRandomRange(SHOOTING_STARS_CONFIG.minDurationMs, SHOOTING_STARS_CONFIG.maxDurationMs);
  const tailLength = getRandomRange(SHOOTING_STARS_CONFIG.trailLengthMinPx, SHOOTING_STARS_CONFIG.trailLengthMaxPx);
  const thickness = getRandomRange(SHOOTING_STARS_CONFIG.thicknessMinPx, SHOOTING_STARS_CONFIG.thicknessMaxPx);
  const blur = getRandomRange(SHOOTING_STARS_CONFIG.glowBlurMinPx, SHOOTING_STARS_CONFIG.glowBlurMaxPx);
  const opacity = clamp(
    getRandomRange(SHOOTING_STARS_CONFIG.opacityMin, SHOOTING_STARS_CONFIG.opacityMax),
    0,
    1,
  );
  const rgb = parseCssColorToRgb(SHOOTING_STARS_CONFIG.color);
  const midOpacity = clamp(opacity * SHOOTING_STARS_CONFIG.trailMidOpacityFactor, 0, 1);
  const midStop = clamp(SHOOTING_STARS_CONFIG.trailMidStopPercent, 8, 95);

  star.style.setProperty("--shoot-start-x", `${startX}px`);
  star.style.setProperty("--shoot-start-y", `${startY}px`);
  star.style.setProperty("--shoot-dx", `${dx}px`);
  star.style.setProperty("--shoot-dy", `${dy}px`);
  star.style.setProperty("--shoot-angle", `${angle}deg`);
  star.style.setProperty("--shoot-duration", `${duration}ms`);
  star.style.setProperty("--shoot-tail-length", `${tailLength}px`);
  star.style.setProperty("--shoot-thickness", `${thickness}px`);
  star.style.setProperty("--shoot-blur", `${blur}px`);
  star.style.setProperty("--shoot-opacity", opacity.toFixed(3));
  star.style.background = `linear-gradient(90deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity.toFixed(
    3,
  )}) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${midOpacity.toFixed(3)}) ${midStop}%, rgba(${rgb.r}, ${
    rgb.g
  }, ${rgb.b}, 0) 100%)`;

  shootingStarsState.activeCount += 1;
  star.addEventListener(
    "animationend",
    () => {
      shootingStarsState.activeCount = Math.max(0, shootingStarsState.activeCount - 1);
      star.remove();
    },
    { once: true },
  );

  layer.appendChild(star);
};

const spawnShootingStarBurst = () => {
  if (document.visibilityState !== "visible") return;
  const quantity = clamp(
    getRandomIntInclusive(SHOOTING_STARS_CONFIG.quantityMin, SHOOTING_STARS_CONFIG.quantityMax),
    1,
    12,
  );
  for (let index = 0; index < quantity; index += 1) {
    if (shootingStarsState.activeCount >= SHOOTING_STARS_CONFIG.maxConcurrent) break;
    spawnOneShootingStar();
  }
};

const scheduleNextShootingStarsBurst = () => {
  clearShootingStarsTimer();
  if (!SHOOTING_STARS_CONFIG.enabled || !shootingStarsState.layer) return;
  shootingStarsState.timerId = window.setTimeout(() => {
    spawnShootingStarBurst();
    scheduleNextShootingStarsBurst();
  }, getShootingStarsSpawnDelay());
};

const initShootingStars = () => {
  clearShootingStarsTimer();
  shootingStarsState.activeCount = 0;

  if (shootingStarsState.layer) {
    shootingStarsState.layer.remove();
    shootingStarsState.layer = null;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!SHOOTING_STARS_CONFIG.enabled) return;
  if (SHOOTING_STARS_CONFIG.respectReducedMotion && prefersReducedMotion) return;

  const layer = document.createElement("div");
  layer.className = "shooting-stars-layer";
  document.body.appendChild(layer);
  shootingStarsState.layer = layer;

  scheduleNextShootingStarsBurst();
};

const initParticleBackground = async () => {
  if (!PARTICLE_BACKGROUND_CONFIG.enabled) return;

  const container = document.getElementById(PARTICLE_BACKGROUND_CONFIG.containerId);
  if (!container) return;

  if (typeof window.particlesJS !== "function") {
    container.style.display = "none";
    return;
  }

  try {
    const settingsUrl = encodeURI(toPublicAssetUrl(PARTICLE_BACKGROUND_CONFIG.settingsPath));
    const response = await fetch(settingsUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`settings fetch failed (${response.status})`);

    const settingsText = await response.text();
    const settings = JSON.parse(settingsText);
    window.particlesJS(PARTICLE_BACKGROUND_CONFIG.containerId, settings);
    container.style.display = "";
  } catch (error) {
    console.warn("Particle background init failed. Using CSS gradient fallback.", error);
    container.style.display = "none";
  }
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

  const slideMetadata = Array.isArray(detail.slideMetadata) ? detail.slideMetadata : [];
  if (slideMetadata.length > 0) {
    slides = slides.map((slide, index) => {
      const metadata = slideMetadata[index];
      if (!metadata) return slide;
      return {
        ...slide,
        caption: metadata.title ?? slide.caption,
        points: Array.isArray(metadata.points) ? metadata.points : slide.points,
        actions: Array.isArray(metadata.actions) ? metadata.actions : slide.actions,
      };
    });
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

const createModalActionButton = (action) => {
  const button = document.createElement("button");
  button.className = "media-modal-download";
  button.type = "button";
  button.textContent = action.label;
  button.addEventListener("click", async () => {
    if (action.external === true || /^[a-z][a-z\d+\-.]*:\/\//i.test(action.href)) {
      window.open(action.href, "_blank", "noopener,noreferrer");
      return;
    }

    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = "Preparing download...";
    const ok = await downloadWithFallbacks(action.href, action.filename ?? "download.pdf");
    button.disabled = false;
    button.textContent = originalText;
    if (!ok) {
      console.error("Failed to download file from all candidate URLs.");
      window.alert("Could not download the file. Refresh and try again.");
    }
  });
  return button;
};

const renderModalExtraActions = (slide) => {
  if (!modalExtraActions) return;
  modalExtraActions.innerHTML = "";

  const actions = [];
  if (modalState.downloadAction?.href && modalState.downloadAction?.label) {
    actions.push(modalState.downloadAction);
  }
  if (slide && Array.isArray(slide.actions)) {
    slide.actions.forEach((action) => {
      if (action?.href && action?.label) actions.push(action);
    });
  }

  if (actions.length === 0) {
    modalExtraActions.style.display = "none";
    return;
  }

  actions.forEach((action) => {
    modalExtraActions.appendChild(createModalActionButton(action));
  });
  modalExtraActions.style.display = "flex";
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
  modalDescription.textContent = "";
  renderModalPoints(Array.isArray(slide.points) ? slide.points : modalState.defaultPoints);
  renderModalExtraActions(slide);
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
  modalDescription.textContent = "";
  modalCaption.textContent = "";
  modalCounter.textContent = "";
  modalStage.innerHTML = `<div class="media-modal-loading">Loading...</div>`;
  modalPoints.innerHTML = "";
  modalPoints.style.display = "none";
  modalState.slideGroups = null;
  modalState.activeGroupKey = null;
  modalState.downloadAction = null;
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
  modalState.defaultSummary = content.summary;
  modalState.defaultPoints = Array.isArray(content.points) ? content.points : [];
  modalState.downloadAction = content.downloadAction ?? null;
  modalState.slides = content.slides;
  modalState.index = 0;

  modalTitle.textContent = content.title;
  modalDescription.textContent = "";
  renderModalPoints(content.points);
  if (modalExtraActions) {
    modalExtraActions.innerHTML = "";
    modalExtraActions.style.display = "none";
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
  modalState.defaultSummary = "";
  modalState.defaultPoints = [];
  modalState.downloadAction = null;
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
applyPageBackgroundMode();
initParticleBackground();
initShootingStars();

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
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    scheduleNextShootingStarsBurst();
  } else {
    clearShootingStarsTimer();
  }
});
window.setTimeout(updateScrollHintVisibility, 0);
