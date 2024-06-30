import React, { useContext, useEffect } from 'react'

import { Link, NavLink, Outlet } from 'react-router-dom'




export default function VetsLayout() {
  
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
         <NavLink className="nav-link " to="/AddVetService">Add Service</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/AddWorkingHours">Working Hours</NavLink>
        </li>
        <li className="nav-item">
         <NavLink className="nav-link" to="/VetsComments">New Acricle</NavLink>
        </li>
     
        
       
        
       
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
        <li className="nav-item px-2">
        
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
<Outlet/>
  </>


  )
}



