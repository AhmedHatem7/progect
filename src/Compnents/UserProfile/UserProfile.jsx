// import axios from 'axios'
// import React, { useContext, useState } from 'react'
// import { idContext } from '../../context/IdContext/IdContext'
// import { useQuery } from 'react-query'
// import { Link, Outlet } from 'react-router-dom'
// import UserPets from '../UserPets/UserPets'
// import UserProducts from '../UserProducts/UserProducts'

// export default function UserProfile() {
//    const {userId,Vetid}= useContext(idContext)
//    const token=localStorage.getItem('tkn')
//    const [showComponent1, setShowComponent1] = useState(false);
//    const toggleComponent1 = () => {
//     setShowComponent2(showComponent2)
//     setShowComponent1(!showComponent1);
//    };
//    const [showComponent2, setShowComponent2] = useState(false);
//    const toggleComponent2 = () => {
//     setShowComponent1(showComponent1);
//     setShowComponent2(!showComponent2);
//    };
//     function getUserData(){
        
//          return axios.get(`http://fluffypet.runasp.net/Get-Current-User`,{
//             headers:{
//                 Authorization:  `Bearer ${token}`
//             }
//          })
//     }
//     const {data,isLoading,isError}=useQuery('getUserData',getUserData)
//     console.log('userProfile',data)
 
    

//     const [activeIcon, setActiveIcon] = useState(null);
  
//     const handleIconClick = (iconId) => {
//       setActiveIcon(iconId);
//     };
  
//     const renderComponent = () => {
//       if (activeIcon === 'icon1') {
//         // Fetch or set the component data for icon1
//         const componentData = fetchData(); // Replace with your data fetching logic
//         return <ComponentToShow data={componentData} />;
//       } else if (activeIcon === 'icon2') {
//         // Fetch or set the component data for icon2
//         const componentData = fetchData(); // Replace with your data fetching logic
//         return <ComponentToShow data={componentData} />;
//       } else {
//         return null;
//       }
//     }
 
 
//  return  <>
//       <div className="container">
//         <div className="row d-flex justify-content-between border-2 border-bottom py-3 my-2">
//             <div className="col-md-2">
//                  <div>
//                     <img className='w-100 profilePhoto' src={`http://fluffypet.runasp.net/${data?.data.image}`}/>
//                  </div>
//             </div>
//             <div className="col-md-9 bg-danger">
//                 <div>
//                 <div className='d-flex'>
//                 <h4>{data?.data.userName}</h4>
//                 <button className='btn btn-warning text-white mx-5 lable w-25' > Edit profile</button>
//                 </div>
//                 <h3 className='my-3'>{data?.data.firstName +' '+ data?.data.lastName}</h3>
//                 </div>
               
             
//             </div>
//         </div>
//      <div className="row">
//         <div className='d-flex justify-content-between'>
//              <div>
//              <Link onClick={toggleComponent1} className='lable' role='tab'> <i className="fa-solid fa-paw"></i> Pets </Link>
          
//              <Link onClick={toggleComponent2} className='lable' role='tab'> products </Link>
       
//              </div>
             
//              {showComponent2 && <UserProducts /> ||  showComponent1 && <UserPets />}  
            
            

          
//         </div>
//      </div>
//       </div>
//     </>
  
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserPets from '../UserPets/UserPets';
import UserProducts from '../UserProducts/UserProducts'
import { useQuery } from 'react-query';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';

const UserProfile = () => {
  const token =localStorage.getItem('tkn')
  const [userData, setUserData] = useState({});
  const [pets, setPets] = useState([]);
  const [selectedTab, setSelectedTab] = useState('pets');
  const navigate=useNavigate()

  function getUserData(){
             return axios.get(`http://fluffypet.runasp.net/Get-Current-User`,{
                headers:{
                    Authorization:  `Bearer ${token}`
                }
             })
        }
        const {data,isLoading,isError}=useQuery('getUserData',getUserData)
        console.log('userProfile',data)
       
  const handleTabChange = (tab) => {
     setSelectedTab(tab);
      };


      if(isLoading){
        return <div className='d-flex vh-100  bg-opacity-50 justify-content-center align-items-center' >
        <FallingLines
                  color="#F9BA1D"
                  width="100"
                  visible={true}
                  ariaLabel="falling-circles-loading"
             />
          </div>
       }
      
       if(isError){
        return <Navigate to='/home'/>
       }
  return (
    <div className="user-profile">
      <div className="profile-header">
      <div className="row d-flex justify-content-between">
           <div className="col-md-2">
                  <div>
                    <img className='w-100 profilePhoto' src={`http://fluffypet.runasp.net/${data?.data.image}`}/>
                  </div>
             </div>
             <div className="col-md-10 ">
                 <div>
                 <div className='d-flex'>
                 <h4>{data?.data.userName}</h4>
                 <button className='btn btn-warning text-white mx-5 lable w-25' onClick={()=>navigate('/updateuseracc')} > Edit profile</button>
                 </div>
                 <h3 className='my-3'>{data?.data.firstName +' '+ data?.data.lastName}</h3>
                 <h5 className='governrate'>{'- '+ data.data.governorate + ' Governorate'}</h5>
                 <h5 className='governrate'>{'- '+ data.data.phoneNumber }</h5>

                 </div>
               
             
             </div>
         </div>

        {/* <div className='d-flex'>
      <img src={`http://fluffypet.runasp.net/${data?.data.image}`}  />
       
      <h4>{data?.data.userName}</h4>

        </div>
       

      <h2>{data?.data.firstName + ' ' + data?.data.lastName}</h2>
       
        */}
      </div>

      <div className="profile-tabs">
        <ul>
          <li><Link className='cl lable' to="#" onClick={() => handleTabChange('pets')}> <i className="fa-solid fa-paw"></i> pets</Link></li>
          <li><Link className='cl lable' to="#" onClick={() => handleTabChange('products')}>products</Link></li>
          <li><Link className='cl lable' to="#" onClick={() => handleTabChange('feedbacks')}>feedbacks</Link></li>
        </ul>
      </div>
      {selectedTab === 'pets' && (
       <UserPets/>
      )}
      {selectedTab === 'products' && (
        <div className="profile-products">
         <UserProducts/>
        </div>
      )}
      {selectedTab === 'feedbacks' && (
        <div className="profile-saved">
        </div>
      )}
    </div>
  );
};

export default UserProfile;