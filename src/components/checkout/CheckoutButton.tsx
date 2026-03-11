// "use client";

// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
// );

// export default function CheckoutButton() {
//   const handleCheckout = async () => {
//     const res = await fetch("/api/checkout", {
//       method: "POST",
//     });

//     const data = await res.json();

//     window.location.href = data.url;
//   };

//   return <button onClick={handleCheckout}>Pay Now</button>;
// }
