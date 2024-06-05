import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import Cart from "./pages/Cart/Cart";
import Layout from "./component/Layout";
import { ShopContextProvider } from "./contexts/ShopContext";
import Register from "./pages/Login-Register/Register";
import Login from "./pages/Login-Register/Login";
import Profile from "./pages/Profile/Profile";
import useUserStore from "./store/user-store";

function App() {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <ShopContextProvider user={user}>
      <BrowserRouter>
        <Routes>
          {/* Routes with Layout (including Navbar) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* Routes without Layout (excluding Navbar) */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ShopContextProvider>
  );
}

export default App;
