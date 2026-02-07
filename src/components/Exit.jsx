import { useEffect, useRef, useState } from "react";

export default function Exit({ sessionData }) {
  const sent = useRef(false);
  const [uploadState, setUploadState] = useState("idle");

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;

    const endTime = Date.now();
    const payloadSession = {
      ...sessionData,
      meta: {
        ...sessionData.meta,
        endTime,
        totalDurationMs:
          typeof sessionData.meta?.startTime === "number"
            ? endTime - sessionData.meta.startTime
            : null
      }
    };

    const base = import.meta.env.VITE_BACKEND_URL || "";
    const url = `${base.replace(/\/$/, "")}/api/submit`;

    setUploadState("pending");
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session: payloadSession }),
      keepalive: true
    })
      .then((res) => {
        setUploadState(res.ok ? "success" : "failed");
      })
      .catch(() => setUploadState("failed"));
  }, [sessionData]);

  const download = () => {
    const blob = new Blob([JSON.stringify(sessionData, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `study_${sessionData.participant_id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Study Complete</h1>
        <p className="mb-2 text-gray-600">Thank you. You can download a copy of your data for your records.</p>
        {uploadState === "pending" ? (
          <p className="text-sm text-gray-600 mb-4">Uploading your response…</p>
        ) : uploadState === "failed" ? (
          <p className="text-sm text-gray-600 mb-4">
            Upload failed. Please download your data and send it to the researcher.
          </p>
        ) : uploadState === "success" ? (
          <p className="text-sm text-gray-600 mb-4">Upload complete.</p>
        ) : (
          <div className="mb-4" />
        )}
        <button onClick={download} className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700">
          Download Copy
        </button>
      </div>
    </div>
  );
}
