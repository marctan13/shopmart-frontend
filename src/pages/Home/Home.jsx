import React, { useEffect, useState } from "react";
import Product from "../../component/Product";
import Categories from "../../component/Categories";
import "./Home.css";
import "../../colors.css";
import useApiStore from "../../store/api-store";
import useUserStore from "../../store/user-store";
import useShopStore from "../../store/cart-store";


function Home() {
  const [data, setData] = useState([]);
  const {products, fetchData} = useApiStore(); 
  const {user} = useUserStore();
  const {cartItems, fetchCartFromDatabase} = useShopStore();
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (user) {
      fetchCartFromDatabase(user.userId);
    }
  }, [user, fetchCartFromDatabase]);

  console.log("Cart Items", cartItems)
  return (
    <div className="home">
      <div className="home-container">
      <h2>Welcome, {user ? user.firstName : "Guest"}!</h2>
        <Categories data={data} setData={setData} />
        <div className="products">
          {products &&
            products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home
