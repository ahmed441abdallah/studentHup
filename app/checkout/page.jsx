"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useSearchParams } from "next/navigation";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const Checkout = () => {
  const searchParams = useSearchParams();
  const totalAmount = Number(searchParams.get("amount"));
  const options = {
    // passing the client secret obtained from the server
    mode: "payment",
    currency: "usd",
    amount: totalAmount,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
