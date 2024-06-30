import React from 'react'
import { NavLink } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

export default function AuthLayOut() {
  return (
    <>
   {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/signin">sign in</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">sign up</NavLink>
        </li>
        
       
      </ul>
     
    </div>
</nav> */}
    <Outlet/>
  </>
  )
}
