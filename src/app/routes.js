export const STEP_ORDER = [
  "LANDING",
  "CONSENT",
  "DEMOGRAPHICS",
  "CALIBRATION",
  "TOPIC_A",
  "QUIZ_A",
  "WASHOUT",
  "TOPIC_B",
  "QUIZ_B",
  "EXIT"
];

export function getNextStep(current) {
  const idx = STEP_ORDER.indexOf(current);
  if (idx === -1 || idx === STEP_ORDER.length - 1) return "EXIT";
  return STEP_ORDER[idx + 1];
}
