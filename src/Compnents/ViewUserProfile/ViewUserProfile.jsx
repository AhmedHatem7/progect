// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import UserPets from '../UserPets/UserPets';
// import UserProducts from '../UserProducts/UserProducts'
// import { useQuery } from 'react-query';
// import { Link, Navigate, useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { FallingLines } from 'react-loader-spinner';
// import Slider from 'react-slick';

// const UserProfile = () => {
//   const token =localStorage.getItem('tkn')
//   const {userId}=useParams()
//   const [selectedTab, setSelectedTab] = useState('pets');
//   const navigate=useNavigate()
//   const [showModal, setShowModal] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [comment, setcomment] = useState('');
//   const {reviewedUser}=useParams()
//   const handleRatingChange = (value) => {
//        setRating(value);
//      };
  
//      const handlecommentChange = (event) => {
//        setcomment(event.target.value);
//      };
  
//      function getOwnerData(){
//       const  queryParams= new URLSearchParams({
//           userId:userId
//         })
//                return axios.get(`http://fluffypet.runasp.net/Get-User-Details?${queryParams.toString()}`)
//           }
//           const {data,isLoading,isError}=useQuery(`getOwnerData`,getOwnerData) 
//           console.log('user Details',data)
          
//     const handleTabChange = (tab) => {
//        setSelectedTab(tab);
//         };
      
//      const handleSubmit = async (event) => {
//        event.preventDefault();
  
//        try {
//          const response = await axios.post(`http://fluffypet.runasp.net/api/Feedbacks/AddFeedback/${reviewedUser}`, { rating, comment },{headers:{
//            Authorization:`Bearer ${token}` ,
          
//           }});
//          console.log('feedback added',response.data); 
//           // Reset the form after successful submission
//          setRating(0);
//          setcomment('');
//        } catch (error) {
//          console.error('Error sending feedback:', error);
//        }
//      };
//   function handleButtonClick() {
//     setShowModal(true);
//   }

//   function handleCloseModal() {
//     setShowModal(false);
//   }
//   var settings = {
//     focusOnSelect:true,
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed:2000,
    
//   };



//       if(isLoading){
//         return <div className='d-flex vh-100  bg-opacity-50 justify-content-center align-items-center' >
//         <FallingLines
//                   color="#F9BA1D"
//                   width="100"
//                   visible={true}
//                   ariaLabel="falling-circles-loading"
//              />
//           </div>
//        }
      
//        if(isError){
//         return <Navigate to='/home'/>
//        }

//   return <>

//   <div className="user-profile">
//       <div className="profile-header">
//       <div className="row d-flex justify-content-between">
//            <div className="col-md-2">
//                   <div>
//                     <img className='w-100 profilePhoto' src={`http://fluffypet.runasp.net/${data?.data.image}`}/>
//                   </div>
//              </div>
//              <div className="col-md-10 d-flex justify-content-between ">
//                  <div>
                
//                  <h4>{data?.data.userName}</h4>
              
//                  <h3 className='my-3'>{data?.data.firstName +' '+ data?.data.lastName}</h3>
//                  <h5 className='governrate'>{'- '+ data?.data.governorate + ' Governorate'}</h5>
//                  <h5 className='governrate'>{'- '+ data?.data.phoneNumber }</h5>
//                  </div>
               
//                <div>
//                 <button className='btn btn-danger' onClick={()=>navigate(`/addFeedback/${data?.data.id}`)} >Add feedback</button>
                
//                </div>
//              </div>
//          </div>
//       </div>

//       <div className="profile-tabs">
//         <ul>
//           <li><Link className='cl lable' to="#" onClick={() => handleTabChange('pets')}> <i className="fa-solid fa-paw"></i> pets</Link></li>
//           <li><Link className='cl lable' to="#" onClick={() => handleTabChange('products')}>products</Link></li>
//           <li><Link className='cl lable' to="#" onClick={() => handleTabChange('feedbacks')}>feedbacks</Link></li>
//         </ul>
//       </div>
//       {selectedTab === 'pets' && (
//     //    <UserPets/>

//     <div className="container">
//     {
//         data.data.pets.map((pet,index)=><div key={index} className="row align-items-center border-2 border-bottom  py-3 my-2">
//         <div className="col-md-4">
//         <Slider {...settings}  >
//             {
              
//                  pet?.images.map((imge,index)=>{
//                   return <div key={index} >
//                   <img src={`http://fluffypet.runasp.net${imge.imageUrl}`} className='w-100' alt={pet.title} height={'350px'}/>
//                   </div>
//                  })
//             } 
//           </Slider>
//         </div>
//         <div className="col-md-8 gx-5 ">
//         <article>
//         <h1 className='text-main'> {pet.title}</h1> 
//         <p className='lable '>{pet.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magnam possimus quis quo corrupti a tempora dolore libero corporis, iusto assumenda saepe suscipit vero facere at error commodi ab accusantium!</p>
//         <div className='d-flex '>
//           <span>
//           <h4><i className="fa-solid fa-venus-mars"></i> </h4>
//           <h4><i className="fa-solid fa-cake-candles"></i> </h4>
//           <h4><i className="fa-solid fa-tag"></i> </h4>
//           </span>
         
