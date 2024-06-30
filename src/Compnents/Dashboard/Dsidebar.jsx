import React, { useContext } from 'react'
import'./Dashbord'
import { Link, NavLink } from 'react-router-dom'
import { ButtonContext } from '../../DashSidebarBtn/DashSidebarBtn'
export default function Dsidebar() {
  const {open,setopen}= useContext(ButtonContext)
  console.log(open)
  
  return (
    <>
    
    <nav style={{width:open?'170px':'50px',padding:'16px 14px'}} className='DSidebar     pt-3 DsidebarLink '>
        
        <NavLink 
        to='Alluser' className='d-flex  align-items-center  gap-2'>
          <i className="fa-solid fa-users "></i>
            <p className='m-0 ' style={{display:open?'block':'none'}}>users</p>
        </NavLink>
  
       
       <NavLink 
        to='DashAllVet' className='d-flex  align-items-center mt-4  gap-2'>
          <i className="fa-solid fa-stethoscope "></i>
            <p className='m-0 ' style={{display:open?'block':'none'}}>Doctors</p>
        </NavLink>
      
        <NavLink 
        to='DashAllPet' className='d-flex  align-items-center mt-4  gap-2'>
         <i class="fa-solid fa-cat"></i>
            <p className='m-0 ' style={{display:open?'block':'none'}}>pets</p>
        </NavLink>
       
       
        <NavLink 
        to='DashAllProduct' className='d-flex  align-items-center mt-4  gap-2'>
          <i class="fa-brands fa-shopify"></i>
            <p className='m-0 ' style={{display:open?'block':'none'}}>products</p>
        </NavLink>
      
    
    </nav>
  
    </>
    )
}
/*


  
*/