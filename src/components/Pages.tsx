import { useState, useEffect } from "react";

// Define the shape of a question based on the API response
interface QuizQuestion {
  question: {
    text: string;
  };
  correctAnswer: string;
  incorrectAnswers: string[];
}

const Quiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0); // ✅ Track Score
  const [quizFinished, setQuizFinished] = useState<boolean>(false); // ✅ Track Quiz Completion

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://the-trivia-api.com/v2/questions");
        const data: QuizQuestion[] = await response.json();
        setQuestions(data.slice(0, 10)); // ✅ Limit to 10 questions
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Shuffle answer options when a new question appears
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      const options = [
        ...currentQuestion.incorrectAnswers,
        currentQuestion.correctAnswer,
      ];
      setShuffledOptions(shuffleArray(options));
    }
  }, [questions, currentQuestionIndex]);

  // Fisher-Yates shuffle
  const shuffleArray = (array: string[]): string[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Handle answer selection
  const checkAnswer = (selectedIndex: number) => {
    if (questions.length === 0) return;

    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = shuffledOptions[selectedIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setFeedback("✅ Correct! +1 point");
      setScore((prevScore) => prevScore + 1); // ✅ Increase Score
    } else {
      setFeedback("❌ Wrong Answer!");
    }

    setTimeout(() => {
      setFeedback(null);
      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        setQuizFinished(true); // ✅ Mark quiz as finished
      }
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-yellow-200 text-black text-xl">
        Loading...
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-200 text-black text-3xl font-bold">
        🎉 Congratulations! You completed the quiz.
        <p className="mt-4 text-3xl font-bold text-green-600">
          Your Score: {score} / 10
        </p>
        <button
          onClick={() => {
            setCurrentQuestionIndex(0);
            setScore(0);
            setQuizFinished(false);
          }}
          className="mt-6 bg-green-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md"
        >
          Restart Quiz 🔄
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-200 text-black p-6">
      {/* Score Display - Top Right */}
      <div className="absolute top-4 right-6 bg-yellow-400 text-black px-4 py-2 rounded-md font-bold text-lg shadow-lg">
        Score: {score} / 10
      </div>

      <div className="w-full max-w-xl bg-yellow-400 rounded-xl p-6 shadow-lg">
        {/* Question Number */}
        <h1 className="text-2xl font-bold text-center mb-4 ">
          Question {currentQuestionIndex + 1} 
        </h1>

        {/* Question */}
        <h2 className="text-lg font-semibold text-center text-white bg-gray-700 p-4 rounded-md">
          {currentQuestion.question.text}
        </h2>

        {/* Options Container */}
        <div className="grid grid-cols-1 gap-4 mt-6">
          {shuffledOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => checkAnswer(index)}
              className="bg-green-500 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 w-full text-center shadow-md"
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div
            className={`mt-4 p-3 text-lg font-semibold text-center rounded-md text-white ${
              feedback.includes("✅") ? "text-green-400 bg-green-400" : "bg-red-500 text-black"
            }`}
          >
            {feedback}  
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;