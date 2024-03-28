import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Signup from "./components/Signup/Signup";
import { useState } from "react";
import Login from "./components/Login/Login";

function App() {
  const [visible, setVisible] = useState(false);
  const [logVisible, setLogVisible] = useState(false);
  return (
    <Router>
      <Header
        visible={visible}
        setVisible={setVisible}
        logVisible={logVisible}
        setLogVisible={setLogVisible}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="*" element={<p>Rien a voir ici, circulez</p>} />
      </Routes>
      {visible && <Signup setVisible={setVisible} />}
      {logVisible && <Login setLogVisible={setLogVisible} />}
    </Router>
  );
}

export default App;
