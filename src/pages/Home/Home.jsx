import "./Home.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ searchTitle, priceRange, sortValue, token }) => {
  //Un state pour les articles, stocké dans un array
  const [articles, setArticles] = useState([]);
  //State pour le nombre de page total qu'il y aura
  const [totalPages, setTotalPages] = useState(0);
  //un state pour savoir à quel page on est
  const [currentPage, setCurrentPage] = useState(1);
  //limit pour avoir la limite d'affichage d'article par page
  const limit = 8;
  //bon, je présente pas location
  const location = useLocation();
  //Un useEffect pour appeler les données stocké dans l'API
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}offers`
        );
        if (isMounted) {
          const allArticles = response.data.offers;
          //Pour le filtre de la barre de recherche
          const filteredArticles = allArticles.filter((article) =>
            article.product_name
              .toLowerCase()
              .includes(searchTitle.toLowerCase())
          );
          //Le filtre pour les prix compris entre et entre
          const priceFilteredArticles = filteredArticles.filter(
            (article) =>
              article.product_price >= priceRange[0] &&
              article.product_price <= priceRange[1]
          );
          //pour les prix descendant et ascendant
          const sortedArticles = priceFilteredArticles.sort((a, b) => {
            if (sortValue === "price-asc") {
              return a.product_price - b.product_price;
            } else if (sortValue === "price-desc") {
              return b.product_price - a.product_price;
            }
            return 0;
          });
          //Pour la pagination
          const startIndex = (currentPage - 1) * limit;
          const paginatedArticles = sortedArticles.slice(
            startIndex,
            startIndex + limit
          );
          //On revoit le nombre de page + les articles paginé
          setArticles(paginatedArticles);
          setTotalPages(Math.ceil(sortedArticles.length / limit));
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [currentPage, searchTitle, priceRange, sortValue]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //Une fonction pour remonter en haut de page que j'appelle dans ma pagination afin de
  //remonter quand je change de page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  //S'il n'y a pas d'article, ou si ce n'est pas dans un array, ça fait charger la page
  if (!articles || !Array.isArray(articles)) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <section className="banniere">
        <img src="../../../dechirure.svg" alt="" className="dechire" />
        <div className="carreaccueil">
          Prêt à faire du tri dans vos placards ?
          <Link to={token ? "/publish" : "/connexion"}>
            <button className="startsell">Commencez à Vendre</button>
          </Link>
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
                  src={article.product_pictures[0].secure_url}
                  className="artimg"
                  alt=""
                />
                <div className="prixtaillemarque">
                  <span>{article.product_price} €</span>
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
