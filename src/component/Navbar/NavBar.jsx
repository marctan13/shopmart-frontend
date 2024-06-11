import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useShopContext } from "../../contexts/ShopContext";
import "../../colors.css"

function NavBar() {
  const navigate = useNavigate();
  const { cartItems } = useShopContext();

  const handleShopClick = () => {
    // Check if the current path is already '/'
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      // If not, navigate to the root path
      navigate("/");
    }
  };


  return (
      <div className="navbar">
        <div className="title">
          <h1>Shopmart</h1>
        </div>
        <div className="nav-links">
          <Link to="/">
            <span className="link" onClick={handleShopClick}>
              Shop
            </span>
          </Link>
          <Link to="/login">
            <span className="link">
              Login
            </span>
          </Link>
          <Link to="/cart">
            <span className="link">Cart</span>
          </Link>
          <Link to="/profile">
            <span className="link">Profile</span>
          </Link>
        </div>
      </div>
  );
}

export default NavBar;
