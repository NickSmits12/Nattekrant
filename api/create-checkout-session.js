import Stripe from "stripe";

const stripe = new Stripe("sk_test_51TAAAiLc89Q6vw6m1ASN3a5ixS6abonwcguscYKOz5fDKY1xVFQTdqciwS3M5KAzc9DvMpkcB9UPTuVsT2B0C9YQ00jTx9TOqn");

export default async function handler(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Test Product",
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
    res.status(500).json({ error: err.message });
  }
}