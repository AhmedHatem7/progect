import React, { useContext } from 'react'
import { ButtonContext } from '../../DashSidebarBtn/DashSidebarBtn'

export default function Dnavbar() {
 const {open,setopen}= useContext(ButtonContext)
  
  return (
    <div className='topbar position-fixed d-flex align-items-center justify-content-between'>
     <div className='d-flex align-items-center  g-5 '>
     <h4><span className='fll'>Fluffy</span> Pets</h4>

     <i onClick={()=>setopen((prev)=>!prev)} class="fa-solid fa-bars ms-2"></i>
     
     </div>
    
         </div>
  )
}
