import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllItems from "./pages/AllItems";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Callback from "./pages/Callback";
import Protected from "./components/Protected";
import Register from "./pages/Register";
import Messenger from "./pages/Messenger";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/all-items" element={<AllItems />} />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/register"
          element={
            <Protected>
              <Register />
            </Protected>
          }
        />
        <Route
          path="/messenger"
          element={
            <Protected>
              <Messenger />
            </Protected>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
