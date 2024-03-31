import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Range, getTrackBackground } from "react-range";

const Header = ({
  visible,
  setVisible,
  logVisible,
  setLogVisible,
  token,
  handleToken,
}) => {
  const location = useLocation();
  const isOfferPage = location.pathname.includes("/offer/");

  const [searchTitle, setSearchTitle] = useState("");
  const [priceRange, setPriceRange] = useState([10, 100]);

  const [offers, setOffers] = useState([]);
  const [sortValue, setSortValue] = useState("price-desc");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}offers`,
        {
          params: {
            title: searchTitle,
            priceMin: priceRange[0],
            priceMax: priceRange[1],
            sort: sortValue,
          },
        }
      );
      setOffers(response.data.offers);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTitle, priceRange, sortValue]);

  const handleSortChange = () => {
    setSortValue(sortValue === "price-asc" ? "price-desc" : "price-asc");
    fetchData(); // Appelez fetchData après avoir changé la valeur de tri
  };

  return (
    <header>
      <div className="gauche">
        <Link to="/">
          <img src="../../../logo.svg" alt="VintedLogo" />
        </Link>
      </div>
      <div className="recherche">
        <input
          type="text"
          className="barrerecherche"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        {!isOfferPage && (
          <div className="tri">
            <span className="tritext">
              Trier par prix :{" "}
              {sortValue === "price-asc" ? "croissant" : "décroissant"}
            </span>
            <input
              type="checkbox"
              className="tribouton"
              onChange={handleSortChange}
            />{" "}
            <span className="tritext">Prix entre : </span>
            <Range
              step={5}
              min={0}
              max={2000}
              values={priceRange}
              onChange={(values) => setPriceRange(values)}
              onFinalChange={(values) => {
                setPriceRange(values);
              }}
              renderTrack={({ props, children }) => {
                return (
                  <div
                    className="barre"
                    {...props}
                    style={{
                      background: getTrackBackground({
                        values: priceRange,
                        colors: ["#ccc", "#09b0ba", "#ccc"],
                        min: 0,
                        max: 2000,
                      }),
                    }}
                  >
                    {children}
                  </div>
                );
              }}
              renderThumb={({ props, index }) => (
                <div className="point" {...props}>
                  <div className="bulle">
                    {priceRange[index].toFixed(0) + "€"}
                  </div>
                </div>
              )}
            />
          </div>
        )}
      </div>

      {token ? (
        <button
          onClick={() => {
            handleToken(null);
          }}
        >
          Se déconnecter
        </button>
      ) : (
        <>
          <button className="signup" onClick={() => setVisible(!visible)}>
            S'inscrire
          </button>
          <button className="login" onClick={() => setLogVisible(!logVisible)}>
            Se connecter
          </button>
        </>
      )}

      <div className="selltoo">
        <button className="sell">Vends tes articles</button>
      </div>
    </header>
  );
};
export default Header;
