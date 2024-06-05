import { create } from "zustand";

const useApiStore = create((set) => ({
  products: [],
  fetchData: async () => {
    try {
      const url = "https://dummyjson.com/products";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }
      const result = await response.json();
      set({ products: result.products });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  },
  fetchSmartPhone: async () => {
    try {
      const url = "https://dummyjson.com/products/category/smartphones";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }
      const result = await response.json();
      set({ products: result.products });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  },
  fetchFragrance: async () => {
    try {
      const url = "https://dummyjson.com/products/category/fragrances";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }
      const result = await response.json();
      set({ products: result.products });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  },
  fetchFurniture: async () => {
    try {
      const url = "https://dummyjson.com/products/category/furniture";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }
      const result = await response.json();
      set({ products: result.products });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  },
  fetchGroceries: async () => {
    try {
      const url = "https://dummyjson.com/products/category/groceries";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }
      const result = await response.json();
      set({ products: result.products });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  },
  fetchLaptops: async () => {
    try {
      const url = "https://dummyjson.com/products/category/laptops";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }
      const result = await response.json();
      set({ products: result.products });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  },
}));

export default useApiStore;