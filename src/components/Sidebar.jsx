import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/sidebar.css";
import Header from "./Header/Header";
import { FaHome, FaHamburger, FaShoppingCart, FaCreditCard, FaChair, FaStar, FaBox, FaPhone } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="menu">
        <NavLink to="/dashboard" activeClassName="active-link">
          <span className="icon">
            <FaHome />
          </span>
          <span className="text">Dashboard</span>
        </NavLink>
        <NavLink to="/menu" activeClassName="active-link">
          <span className="icon">
            <FaHamburger />
          </span>
          <span className="text">Menu</span>
        </NavLink>
        <NavLink to="/order" activeClassName="active-link">
        <span className="icon"><FaShoppingCart /></span>
          <span className="text">Order</span>
        </NavLink>
        <NavLink to="/payment" activeClassName="active-link">
        <span className="icon"><FaCreditCard /></span>
          <span className="text">Payment</span>
        </NavLink>
        <NavLink to="/table" activeClassName="active-link">
        <span className="icon"><FaChair /></span>
          <span className="text">Table</span>
        </NavLink>
        <NavLink to="/category" activeClassName="active-link">
        <span className="icon"><FaBox /></span>
          <span className="text">Category</span>
        </NavLink>
        <NavLink to="/review" activeClassName="active-link">
        <span className="icon"><FaStar /></span>
          <span className="text">Review</span>
        </NavLink>
        <NavLink to="/contact" activeClassName="active-link">
        <span className="icon"><FaPhone /></span>
          <span className="text">Contact</span>
        </NavLink>
      </div>
      <div className="page-content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