//          <span className='mx-2'>
//           <h4>:</h4>
//           <h4>:</h4>
//           <h4>:</h4>
//          </span>

//          <span>
//          <h4>{pet.gender==1?'male':'female'}</h4>
//           <h4>{pet.age}</h4>
//           <h4>{pet.price} <i className="fa-solid fa-sterling-sign"></i></h4>
//          </span>
//         </div>
      
//       </article>
//         </div>
//     </div>)
//     }
//   </div>
//       )}
//       {selectedTab === 'products' && (
//         <div className="profile-products">
//          {/* <UserProducts/> */}
//          <div className="container">
//         {
//             data.data.product?.map((product,index)=><div key={index} className="row align-items-center border-2 border-bottom  py-3 my-2">
//             <div className="col-md-4">
//             <Slider {...settings}  >
//                 {
                  
//                      product?.images.map((imge,index)=>{
//                       return <div key={index} >
//                       <img src={`http://fluffypet.runasp.net${imge.imageUrl}`} className='w-100' alt={product.name} height={'350px'}/>
//                       </div>
//                      })
//                 } 
//               </Slider>
//             </div>
//             <div className="col-md-8 gx-5 ">
//             <article>
//             <h1 className='text-main'> {product.name}</h1> 
//             <p className='lable'>{product.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magnam possimus quis quo corrupti a tempora dolore libero corporis, iusto assumenda saepe suscipit vero facere at error commodi ab accusantium!</p>
//             <div className='d-flex '>
//               <span>
             
//               <h4><i className="fa-solid fa-tag"></i> </h4>
//               </span>
             
//              <span>
              
//               <h4>:</h4>
//              </span>

//              <span>
//               <h4>{product.price} <i className="fa-solid fa-sterling-sign"></i></h4>
//              </span>
//             </div>
            
//           </article>
//             </div>

//         </div>)
//         }
        
//       </div>
//         </div>
//       )}
//       {selectedTab === 'aved' && (
//         <div className="profile-saved">
//         </div>
//       )}
//     </div>
//   </>
   
// };

// export default UserProfile;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserPets from '../UserPets/UserPets';
import UserProducts from '../UserProducts/UserProducts'
import Modal from 'react-bootstrap/Modal';

import { useQuery } from 'react-query';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import Slider from 'react-slick';

const UserProfile = () => {
  const token =localStorage.getItem('tkn')
  const {userId}=useParams()
  const [selectedTab, setSelectedTab] = useState('pets');
  const navigate=useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setcomment] = useState('');
  // const {reviewedUser}=useParams()

  function getOwnerData(){
    const  queryParams= new URLSearchParams({
        userId:userId
      })
             return axios.get(`http://fluffypet.runasp.net/Get-User-Details?${queryParams.toString()}`)
        }
        const {data,isLoading,isError}=useQuery(`getOwnerData`,getOwnerData) 
        console.log('user Details',data)
        const reviewedUser=data?.data.id
        
  const handleRatingChange = (value) => {
       setRating(value);
     };
  
     const handlecommentChange = (event) => {
       setcomment(event.target.value);
     };
  
     
    const handleTabChange = (tab) => {
       setSelectedTab(tab);
        };
      
     const handleSubmitFeedback = async (event) => {
       event.preventDefault();
  
       try {
         const response = await axios.post(`http://fluffypet.runasp.net/api/Feedbacks/AddFeedback/${reviewedUser}`, { rating, comment },{headers:{
           Authorization:`Bearer ${token}` ,

          }});
         console.log('feedback added',response.data); 
          // Reset the form after successful submission
         setRating(0);
         setcomment('');
       } catch (error) {
         console.error('Error sending feedback:', error);
       }
     };
  function handleButtonClick() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }
  var settings = {
    focusOnSelect:true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:2000,
    
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

  return <>

  <div className="user-profile">
      <div className="profile-header">
      <div className="row d-flex justify-content-between">
           <div className="col-md-2">
                  <div>
                    <img className='w-100 profilePhoto' src={`http://fluffypet.runasp.net/${data?.data.image}`}/>
                  </div>
             </div>
             <div className="col-md-10 d-flex justify-content-between ">
                 <div>
                
                 <h4>{data?.data.userName}</h4>
              
                 <h3 className='my-3'>{data?.data.firstName +' '+ data?.data.lastName}</h3>
                 <h5 className='governrate'>{'- '+ data?.data.governorate + ' Governorate'}</h5>
                 <h5 className='governrate'>{'- '+ data?.data.phoneNumber }</h5>
                 </div>
               {/*Adding FeedBack */}
               <div >
                {/* <button className='btn btn-danger' onClick={()=>navigate(`/addFeedback/${data?.data.id}`)} >Add feedback</button> */}
                <button className='btn btn-outline-dark' onClick={handleButtonClick}>Add Feedback</button>

<Modal
  show={showModal}
  onHide={handleCloseModal}
  centered // Add the centered prop to center the modal
>
  <Modal.Header closeButton>
    <Modal.Title>Add your feedback</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* <p>Modal Content</p> */}
    <div className='w-75 m-auto'>
 {/* <h3>Rating: {rating}</h3> */}
 <div className='my-3 d-flex justify-content-center  '>
   {[1, 2, 3, 4, 5].map((value) => (
     <span 
       key={value}
       onClick={() => handleRatingChange(value)}
       style={{ cursor: 'pointer' }}
     >
       {value <= rating ?<span className='text-main mx-2'> <i className="fa-solid fa-star "></i>  </span> : <span className='text-main mx-2'><i className="fa-regular fa-star"></i> </span>}
     </span>
   ))}
 </div>
 <form onSubmit={handleSubmitFeedback}>
   <textarea className='form-control'
     value={comment}
     onChange={handlecommentChange}
     placeholder="Enter your feedback"
     required
   />
   <button className='btn btn-warning main-btn my-3' type="submit">Send</button>
 
 </form>
