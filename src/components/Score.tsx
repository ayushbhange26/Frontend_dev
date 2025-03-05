interface ScoreProps {
  score: number;
}

const Score = ({ score }: ScoreProps) => {
  return (
    <div className="absolute top-4 right-6 bg-gray-200 shadow-lg text-black px-4 py-2 rounded-md font-bold text-lg ">
      Score: {score} / 10
    </div>
  );
};

export default Score;
