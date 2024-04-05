import Stripe from "stripe";

import { ButtonCheckout } from "@/app/components/ButtonCheckout";

async function loadPrices() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const prices = await stripe.prices.list();
  return prices.data;
}

const PricingPage = async () => {
  const prices = await loadPrices();
  return (
    <div className="place-items-center grid bg-slate-50 h-screen">
      <section className="flex flex-1 justify-center items-center gap-5 w-full">
        {prices.map((price) => (
          <div key={price.id} className="bg-white shadow px-10 py-8 rounded-2xl max-w-sm">
            <p className="font-bold text-blue-400 text-left text-sm capitalize">Monthly</p>
            <p className="my-3 font-extrabold text-4xl text-neutral-800"> {price.nickname}</p>
            <p className="font-extrabold text-5xl text-left">
              ${price.unit_amount / 100}{" "}
              <span className="font-semibold text-base text-neutral-600"> / {price.currency} </span>
            </p>
            <p className="my-4 font-normal text-left text-pretty text-sm">
              Monthly access to all current and future content. Cancel anytime.
            </p>
            <ul className="space-y-1.5 my-8 text-left text-sm">
              <li> ✅ Unlimited access to all content</li>
              <li> ✅ 24/7 support</li>
              <li> ✅ Access to exclusive content</li>
              <li> ✅ No hidden fees</li>
              <li> ✅ Cancel anytime</li>
              <li> ✅ No credit card required</li>
              <li> ✅ 100% money back guarantee</li>
              <li> ✅ 30-day money back guarantee</li>
            </ul>
            <ButtonCheckout priceId={price.id} />
          </div>
        ))}
      </section>
    </div>
  );
};
export default PricingPage;
