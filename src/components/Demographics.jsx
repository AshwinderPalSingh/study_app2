import { useState } from "react";
import { studyContent } from "../data/studyContent";

export default function Demographics({ setSessionData, next }) {
  const [data, setData] = useState({
    age: "",
    gender: "",
    priorA: "1",
    priorB: "1"
  });
  const topicAName = studyContent.topicA?.text?.heading || "Topic A";
  const topicBName = studyContent.topicB?.text?.heading || "Topic B";

  const update = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const submit = () => {
    if (!data.age || !data.gender) return;
    setSessionData((prev) => ({
      ...prev,
      demographics: {
        age: data.age,
        gender: data.gender,
        priorKnowledge_TopicA: data.priorA,
        priorKnowledge_TopicB: data.priorB
      }
    }));
    next();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="max-w-xl bg-white p-8 rounded shadow w-full">
        <h2 className="text-xl font-bold mb-6">Background Information</h2>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Age</label>
          <input
            type="number"
            name="age"
            className="w-full border p-2 rounded"
            onChange={update}
            value={data.age}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Gender</label>
          <select
            name="gender"
            className="w-full border p-2 rounded"
            onChange={update}
            value={data.gender}
          >
            <option value="">Select...</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="NB">Non-binary</option>
            <option value="PN">Prefer not to say</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Prior Knowledge ({topicAName})</label>
          <select
            name="priorA"
            className="w-full border p-2 rounded"
            onChange={update}
            value={data.priorA}
          >
            <option value="1">Never heard of it</option>
            <option value="2">Some familiarity</option>
            <option value="3">Knowledgeable</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-1">Prior Knowledge ({topicBName})</label>
          <select
            name="priorB"
            className="w-full border p-2 rounded"
            onChange={update}
            value={data.priorB}
          >
            <option value="1">Never heard of it</option>
            <option value="2">Some familiarity</option>
            <option value="3">Knowledgeable</option>
          </select>
        </div>

        <button
          onClick={submit}
          disabled={!data.age || !data.gender}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
