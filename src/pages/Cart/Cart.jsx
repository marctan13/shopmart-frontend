import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import "../../colors.css"
import useShopStore from "../../store/cart-store";
import useApiStore from "../../store/api-store";
import useUserStore from "../../store/user-store";

function Cart() {
  const navigate = useNavigate();
  const {cartItems, addToCart, removeFromCart, fetchCartFromDatabase, removeProductFromCart } = useShopStore();
  const {products, fetchData} = useApiStore();
  const {user} = useUserStore();

  useEffect(() => {
    fetchData(); // Fetch product data when component mounts
    if(user){
      fetchCartFromDatabase(user.userId); // Fetch cart data when component mounts
    }
  }, [fetchData, fetchCartFromDatabase, removeProductFromCart]);

  // Function to filter products based on IDs in cartItems
  const filteredProducts = products.filter(product => Object.keys(cartItems).includes(String(product.id)));

  // Function to render the items in the cart and calculate grand total
  const renderCartItems = () => {
    // Check if cartItems is empty
    if (Object.keys(cartItems).length === 0) {
      return <p>Your cart is empty.</p>;
    }

    // Initialize grand total
    let grandTotal = 0;

    // Map over each item in filteredProducts and render its information
    const cartItemsList = filteredProducts.map((product) => {
      // Calculate total amount for the current product
      const totalAmount = product.price * cartItems[product.id];
      // Add the total amount to grand total
      grandTotal += totalAmount;

      // Return JSX for the current product
      return (
        <div className="cart-item" key={product.id}>
          <li>
            <strong>{product.title}</strong> Quantity: {cartItems[product.id]} Amount: ${totalAmount}
          </li>
          <div className="buttons">
            <button onClick={() => addToCart(product.id)}>+</button>
            <button onClick={() => removeFromCart(product.id)}>-</button>
            <button onClick={() => removeProductFromCart(product.id)}>Remove</button>
          </div>
        </div>
      );
    });

    // Return JSX for cart items and grand total
    return (
      <div className="list">
        <ul>{cartItemsList}</ul>
        <p>Grand Total: ${grandTotal}</p>
      </div>
    );
  };

  return (
    <div className="cart">
      <div className="cart-container">
        <div className="cart-items">
          <h2>Cart</h2>
          {renderCartItems()}
        </div>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
        <button>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
