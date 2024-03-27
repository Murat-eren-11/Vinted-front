import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";

function App() {
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL);
        if (isMounted) {
          setArticles(response.data.offers);
          setTotalPages(Math.ceil(response.data.count / limit));
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [currentPage]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              articles={articles}
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer articles={articles} />} />
        <Route path="*" element={<p>Rien a voir ici, circulez</p>} />
      </Routes>
    </Router>
  );
}

export default App;
