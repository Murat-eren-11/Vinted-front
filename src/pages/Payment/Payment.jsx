import "./Payment.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API);
const Payment = () => {
  const location = useLocation();
  const { title, price } = location.state;

  const options = {
    mode: "payment",
    amount: Number((price * 100).toFixed(0)),
    currency: "eur",
  };
  const total = Number(price) + 0.4 + 0.8;
  return (
    <div className="paymentpage">
      <div className="cardpayment">
        <div className="payinfo">
          <small className="title">Résumé de la commande</small>
          <div className="contenu">
            <div className="payligne">
              <p>Commande</p>
              <p>{price} €</p>
            </div>
            <div className="payligne">
              <p>Frais protection acheteurs</p>
              <p>0.40 €</p>
            </div>
            <div className="payligne">
              <p>Frais de port</p>
              <p>0.80 €</p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="contenu">
            <div className="payligne">
              <p className="gras">Total :</p>
              <p className="gras">{total}</p>
            </div>
          </div>
        </div>
        <div className="partiebasse">
          <div className="contenubas">
            Il ne vous reste plus qu'une étape pour vous offrir{" "}
            <span className="gras">{title}</span>. Vous allez payer{" "}
            <span className="gras">{price} €</span> (frais de protection et
            frais de port inclus).
            <div className="divider"></div>
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm title={title} price={price} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
