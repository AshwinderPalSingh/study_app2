import { useEffect, useState } from "react";

export default function Washout({ next }) {
  const [t, setT] = useState(120);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setT((v) => {
        if (v <= 1) {
          clearInterval(timer);
          setReady(true);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-2">Rest Break</h2>
        <p className="text-gray-600 mb-6">Please relax. The next topic will unlock shortly.</p>
        <p className="text-4xl font-mono font-bold text-blue-600 mb-6">{t}s</p>
        <button
          disabled={!ready}
          onClick={next}
          className="bg-green-600 text-white px-8 py-3 rounded disabled:bg-gray-300"
        >
          {ready ? "Start Topic B" : "Wait..."}
        </button>
      </div>
    </div>
  );
}
