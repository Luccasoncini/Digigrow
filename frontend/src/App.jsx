import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTask from "./pages/Edit";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditTask />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
