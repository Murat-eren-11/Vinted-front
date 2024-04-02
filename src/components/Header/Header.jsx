import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Range, getTrackBackground } from "react-range";
//J'ai mis 100 props, mais faut comprendre qu'il y  les modales
//Qui concerne les 4 premières props
//Le token les 2 d'après
//Puis les différents tri/recherche
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
  //Ici je dis que si la location est "/" on est sur la home page
  const isHomePage = location.pathname === "/";
  //les usestate des différents tri/recherche
  const [localSearchTitle, setLocalSearchTitle] = useState(searchTitle);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [localSortValue, setLocalSortValue] = useState(sortValue);
  //Fonction pour la recherche
  const handleSearchTitleChange = (e) => {
    const title = e.target.value;
    setLocalSearchTitle(title);
    onSearchTitleChange(title);
  };
  //fonction pour trier les article entre deux prix
  const handlePriceRangeChange = (range) => {
    setLocalPriceRange(range);
    onPriceRangeChange(range);
  };
  //fonction pour trier par ordre croissant ou décroissant de prix
  const handleSortChange = () => {
    const newSortValue =
      localSortValue === "price-asc" ? "price-desc" : "price-asc";
    setLocalSortValue(newSortValue);
    onSortChange(newSortValue);
  };
  //fonction pour le bouton vendre article
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
          placeholder="Recherche des articles"
        />
        {isHomePage && (
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
          className="sedeco"
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
