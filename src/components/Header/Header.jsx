import "./Header.css";
import { Link, useLocation } from "react-router-dom";

const Header = ({ visible, setVisible, logVisible, setLogVisible }) => {
  const location = useLocation();

  const isOfferPage = location.pathname.includes("/offer/");

  return (
    <header>
      <div className="gauche">
        <Link to="/">
          <img src="../../../logo.svg" alt="VintedLogo" />
        </Link>
      </div>
      <div className="recherche">
        <input type="text" className="barrerecherche" />
        {!isOfferPage && (
          <div className="tri">
            <span className="tritext">Trier par prix :</span>
            <input type="checkbox" className="tribouton" />
            <span className="tritext">Prix entre : </span>
            <div className="echelle">
              <div className="barre">
                <div className="point">
                  <div className="bulle">10 €</div>
                </div>
                <div className="point">
                  <div className="bulle">100 €</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="loginsignup">
        <button className="signup" onClick={() => setVisible(!visible)}>
          S'inscrire
        </button>
        <button className="login" onClick={() => setLogVisible(!logVisible)}>
          Se connecter
        </button>
      </div>
      <div className="selltoo">
        <button className="sell">Vends tes articles</button>
      </div>
    </header>
  );
};
export default Header;
