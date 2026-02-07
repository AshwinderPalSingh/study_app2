import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "mcom_session_v1";
const SCHEMA_VERSION = 1;

function getInitialSession() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      console.error("Session corrupted, starting fresh.");
    }
  }

  const fresh = {
    participant_id: uuidv4(),
    conditionAssignment: null,
    meta: {
      schemaVersion: SCHEMA_VERSION,
      userAgent: navigator.userAgent,
      screenRes: `${window.screen.width}x${window.screen.height}`,
      timezoneOffset: new Date().getTimezoneOffset(),
      startTime: Date.now(),
      currentStep: "LANDING"
    },
    demographics: {},
    calibration: { logs: [], summary: null },
    topicA: {},
    quizzes: {},
    topicB: { switchCount: 0, choice: null, logs: [] }
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  } catch (e) {
    console.error("Storage write failed", e);
  }
  return fresh;
}

export function useSessionData() {
  const [session, setSession] = useState(getInitialSession);

  const updateSession = useCallback((updater) => {
    setSession((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Storage write error", e);
      }
      return next;
    });
  }, []);

  return [session, updateSession];
}
