// src/containers/App.js
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
import Order from "./pages/Order";
import Table from "./pages/Table";
import Menu from "./pages/Menu";
import Review from "./pages/Review";
// import Sidebar from "./components/Sidebar";
import LoginForm from "./components/Login";
import Category from "./pages/Category";
import Payment from "./pages/Payment";

const RouterAdmin = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={ <LoginForm />}>
            <Route path="/order" element={<Order/>} />
            <Route path="/table" element={<Table/>} />
            <Route path="/menu" element={<Menu/>} />
            <Route path="/review" element={<Review/>} />
            <Route path="/category" element={<Category/>} />
            <Route path="/payment" element={<Payment/>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default RouterAdmin;
