interface ResultProps {
    score: number;
    restartQuiz: () => void;
  }
  
  const Result = ({ score, restartQuiz }: ResultProps) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black text-3xl font-bold">
        🎉 Congratulations! You completed the quiz.
        <p className="mt-5 text-3xl font-bold text-green-600">
          Your Score: {score} / 10
        </p>
        <button
          onClick={restartQuiz}
          className="mt-4 bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border-2 border-black"
        >
          Restart Quiz 🔄
        </button>
      </div>
    );
  };
  
  export default Result;
  