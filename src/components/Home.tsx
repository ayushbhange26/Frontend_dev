import quizlogo from "../quizlogo.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white p-5">
      <div className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-4/5 h-auto rounded-3xl p-10 lg:p-14 bg-gray-100 shadow-lg flex flex-col lg:flex-row-reverse justify-between items-center">
        
        {/* Right Section - Text & Button */}
        <div className="w-full lg:w-1/2 text-center lg:text-left p-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
            Welcome to QuizMaster! 🎉
          </h1>
          <p className="mt-5 text-base sm:text-lg md:text-xl text-gray-700">
            📚 Test Your Knowledge. Challenge Yourself. Have Fun! <br /> <br />
            💡 Features: <br />
            ✅ Thousands of exciting questions <br />
            ✅ Multiple categories to explore <br />
            ✅ Timed challenges & leaderboards <br />
            ✅ Play solo or challenge friends <br />
            🎯 Are You Ready? Tap "Start Quiz" and show what you’ve got!
          </p>
          <div className="mt-6">
            <Link
              to="/about"
              className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border-2 border-black"
            >
              Start Quiz
            </Link>
          </div>
        </div>

        {/* Left Section - Bigger Logo */}
        <div className="w-full lg:w-1/2 flex justify-center p-5">
          <img src={quizlogo} alt="QuizMaster Logo" className="h-40 sm:h-52 md:h-64 lg:h-72" />
        </div>
        
      </div>
    </div>
  );
};
export default Home;
