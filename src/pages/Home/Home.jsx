import React, { useEffect, useState } from "react";
import Product from "../../component/Product";
import Categories from "../../component/Categories";
import "./Home.css";
import "../../colors.css";

function Home() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const products = data.products;

  async function fetchWithAuth(url, options = {}) {
    const jwt = localStorage.getItem("jwt");

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });

    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }

    return response.json();
  }

  useEffect(() => {
    fetchWithAuth("http://localhost:3000/user")
      .then((user) => setUser(user))
      .catch((error) => console.error("Failed to fetch user:", error));
  }, []);

  const jwtToken = localStorage.getItem("token");
  console.log("JWT Token:", jwtToken);
  return (
    <div className="home">
      <div className="home-container">
      <h2>Welcome, {user ? user.firstName : "Guest"}!</h2>
        {/* <NavBar /> */}
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

export default Home;
