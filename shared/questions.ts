import React, { useState } from "react";

// Define questions in structure as per your logic
const questions = [
  {
    id: "2",
    section: "2",
    questions: [
      {
        id: "name",
        text: "What is your full name?",
        type: "text",
      },
      {
        id: "father_name",
        text: "What is your father's full name?",
        type: "text",
      },
    ],
  },
];

export default function WillCreatorTool() {
  const [step, setStep] = useState(1);
  const [responses, setResponses] = useState({});

  const handleChange = (e, id) => {
    setResponses((prev) => ({ ...prev, [id]: e.target.value }));
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    if (responses.name && responses.father_name) {
      setStep(2);
    } else {
      alert("Please fill in all the details");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {step === 1 && (
        <form onSubmit={handleSubmitDetails} className="space-y-4">
          <h1 className="text-xl font-bold">Enter Your Basic Details</h1>
          {questions[0].questions.map((q) => (
            <div key={q.id}>
              <label className="block mb-1">{q.text}</label>
              <input
                type="text"
                name={q.id}
                value={responses[q.id] || ""}
                onChange={(e) => handleChange(e, q.id)}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Continue
          </button>
        </form>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold">
            Hi {responses.name}, let’s begin your Will creation journey.
          </h2>
          {/* Questions will appear here in the next step */}
        </div>
      )}
    </div>
  );
}
