import React from "react";
import Product from "../Product/Product";
import "./Product.css";

const Products = () => {
  return (
    <>
      <div className="products_row">
        <Product
          key="1"
          id="1"
          title="BAIMEI IcyMe Jade Roller & Gua Sha, Face Roller Redness Reducing Skin Care Tools, Self Care Pink Gift for Men Women, Massager for Face, Eyes, Neck, Relieve Fine Lines and Wrinkles - Rose Quartz"
          image="https://m.media-amazon.com/images/I/61QTMWfq1gL._SX679_.jpg"
          rating={4}
          price={12.99}
        />
        <Product
          id="2"
          title="Eyeshadow By Wet n Wild Color Icon 10-Pan Eye Makeup Palette, Pink Heart And Sol, Long Lasting, Shimmer, Metallic, Glittery, Matte, Rich Smooth Pigment, Cruelty Free"
          image="https://m.media-amazon.com/images/I/81LyDl6Td9L._SX679_.jpg"
          rating={4}
          price={5.47}
        />
        <Product
          id="3"
          title="grace & stella Award Winning Under Eye Mask (Pink, 24 Pairs) Reduce Dark Circles, Puffy Eyes, Undereye Bags, Wrinkles - Gel Under Eye Patches - Birthday Gifts for Women - Vegan Cruelty-Free Self Care"
          image="https://m.media-amazon.com/images/I/61r80BqeYxL._SX679_.jpg"
          rating={5}
          price={21.95}
        />
      </div>
      <div className="products_row">
        <Product
          id="4"
          title="Koccido Makeup Brushes 22 Pcs Makeup Kit,Foundation Brush Eyeshadow Brush Make up Brushes Set (Pink, 22 Piece Set)"
          image="https://m.media-amazon.com/images/I/71bC5u97FYL._SX679_.jpg"
          rating={3}
          price={9.99}
        />
        <Product
          id="5"
          title="e.l.f. Monochromatic Multi Stick, Luxuriously Creamy & Blendable Color, For Eyes, Lips & Cheeks, Dazzling Peony, 0.17 oz (5 g)"
          image="https://m.media-amazon.com/images/I/61KedtnoewL._SX679_.jpg"
          rating={4}
          price={5.00}
        />
        <Product
          id="6"
          title="Tree Hut Pink Hibiscus Shea Sugar Exfoliating & Hydrating Body Scrub, 18 oz"
          image="https://m.media-amazon.com/images/I/81FfMk0QzRL._SX679_.jpg"
          rating={5}
          price={7.87}
        />
      </div>
    </>
  );
};

export default Products;
