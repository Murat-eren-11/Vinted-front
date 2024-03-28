import "./Offer.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Offer = () => {
  const [articles, setArticles] = useState();
  const { id } = useParams();
  //dans le useEffect, rajouté /offer/${id} et adapter le reste du code en conséquence
  //factoriser la liste
  //faire un useEffect classique et tout réduire, pas besoin de faire le if else if et else
  //et mettre id dans l'objet à la fin
  //faire un product_details.map et faire une const keys = Object.keys(details)
  //const keyName=keys[0] puis return <p key={keyname}> {keyName}</p> et {detail[keyName]}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL);
        if (Array.isArray(response.data)) {
          setArticles(response.data);
        } else if (typeof response.data === "object") {
          const dataArray = Object.values(response.data);
          setArticles(dataArray);
        } else {
          console.error("Les données ne sont pas au format attendu");
        }
      } catch (error) {
        console.error("pourquoi j'ai pas :", error);
      }
    };

    fetchData();
  }, []);

  if (!articles) {
    return <div>Chargement en cours...</div>;
  }

  const article = articles[1].find((article) => article._id === id);

  return (
    <main className="offremain">
      <section className="offrecontainer">
        <div className="offerpicture">
          <img
            src={article.product_image.secure_url}
            className="imgofr"
            alt=""
          />
        </div>

        <div className="infosoffre">
          <div className="infopratique">
            <span className="prix">{article.product_price} €</span>
          </div>
          <ul className="listinfo">
            {article.product_details.map((detail, detailIndex) => {
              if (detail.MARQUE) {
                return (
                  <li className="infoli" key={detailIndex}>
                    <span>MARQUE </span>
                    <span>{detail.MARQUE}</span>
                  </li>
                );
              }
              if (detail.TAILLE) {
                return (
                  <li className="infoli" key={detailIndex}>
                    <span>TAILLE </span>
                    <span>{detail.TAILLE}</span>
                  </li>
                );
              }
              if (detail.ÉTAT) {
                return (
                  <li className="infoli" key={detailIndex}>
                    <span>ÉTAT </span>
                    <span>{detail.ÉTAT}</span>
                  </li>
                );
              }
              if (detail.COULEUR) {
                return (
                  <li className="infoli" key={detailIndex}>
                    <span>COULEUR </span>
                    <span>{detail.COULEUR}</span>
                  </li>
                );
              }
              if (detail.EMPLACEMENT) {
                return (
                  <li className="infoli" key={detailIndex}>
                    <span>EMPLACEMENT </span>
                    <span>{detail.EMPLACEMENT}</span>
                  </li>
                );
              }
            })}
          </ul>
          <div className="barredivise"></div>
          <div className="offrecontenu">
            <p className="nom">{article.product_name}</p>
            <p className="description">{article.product_description}</p>
            <div className="offeruser">
              <img
                src={article.owner.account.avatar.url}
                alt=""
                className="avatar"
              />
              <span>{article.owner.account.username}</span>
            </div>
          </div>
          <button className="buy">Acheter</button>
        </div>
      </section>
    </main>
  );
};
export default Offer;
