import "./Home.css";
import { Link, useLocation } from "react-router-dom";

const Home = ({ articles, totalPages, handlePageChange }) => {
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!articles || !Array.isArray(articles)) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <section className="banniere">
        <img src="../../../banner.jpg" alt="" className="imageaccueil" />
        <img src="../../../dechirure.svg" alt="" className="dechire" />
        <div className="carreaccueil">
          Prêt à faire du tri dans vos placards ?
          <button className="startsell">Commencez à Vendre</button>
        </div>
      </section>
      <section className="tousarticles">
        {articles.map((article, index) => (
          <div className="article" key={index}>
            <Link to={`/offer/${article._id}`}>
              <div className="utilisateur">
                <span>{article.owner.account.username}</span>
              </div>
              <div className="articleinfos">
                <img
                  src={article.product_pictures[0].url}
                  className="artimg"
                  alt=""
                />
                <div className="prixtaillemarque">
                  <span>{article.product_price}</span>
                  {article.product_details.map((detail, detailIndex) => {
                    if (detail.TAILLE) {
                      return <span key={detailIndex}>{detail.TAILLE}</span>;
                    }
                    return null;
                  })}
                  {article.product_details.map((detail, detailIndex) => {
                    if (detail.MARQUE) {
                      return <span key={detailIndex}>{detail.MARQUE}</span>;
                    }
                    return null;
                  })}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <Link
            key={index}
            to={`${location.pathname}?page=${index + 1}`}
            onClick={() => {
              handlePageChange(index + 1);
              scrollToTop();
            }}
            className="pages"
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </main>
  );
};
export default Home;
