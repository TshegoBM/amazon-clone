import React from "react";
import "./Home.css";
import Products from "../Product/Products";

const Home = () => {
  return (
    <div>
      <div className="home">
        <div className="home_container">
          <img
            className="home_image"
            src="https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg"
            alt="amazon banner"
          />
          <Products />
        </div>
      </div>
    </div>
  );
};
export default Home;
