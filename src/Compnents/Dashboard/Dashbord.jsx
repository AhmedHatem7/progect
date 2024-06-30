import React, { useContext } from 'react'
import Dsidebar from './Dsidebar'
import Dnavbar from './Dnavbar'
import'./Dashbord'
import { Outlet } from 'react-router-dom'
import { ButtonContext } from '../../DashSidebarBtn/DashSidebarBtn'

export default function Dashbord() {
  const {open,setopen}= useContext(ButtonContext)
  return (
    
    <div className=''>
       < Dnavbar/>
       <div style={{marginTop:'70px'}} className='dashbord d-flex  g-1  position-relative '>
       <Dsidebar/>
        <Outlet/>
       </div>
        
        
    </div>
  )
}
/* position: sticky;
style={{ marginTop:'70px',marginLeft:open?'170px':'50px'}}
 */