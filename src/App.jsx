import { useState, useEffect } from "react";
import { useSessionData } from "./hooks/useSessionData";
import Landing from "./components/Landing";
import Consent from "./components/Consent";
import Demographics from "./components/Demographics";
import Calibration from "./components/Calibration";
import TopicA from "./components/TopicA";
import QuizA from "./components/QuizA";
import Washout from "./components/Washout";
import TopicB from "./components/TopicB";
import QuizB from "./components/QuizB";
import Exit from "./components/Exit";

const STEP_ORDER = [
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

function getNextStep(current) {
  const idx = STEP_ORDER.indexOf(current);
  if (idx === -1 || idx === STEP_ORDER.length - 1) return "EXIT";
  return STEP_ORDER[idx + 1];
}

export default function App() {
  const [session, updateSession] = useSessionData();
  const [step, setStep] = useState(session.meta?.currentStep || "LANDING");

  if (new URLSearchParams(window.location.search).get("rescue") === "true") {
    return (
      <div className="p-8 bg-red-50 min-h-screen font-mono">
        <h1 className="text-xl font-bold text-red-600 mb-4">EMERGENCY DATA RESCUE</h1>
        <textarea
          className="w-full h-64 p-4 border rounded"
          value={localStorage.getItem("mcom_session_v1") || "NO DATA"}
          readOnly
        />
      </div>
    );
  }

  useEffect(() => {
    if (!session.conditionAssignment) {
      updateSession((prev) => ({
        ...prev,
        conditionAssignment: Math.random() > 0.5 ? "MATCH_FIRST" : "MISMATCH_FIRST"
      }));
    }
  }, [session.conditionAssignment, updateSession]);

  const next = () => {
    window.scrollTo(0, 0);
    const nextStep = getNextStep(step);
    setStep(nextStep);
    updateSession((prev) => ({
      ...prev,
      meta: { ...prev.meta, currentStep: nextStep }
    }));
  };

  switch (step) {
    case "LANDING":
      return <Landing next={next} />;
    case "CONSENT":
      return <Consent next={next} />;
    case "DEMOGRAPHICS":
      return <Demographics setSessionData={updateSession} next={next} />;
    case "CALIBRATION":
      return <Calibration setSessionData={updateSession} next={next} />;
    case "TOPIC_A":
      return <TopicA sessionData={session} setSessionData={updateSession} next={next} />;
    case "QUIZ_A":
      return <QuizA setSessionData={updateSession} next={next} />;
    case "WASHOUT":
      return <Washout next={next} />;
    case "TOPIC_B":
      return <TopicB sessionData={session} setSessionData={updateSession} next={next} />;
    case "QUIZ_B":
      return <QuizB setSessionData={updateSession} next={next} />;
    case "EXIT":
      return <Exit sessionData={session} />;
    default:
      return null;
  }
}
