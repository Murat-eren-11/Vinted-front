import "./Payment.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(`${import.meta.env.STRIPE_KEY}`);

const Payment = () => {
  const location = useLocation();
  const { title, price } = location.state;

  console.log("Title:", title);
  console.log("Price:", price);

  const options = {
    mode: "payment",
    amount: Number((price * 100).toFixed(0)),
    currency: "eur",
  };

  return (
    <div className="cardpayment">
      <div className="payinfo">
        <p>
          Vous avez choisi {title} qui coûte {price}
        </p>
      </div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm articleName={title} articlePrice={price} />
      </Elements>
    </div>
  );
};

export default Payment;
