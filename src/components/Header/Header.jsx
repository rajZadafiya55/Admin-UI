import React from "react";
import "../../styles/header.css";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const auth = JSON.parse(localStorage.getItem("AdminData"));
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("AdminData");
    navigate("/", { replace: true });
  };

  return (
    <div className="header">
      <img src="/photos/logo.png" className="res-logo" alt="logo" />
      <Link className="lgbtn" to="/" onClick={logOut}>
        Logout ( {auth.firstName} )
      </Link>
    </div>
  );
};

export default Header;
