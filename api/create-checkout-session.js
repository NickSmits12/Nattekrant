import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Badkamer Renovatie",
            },
            unit_amount: 100, // €1
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://nattekrant.vercel.app/success.html",
      cancel_url: "https://nattekrant.vercel.app/cancel.html",
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: err.message });
  }
}