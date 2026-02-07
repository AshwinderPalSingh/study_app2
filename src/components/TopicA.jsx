import { useRef, useState } from "react";
import { usePaintAnchor } from "../hooks/usePaintAnchor";
import { lockScroll } from "../hooks/useScrollLock";
import { studyContent } from "../data/studyContent";

// MANDATORY: Import your image here to ensure it bundles.
// import topicAVisual from "../assets/topicA.png";

export default function TopicA({ sessionData, setSessionData, next }) {
  const logged = useRef(false);
  const [warning, setWarning] = useState("");
  const MIN_VIEW_MS = 90000;

  const dominantClass = sessionData.meta.determinedDominant || "Undetermined";
  const resolvedDominant =
    dominantClass === "Visual" || dominantClass === "Text" ? dominantClass : "Text";

  const mode =
    sessionData.conditionAssignment === "MATCH_FIRST"
      ? resolvedDominant
      : resolvedDominant === "Visual"
        ? "Text"
        : "Visual";

  const content = studyContent.topicA;

  usePaintAnchor((t) => {
    if (logged.current) return;
    logged.current = true;

    setSessionData((prev) => ({
      ...prev,
      topicA: {
        mode,
        startTime: t,
        dominantClass,
        conditionAssignment: prev.conditionAssignment
      }
    }));

    lockScroll(6000);
  });

  const finish = () => {
    const startTime = sessionData.topicA?.startTime;
    const elapsed = typeof startTime === "number" ? performance.now() - startTime : 0;
    if (elapsed < MIN_VIEW_MS) {
      setWarning(`Please spend at least ${Math.round(MIN_VIEW_MS / 1000)} seconds before continuing.`);
      return;
    }
    const endTime = performance.now();
    setSessionData((prev) => ({
      ...prev,
      topicA: {
        ...prev.topicA,
        endTime
      }
    }));
    next();
  };

  return (
    <div className="min-h-screen flex justify-center p-8 bg-gray-100">
      <div className="max-w-3xl w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Topic A — {mode} Mode</h2>
        <div className="min-h-600 border p-6 mb-6 rounded">
          {mode === "Text" ? (
            <div>
              <h3 className="text-xl font-bold mb-2">{content.text.heading}</h3>
              <p className="text-lg leading-relaxed mb-4">{content.text.body}</p>
              {content.text.bullets?.length ? (
                <ul>
                  {content.text.bullets.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : (
            <div className="flex justify-center h-full">
              {content.visual?.type === "image" && content.visual.src ? (
                <img className="visual-img" src={content.visual.src} alt={content.visual.alt || "Topic A visual"} />
              ) : (
                <div className="text-center text-gray-400">{content.visual?.label || "Visual content"}</div>
              )}
            </div>
          )}
        </div>
        {warning ? <p className="text-sm text-gray-600 mb-4">{warning}</p> : null}
        <button onClick={finish} className="bg-blue-600 text-white px-6 py-2 rounded">
          Continue to Quiz
        </button>
      </div>
    </div>
  );
}
