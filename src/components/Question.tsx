import { useEffect, useState } from "react";

interface QuestionProps {
  question: {
    question: { text: string };
    correctAnswer: string;
    incorrectAnswers: string[];
  };
  questionNumber: number;
  shuffledOptions: string[];
  checkAnswer: (index: number) => void;
}

const Question = ({
  question,
  questionNumber,
  shuffledOptions,
  checkAnswer,
}: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupColor, setPopupColor] = useState<string>("");

  // Load previous selection from localStorage on mount
  useEffect(() => {
    const storedAnswer = localStorage.getItem(`question_${questionNumber}`);
    if (storedAnswer !== null) {
      setSelectedAnswer(parseInt(storedAnswer, 10));
    }
  }, [questionNumber]);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    localStorage.setItem(`question_${questionNumber}`, index.toString());

    const selectedOption = shuffledOptions[index];
    const isCorrect = selectedOption === question.correctAnswer;

    // Show pop-up notification
    setPopupMessage(isCorrect ? "✅ Correct! +1 point" : "❌ Wrong Answer!");
    setPopupColor(isCorrect ? "bg-green-500" : "bg-red-500");

    // Hide pop-up after 1.5s and move to the next question
    setTimeout(() => {
      setPopupMessage(null);
      checkAnswer(index);
    }, 1500);
  };

  return (
    <div className="relative w-full max-w-xl bg-red-400 rounded-xl p-4 shadow-lg">
      {/* Pop-up Notification (Appears from the Right) */}
      {popupMessage && (
        <div
          className={`fixed top-20 right-5 p-3 text-white font-semibold rounded-md shadow-lg ${popupColor} transition-transform transform animate-slide-in-right`}
        >
          {popupMessage}
        </div>
      )}

      {/* Question and Options */}
      <h1 className="text-xl font-bold text-center mb-3">
        Question {questionNumber}
      </h1>
      <h2 className="text-md font-semibold text-center text-white bg-gray-700 p-3 rounded-md">
        {question.question.text}
      </h2>
      <div className="grid grid-cols-1 gap-3 mt-4">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            className={`py-2 px-3 rounded-md transition duration-200 w-full text-center shadow-md font-medium text-white ${
              selectedAnswer === index
                ? "bg-green-500 hover:bg-blue-500"
                : "bg-green-500 hover:bg-blue-500"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Tailwind Animation for Right-Side Pop-up */}
      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(150%);
            }
            to {
              transform: translateX(0);
            }
          }

          .animate-slide-in-right {
            animation: slideInRight 0.5s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Question;
