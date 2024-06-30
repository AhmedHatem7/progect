import axios from 'axios'
import React, { useContext } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import im from '../../../assets/images/2....png'
import toast from 'react-hot-toast'
import { cartContext } from '../../../context/CartContext'


export default function ProductDetails() {
  
  const{addToCart}=useContext(cartContext)
  const navigate=useNavigate()
  const {id}=useParams()
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

  function getPetDetails(){
    return axios.get(`http://fluffypet.runasp.net/api/Pet/Show_Details/${id}`)
  }
  const{data,isLoading,isFetching,isError}=useQuery(`getPetDetails-${id}`,getPetDetails)
  console.log('data',data)
 const result=data?.data
  
 
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
  return <Navigate to='/pets'/>
 }

 if(result.gender==1){
  result.gender='male'
 }
 else if(result.gender==2){
  result.gender='female'
 }

 if(result.images.length== 1){
  settings.infinite=false
}

 async function addProdToCart(id,isPet){
  const add=await addToCart(id,isPet)
  console.log('add',add)
  if(add){
    toast.success('Added to cart successfully.',{duration:2000,position:'top-center',style:{}})
   }else{
    toast.error('something wrong!')
   }
}

  return (
    <>
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4">
          
              <Slider {...settings}  >
                {
                  
                     result?.images.map((imge,index)=>{
                      return <div key={index} >
                      <img src={`http://fluffypet.runasp.net${imge.imageUrl}`} className='w-100' alt={result.title} height={'350px'}/>
                      </div>
                     })
                } 
              </Slider>
        
        </div>
        <div className="col-md-8 gx-5 ">
          <article>
            <div className='d-flex justify-content-between'>
            <h1 className='text-main'> {result.title}</h1> 
            <button className='btn btn-outline-secondary  lable ' onClick={()=>navigate(`/viewUserProfile/${result.userId}`)}>view owner profile</button>
            </div>
            <p className='lable'>{result.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magnam possimus quis quo corrupti a tempora dolore libero corporis, iusto assumenda saepe suscipit vero facere at error commodi ab accusantium!</p>
            <div className='d-flex '>
              <span >
              <h4><i className="fa-solid fa-venus-mars"></i> </h4>
              <h4><i className="fa-solid fa-cake-candles"></i> </h4>
              <h4><i className="fa-solid fa-tag"></i> </h4>
              <h4><i className="fa-solid fa-location-dot"></i> </h4>
              
              </span>
             
             <span className='mx-3'>
              <h4>:</h4>
              <h4>:</h4>
              <h4>:</h4>
              <h4>:</h4>
             </span>

             <span>
             <h4>{result.gender}</h4>
              <h4>{result.age}</h4>
              <h4>{result.price} <i className="fa-solid fa-sterling-sign"></i></h4>
              <h4 className='d-flex '>{result.governorate +' - ' +result.area +' - ' + result.address}</h4>
             </span>
            </div>
            
          
           
          </article>
     
      <div className='d-flex justify-content-center'>
        <button className='btn btn-warning main-btn text-white my-2' onClick={()=> addProdToCart(result.id,true)}><i className="fa-solid fa-plus"></i> add to cart</button>
          
      </div> 
      <div className='d-flex justify-content-center'>
       <button className='btn main-btn buyBtn my-2'><i className="fa-solid fa-money-check-dollar"></i> Buy Now</button>
      </div > 
        </div>
      </div>
    </div>
      
    </>
  )
}
