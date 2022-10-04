import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import logo from './assets/Images/logo.jpeg'
import { useNavigate } from 'react-router-dom';

import Badge from "@material-ui/core/Badge";


function Nav() {
  const userval = JSON.parse(localStorage.getItem('user'))
  console.log("USERDATA^^^^^",userval)
  console.log("ID^^^^^",userval?.Aptoken)
  const navigate = useNavigate();


  const goDashboard = ()=>{
    navigate('/dashboard',{state:{   userid: userval?.specturmId,
   Aptoken:userval?.Aptoken}})
  }
    const onlogout=()=>{
      localStorage.clear();
     navigate('/login')
  }
  const onNext = ()=>{
    navigate('/patienthome')
  }

  return (

    <div>
      <h1 className="web-title">Healthline </h1>
      {userval?
        <div className="nav-container">
        <nav>
            
          <h2>
         
            {/* Badged */}
            <Badge  color="primary">
              {/* <Link className={cartState} to="/cart" onClick={setTheCart}>
                {" "}
                <img
                  alt="cart"
                  title="cart"
                  className="nav-cart"
                  src={cartImage2}
                />{" "}
              </Link> */}
            <a> <h2 onClick={onNext} className="hvr-underline-from-center nav-link">Home</h2></a> 
            <a> <h2 onClick={goDashboard} className="hvr-underline-from-center nav-link">dashboard</h2></a> 
            <a>  <h2 onClick={onlogout} className="hvr-underline-from-center nav-link">Logout</h2></a> 
            </Badge>
          </h2>
        </nav>
      </div>
    :  <div className="nav-container">
    <nav>
        
      <h2>
     
        {/* Badged */}
        <Badge  color="primary">
          {/* <Link className={cartState} to="/cart" onClick={setTheCart}>
            {" "}
            <img
              alt="cart"
              title="cart"
              className="nav-cart"
              src={cartImage2}
            />{" "}
          </Link> */}
        <a href="/patienthome">  <h2  className="hvr-underline-from-center nav-link">Home</h2></a>
        <a href="/register">  <h2 className="hvr-underline-from-center nav-link">SignUp</h2></a>
        {/* <a >  <h2 className="hvr-underline-from-center nav-link">About</h2></a> */}
       
        </Badge>
      </h2>
    </nav>
  </div>}
    </div>
  );
}

export default Nav;
