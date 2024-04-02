import {
  PaymentElement,
  //   CardElements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ title, price }) => {
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState();
  const [paymentIsDone, setPaymentIsDone] = useState();

  const stripe = useStripe();

  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      if (elements == null) {
        return;
      }
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }
      console.log("title is : ", title);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          title: title,
          amount: price,
        }
      );

      const clientSecret = response.data.client_secret;

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements: elements,
        clientSecret: clientSecret,

        confirmParams: {
          return_url: "https://localhost:5173/",
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage("why", error.message);
      }

      if (paymentIntent.status === "succeeded") {
        setPaymentIsDone(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return paymentIsDone ? (
    <p>Merci pour votre achat</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button type="submit" disabled={!stripe || !elements || isLoading}>
        Payer
      </button>
    </form>
  );
};

export default CheckoutForm;
