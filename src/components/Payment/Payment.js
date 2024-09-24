import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ShoppingContext from "../../context/Shopping/shoppingContext";
import "./Payment.css";
import CheckoutProduct from "../Checkout/CheckoutProduct";
import axios from "../../axios";
import CurrencyFormat from "react-currency-format";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { db } from "../Firebase";

const Payment = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { basket, user, getBasketTotal, emptyBasket } = shoppingContext;

  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // Generate the special stripe secret which will allow us to charge the customer
    const getClientSecret = async () => {
      try {
        const response = await axios.post("/payments/create", {
          total: getBasketTotal(basket) * 100,
        });
        setClientSecret(response.data.clientSecret);
        console.log("test",response.data)
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    getClientSecret();
  }, [basket, getBasketTotal]);

  console.log("The secret is =>", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // paymentIntent = payment confirmation
      await db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      // Empty the basket
      emptyBasket();

      // Redirect the user to order page
      history.replace("/orders");
    } catch (error) {
      setError(error.message);
      setProcessing(false);
    }
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="./checkout">{basket?.length} items</Link>)
        </h1>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>1234 Acacia Avenue </p>
            <p>Flat 12</p>
            <p>Johannesburg, 2000, SA</p>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="Payment_price_container">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
