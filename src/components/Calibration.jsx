import { useState, useRef, useEffect } from "react";
import { determineDominantModality } from "../utils/calibrationLogic";
import { studyContent } from "../data/studyContent";

export default function Calibration({ setSessionData, next }) {
  const [mode, setMode] = useState("Text");
  const [logs, setLogs] = useState([]);
  const [warning, setWarning] = useState("");
  const startRef = useRef(null);
  const content = studyContent.calibration;

  useEffect(() => {
    startRef.current = performance.now();
  }, []);

  const switchMode = (newMode) => {
    if (newMode === mode) return;

    const nowTs = performance.now();
    const duration = nowTs - startRef.current;
    const newEntry = { mode, duration };

    setLogs((prev) => [...prev, newEntry]);
    setSessionData((prev) => ({
      ...prev,
      calibration: {
        ...prev.calibration,
        logs: [...(prev.calibration.logs || []), newEntry]
      }
    }));

    setMode(newMode);
    startRef.current = nowTs;
  };

  const finish = () => {
    const finalDuration = performance.now() - startRef.current;
    const finalSegment = { mode, duration: finalDuration };
    const finalLogs = [...logs, finalSegment];
    const stats = determineDominantModality(finalLogs);

    if (stats.totalFiltered < stats.minTotalMs) {
      setWarning(`Please spend at least ${Math.round(stats.minTotalMs / 1000)} seconds total before continuing.`);
      return;
    }

    setSessionData((prev) => ({
      ...prev,
      calibration: { ...prev.calibration, logs: finalLogs, summary: stats },
      meta: {
        ...prev.meta,
        determinedDominant: stats.dominant,
        calibrationMCI: stats.mci,
        calibrationTotalFilteredMs: stats.totalFiltered,
        calibrationRules: {
          minSegmentMs: stats.minSegmentMs,
          minTotalMs: stats.minTotalMs,
          tieMargin: stats.tieMargin,
          dominantThreshold: stats.dominantThreshold
        }
      }
    }));

    next();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-8">
      <div className="max-w-3xl w-full bg-white p-8 rounded shadow">
        <h2 className="text-xl font-bold mb-4">{content.title}</h2>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => switchMode("Text")}
            disabled={mode === "Text"}
            className="px-4 py-2 bg-gray-200 disabled:bg-blue-600 disabled:text-white rounded"
          >
            Text
          </button>
          <button
            onClick={() => switchMode("Visual")}
            disabled={mode === "Visual"}
            className="px-4 py-2 bg-gray-200 disabled:bg-blue-600 disabled:text-white rounded"
          >
            Visual
          </button>
        </div>
        <div className="h-64 border p-6 bg-gray-50 overflow-auto">
          {mode === "Text" ? (
            <div>
              <h3 className="text-lg font-bold mb-2">{content.text.heading}</h3>
              <p className="text-sm leading-relaxed mb-4">{content.text.body}</p>
              {content.text.bullets?.length ? (
                <ul>
                  {content.text.bullets.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : (
            <div className="text-center">
              {content.visual?.type === "image" && content.visual.src ? (
                <img className="visual-img" src={content.visual.src} alt={content.visual.alt || "Calibration visual"} />
              ) : (
                <div className="text-gray-400">{content.visual?.label || "Calibration visual"}</div>
              )}
            </div>
          )}
        </div>
        {warning ? <p className="text-sm text-gray-600 mt-6">{warning}</p> : null}
        <button
          onClick={finish}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Finish & Continue
        </button>
      </div>
    </div>
  );
}
