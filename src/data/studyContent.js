// IMPORTANT: Visuals must be bundled imports (no public URLs, no network).
import topicAVisual from "../assets/topicA_geneva_drive.png";
import topicBVisual from "../assets/topicB_archimedes_screw.png";
import calibrationVisual from "../assets/calibration_barcode.svg";

export const studyContent = {
  calibration: {
    title: "Calibration Task",
    text: {
      heading: "Barcodes and Machine Reading",
      body:
        "A barcode is a machine-readable pattern made of dark bars and light spaces. Each pattern encodes a number or identifier that scanners can read quickly.\n\nMost barcodes use varying widths of bars and spaces to represent digits. The scanner measures the sequence of widths and converts it into data.\n\nBarcodes are designed to be redundant so that small smudges or printing errors do not prevent a correct read.",
      bullets: [
        "Barcodes encode numbers using bars and spaces",
        "Scanners read the pattern and convert it to data",
        "Redundant design improves error tolerance"
      ]
    },
    visual: {
      type: "image",
      src: calibrationVisual,
      label: null,
      alt: "Calibration barcode diagram showing varied bar widths and a caption."
    }
  },
  topicA: {
    title: "Topic A",
    text: {
      heading: "The Geneva Drive Mechanism",
      body:
        "The Geneva drive is a mechanical mechanism that converts continuous rotational motion into intermittent rotational motion. It consists of a continuously rotating drive wheel that has a pin mounted near its edge, and a driven wheel that contains several radial slots. The drive wheel also includes a circular blocking disc.\n\nAs the drive wheel rotates, the pin enters one of the slots in the driven wheel and rotates it by a fixed angle. Once the pin leaves the slot, the driven wheel stops rotating. During this period, the blocking disc on the drive wheel fits into the curved surface of the driven wheel, holding it firmly in place.\n\nThis stopping period is known as the dwell phase. During the dwell phase, the driven wheel remains stationary while the drive wheel continues rotating. The blocking disc prevents unwanted motion caused by vibration or inertia, ensuring precise positioning in applications that require controlled step-by-step movement.",
      bullets: [
        "Converts continuous motion into intermittent motion",
        "Includes a drive wheel, driven wheel, pin, and blocking disc",
        "Blocking disc locks the driven wheel during the dwell phase"
      ]
    },
    visual: {
      type: "image",
      src: topicAVisual,
      label: null,
      alt: "Labeled diagram of a Geneva drive showing the drive wheel with pin, driven wheel with slots, blocking disc, and arrows indicating continuous and intermittent motion."
    }
  },
  topicB: {
    title: "Topic B",
    text: {
      heading: "The Archimedes Screw",
      body:
        "The Archimedes screw is a mechanical device used to raise water from a lower level to a higher level. It consists of a helical screw mounted inside a cylindrical pipe. When the screw rotates, water trapped between the blades of the screw is lifted upward along the pipe.\n\nThe efficiency of the Archimedes screw depends strongly on its angle of inclination. If the screw is positioned vertically, water tends to fall back down due to gravity. If the screw is placed nearly horizontal, it cannot lift water effectively. An intermediate tilt angle allows the screw to move the largest volume of water upward.\n\nIn practical designs, the optimal angle for efficient water transfer is typically between 30 and 45 degrees relative to the ground. A perfect seal between the screw and the pipe is not required, because the volume of water carried upward is usually much greater than the amount that leaks backward.",
      bullets: [
        "Uses a rotating helical surface to lift water",
        "Efficiency depends on tilt angle",
        "Does not require a watertight seal"
      ]
    },
    visual: {
      type: "image",
      src: topicBVisual,
      label: null,
      alt: "Diagram of an Archimedes screw showing a tilted screw inside a pipe lifting water upward, with the angle labeled between 30° and 45°."
    }
  },
  quizA: {
    title: "Quiz A",
    questions: [
      {
        id: "qa1",
        stem: "Which component keeps the driven wheel stationary between motion steps?",
        options: ["The pin", "The slot", "The blocking disc", "The drive shaft"],
        correctIndex: 2
      },
      {
        id: "qa2",
        stem: "What type of motion does the Geneva drive produce in the driven wheel?",
        options: ["Continuous rotation", "Intermittent rotation", "Oscillating motion", "Reverse rotation"],
        correctIndex: 1
      }
    ]
  },
  quizB: {
    title: "Quiz B",
    questions: [
      {
        id: "qb1",
        stem: "At which tilt angle does the Archimedes screw move the maximum amount of water?",
        options: ["0–15 degrees", "30–45 degrees", "60–75 degrees", "90 degrees (vertical)"],
        correctIndex: 1
      },
      {
        id: "qb2",
        stem: "Why is a perfect seal between the screw and the pipe not required?",
        options: [
          "Water leakage is small compared to the volume lifted",
          "It increases rotational speed",
          "It prevents corrosion",
          "It allows air circulation"
        ],
        correctIndex: 0
      }
    ]
  }
};
