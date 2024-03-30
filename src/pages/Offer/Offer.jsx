import "./Offer.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Offer = () => {
  const [articles, setArticles] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("tentative de fetch");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}offer/${id}`
        );
        console.log("c'est fetch");
        setArticles(response.data);
      } catch (error) {
        console.log(error.message);
        console.log("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <main className="offremain">
      <section className="offrecontainer">
        <div className="offerpicture">
          <img
            src={
              articles &&
              articles.product_image &&
              articles.product_image.secure_url
            }
            className="imgofr"
            alt=""
          />
        </div>

        <div className="infosoffre">
          <div className="infopratique">
            <span className="prix">{articles && articles.product_price} €</span>
          </div>
          <div className="listinfo">
            {articles &&
              articles.product_details &&
              articles.product_details.map((detail) => {
                const keys = Object.keys(detail);
                const keyName = keys[0];

                return (
                  <p key={keyName}>
                    {keyName}: {detail[keyName]}
                  </p>
                );
              })}
          </div>
          <div className="barredivise"></div>
          <div className="offrecontenu">
            <p className="nom">{articles && articles.product_name}</p>
            <p className="description">
              {articles && articles.product_description}
            </p>
            <div className="offeruser">
              <img
                src={
                  articles &&
                  articles.owner &&
                  articles.owner.account &&
                  articles.owner.account.avatar?.url
                }
                alt=""
                className="avatar"
              />
              <span>
                {articles &&
                  articles.owner &&
                  articles.owner.account &&
                  articles.owner.account.username}
              </span>
            </div>
          </div>
          <button className="buy">Acheter</button>
        </div>
      </section>
    </main>
  );
};
export default Offer;
