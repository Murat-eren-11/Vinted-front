import "./Offer.css";
import { useParams } from "react-router-dom";

const Offer = ({ articles }) => {
  const { id } = useParams();
  const article = articles.find((article) => article._id === id);
  if (!article) {
    return <div>Article non trouvé</div>;
  }
  return (
    <main className="offremain">
      <section className="offrecontainer">
        <div className="offerpicture">
          <img src={article.product_image.url} className="imgofr" alt="" />
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
