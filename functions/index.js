const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51PYC9FDyqG2OZZ2Obooa6b2BLINlGJm6hukNOGDEZeTUm8tMxL0YeDSHKRHFEts9sjMoqveMINYskKh0cG3Jswog00gQ8qjjEY"
);

// -API

// -APP Config
const app = express();

// -Middleware
app.use(
  cors({
    origin: true
  })
);
app.use(express.json());

// - API Routes
app.get("/", (req, res) => res.status(200).send("Hello World!"));
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment request received", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // if okay created
  console.log("client secret", paymentIntent.client_secret);
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen Commands
exports.api = functions.https.onRequest(app);
