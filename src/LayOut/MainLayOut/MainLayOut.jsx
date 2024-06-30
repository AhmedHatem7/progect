import React from 'react'
import Navbar from '../../Compnents/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../Compnents/Footer/Footer'

export default function MainLayOut() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <div className="footer">
      <Footer/>
      </div>
    
    </div>
    
   
  )
}
