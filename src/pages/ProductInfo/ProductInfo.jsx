// import React, { useState, useEffect } from "react";
// import { useShopContext } from "../../contexts/ShopContext";
// import { useParams } from "react-router-dom";
// import "./ProductInfo.css";
// // import NavBar from "../component/NavBar";

// function ProductInfo() {
//   const { id } = useParams();
//   const { addToCart, removeFromCart, cartItems } = useShopContext();
//   const [productData, setProductData] = useState([]);
//   useEffect(() => {
//     // Fetch product data using the product ID
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`https://dummyjson.com/products/${id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch product data");
//         }
//         const productData = await response.json();
//         setProductData(productData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData(); // Fetch product data when component mounts or ID changes
//   }, [id]);

//   // add to cart
//   const handleAddToCart = () => {
//     if (productData) {
//       // Assuming productData has a unique identifier like an ID
//       addToCart(productData.id); // Pass the unique identifier as the itemId
//     }
//   };

//   return (
//     <div className="productInfo">
//       <div className="productContainer">
//         {/* <NavBar /> */}
//         <div className="productCard">
//           <img className="productImg" src={productData.thumbnail} />
//           <div className="title-info">
//             <div className="name-price">
//               <span>{productData.title}</span>
//               <span>${productData.price}</span>
//             </div>
//             <div className="buttons">
//               <button onClick={handleAddToCart}>Add to Cart</button>
//             </div>
//           </div>
//           <div className="description">
//             <p>{productData.description}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductInfo;


import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductInfo.css";
import useShopStore from "../../store/cart-store";
import useApiStore from "../../store/api-store";
import useUserStore from "../../store/user-store";

function ProductInfo() {
  const { id } = useParams();
  const { cartItems, addToCart, fetchCartFromDatabase } = useShopStore();
  const { products, fetchData } = useApiStore();
  const { user } = useUserStore();

  useEffect(() => {
    fetchData(); // Fetch product data when component mounts
    if (user) {
      fetchCartFromDatabase(user.userId); // Fetch cart data when component mounts
    }
  }, [fetchData, fetchCartFromDatabase, user]);

  // Find the product with the given ID
  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return <div>Loading...</div>;
  }

  const cartItemAmount = cartItems[product.id] || 0;


  return (
    <div className="productInfo">
      <div className="productContainer">
        <div className="productCard">
          <img className="productImg" src={product.thumbnail} alt={product.title} />
          <div className="title-info">
            <div className="name-price">
              <span>{product.title}</span>
              <span>${product.price}</span>
            </div>
            <div className="buttons">
              <button onClick={() => addToCart(product.id)}>Add to Cart{cartItemAmount > 0 && `(${cartItemAmount})`}</button>
            </div>
          </div>
          <div className="description">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
