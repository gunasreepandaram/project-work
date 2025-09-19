import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Importing Components
import Home from "./Home";
import Signin from "./shared/Login";
import Signup from "./shared/CreateAccount";
import ResetPassword from "./shared/ResetPassword";
import MyEditor from "./MyEditor";
import Search from "./products/Search";
import SingleProduct from "./products/SingleProduct";
import Addresses from "./address/Addresses";
import Cart from "./products/Cart";
import TestProducts from "./Test/TestProducts";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/create-account" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/editor" element={<MyEditor />} />
        <Route path="/product-search" element={<Search />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/test-products" element={<TestProducts />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// Performance Monitoring (Optional)
reportWebVitals();
