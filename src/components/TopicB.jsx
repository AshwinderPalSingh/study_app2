import { useRef, useState } from "react";
import { studyContent } from "../data/studyContent";

export default function TopicB({ sessionData, setSessionData, next }) {
  const [mode, setMode] = useState(null);
  const startRef = useRef(null);
  const content = studyContent.topicB;
  const [warning, setWarning] = useState("");
  const MIN_VIEW_MS = 90000;

  const chooseMode = (newMode) => {
    if (!mode) {
      const startTime = performance.now();
      startRef.current = startTime;
      setMode(newMode);
      setSessionData((prev) => ({
        ...prev,
        topicB: {
          ...prev.topicB,
          choice: newMode,
          firstChoice: prev.topicB?.firstChoice || newMode,
          startTime
        }
      }));
      return;
    }

    if (newMode === mode) return;

    const now = performance.now();
    const duration = now - startRef.current;
    const entry = { mode, duration };

    setSessionData((prev) => ({
      ...prev,
      topicB: {
        ...prev.topicB,
        logs: [...(prev.topicB.logs || []), entry],
        switchCount: (prev.topicB.switchCount || 0) + 1,
        choice: newMode
      }
    }));

    setMode(newMode);
    startRef.current = now;
  };

  const finish = () => {
    if (!mode) return;

    const startTime = sessionData?.topicB?.startTime ?? null;
    const elapsed = typeof startTime === "number" ? performance.now() - startTime : 0;
    if (elapsed < MIN_VIEW_MS) {
      setWarning(`Please spend at least ${Math.round(MIN_VIEW_MS / 1000)} seconds before continuing.`);
      return;
    }

    const endTime = performance.now();
    const duration = endTime - startRef.current;
    const entry = { mode, duration };

    setSessionData((prev) => ({
      ...prev,
      topicB: {
        ...prev.topicB,
        logs: [...(prev.topicB.logs || []), entry],
        endTime,
        finalMode: mode
      }
    }));

    next();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-8">
      <div className="bg-white p-8 rounded shadow text-center max-w-3xl w-full">
        <h2 className="text-xl font-bold mb-6">Topic B — Free Choice</h2>
        <p className="mb-4">Choose how you want to view this topic:</p>
        <div className="flex gap-4 mb-6 justify-center">
          <button onClick={() => chooseMode("Text")} className="bg-blue-600 text-white px-6 py-3 rounded">
            Text Mode
          </button>
          <button onClick={() => chooseMode("Visual")} className="bg-blue-600 text-white px-6 py-3 rounded">
            Visual Mode
          </button>
        </div>

        {mode ? (
          <div className="min-h-600 border p-6 mb-6 rounded text-left">
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
              <div className="text-center text-gray-400">
                {content.visual?.type === "image" && content.visual.src ? (
                  <img className="visual-img" src={content.visual.src} alt={content.visual.alt || "Topic B visual"} />
                ) : (
                  content.visual?.label || "Visual content"
                )}
              </div>
            )}
          </div>
        ) : null}

        {warning ? <p className="text-sm text-gray-600 mb-4">{warning}</p> : null}
        <button onClick={finish} disabled={!mode} className="bg-green-600 text-white px-6 py-2 rounded disabled:bg-gray-300">
          Continue to Quiz
        </button>
      </div>
    </div>
  );
}
