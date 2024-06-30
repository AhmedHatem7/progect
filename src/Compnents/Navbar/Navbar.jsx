import React, { useContext, useEffect } from 'react'

import { Link, NavLink } from 'react-router-dom'




export default function Navbar() {
  
  return (
  <>
<nav className="navbar navbar-expand-lg bg-light py-3   ">
  <div className="container">
    <NavLink className="navbar-brand" to=""><img src='' alt="" /> <span className='fll'>Fluffy</span> Pets</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
     <li className="nav-item">
         <NavLink className="nav-link " to="/Home">Home</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/products">Product</NavLink>
        </li>
      
        <li className="nav-item">
         <NavLink className="nav-link" to="/pets">pets</NavLink>
        </li>
        <li className="nav-item">
         <NavLink className="nav-link" to="/Doctors">Doctors</NavLink>
        </li>
       
        <li className="nav-item">
         <NavLink className="nav-link" to="/Dashbord">Dashbord</NavLink>
        </li>
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
        <li className="nav-item px-2">
         <NavLink className="nav-link position-relative " to="/Card">
      cart
          
         <i className="fa-solid fa-cart-shopping carticon">  </i>
 <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill cartnum">
  5
    <span className="visually-hidden">unread messages</span>
  </span>

  
          </NavLink>
        </li> 
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       

      
        <li className="nav-item">
       
         <NavLink className="nav-link" to="/Sginout">signout</NavLink>
        </li>
      </ul>
      </ul>
    </div>
  </div>
</nav>

  </>


  )
}

