import Stripe from "stripe";

// Haal de secret key op uit de environment variable
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
              name: "Badkamer Renovatie", // Naam van het product
            },
            unit_amount: 100, // €1 in centen
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
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}