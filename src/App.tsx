import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Pages from "./components/Quiz"
import Home from "./components/Home"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<Pages />} />
            </Routes>
        </Router>
    );
}

export default App;
