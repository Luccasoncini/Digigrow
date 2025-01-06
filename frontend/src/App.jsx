import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTask from "./pages/Edit";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditTask />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" />
    </Provider>
  );
}

export default App;
