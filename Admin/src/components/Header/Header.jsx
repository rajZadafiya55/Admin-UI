import React from 'react';
import '../../styles/header.css'
import { Link } from 'react-router-dom';
import {useNavigate }from 'react-router-dom';

const Header = () => {
  const auth = JSON.parse(localStorage.getItem('AdminData'));
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem('AdminData');
    navigate('/login')
  }

  return (
    <div className='header'>
      {/* <h2>Restaurant</h2> */}
      <img src="/photos/logo.png" className="res-logo"  alt="logo"/>
      <Link className='lgbtn' to="/login" onClick={logOut}>Logout ( {auth.firstName} )</Link>
    </div>
  )
}

export default Header
