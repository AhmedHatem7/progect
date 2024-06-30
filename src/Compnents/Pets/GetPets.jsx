import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { idContext } from '../../context/IdContext/IdContext'
import { cartContext } from '../../context/CartContext'
import { FallingLines } from 'react-loader-spinner'
import noImg from '../../assets/images/no-image-icon-15.png'
import toast from 'react-hot-toast'


export default function GetPets() {
  const [Accepetedpet, setAccepetedpet] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tkn=localStorage.getItem('tkn')
  const{addToCart}=useContext(cartContext)
  
    async function getAccepetedpet(){
      const params=new URLSearchParams({
                pageNumber:currentPage,
                pageSize:'30',
               
             })
           return  axios.get(`http://fluffypet.runasp.net/api/Pet/Get_All_Pets_Accepted?${params.toString()}`).then((data)=>{
         console.log('data is',data.data)
         setAccepetedpet(data.data.data)

}).catch((err)=>{
console.log(err)
})
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  useEffect(() => {
    getAccepetedpet();
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
if(!Accepetedpet){
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
  
  <div className="container position-relative ">
        <div className="row ">
          {
            Accepetedpet.map((pet,index)=>{
                
             return <div key={index} className="col-md-3 pet ">
              <div className='ov'>
              <Link to={`/petDetails/${pet.id}`}>
               
               <div className='mx-auto'>
                 <figure>
                 {
                  pet.images[0]?.imageUrl ? 
                 
                  <img className='w-100 imgborder' src={`http://fluffypet.runasp.net${pet.images[0]?.imageUrl}`} alt={pet.title} height={'200px'} />
                       
               
                  :
                  <img className='w-100 imgborder' src={noImg} />
                  }  
                   </figure>
                 <h3 className='h6 my-2 text-main'>{pet.title}</h3>
                 <h4 className='h6'>{pet.price} <i className="fa-solid fa-sterling-sign "></i></h4> 
                 
                 
               
               </div> 
               </Link> 
               <button onClick={()=>addProdToCart(pet.id,true)} className='btn bg-main text-white my-3 m-auto d-block'>+ add to cart</button>

              </div>
              
               
           </div>
             }) 
           }
           
        </div>
       
      <div className='position-absolute next start-50 translate-middle mt-5 '>
      <button  className='btn btn-outline-warning mx-1 ' onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
      <button  className='btn btn-outline-warning mx-1' onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
     
  </div>
     
 

      
{/*       
      <div className="container">
        <div className="row">
          {
            data?.data.data.map((pet,index)=>{
                
             return <div key={index} className="col-md-3 pet ">
              <Link to={`/petDetails/${pet.id}`}>
               
              <div className='ov '>
                <img className='w-100 imgborder' src={`http://fluffypet.runasp.net${pet.images[0].imageUrl}`} height={'200px'}/>
            
                <h3 className='h6 my-2 text-main'>{pet.title}</h3>
                <h4 className='h6'>{pet.price} <i className="fa-solid fa-sterling-sign "></i></h4> 
                
                
                <button onClick={()=>addToCart(pet.id)} className='btn bg-main text-white my-3 m-auto d-block'>+ add to cart</button>
              
              </div> 
              </Link> */}
                {/* {
                    pet?.images.map((imge,index)=>{
                     return <div key={index} className='bg-danger'>
                     <img src={`http://fluffypet.runasp.net${imge.imageUrl}`} className='w-100'/>
                     </div>
                    })
                } */}
              
           {/* </div> */}
            {/* }) */}
          {/* } */}
           
        {/* </div> */}
      {/* </div> */}
    </>
 
}
