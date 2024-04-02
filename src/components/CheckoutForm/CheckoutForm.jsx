import {
  PaymentElement,
  //   CardElements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ articleName, articlePrice }) => {
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

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}v2/payment`,
        {
          title: articleName,
          amount: articlePrice,
        }
      );
      const clientSecret = response.data.client_secret;

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements: elements,
        clientSecret: clientSecret,

        // confirmParams: {
        //     return_url:
        // }
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        setPaymentIsDone(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(errorMessage);
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
