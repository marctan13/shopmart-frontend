//Used zustand instead of Context API

// import React, { useState, useEffect, createContext, useContext } from "react";

// const ShopContext = createContext();

// export function useShopContext() {
//   return useContext(ShopContext);
// }

// export function ShopContextProvider({ children, user }) {
//   const [cartItems, setCartItems] = useState({});
//   const [loading, setLoading] = useState(false);

//   const addToCart = (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: (prev[itemId] || 0) + 1, // Check if item exists, if not default to 0
//     }));
//     updateCartInDatabase();
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0 // Ensure item quantity doesn't go below 0
//     }));
//     updateCartInDatabase();
//   };

//   const value = {
//     addToCart,
//     removeFromCart,
//     cartItems,
//   };
//   return (
//     <ShopContext.Provider value={value}>
//       {!loading && children}
//     </ShopContext.Provider>
//   );
// }
