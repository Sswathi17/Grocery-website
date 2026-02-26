import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import axios from "axios";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

// Pages (User)
import Home from "./pages/Home";
import Login from "./pages/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";

// Pages (Seller)
import SellerLogin from "./pages/Seller/SellerLogin";
import SellerLayout from "./pages/Seller/SellerLayout";
import AddProduct from "./pages/Seller/AddProduct";
import ProductList from "./pages/Seller/ProductList";
import Orders from "./pages/Seller/Orders";

// Context
import { useAppContext } from "./context/AppContext";

// =========================
// ✅ Add API base URL here
// Replace this after Render deployment
const API_BASE_URL = "http://localhost:4000/api";
// Example after deployment: "https://grocery-website-1ja9.onrender.com"
// =========================

const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.startsWith("/seller");

  const { showUserLogin, setShowUserLogin, isSeller } = useAppContext();

  // Example of state for products
  const [products, setProducts] = useState([]);

  // Fetch products example
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products/list`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Close user login modal on route change
  useEffect(() => {
    setShowUserLogin(false);
  }, [location.pathname, setShowUserLogin]);

  return (
    <div className="min-h-screen text-gray-700 bg-white flex flex-col">
      {/* Navbar only for USER pages */}
      {!isSellerPath && <Navbar />}

      {/* User Login Modal */}
      {showUserLogin && <Login />}

      <Toaster />

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"
        }`}
      >
        <Routes>
          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route
            path="/products/:category/:id"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* SELLER ROUTES */}
          <Route path="/seller">
            {/* Seller Login */}
            <Route
              path="login"
              element={isSeller ? <Navigate to="/seller" /> : <SellerLogin />}
            />

            {/* Protected Seller Dashboard */}
            <Route
              element={
                isSeller ? <SellerLayout /> : <Navigate to="/seller/login" />
              }
            >
              <Route index element={<AddProduct />} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-20 text-2xl">404 Page Not Found</h1>
            }
          />
        </Routes>
      </div>

      {/* Footer only for USER pages */}
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
