interface ScoreProps {
    score: number;
  }
  
  const Score = ({ score }: ScoreProps) => {
    return (
      <div className="absolute top-4 right-6 bg-yellow-400 text-black px-4 py-2 rounded-md font-bold text-lg shadow-lg">
        Score: {score} / 10
      </div>
    );
  };
  
  export default Score;
  