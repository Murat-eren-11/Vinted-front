import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Signup from "./components/Signup/Signup";
import { useState } from "react";
import Login from "./components/Login/Login";
import Cookies from "js-cookie";
import Publish from "./pages/Publish/Publish";
import Payment from "./pages/Payment/Payment";

function App() {
  const [visible, setVisible] = useState(false);
  const [logVisible, setLogVisible] = useState(false);
  const [token, setToken] = useState(Cookies.get("vinted-token") || null);
  const [searchTitle, setSearchTitle] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortValue, setSortValue] = useState(null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("vinted-token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("vinted-token");
      setToken(null);
    }
  };

  const handleSearchTitleChange = (title) => {
    setSearchTitle(title);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const handleSortChange = () => {
    if (sortValue === null) {
      setSortValue("price-asc");
    } else {
      setSortValue(sortValue === "price-asc" ? "price-desc" : "price-asc");
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
        onSearchTitleChange={handleSearchTitleChange}
        onPriceRangeChange={handlePriceRangeChange}
        onSortChange={handleSortChange}
        searchTitle={searchTitle}
        priceRange={priceRange}
        sortValue={sortValue}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchTitle={searchTitle}
              priceRange={priceRange}
              sortValue={sortValue}
              token={token}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer token={token} />} />
        <Route
          path="/publish"
          element={
            token ? (
              <Publish token={token} />
            ) : (
              <>
                <Login
                  setLogVisible={setLogVisible}
                  handleToken={handleToken}
                />{" "}
                <Home
                  searchTitle={searchTitle}
                  priceRange={priceRange}
                  sortValue={sortValue}
                />
              </>
            )
          }
        />{" "}
        <Route
          path="/payment"
          element={
            token ? (
              <Payment />
            ) : (
              <Navigate
                to="/"
                replace
                state={{
                  from: "/payment",
                  message:
                    "Vous devez être connecté pour accéder à la page de paiement.",
                }}
              />
            )
          }
        />
        <Route path="*" element={<p>Rien a voir ici, circulez</p>} />
      </Routes>
      {visible && <Signup setVisible={setVisible} />}
      {logVisible && (
        <Login setLogVisible={setLogVisible} handleToken={handleToken} />
      )}
    </Router>
  );
}

export default App;
