import React from "react";
import useApiStore from "../store/api-store";

function Categories() {
  const {
    fetchSmartPhone,
    fetchFragrance,
    fetchFurniture,
    fetchGroceries,
    fetchLaptops,
  } = useApiStore();

  return (
    <div className="categories">
      <ul>
        <li onClick={() => { (async () => await fetchSmartPhone())(); }}>Smartphones</li>
        <li onClick={() => { (async () => await fetchLaptops())(); }}>Laptops</li>
        <li onClick={() => { (async () => await fetchFragrance())(); }}>Fragrances</li>
        <li onClick={() => { (async () => await fetchFurniture())(); }}>Furniture</li>
        <li onClick={() => { (async () => await fetchGroceries())(); }}>Groceries</li>
      </ul>
    </div>
  );
}

export default Categories;