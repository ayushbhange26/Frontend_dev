import quizlogo from "../quizlogo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen h-screen flex justify-center flex-col gap-5 items-center bg-yellow-200">
      <div className="w-full h-20 flex justify-center mt-5">
        <img src={quizlogo} alt="QuizMaster Logo" className="h-20 sm:h-24 md:h-28 lg:h-32" />
      </div>
      <div className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-3xl p-5 pt-10 bg-yellow-400 flex flex-col justify-center items-center mt-10">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Welcome to QuizMaster! 🎉</h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg">
            📚 Test Your Knowledge. Challenge Yourself. Have Fun! <br /> <br />
            💡 Features: <br />
            ✅ Thousands of exciting questions <br />
            ✅ Multiple categories to explore <br />
            ✅ Timed challenges & leaderboards <br />
            ✅ Play solo or challenge friends <br />
            🎯 Are You Ready? Tap "Start Quiz" and show what you’ve got!
          </p>
        </div>
        <div className="mt-5">
          <Link
            to="/about"
            className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-8 py-2.5 text-center"
          >
            Start Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
