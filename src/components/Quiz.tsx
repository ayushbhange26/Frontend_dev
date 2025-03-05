import { useState, useEffect } from "react";
import Loading from "./LoadingPage";
import Question from "./Question";
import Score from "./Score";
import Result from "./Result";
import shuffleArray from "../Utilities/Shuffle";

// Define question structure
interface QuizQuestion {
  question: { text: string };
  correctAnswer: string;
  incorrectAnswers: string[];
}

const Quiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(10).fill(null));

  // Categories for selection
  const categories = [
    { name: "General Knowledge", value: "general_knowledge" },
    { name: "Science", value: "science" },
    { name: "History", value: "history" },
    { name: "Geography", value: "geography" },
  ];

  // Fetch questions based on selected category
  const fetchQuestions = async (selectedCategory: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://the-trivia-api.com/v2/questions?categories=${selectedCategory}`
      );
      const data: QuizQuestion[] = await response.json();
      const slicedQuestions = data.slice(0, 10);
      setQuestions(slicedQuestions);
      localStorage.setItem("quiz_questions", JSON.stringify(slicedQuestions));
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load stored data from localStorage on mount
  useEffect(() => {
    const storedQuestions = localStorage.getItem("quiz_questions");
    const storedIndex = localStorage.getItem("quiz_currentIndex");
    const storedScore = localStorage.getItem("quiz_score");
    const storedCategory = localStorage.getItem("quiz_category");
    const storedAnswers = localStorage.getItem("quiz_selectedAnswers");

    if (storedQuestions && storedCategory) {
      setQuestions(JSON.parse(storedQuestions));
      setCategory(storedCategory);
    }
    if (storedIndex) {
      setCurrentQuestionIndex(parseInt(storedIndex, 10));
    }
    if (storedScore) {
      setScore(parseInt(storedScore, 10));
    }
    if (storedAnswers) {
      setSelectedAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  // Shuffle the answers when the question changes
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      const options = [
        ...questions[currentQuestionIndex].incorrectAnswers,
        questions[currentQuestionIndex].correctAnswer,
      ];
      setShuffledOptions(shuffleArray(options));
    }
  }, [questions, currentQuestionIndex]);

  // Handle answer selection
  const checkAnswer = (selectedIndex: number) => {
    if (questions.length === 0 || selectedAnswers[currentQuestionIndex] !== null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = shuffledOptions[selectedIndex];
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = selectedOption;
    setSelectedAnswers(newSelectedAnswers);
    localStorage.setItem("quiz_selectedAnswers", JSON.stringify(newSelectedAnswers));

    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
      localStorage.setItem("quiz_score", (score + 1).toString());
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        localStorage.setItem("quiz_currentIndex", (currentQuestionIndex + 1).toString());
      } else {
        setQuizFinished(true);
        localStorage.removeItem("quiz_questions");
        localStorage.removeItem("quiz_currentIndex");
        localStorage.removeItem("quiz_score");
        localStorage.removeItem("quiz_selectedAnswers");
      }
    }, 1500);
  };

  // Reset quiz
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setCategory(null);
    setSelectedAnswers(Array(10).fill(null));

    localStorage.removeItem("quiz_currentIndex");
    localStorage.removeItem("quiz_score");
    localStorage.removeItem("quiz_questions");
    localStorage.removeItem("quiz_category");
    localStorage.removeItem("quiz_selectedAnswers");
  };

  // Handle category selection
  const startQuiz = (selectedCategory: string) => {
    setCategory(selectedCategory);
    localStorage.setItem("quiz_category", selectedCategory);
    fetchQuestions(selectedCategory);
  };

  if (loading) return <Loading />;
  if (quizFinished) return <Result score={score} restartQuiz={restartQuiz} />;

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6">
  <h2 className="text-2xl font-bold mb-4">Select Quiz Category</h2>
  <div className="grid grid-cols-2 gap-4">
    {categories.map((cat) => (
      <button
        key={cat.value}
        className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border-2 border-black"
        onClick={() => startQuiz(cat.value)}
      >
        {cat.name}
      </button>
    ))}
  </div>
</div>

    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6">
      <Score score={score} />

      {/* Answer Indicator Panel (Now Persistent) */}
      <div className="flex space-x-2 mb-4">
        {selectedAnswers.map((answer, index) => {
          let bgColor = "bg-gray-400"; // Default for unanswered
          if (answer !== null) {
            bgColor = answer === questions[index].correctAnswer ? "bg-green-500" : "bg-red-500";
          }
          return (
            <div key={index} className={`w-6 h-6 rounded ${bgColor}`}></div>
          );
        })}
      </div>

      <Question
        question={questions[currentQuestionIndex]}
        questionNumber={currentQuestionIndex + 1}
        shuffledOptions={shuffledOptions}
        checkAnswer={checkAnswer}
      />
    </div>
  );
};

export default Quiz;
