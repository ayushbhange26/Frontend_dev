interface ResultProps {
    score: number;
    restartQuiz: () => void;
  }
  
  const Result = ({ score, restartQuiz }: ResultProps) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-200 text-black text-3xl font-bold">
        🎉 Congratulations! You completed the quiz.
        <p className="mt-4 text-3xl font-bold text-green-600">
          Your Score: {score} / 10
        </p>
        <button
          onClick={restartQuiz}
          className="mt-6 bg-green-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md"
        >
          Restart Quiz 🔄
        </button>
      </div>
    );
  };
  
  export default Result;
  