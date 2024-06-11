import React, { useState, useEffect, createContext, useContext } from "react";

const ShopContext = createContext();

export function useShopContext() {
  return useContext(ShopContext);
}

export function ShopContextProvider({ children, user }) {
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     fetchCartFromDatabase(user);
  //   }
  // }, [user]);

  // const fetchCartFromDatabase = async (user) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`/api/cart/${user.id}`);
  //     const data = await response.json();
  //     setCartItems(data.cartItems);
  //   } catch (error) {
  //     console.error("Failed to fetch cart", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const updateCartInDatabase = async () => {
  //   try {
  //     await fetch(`/api/cart/${user.id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ cartItems }),
  //     });
  //   } catch (error) {
  //     console.error("Failed to update cart", error);
  //   }
  // };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1, // Check if item exists, if not default to 0
    }));
    updateCartInDatabase();
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0 // Ensure item quantity doesn't go below 0
    }));
    updateCartInDatabase();
  };

  const value = {
    addToCart,
    removeFromCart,
    cartItems,
  };
  return (
    <ShopContext.Provider value={value}>
      {!loading && children}
    </ShopContext.Provider>
  );
}
