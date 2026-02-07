import { useMemo, useRef, useState } from "react";
import { usePaintAnchor } from "../hooks/usePaintAnchor";
import { studyContent } from "../data/studyContent";

export default function QuizB({ setSessionData, next }) {
  const paintRef = useRef(null);
  const clicked = useRef(false);
  const [answers, setAnswers] = useState({});
  const questions = studyContent.quizB.questions || [];

  usePaintAnchor((t) => {
    if (paintRef.current === null) paintRef.current = t;
  });

  const select = (questionId, optionIndex) => {
    if (!clicked.current && paintRef.current) {
      clicked.current = true;
      const ltr = performance.now() - paintRef.current;
      setSessionData((prev) => ({
        ...prev,
        quizzes: {
          ...prev.quizzes,
          quizB_LTR: ltr,
          quizB_FirstClickIndex: optionIndex,
          quizB_FirstClickQuestionId: questionId
        }
      }));
    }
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const complete = useMemo(() => {
    return questions.length > 0 && questions.every((q) => answers[q.id] !== undefined);
  }, [answers, questions]);

  const submit = () => {
    if (!complete) return;
    const responses = questions.map((q) => {
      const selectedIndex = answers[q.id];
      const isCorrect = selectedIndex === q.correctIndex;
      return {
        questionId: q.id,
        selectedIndex,
        correctIndex: q.correctIndex,
        isCorrect
      };
    });
    const score = responses.filter((r) => r.isCorrect).length;
    setSessionData((prev) => ({
      ...prev,
      quizzes: {
        ...prev.quizzes,
        quizB_Responses: responses,
        quizB_Score: score,
        quizB_Total: responses.length,
        quizB_Accuracy: responses.length ? score / responses.length : null,
        quizB_SubmitTime: performance.now()
      }
    }));
    next();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-8">
      <div className="bg-white p-8 rounded shadow text-center max-w-xl w-full">
        <h2 className="text-xl font-bold mb-4">{studyContent.quizB.title || "Quiz B"}</h2>
        <div className="space-y-3 mb-6 text-left">
          {questions.map((q) => (
            <div key={q.id} className="mb-4">
              <p className="text-sm font-bold mb-2">{q.stem}</p>
              <div className="space-y-3">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => select(q.id, i)}
                    className={`w-full p-4 text-left border rounded ${
                      answers[q.id] === i ? "bg-blue-50 border-blue-500" : "hover:bg-gray-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={submit} disabled={!complete} className="bg-blue-600 text-white px-6 py-2 rounded disabled:bg-gray-300">
          Submit Quiz B
        </button>
      </div>
    </div>
  );
}
