import "./App.css";
import { useContext, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Products from "./components/Product/Products";
import Header from "./components/Layouts/Header";
import ProductsDetails from "./components/Product/ProductsDetails";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import ShoppingContext from "./context/Shopping/shoppingContext";
import { auth } from "./components/Firebase";
import Checkout from "./components/Checkout/Checkout";
import Payment from "./components/Payment/Payment";
import Orders from "./components/Orders";
import Prime from "./components/Prime";

const stripePromise = loadStripe(
  "pk_test_51PYC9FDyqG2OZZ2OXPP9WKsAdwnmnNor2k9J3imHyevJydH4hdJkzl6OMUdSbjZuI9Q2SHmCMrpw2k0OCYtCASzq00mXJcuEUJ"
);

const App = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { setUser } = shoppingContext;

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("User is ->", authUser);
      
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });


  }, []);

   
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/products/:id">
            <ProductsDetails />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/payment">
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/prime">
            <Prime />
          </Route>
          <Route path="/notfound">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
