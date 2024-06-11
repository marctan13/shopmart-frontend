import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useShopStore from "../store/cart-store";
import useUserStore from "../store/user-store";

function Product({ product }) {
  const { user } = useUserStore();
  const { addToCart, cartItems } = useShopStore();

  const handleAddToCart = (productId) => {
    if (user) {
      addToCart(productId);
    }
  };

  const cartItemAmount = cartItems[product.id] || 0;

  // const handleRemoveFromCart = (productId) => {
  //   if (user) {
  //     removeFromCart(productId);
  //   }
  // };

  return (
    <div className="productCard">
      <Link to={`/product/${product.id}`}>
        <img className="productImg" src={product.images[0]} />
      </Link>
      <div className="title-info">
        <span>{product.title}</span>
        <span>${product.price}</span>
      </div>
      <div className="buttons">
        <Link to={`/product/${product.id}`}>
          <button>Info</button>
        </Link>
        <button onClick={() => handleAddToCart(product.id)}>Add to Cart{cartItemAmount > 0 && `(${cartItemAmount})`}</button>
        {/* <button onClick={() => handleRemoveFromCart(product.id)}>Remove from Cart</button> */}
      </div>
    </div>
  );
}

export default Product;
