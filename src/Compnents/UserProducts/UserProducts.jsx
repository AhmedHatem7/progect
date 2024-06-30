import axios from 'axios'
import React, { useEffect } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom'
import Slider from 'react-slick'

export default function UserProducts() {
   const token=localStorage.getItem('tkn')
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
    function getUserInfo(){
       return axios.get(`http://fluffypet.runasp.net/Get-Current-User`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
      }
      
      const{data,isLoading,isFetching,isError}=useQuery('getUserInfo',getUserInfo)
      console.log('currentUser',data)
    
      function deleteProduct(productId){
         axios.delete(`http://fluffypet.runasp.net/api/Products/Delete_Product/${productId}`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          }).then((res)=>{
            console.log('deleted',res.data)
          }).catch((error)=>{
             console.log('delete error',error)
          })
      }

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
console.log(data.data)
  return  <>
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
             
             <span className='mx-2'>
              
              <h4>:</h4>
             </span>

             <span>
            
              <h4>{product.price} <i className="fa-solid fa-sterling-sign"></i></h4>
             </span>
            </div>
            
          
           
          </article>
            </div>
            <div className='d-flex justify-content-center mt-2' >
             <button className='btn btn-warning text-white mx-2 lable w-25' > Edit </button>
             <button  className='btn btn-outline-danger lable' onClick={()=>deleteProduct(product.id)}> Delete </button>

           </div> 
         

        </div>)
        }
        

      </div>
    </>

}
