import { useState, useEffect, useMemo } from "react";
import shuffleArray from '../../Utilities/Shuffle';

interface QuizQuestion {
  question: {
    text: string;
  };
  correctAnswer: string;
  incorrectAnswers: string[];
}

const useQuiz = (questionCount = 10) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://the-trivia-api.com/v2/questions");
        const data: QuizQuestion[] = await response.json();
        setQuestions(data.slice(0, questionCount));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [questionCount]);

  // Shuffle options using useMemo
  const shuffledOptions = useMemo(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      const options = [
        ...questions[currentQuestionIndex].incorrectAnswers,
        questions[currentQuestionIndex].correctAnswer,
      ];
      return shuffleArray(options);
    }
    return [];
  }, [questions, currentQuestionIndex]);

  // Check Answer
  const checkAnswer = (selectedIndex: number) => {
    if (questions.length === 0) return;

    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = shuffledOptions[selectedIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setFeedback("✅ Correct! +1 point");
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback("❌ Wrong Answer!");
    }

    setTimeout(() => {
      setFeedback(null);
      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        setQuizFinished(true);
      }
    }, 1500);
  };

  // Restart quiz
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setLoading(true);
  };

  return {
    questions,
    currentQuestionIndex,
    shuffledOptions,
    feedback,
    loading,
    score,
    quizFinished,
    checkAnswer,
    restartQuiz,
  };
};

export default useQuiz;
