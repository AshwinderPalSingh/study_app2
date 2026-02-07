export default function Consent({ next }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="max-w-2xl bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Informed Consent</h2>
        <div className="h-64 overflow-y-auto border p-4 mb-6 text-sm bg-gray-50 text-gray-700">
          <p className="mb-2"><strong>Study Title:</strong> The Metabolic Cost of Modality</p>
          <p className="mb-2"><strong>Procedure:</strong> You will complete a brief calibration task, view two short learning topics, and answer quiz questions.</p>
          <p className="mb-2"><strong>Voluntary:</strong> Participation is voluntary. You may withdraw at any time by closing the tab.</p>
          <p><strong>Data:</strong> Responses are anonymous. No personal identifiers are collected.</p>
        </div>
        <button onClick={next} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          I Consent & Agree
        </button>
      </div>
    </div>
  );
}
