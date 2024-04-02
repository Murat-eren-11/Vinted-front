import "./Offer.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Offer = ({ token }) => {
  const [articles, setArticles] = useState({});
  //on prend l'id du paramètre de l'url
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}offer/${id}`
        );
        setArticles(response.data);
      } catch (error) {
        console.log(error.message);
        console.log("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [id]);
  //pour le caroussel
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  //J'ai pu voir qu'il y a un package pour varier ceci et pouvoir le changer par rapport au type d'appareil
  const deviceType = "desktop";
  return (
    <main className="offremain">
      <section className="offrecontainer">
        {articles.product_pictures && articles.product_pictures.length > 1 ? (
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true}
            infinite={true}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {articles.product_pictures.map((picture, index) => (
              <div key={index} className="offerpicture">
                <img
                  src={picture && picture.secure_url}
                  className="imgofr"
                  alt={`Image ${index}`}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="offerpicture">
            <img
              src={
                articles.product_pictures &&
                articles.product_pictures[0]?.secure_url
              }
              className="imgofr"
              alt="Image"
            />
          </div>
        )}

        <div className="infosoffre">
          <div className="infopratique">
            <span className="prix">{articles && articles.product_price} €</span>
          </div>
          <div className="listinfo">
            {articles &&
              articles.product_details &&
              articles.product_details.map((detail, index) => {
                const keys = Object.keys(detail);
                const keyName = keys[0];

                return (
                  <p key={index}>
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
          {token ? (
            <Link
              to="/payment"
              state={{
                title: articles.product_name,
                price: articles.product_price,
              }}
            >
              <button className="buy">Acheter</button>
            </Link>
          ) : (
            <div className="error-message">
              Veuillez vous connecter pour acheter
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
export default Offer;
