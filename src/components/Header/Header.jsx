import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const Header = ({
  visible,
  setVisible,
  logVisible,
  setLogVisible,
  token,
  handleToken,
  onSearchTitleChange,
  onPriceRangeChange,
  onSortChange,
  searchTitle,
  priceRange,
  sortValue,
}) => {
  const location = useLocation();
  const isOfferPage = location.pathname.includes("/offer/");

  const [localSearchTitle, setLocalSearchTitle] = useState(searchTitle);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [localSortValue, setLocalSortValue] = useState(sortValue);

  const handleSearchTitleChange = (e) => {
    const title = e.target.value;
    setLocalSearchTitle(title);
    onSearchTitleChange(title);
  };

  const handlePriceRangeChange = (range) => {
    setLocalPriceRange(range);
    onPriceRangeChange(range);
  };

  const handleSortChange = () => {
    const newSortValue =
      localSortValue === "price-asc" ? "price-desc" : "price-asc";
    setLocalSortValue(newSortValue);
    onSortChange(newSortValue);
  };

  const handleSellClick = () => {
    if (token) {
      return;
    } else {
      setLogVisible(true);
    }
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
          value={localSearchTitle}
          onChange={handleSearchTitleChange}
        />
        {!isOfferPage && (
          <div className="tri">
            <span className="tritext">
              Trier par prix :{" "}
              {localSortValue === "price-asc" ? "croissant" : "décroissant"}
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
              values={localPriceRange}
              onChange={handlePriceRangeChange}
              onFinalChange={handlePriceRangeChange}
              renderTrack={({ props, children }) => {
                return (
                  <div
                    className="barre"
                    {...props}
                    style={{
                      background: getTrackBackground({
                        values: localPriceRange,
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
                    {localPriceRange[index].toFixed(0) + "€"}
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
        <Link to={token ? "/publish" : "/connexion"}>
          <button className="sell" onClick={handleSellClick}>
            Vends tes articles
          </button>
        </Link>
      </div>
    </header>
  );
};
export default Header;