</div>
    
  </Modal.Body>
  <Modal.Footer>
    <button  className='btn' onClick={handleCloseModal}>
      cancel
    </button>
  </Modal.Footer>
</Modal>
               </div>
             </div>
         </div>
      </div>

      <div className="profile-tabs">
        <ul>
          <li><Link className='cl lable' to="#" onClick={() => handleTabChange('pets')}> <i className="fa-solid fa-paw"></i> pets</Link></li>
          <li><Link className='cl lable' to="#" onClick={() => handleTabChange('products')}>products</Link></li>
          <li><Link className='cl lable' to="#" onClick={() => handleTabChange('feedbacks')}>feedbacks</Link></li>
        </ul>
      </div>
      {selectedTab === 'pets' && (
    //    <UserPets/>

    <div className="container">
    {
        data.data.pets.map((pet,index)=><div key={index} className="row align-items-center border-2 border-bottom  py-3 my-2">
        <div className="col-md-4">
        <Slider {...settings}  >
            {
              
                 pet?.images.map((imge,index)=>{
                  return <div key={index} >
                  <img src={`http://fluffypet.runasp.net${imge.imageUrl}`} className='w-100' alt={pet.title} height={'350px'}/>
                  </div>
                 })
            } 
          </Slider>
        </div>
        <div className="col-md-8 gx-5 ">
        <article>
        <h1 className='text-main'> {pet.title}</h1> 
        <p className='lable '>{pet.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magnam possimus quis quo corrupti a tempora dolore libero corporis, iusto assumenda saepe suscipit vero facere at error commodi ab accusantium!</p>
        <div className='d-flex '>
          <span>
          <h4><i className="fa-solid fa-venus-mars"></i> </h4>
          <h4><i className="fa-solid fa-cake-candles"></i> </h4>
          <h4><i className="fa-solid fa-tag"></i> </h4>
          </span>
         
         <span className='mx-2'>
          <h4>:</h4>
          <h4>:</h4>
          <h4>:</h4>
         </span>

         <span>
         <h4>{pet.gender==1?'male':'female'}</h4>
          <h4>{pet.age}</h4>
          <h4>{pet.price} <i className="fa-solid fa-sterling-sign"></i></h4>
         </span>
        </div>
      
      </article>
        </div>
    </div>)
    }
  </div>
      )}
      {selectedTab === 'products' && (
        <div className="profile-products">
         {/* <UserProducts/> */}
         <div className="container">
        {
            data.data.product?.map((product,index)=><div key={index} className="row align-items-center border-2 border-bottom  py-3 my-2">
            <div className="col-md-4">
            <Slider {...settings}  >
                {
                  
                     product?.images.map((imge,index)=>{
                      return <div key={index} >
                      <img src={`http://fluffypet.runasp.net${imge.imageUrl}`} className='w-100' alt={product.name} height={'350px'}/>
                      </div>
                     })
                } 
              </Slider>
            </div>
            <div className="col-md-8 gx-5 ">
            <article>
            <h1 className='text-main'> {product.name}</h1> 
            <p className='lable'>{product.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magnam possimus quis quo corrupti a tempora dolore libero corporis, iusto assumenda saepe suscipit vero facere at error commodi ab accusantium!</p>
            <div className='d-flex '>
              <span>
             
              <h4><i className="fa-solid fa-tag"></i> </h4>
              </span>
             
             <span>
              
              <h4>:</h4>
             </span>

             <span>
              <h4>{product.price} <i className="fa-solid fa-sterling-sign"></i></h4>
             </span>
            </div>
            
          </article>
            </div>

        </div>)
        }
        
      </div>
        </div>
      )}
      {selectedTab === 'feedbacks' && (
        <div className="profile-saved">
            
        </div>
      )}
    </div>
  </>
   
};

export default UserProfile;