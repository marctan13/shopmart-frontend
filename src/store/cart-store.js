import { create } from "zustand";
import useUserStore from "./user-store";

const useShopStore = create((set, get) => ({
  cartItems: {},
  loading: false,
  fetchCartFromDatabase: async () => {
    const userId = useUserStore.getState().user?.userId; // Access userId from userStore
    const jwt = localStorage.getItem("jwt");
    set({ loading: true });
    try {
      const response = await fetch(`http://localhost:3000/cart/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await response.json();
      set({ cartItems: data.cartItems });
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      set({ loading: false });
    }
  },

  updateCartInDatabase: async (cartItems) => {
    try {
      const userId = useUserStore.getState().user?.userId; // Access userId from userStore
      const jwt = localStorage.getItem("jwt");
      const items = Object.entries(cartItems).map(([productId, quantity]) => [
        userId,
        productId,
        quantity,
      ]);
      const response = await fetch(`http://localhost:3000/cart/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ items }), // send the items array to the backend
      });

      if (response.ok) {
        console.log("Cart updated successfully in database");
      } else {
        console.error(
          "Failed to update cart in database:",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Failed to update cart in database:", error);
    }
  },

  addToCart: (productId) => {
    set((state) => {
      const updatedCartItems = { ...state.cartItems };
      updatedCartItems[productId] = (updatedCartItems[productId] || 0) + 1;
      get().updateCartInDatabase(updatedCartItems);
      return { cartItems: updatedCartItems };
    });
  },
  
  removeFromCart: (productId) => {
    set((state) => {
      const updatedCartItems = { ...state.cartItems };
      if (updatedCartItems[productId] > 0) {
        updatedCartItems[productId]--;
      }
      get().updateCartInDatabase(updatedCartItems);
      return { cartItems: updatedCartItems };
    });
  },
  removeProductFromCart: async (productId) => {
    try {
      const userId = useUserStore.getState().user?.userId; // Access userId from userStore
      const jwt = localStorage.getItem("jwt");
      const response = await fetch(`http://localhost:3000/cart/${userId}/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (response.ok) {
        console.log("Product removed successfully from cart in database");
        set((state) => {
          const updatedCartItems = { ...state.cartItems };
          delete updatedCartItems[productId];
          return { cartItems: updatedCartItems };
        });
      } else {
        console.error(
          "Failed to remove product from cart in database:",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Failed to remove product from cart in database:", error);
    }
  },
}));

export default useShopStore;
