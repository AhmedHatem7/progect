import React, { useContext } from 'react'

import { Link, NavLink } from 'react-router-dom'
import { ButtonContext } from '../../DashSidebarBtn/DashSidebarBtn'

export default function Sidebar() {
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





























// import React, { useContext } from 'react'

// import { Link, NavLink } from 'react-router-dom'
// import { ButtonContext } from '../../DashSidebarBtn/DashSidebarBtn'

// import React from 'react'
// import { BrowserRouter as Router } from 'react-router-dom'

// import {
//   CDBSidebar,
//   CDBSidebarContent,
//   CDBSidebarFooter,
//   CDBSidebarHeader,
//   CDBSidebarMenu,
//   CDBSidebarMenuItem,
// } from 'cdbreact';
// import { NavLink } from 'react-router-dom';
// export default function Sidebar() {
//   return (
    
//   <>
//   <div style={{ display: 'flex', height: '200vh',width:'100', overflow: 'scroll initial' }}>
//       <CDBSidebar     textColor="#000" backgroundColor="#FCFCF8">
//         <CDBSidebarHeader >
//           <a href="/" className="text-decoration-none " style={{ color: '#FDB403',fontSize:'30px',width:'200px', margin: '40px'}}>
//              <span>Catalog</span>
//           </a>
//         </CDBSidebarHeader>

//         <CDBSidebarFooter style={{ textAlign: 'center' }}>
//           <div
//             className="sidebar-btn-wrapper"
//             style={{
//               padding: '10px 5px',
//             }}
//           >
//             <div  style={{ color: '#373633',fontSize:'20px', margin: '5px 40px',fontWeight:'500'}}>Pet type</div>
//    <div className='border-bottom mt-3'>
//   <div className="">
//     <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" defaultValue="option1" defaultChecked />
//     <label className="form-check-label" htmlFor="exampleRadios1">
// Cat
//     </label>
//   </div>
//   <div className="">
//     <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" defaultValue="option2" />
//     <label className="form-check-label" htmlFor="exampleRadios2">
//       Dog
//     </label>
//   </div>
//   <div className="">
//     <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" defaultValue="option3" />
//     <label className="form-check-label" htmlFor="exampleRadios3">
//       Bird
//     </label>
//   </div>
// </div>
// <div  style={{ color: '#373633',fontSize:'20px', margin: '10px 40px',fontWeight:'500'}}>Price EGP</div>
         
//           </div>

//           <div
//             className="sidebar-btn-wrapper"
//             style={{
//               padding: '10px 5px',
//             }}
//           >
//       <div>
//   {/* <label htmlFor="customRange2" className="form-label">price</label>
//   <input type="range" className="form" min={5} max={10000} id="customRange2" /> */}
// </div>

//           </div>
 
//         </CDBSidebarFooter>
//       </CDBSidebar>
//     </div>
//   </>
  
//   )
// }







         {/* <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '5px 5px',
            }}
          >
           Sidebar Footer
         
          </div>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '5px 5px',
            }}
          >
           Sidebar Footer
         
          </div> */}













/*


import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
export default function Sidebar() {
  return (
    
  <>
  <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#F4EED9">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
            <ul>
                <li>ay hagaaaaa</li>
            </ul>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  </>
  
  )
}

*/ 


// export default function Sidebar() {
//   const {open,setopen}= useContext(ButtonContext)
//   console.log(open)
  
//   return (
//     <>
    
//     <nav style={{width:open?'170px':'50px',padding:'16px 14px'}} className='DSidebar      pt-3 DsidebarLink '>
        
//         <NavLink 
//         to='Alluser' className='d-flex  align-items-center  gap-2'>
//           <i className="fa-solid fa-users "></i>
//             <p className='m-0 ' style={{display:open?'block':'none'}}>users</p>
//         </NavLink>
  
       
//        <NavLink 
//         to='DashUserDetail' className='d-flex  align-items-center mt-4  gap-2'>
//           <i className="fa-solid fa-stethoscope "></i>
//             <p className='m-0 ' style={{display:open?'block':'none'}}>Doctors</p>
//         </NavLink>
      
//         <NavLink 
//         to='DashAllPet' className='d-flex  align-items-center mt-4  gap-2'>
//          <i class="fa-solid fa-cat"></i>
//             <p className='m-0 ' style={{display:open?'block':'none'}}>pets</p>
//         </NavLink>
       
       
//         <NavLink 
//         to='DashAllProduct' className='d-flex  align-items-center mt-4  gap-2'>
//           <i class="fa-brands fa-shopify"></i>
//             <p className='m-0 ' style={{display:open?'block':'none'}}>products</p>
//         </NavLink>
      
    
//     </nav>
  
//     </>
//     )

/*


  
*/

/*


  
*/