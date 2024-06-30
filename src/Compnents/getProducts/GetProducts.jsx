import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { idContext } from '../../context/IdContext/IdContext'
import { cartContext } from '../../context/CartContext'
import noImg from '../../assets/images/no-image-icon-15.png'
import toast from 'react-hot-toast'
import { FallingLines } from 'react-loader-spinner'

export default function GetProducts() {
    const{addToCart}=useContext(cartContext)
    const [AcceptedProduct, setAcceptedProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

  //   function getProducts(){
  //      const params=new URLSearchParams({
  //       categoryId:'1',
  //       pageNumber:'1',
  //       pageSize:'3',
         
  //      })
  //    return  axios.get(`https://localhost:44355/api/Products/Get_All_Products_Accepted?${params.toString()}`)
     
   
  //  }
   
  //  const{data,isLoading}=useQuery('getProducts',getProducts)
  //  // setPetId(data?.data.data.id)

  //  console.log('data is',data?.data.data)

  async function getAcceptedProduct(){
    const params=new URLSearchParams({
              pageNumber:currentPage,
              pageSize:'30',
             
           })
         return  axios.get(`https://localhost:44355/api/Products/Get_All_Products_Accepted?${params.toString()}`).then((data)=>{
        console.log('data is',data.data.data)
setAcceptedProduct(data.data.data)

}).catch((err)=>{
console.log(err)
})
}

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

useEffect(() => {
  getAcceptedProduct();
}, [currentPage]);

  
   async function addProdToCart(id,isPet){
    const add=await addToCart(id,isPet)
    console.log('add',add)
    if(add){
      toast.success('Added to cart successfully.',{duration:2000,position:'top-center',style:{}})
     }else{
      toast.error('something wrong!')
     }
}

if(!AcceptedProduct){
  return <div className='d-flex vh-100  bg-opacity-50 justify-content-center align-items-center' >
  <FallingLines
            color="#F9BA1D"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
       />
    </div>
 }
  return  <>
       <div className="container position-relative">
        <div className="row">
          {
            AcceptedProduct.map((product,index)=>{
                
             return <div key={index} className="col-md-3 pet ">  
             <div className='ov'>
             <Link to={`/productDetails/${product.id}`}>
               
               <div className=''>
                <figure>
                {
                 product.images[0]?.imageUrl ? 
                 <img className='w-100 imgborder' src={`https://localhost:44355${product.images[0]?.imageUrl}`} height={'200px'}/>
                 :
                 <img className='w-100 imgborder' src={noImg} height={'200px'}/>
                 }   
                </figure>
                         
                 <h3 className='h6 my-2 text-main'>{product.name}</h3>
                 <h4 className='h6'>{product.price} <i className="fa-solid fa-sterling-sign "></i></h4> 
                 
                 
               
               </div> 
               </Link>
               <button onClick={()=> addProdToCart(product.id,false)} className='btn bg-main text-white my-3 m-auto d-block'>+ add to cart</button>
 
              </div>          
             
                {/* {
                    pet?.images.map((imge,index)=>{
                     return <div key={index} className='bg-danger'>
                     <img src={`https://localhost:44355${imge.imageUrl}`} className='w-100'/>
                     </div>
                    })
                } */}
              
           </div>
            })
          }
           
        </div>
        <div className='position-absolute next start-50 translate-middle mt-5 '>
      <button  className='btn btn-outline-warning mx-1 ' onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
      <button  className='btn btn-outline-warning mx-1' onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
      </div>
      
    </>
}
