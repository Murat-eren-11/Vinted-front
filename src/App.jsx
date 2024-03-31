import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Signup from "./components/Signup/Signup";
import { useState } from "react";
import Login from "./components/Login/Login";
import Cookies from "js-cookie";

function App() {
  const [visible, setVisible] = useState(false);
  const [logVisible, setLogVisible] = useState(false);
  const [token, setToken] = useState(Cookies.get("vinted-token") || null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("vinted-token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("vinted-token");
      setToken(null);
    }
  };

  return (
    <Router>
      <Header
        visible={visible}
        setVisible={setVisible}
        logVisible={logVisible}
        setLogVisible={setLogVisible}
        token={token}
        handleToken={handleToken}
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
