export default function Landing({ next }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="max-w-2xl bg-white p-8 rounded shadow text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">
          Digital Learning Efficiency Study
        </h1>
        <p className="mb-6 text-gray-700 text-lg">
          This study examines how different presentation formats affect learning speed.
          The session lasts approximately 15–20 minutes.
        </p>
        <button onClick={next} className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700">
          Begin Study
        </button>
      </div>
    </div>
  );
}
