const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "pk_test_51PYC9FDyqG2OZZ2OXPP9WKsAdwnmnNor2k9J3imHyevJydH4hdJkzl6OMUdSbjZuI9Q2SHmCMrpw2k0OCYtCASzq00mXJcuEUJ"
);

// -API

// -APP CONFIG
const app = express();

// -Middleware
app.use(
  cors({
    origin: true,
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

// - LISTEN COMMANDS
exports.api = functions.https.onRequest(app);
