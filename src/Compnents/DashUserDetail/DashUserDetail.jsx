import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'

export default function DashUserDetail() {
  const token=localStorage.getItem('Token')
  let{id}=useParams()
  console.log(id)
  const [userDatail, setuserDatail] = useState([])
 async  function GetUserDetails(){
 await axios.get(`http://fluffypet.runasp.net/Get-User-Details?userId=${id}`,null,{
  headers:{
    'Authorization': 'Bearer ' + token
}}).then((data)=>{
  
   setuserDatail(data.data)
}).catch((err)=>{
console.log(err)
})
  }
  useEffect(()=>{
    GetUserDetails()
  },[])
  console.log(userDatail)
    var settings = {
    
        infinite: true,
        speed: 500,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true
        ,autoplaySpeed:1500
    }
  return (
    <div className='aha w-100 d-flex justify-content-around '>
    
      <div className='Userprofile position-relative   mt-3 rounded-3'>
        <div className='cardname'> User profile</div>
      <div className="row border border-warning border-bottom ">
        <div className="col-md-5 text-center">
        <div className='rounded rounded-circle overflow-hidden     xx '>
            <div>  <img src={'http://fluffypet.runasp.net/'+userDatail.image}className='w-100  ' alt="" /></div>
            </div>
            <h2 className='ms-5' >{userDatail.userName}</h2>
        </div>
        <div className="col-md-6 mt-4 ">
        <div className='userLocation  mt-5 d-flex align-items-center justify-content-start'>
        <i class="fa-solid locationIcon fa-envelope"></i>
<h5 className='ms-2'>{userDatail.email}</h5>

          </div>
          <div className='userLocation mt-3  d-flex align-items-center justify-content-start'>
          <i class="fa-solid locationIcon fa-phone-volume"></i>
<h5 className='ms-2'>{userDatail.phoneNumber}</h5>

          </div>
          <div className='userLocation  mt-3 d-flex align-items-center justify-content-start'>
          <i className="fa-solid locationIcon fa-location-dot"></i>
<h5 className='ms-2'>{userDatail.governorate},{userDatail.area}</h5>

          </div>
       
          <div className='userLocation mt-3  d-flex align-items-center justify-content-start'>
          <i class="fa-solid locationIcon fa-thumbtack"></i>
<h5 className='ms-2'>{userDatail.address}</h5>

          </div>
        </div>
      </div>
        




      <div className="row border-bottom border-1 border-warning ">
        <div className="col-md-5 text-center">
        <div className=' overflow-hidden mt-5    xx '>
            <div>  <img src={require('../../assets/images/images22.png')}className='w-100  ' alt="" /></div>
            </div>
           
        </div>
        <div className="col-md-6 mt-4  ">
        <div className='userLocation  mt-5 d-flex align-items-center rounded-2   justify-content-start'>
        <h1 className='text-white fll p-1 '>user name </h1>
<h5 className='ms-2'>{userDatail.userName}</h5>

          </div>
          
        <div className='userLocation  mt-2 d-flex align-items-center justify-content-start  rounded-2   '>
        <h1 className='text-white fll p-1 '>Role </h1>
<h5 className='ms-2'>{userDatail.roles}</h5>

          </div>
          <div className='userLocation  mt-2 d-flex align-items-center justify-content-start  rounded-2  '>
        <h1 className='text-white fll px-3 text-center '>id </h1>
<h5 className='ms-2'>{userDatail.id}</h5>

          </div>
          <div className='userLocation  mt-2 d-flex align-items-center justify-content-start  rounded-2  '>
        <h1 className='text-white fll p-1  '>status </h1>
{userDatail.adminAccepted?<h5 className='ms-1'>adminAccepted</h5>:<h5 className='ms-1'>admin Not Accepted</h5>}

          </div>
        
     
        </div>
  
      </div> 

    <div className="row mx-auto mt-3 w-25">
    <div className=''> <button disabled={userDatail.adminAccepted} className='px-5 mt-2 py-2 btn btn-warning text-white pro-accept-butt'>Accept user</button></div>
    </div>
      
      </div>
          
   

    </div>
    
  )
}
/*
 <div className="col-md-1">

            </div>
        <div className="col-md-3   ">
</div>
            </div >
           <div className="col-md-7 mt-2 border border-2 border-warning-subtle">
            <div className= 'd-flex userbox   bg-white  align-items-center'>
              <div className='  ms-1 startuserbox ' >Full Name</div>
            <h3>  Ahmed Hatem</h3>
            </div>

            <h4>user name :{userDatail.userName}</h4>
            <h4>Email :{userDatail.email}</h4>
            <h6>Area:{userDatail.area}</h6>
            <h6>governorate:{userDatail.governorate}</h6>
            <h6>Address:{userDatail.address}</h6>
            
        
         
        </div>


                   <div className='bebo mt-2'> <Slider {...settings}>
           
           <img src={'http://fluffypet.somee.com/'+userDatail.image}className='w-100 rot' alt="" />
           <img src={'http://fluffypet.somee.com/'+userDatail.image}className='w-100 rot' alt="" />
           
          
   </Slider>
</div>
 */