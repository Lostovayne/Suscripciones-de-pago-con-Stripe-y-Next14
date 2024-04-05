"use client";
import { redirect } from "next/navigation";

const SendPriceId = async (priceId) => {
  const response = await fetch("/api/checkout", {
    body: JSON.stringify({ priceId }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const data = await response.json();

  if (data.url) {
    window.location.href = data.url;
  } else {
    redirect("/pricing");
  }
};

export const ButtonCheckout = ({ priceId }) => {
  return (
    <button onClick={() => SendPriceId(priceId)} className="bg-neutral-900 px-8 py-2 rounded-xl w-full text-white">
      Subscribe
    </button>
  );
};
