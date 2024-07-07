import React, { useContext } from "react";
import "./Product.css";
import ShoppingContext from "../../context/Shopping/shoppingContext";

const Product = ({ id, image, title, rating, price }) => {
  const shoppingContext = useContext(ShoppingContext);
  const { addToBasket } = shoppingContext;

  const addToBasketHandler = () => {
    addToBasket({ item: { id, image, title, rating, price } });
  };

  return (
    <div className="product" key={id}>
      <img src={image} alt="" />
      <div className="product_info">
        <p className="product_title">{title}</p>
      </div>
      <div className="product_details">
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <button className="product_button" onClick={addToBasketHandler}>
          Add to Basket
        </button>
      </div>
    </div>
  );
};

export default Product;
