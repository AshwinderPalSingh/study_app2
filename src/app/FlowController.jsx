import { useState } from "react";
import { getNextStep } from "./routes";

export default function FlowController({ initialStep = "LANDING", onStepChange, render }) {
  const [step, setStep] = useState(initialStep);

  const next = () => {
    const nextStep = getNextStep(step);
    setStep(nextStep);
    if (onStepChange) onStepChange(nextStep);
  };

  if (typeof render === "function") {
    return render({ step, next });
  }

  return null;
}
