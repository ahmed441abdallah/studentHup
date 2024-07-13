import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { use, useContext, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { cartContext } from "../../_context/cartContext";
import cartApis from "../../_utils/cartApis";
import ordersApis from "../../_utils/ordersApis";
const CheckoutForm = () => {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const { cart, setCart } = useContext(cartContext);
  console.log("cart", cart);
  const totalAmount = Number(searchParams.get("amount"));
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrorMessage] = useState();
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const handleError = (error) => {
      setLoading(false);
      setErrorMessage(error.message);
    };
    createOrder();
    sendEmail();
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    const res = await fetch("api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: totalAmount,
      }),
    });
    const clientSecret = await res.json();

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-confirm",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  const createOrder = () => {
    let productsId = [];
    cart.forEach((el) => {
      productsId.push(el?.product?.id);
    });
    const data = {
      // stampa of strapi
      data: {
        email: user.primaryEmailAddress.emailAddress,
        username: user.fullName,
        amount: totalAmount,
        products: productsId, // array of ids
      },
    };
    ordersApis.createOrders(data).then((res) => {
      if (res) {
        cart.forEach((el) => {
          cartApis.deleteCartItem(el?.id).then((res) => {});
        });
      }
    });
  };
  const sendEmail = async () => {
    const res = await fetch("api/send-email", {
      method: "POST",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" mx-12 md:mx-[350px] mt-8 flex flex-col justify-center multi-gradient-background p-6 rounded-md">
        <PaymentElement />
        <button className="button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
